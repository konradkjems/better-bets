import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  const client = new MongoClient(uri);
  await client.connect();
  
  const db = client.db('better-bets');
  
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Calculation schema interface
export interface Calculation {
  _id?: string;
  userId: string; // Clerk user ID
  customerName: string;
  teamNames: {
    team1: string;
    team2: string;
  };
  betType: 'qualifying' | 'bonus';
  bookmakers: Array<{
    name: string;
    odds: {
      team1: number;
      draw: number;
      team2: number;
    };
    fixedStake: number;
    actualCost: number;
    minOdds: number;
    preferLoss?: boolean;
    avoidWin?: boolean;
    isActive: boolean;
    betType: 'team1' | 'draw' | 'team2';
    bonusType?: 'freebet' | 'matchingBonus' | 'none';
    bonusAmount?: number;
    bonusMinOdds?: number;
    qualifyingBetAmount?: number;
    isBonusLocked?: boolean;
    usedInBet1?: boolean;
    bonusOnlyIfLost?: boolean;
    bet1Lost?: boolean;
    bet1Balance?: number;
    bet1Profit?: number;
  }>;
  results: {
    totalStake: number;
    totalActualCost: number;
    potentialReturns: {
      team1: number;
      draw: number;
      team2: number;
    };
    profit: number;
    profitPercentage: number;
    isArbitrage: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
