import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://konradkjems:LI,k8991qw!@cluster0.rklzlve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = 'better-bets';

async function initializeDatabase() {
  let client;
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    console.log('✅ Connected to MongoDB successfully!');
    
    const db = client.db(MONGODB_DB);
    
    // Test connection by listing collections
    console.log('📋 Checking existing collections...');
    const collections = await db.listCollections().toArray();
    console.log('Existing collections:', collections.map(c => c.name));
    
    // Create calculations collection if it doesn't exist
    console.log('📊 Ensuring calculations collection exists...');
    const calculationsCollection = db.collection('calculations');
    
    // Create indexes for better performance
    console.log('🔍 Creating indexes...');
    await calculationsCollection.createIndex({ userId: 1 });
    await calculationsCollection.createIndex({ createdAt: -1 });
    await calculationsCollection.createIndex({ customerName: 1 });
    
    console.log('✅ Indexes created successfully!');
    
    // Test insert a sample document
    console.log('🧪 Testing database operations...');
    const testCalculation = {
      userId: 'test-user-123',
      customerName: 'Test Customer',
      teamNames: {
        team1: 'Test Team 1',
        team2: 'Test Team 2'
      },
      betType: 'qualifying',
      bookmakers: [],
      results: {
        totalStake: 1000,
        totalActualCost: 1000,
        profit: 0,
        profitPercentage: 0,
        isArbitrage: false
      },
      createdAt: new Date(),
      isTestDocument: true
    };
    
    const insertResult = await calculationsCollection.insertOne(testCalculation);
    console.log('✅ Test document inserted with ID:', insertResult.insertedId);
    
    // Clean up test document
    await calculationsCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('🧹 Test document cleaned up');
    
    // Count documents
    const count = await calculationsCollection.countDocuments();
    console.log(`📈 Total calculations in database: ${count}`);
    
    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log('✅ Database initialization script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  });
