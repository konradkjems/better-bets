import { calculateArbitrage, gatherOddsData, BOOKMAKERS } from '@/lib/calculator';

// Test the calculator logic
export function testCalculator() {
  console.log('Testing calculator logic...');
  
  // Create a test customer
  const testCustomer = {
    id: 'test',
    name: 'Test Customer',
    bookmakers: BOOKMAKERS.map(bm => ({
      ...bm,
      isActive: true,
      odds: {
        team1: 2.0,
        draw: 3.5,
        team2: 2.8
      }
    })),
    teamNames: {
      team1: 'Team A',
      team2: 'Team B'
    },
    betType: 'qualifying' as const
  };

  // Test gathering odds data
  const oddsData = gatherOddsData(testCustomer);
  console.log('Odds data:', oddsData);

  // Test calculation
  const result = calculateArbitrage(oddsData, testCustomer);
  console.log('Calculation result:', result);

  return result;
}
