import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { ProtectedContent } from './AuthButton';

// Import the calculator logic from main.ts
interface BookmakerInfo {
    name: string;
    fixedStake: number;
    hasBonus: boolean;
    actualCost: number;
    minOdds: number;
    preferLoss?: boolean;
    avoidWin?: boolean;
    isActive: boolean;
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
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
}

interface TeamNames {
    team1: string;
    team2: string;
}

interface Customer {
    id: string;
    name: string;
    bookmakers: BookmakerInfo[];
    teamNames?: TeamNames;
    betType: 'qualifying' | 'bonus';
}

const BOOKMAKERS: BookmakerInfo[] = [
    { name: 'Unibet', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.4, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.4, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Bet365', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.2, isActive: true, bonusType: 'freebet', bonusAmount: 1000, bonusMinOdds: 1.2, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'LeoVegas', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 1000, bonusMinOdds: 1.8, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: true },
    { name: 'ComeOn', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.8, preferLoss: true, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.8, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Mr Green', fixedStake: 300, hasBonus: false, actualCost: 300, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 300, bonusMinOdds: 1.8, qualifyingBetAmount: 300, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'NordicBet', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Bwin', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 1000, bonusMinOdds: 1.8, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: false },
    { name: '888sport', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 2.0, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 2.0, qualifyingBetAmount: 500, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Bet25', fixedStake: 250, hasBonus: false, actualCost: 250, minOdds: 1.95, isActive: true, bonusType: 'matchingBonus', bonusAmount: 250, bonusMinOdds: 1.95, qualifyingBetAmount: 250, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Expekt', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.5, isActive: true, bonusType: 'freebet', bonusAmount: 1000, bonusMinOdds: 1.5, qualifyingBetAmount: 1000, usedInBet1: true, bonusOnlyIfLost: true },
    { name: 'Cashpoint', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Jackpotbet', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.5, isActive: true, bonusType: 'matchingBonus', bonusAmount: 500, bonusMinOdds: 1.5, qualifyingBetAmount: 500, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Getlucky', fixedStake: 100, hasBonus: false, actualCost: 100, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 100, bonusMinOdds: 1.8, qualifyingBetAmount: 100, usedInBet1: true, bonusOnlyIfLost: false }
];

export function Calculator() {
  const { getToken } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
  const [currentBetType, setCurrentBetType] = useState<'qualifying' | 'bonus'>('qualifying');
  const [lastCalculatedResult, setLastCalculatedResult] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  // Initialize calculator when component mounts
  useEffect(() => {
    // Initialize the vanilla TS calculator functionality
    initializeCalculator();
  }, []);

  const initializeCalculator = () => {
    // This will initialize the calculator UI and functionality
    // For now, we'll create a basic structure
  };

  const getCurrentCustomer = (): Customer | null => {
    return customers.find(c => c.id === currentCustomerId) || customers[0] || null;
  };

  const addCustomer = () => {
    if (!newCustomerName.trim() || !team1Name.trim() || !team2Name.trim()) {
      alert('Du skal udfylde alle felter for at fortsætte');
      return;
    }

    const newId = `kunde${customers.length + 1}`;
    const newCustomer: Customer = {
      id: newId,
      name: newCustomerName,
      bookmakers: BOOKMAKERS.map(bm => ({...bm})),
      teamNames: {
        team1: team1Name,
        team2: team2Name
      },
      betType: 'qualifying'
    };
    
    setCustomers([...customers, newCustomer]);
    setCurrentCustomerId(newId);
    setCurrentBetType('qualifying');
    setShowCustomerForm(false);
    setNewCustomerName('');
    setTeam1Name('');
    setTeam2Name('');
  };

  const switchCustomer = (customerId: string) => {
    setCurrentCustomerId(customerId);
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setCurrentBetType(customer.betType);
    }
  };

  const switchBetType = (betType: 'qualifying' | 'bonus') => {
    setCurrentBetType(betType);
    const customer = getCurrentCustomer();
    if (customer) {
      customer.betType = betType;
      setCustomers([...customers]);
    }
  };

  const calculateArbitrage = () => {
    const customer = getCurrentCustomer();
    if (!customer) {
      alert('Vælg en kunde først');
      return;
    }

    // Collect odds data from active bookmakers
    const oddsData = customer.bookmakers
      .filter(bm => bm.isActive && bm.odds)
      .map(bm => ({
        name: bm.name,
        team1: bm.odds!.team1,
        draw: bm.odds!.draw,
        team2: bm.odds!.team2,
        fixedStake: bm.fixedStake,
        actualCost: bm.actualCost,
        minOdds: bm.minOdds,
        preferLoss: bm.preferLoss,
        avoidWin: bm.avoidWin,
        isActive: bm.isActive
      }))
      .filter(odds => odds.team1 > 0 || odds.draw > 0 || odds.team2 > 0);

    if (oddsData.length === 0) {
      alert('Indtast odds for mindst én aktiv bookmaker');
      return;
    }

    // Use the advanced arbitrage calculation from main.ts
    const result = calculateAdvancedArbitrage(oddsData, customer);
    setLastCalculatedResult(result);
  };

  // Import the advanced arbitrage calculation logic from main.ts
  const calculateAdvancedArbitrage = (oddsData: any[], customer: Customer) => {
    const isQualifyingBet = customer.betType === 'qualifying';

    // Beregn potentielle returns for hver bookmaker for hvert udfald
    const bookmakerReturns = oddsData.map(bm => {
      const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);

      // Opdater calculateReturn til at tjekke for freebet uafhængigt af betType
      const calculateReturn = (odds: number, stake: number, isFreebet: boolean) => {
        if (isFreebet) {
          return (odds - 1) * stake; // Kun gevinst, ikke indsats tilbage for freebets
        }
        return odds * stake; // Normal beregning
      };

      // Find det laveste odds (favorit) for denne bookmaker
      const team1Odds = bm.team1 || Infinity;
      const team2Odds = bm.team2 || Infinity;
      const favoritType = team1Odds <= team2Odds ? 'team1' as const : 'team2' as const;
      const underdogType = team1Odds <= team2Odds ? 'team2' as const : 'team1' as const;

      // Kald calculateReturn med isFreebet parameter
      return {
        ...bm,
        favoritType,
        underdogType,
        returns: {
          team1: calculateReturn(bm.team1, bm.fixedStake, bookmakerInfo?.bonusType === 'freebet'),
          draw: calculateReturn(bm.draw, bm.fixedStake, bookmakerInfo?.bonusType === 'freebet'),
          team2: calculateReturn(bm.team2, bm.fixedStake, bookmakerInfo?.bonusType === 'freebet')
        }
      };
    });

    // Find target return (gennemsnit af alle mulige returns)
    const totalPossibleReturn = bookmakerReturns.reduce((sum, bm) => 
      sum + (bm.returns?.team1 || 0) + (bm.returns?.draw || 0) + (bm.returns?.team2 || 0), 0);
    const targetReturnPerOutcome = totalPossibleReturn / 3;

    let bestDistribution = {
      team1: [] as any[],
      draw: [] as any[],
      team2: [] as any[],
      deviation: Infinity
    };

    // Funktion til at evaluere en distribution
    const evaluateDistribution = (team1: any[], draw: any[], team2: any[]): number => {
      const calculateReturnForBet = (bm: any, odds: number) => {
        const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);
        if (!isQualifyingBet && bookmakerInfo?.bonusType === 'freebet') {
          return (odds - 1) * bm.fixedStake;
        }
        return odds * bm.fixedStake;
      };

      const team1Return = team1.reduce((sum, bm) => sum + calculateReturnForBet(bm, bm.team1), 0);
      const drawReturn = draw.reduce((sum, bm) => sum + calculateReturnForBet(bm, bm.draw), 0);
      const team2Return = team2.reduce((sum, bm) => sum + calculateReturnForBet(bm, bm.team2), 0);

      // Beregn afvigelse fra target
      const maxReturn = Math.max(team1Return, drawReturn, team2Return);
      const minReturn = Math.min(team1Return, drawReturn, team2Return);
      const avgReturn = (team1Return + drawReturn + team2Return) / 3;

      // Straf større afvigelser hårdere ved at kvadrere forskellen
      const baseDeviation = Math.pow(maxReturn - minReturn, 2) + 
                          Math.pow(Math.abs(team1Return - avgReturn), 2) +
                          Math.pow(Math.abs(drawReturn - avgReturn), 2) +
                          Math.pow(Math.abs(team2Return - avgReturn), 2);

      let penalty = 0;

      // Specialregler for kvalificerende bets
      if (isQualifyingBet) {
        // Tæl "kun hvis tab"-freebets på hvert udfald
        const bonusOnlyIfLostFreebets = [...team1, ...draw, ...team2].filter(bm => {
          const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);
          return bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet';
        });
        
        const team1BonusOnlyIfLost = bonusOnlyIfLostFreebets.filter(bm => bm.betType === 'team1').length;
        const drawBonusOnlyIfLost = bonusOnlyIfLostFreebets.filter(bm => bm.betType === 'draw').length;
        const team2BonusOnlyIfLost = bonusOnlyIfLostFreebets.filter(bm => bm.betType === 'team2').length;
        
        // Straf hvis "kun hvis tab"-freebets ikke er balanceret fordelt
        const totalBonusOnlyIfLost = team1BonusOnlyIfLost + drawBonusOnlyIfLost + team2BonusOnlyIfLost;
        if (totalBonusOnlyIfLost > 0) {
          const idealPerOutcome = totalBonusOnlyIfLost / 3;
          const deviation = Math.abs(team1BonusOnlyIfLost - idealPerOutcome) + 
                          Math.abs(drawBonusOnlyIfLost - idealPerOutcome) + 
                          Math.abs(team2BonusOnlyIfLost - idealPerOutcome);
          penalty += deviation * 10000; // Stor straf for ubalanceret fordeling
        }

        [...team1, ...draw, ...team2].forEach(bm => {
          const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);
          
          // Straf hvis vi bruger en bookmaker uden bonus i kvalificerende fase
          if (!bookmakerInfo?.bonusType || bookmakerInfo.bonusType === 'none') {
            penalty += 5000;
          }

          // Tjek om odds er over minimum for bonus
          if (bookmakerInfo?.bonusMinOdds) {
            const placedOdds = bm.betType === 'team1' ? bm.team1 :
                             bm.betType === 'draw' ? bm.draw :
                             bm.team2;
            if (placedOdds < bookmakerInfo.bonusMinOdds) {
              penalty += 10000; // Stor straf hvis odds er under minimum for bonus
            }
          }

          // Specialregel for "kun hvis tabt" bonusser - vi vil gerne tabe på disse bookmakere
          if (bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet') {
            // Find den højeste odds (underdog) for denne bookmaker
            const team1Odds = bm.team1 || 0;
            const team2Odds = bm.team2 || 0;
            const underdogType = team1Odds >= team2Odds ? 'team1' : 'team2';
            
            // Hvis vi spiller på underdog'en (laveste sandsynlighed for gevinst), giv bonus
            if (bm.betType === underdogType) {
              penalty -= 2000; // Bonus for at spille på underdog'en
            } else {
              penalty += 5000; // Straf for at spille på favoritten
            }
          }
        });
      }

      // Specialregler for bonus bets (freebets)
      if (!isQualifyingBet) {
        [...team1, ...draw, ...team2].forEach(bm => {
          const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);
          
          // For freebets vil vi gerne have højere odds for at maksimere gevinst
          // men stadig holde det balanceret
          if (bookmakerInfo?.bonusType === 'freebet') {
            const placedOdds = bm.betType === 'team1' ? bm.team1 :
                             bm.betType === 'draw' ? bm.draw :
                             bm.team2;
            // Mindre aggressiv bonus for højere odds
            penalty -= (placedOdds - bookmakerInfo.minOdds) * 100;
          }

          // Straf for meget ubalancerede returns i Bet 2
          const returnSpread = maxReturn - minReturn;
          if (returnSpread > avgReturn * 0.1) { // Hvis spredningen er mere end 10% af gennemsnittet
            penalty += Math.pow(returnSpread, 2);
          }
        });
      }

      // Generelle regler for alle typer bets
      const comeOnBet = [...team1, ...draw, ...team2].find(bm => bm.name === 'ComeOn');
      if (comeOnBet) {
        const comeOnData = bookmakerReturns.find(bm => bm.name === 'ComeOn');
        if (comeOnData) {
          const isOnFavorit = comeOnBet.betType === comeOnData.favoritType;
          const isOnDraw = comeOnBet.betType === 'draw';
          if (isOnFavorit || isOnDraw) {
            penalty += 50000;
          }
        }
      }

      return baseDeviation + penalty;
    };

    // Prøv forskellige kombinationer
    const tryDistribution = (remaining: typeof bookmakerReturns, team1: any[], draw: any[], team2: any[]) => {
      if (remaining.length === 0) {
        const deviation = evaluateDistribution(team1, draw, team2);
        if (deviation < bestDistribution.deviation) {
          bestDistribution = { team1, draw, team2, deviation };
        }
        return;
      }

      const [current, ...rest] = remaining;
      
      // Beregn nuværende returns for hver gruppe
      const currentTeam1 = team1.reduce((sum, bm) => sum + bm.team1 * bm.fixedStake, 0);
      const currentDraw = draw.reduce((sum, bm) => sum + bm.draw * bm.fixedStake, 0);
      const currentTeam2 = team2.reduce((sum, bm) => sum + bm.team2 * bm.fixedStake, 0);

      // Specialhåndtering for ComeOn - skal altid på det modsatte hold af favoritten
      if (current.name === 'ComeOn') {
        const team1Odds = current.team1 || Infinity;
        const team2Odds = current.team2 || Infinity;
        
        // Find ud af hvilket hold der er favoritten (laveste odds)
        const favoritType = team1Odds <= team2Odds ? 'team1' : 'team2';
        
        // Placer ComeOn på det modsatte hold af favoritten
        if (favoritType === 'team1' && current.team2 > 0) {
          tryDistribution(rest, team1, draw, [...team2, current]);
        } else if (favoritType === 'team2' && current.team1 > 0) {
          tryDistribution(rest, [...team1, current], draw, team2);
        }
        return;
      }

      // Prioriter placering baseret på bookmaker præferencer
      let priorities: Array<{ type: 'team1' | 'draw' | 'team2'; need: number; odds: number; current: any[] }> = [];
      
      // Specialhåndtering for "kun hvis tab"-freebets i kvalificerende bets
      if (isQualifyingBet) {
        const bookmakerInfo = customer.bookmakers.find(b => b.name === current.name);
        if (bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet') {
          // Tæl hvor mange "kun hvis tab"-freebets der allerede er på hvert udfald
          const existingBonusOnlyIfLost = [...team1, ...draw, ...team2].filter(bm => {
            const bmInfo = customer.bookmakers.find(b => b.name === bm.name);
            return bmInfo?.bonusOnlyIfLost && bmInfo.bonusType === 'freebet';
          });
          
          const team1Count = existingBonusOnlyIfLost.filter(bm => bm.betType === 'team1').length;
          const drawCount = existingBonusOnlyIfLost.filter(bm => bm.betType === 'draw').length;
          const team2Count = existingBonusOnlyIfLost.filter(bm => bm.betType === 'team2').length;
          
          // Prioriter det udfald der har færrest "kun hvis tab"-freebets
          priorities = [
            { type: 'team1' as const, need: -team1Count, odds: current.team1, current: team1 },
            { type: 'draw' as const, need: -drawCount, odds: current.draw, current: draw },
            { type: 'team2' as const, need: -team2Count, odds: current.team2, current: team2 }
          ]
          .filter(p => p.odds > 0) // Fjern muligheder hvor odds er 0
          .sort((a, b) => a.need - b.need); // Laveste count først
        }
      }
      
      // Hvis der ikke er sat nogen prioriteter endnu, brug standard logik
      if (priorities.length === 0) {
        if (current.preferLoss) {
          // For bookmakere der foretrækker tab, placer dem hvor der er lavest return
          priorities = [
            { type: 'team1' as const, need: -currentTeam1, odds: current.team1, current: team1 },
            { type: 'draw' as const, need: -currentDraw, odds: current.draw, current: draw },
            { type: 'team2' as const, need: -currentTeam2, odds: current.team2, current: team2 }
          ]
          .filter(p => p.odds > 0) // Fjern muligheder hvor odds er 0
          .sort((a, b) => a.need - b.need);
        } else {
          // For normale bookmakere, placer dem hvor der er størst behov
          priorities = [
            { type: 'team1' as const, need: targetReturnPerOutcome - currentTeam1, odds: current.team1, current: team1 },
            { type: 'draw' as const, need: targetReturnPerOutcome - currentDraw, odds: current.draw, current: draw },
            { type: 'team2' as const, need: targetReturnPerOutcome - currentTeam2, odds: current.team2, current: team2 }
          ]
          .filter(p => p.odds > 0) // Fjern muligheder hvor odds er 0
          .sort((a, b) => b.need - a.need);
        }
      }

      // Hvis der ikke er nogen gyldige muligheder, spring denne bookmaker over
      if (priorities.length === 0) return;

      // Prøv fordelingerne i prioriteret rækkefølge
      for (const group of priorities) {
        if (group.type === 'team1') {
          tryDistribution(rest, [...team1, current], draw, team2);
        } else if (group.type === 'draw') {
          tryDistribution(rest, team1, [...draw, current], team2);
        } else {
          tryDistribution(rest, team1, draw, [...team2, current]);
        }
      }
    };

    tryDistribution(bookmakerReturns, [], [], []);

    // Konverter den bedste fordeling til det forventede format
    const allBookmakers = oddsData.map(bm => {
      let betType: 'team1' | 'draw' | 'team2';
      let potentialReturn: number;

      if (bestDistribution.team1.find(b => b.name === bm.name)) {
        betType = 'team1';
        potentialReturn = bm.team1 * bm.fixedStake;
      } else if (bestDistribution.draw.find(b => b.name === bm.name)) {
        betType = 'draw';
        potentialReturn = bm.draw * bm.fixedStake;
      } else {
        betType = 'team2';
        potentialReturn = bm.team2 * bm.fixedStake;
      }

      return {
        name: bm.name,
        team1Odds: bm.team1,
        drawOdds: bm.draw,
        team2Odds: bm.team2,
        fixedStake: bm.fixedStake,
        actualCost: bm.actualCost,
        minOdds: bm.minOdds,
        preferLoss: bm.preferLoss,
        avoidWin: bm.avoidWin,
        betType,
        potentialReturn
      };
    });

    const totalStake = allBookmakers.reduce((sum, bm) => sum + bm.fixedStake, 0);
    const totalActualCost = allBookmakers.reduce((sum, bm) => sum + bm.actualCost, 0);

    const potentialReturns = {
      team1: allBookmakers.reduce((sum, bm) => sum + (bm.betType === 'team1' ? bm.potentialReturn : 0), 0),
      draw: allBookmakers.reduce((sum, bm) => sum + (bm.betType === 'draw' ? bm.potentialReturn : 0), 0),
      team2: allBookmakers.reduce((sum, bm) => sum + (bm.betType === 'team2' ? bm.potentialReturn : 0), 0)
    };

    const minReturn = Math.min(
      potentialReturns.team1,
      potentialReturns.draw,
      potentialReturns.team2
    );

    const profit = minReturn - totalActualCost;
    const profitPercentage = (profit / totalActualCost) * 100;
    const isArbitrage = profit > 0;

    return {
      allBookmakers,
      totalStake,
      totalActualCost,
      potentialReturns,
      profit,
      profitPercentage,
      isArbitrage
    };
  };

  const saveCalculation = async (calculationData: any) => {
    try {
      // In development, just show success message
      if (import.meta.env.DEV) {
        console.log('Would save calculation:', calculationData);
        return { message: 'Calculation saved (development mode)' };
      }
      
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/calculations/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(calculationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save calculation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  };

  const handleSaveCalculation = async () => {
    if (!lastCalculatedResult) return;

    try {
      setSaveStatus('saving');
      
      const customer = getCurrentCustomer();
      if (!customer) {
        throw new Error('No customer selected');
      }

      const calculationData = {
        customerName: customer.name,
        teamNames: customer.teamNames,
        betType: currentBetType,
        bookmakers: lastCalculatedResult.allBookmakers,
        results: {
          totalStake: lastCalculatedResult.totalStake,
          totalActualCost: lastCalculatedResult.totalActualCost,
          potentialReturns: lastCalculatedResult.potentialReturns,
          profit: lastCalculatedResult.profit,
          profitPercentage: lastCalculatedResult.profitPercentage,
          isArbitrage: lastCalculatedResult.isArbitrage,
        }
      };

      await saveCalculation(calculationData);
      setSaveStatus('saved');
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving calculation:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Vælg venligst en CSV fil');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      parseCsvData(csv);
    };
    reader.readAsText(file);
  };

  const parseCsvData = (csvContent: string) => {
    const customer = getCurrentCustomer();
    if (!customer) {
      alert('Vælg en kunde først');
      return;
    }

    try {
      const lines = csvContent.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      // Support both Danish and English column names
      const bookmakerIndex = headers.findIndex(h => 
        h.includes('bookmaker') || h.includes('bookie') || h.includes('site')
      );
      const team1Index = headers.findIndex(h => 
        h.includes('team1') || h.includes('hold 1') || h.includes('home')
      );
      const drawIndex = headers.findIndex(h => 
        h.includes('draw') || h.includes('uafgjort') || h.includes('x')
      );
      const team2Index = headers.findIndex(h => 
        h.includes('team2') || h.includes('hold 2') || h.includes('away')
      );

      if (bookmakerIndex === -1 || team1Index === -1 || drawIndex === -1 || team2Index === -1) {
        alert('CSV skal indeholde kolonner med bookmaker navn og odds for alle tre udfald.\n\nUnderstøttede kolonne navne:\n- Bookmaker: "bookmaker", "bookie", "site"\n- Hold 1: "team1", "hold 1", "home"\n- Uafgjort: "draw", "uafgjort", "x"\n- Hold 2: "team2", "hold 2", "away"');
        return;
      }

      let uploadedCount = 0;

      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length < Math.max(bookmakerIndex, team1Index, drawIndex, team2Index) + 1) {
          continue; // Skip incomplete rows
        }

        const bookmakerName = values[bookmakerIndex];
        const team1OddsStr = values[team1Index].replace(',', '.'); // Handle Danish decimal separator
        const drawOddsStr = values[drawIndex].replace(',', '.');
        const team2OddsStr = values[team2Index].replace(',', '.');
        
        const team1Odds = parseFloat(team1OddsStr);
        const drawOdds = parseFloat(drawOddsStr);
        const team2Odds = parseFloat(team2OddsStr);

        // Skip if any odds are invalid
        if (isNaN(team1Odds) || isNaN(drawOdds) || isNaN(team2Odds)) {
          console.warn(`Skipping row ${i + 1}: Invalid odds for ${bookmakerName}`);
          continue;
        }

        // Find matching bookmaker (case-insensitive)
        const bookmakerIndex_inArray = customer.bookmakers.findIndex(bm => 
          bm.name.toLowerCase() === bookmakerName.toLowerCase()
        );

        if (bookmakerIndex_inArray !== -1) {
          customer.bookmakers[bookmakerIndex_inArray].odds = {
            team1: team1Odds,
            draw: drawOdds,
            team2: team2Odds
          };
          customer.bookmakers[bookmakerIndex_inArray].isActive = true;
          uploadedCount++;
        } else {
          console.warn(`Bookmaker not found: ${bookmakerName}`);
        }
      }

      setCustomers([...customers]);
      alert(`Odds uploadet for ${uploadedCount} bookmakere`);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Fejl ved parsing af CSV fil. Tjek at filen er korrekt formateret.');
    }
  };

  const downloadTemplate = () => {
    // Use Danish headers to match your CSV format
    const headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2'];
    const bookmakers = BOOKMAKERS.map(bm => [bm.name, '', '', '']);
    
    const csvContent = [
      headers.join(','),
      ...bookmakers.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'odds_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <ProtectedContent>
      <div className="max-w-3xl mx-auto mb-8 bg-blue-50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Sådan kommer du i gang:</h2>
        <ol className="space-y-3 text-blue-900">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">1</span>
            <span>Klik på "Start Ny Beregning" og indtast dit navn samt navnene på de to hold du vil beregne odds for.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">2</span>
            <span>Indtast odds fra forskellige bookmakere. Du kan enten:
              <ul className="ml-9 mt-2 space-y-1 list-disc text-blue-800">
                <li>Indtaste odds manuelt for hver bookmaker</li>
                <li>Downloade vores CSV-skabelon, udfylde den og uploade den igen</li>
              </ul>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">3</span>
            <span>Brug toggle-knapperne ved siden af hver bookmaker for at vælge hvilke bookmakere der skal indgå i beregningen.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">4</span>
            <span>Klik på "Find Bedste Arbitrage Mulighed" for at se den optimale fordeling af indsatser.</span>
          </li>
        </ol>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-blue-800 font-medium">💡 Tips:</p>
          <ul className="mt-2 space-y-1 list-disc ml-5 text-blue-800">
            <li>Jo flere bookmakere du inkluderer, jo større chance er der for at finde en god arbitrage mulighed</li>
            <li>Sørg for at odds er indtastet korrekt - selv små fejl kan påvirke resultatet</li>
            <li>Hold øje med minimum odds kravene for hver bookmaker</li>
          </ul>
        </div>
      </div>
      
      {/* Customer Selector */}
      <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
        {customers.length === 0 ? (
          <div className="text-center py-4">
            <button 
              onClick={() => setShowCustomerForm(true)}
              className="btn-primary"
            >
              Start Ny Beregning
            </button>
            <p className="text-gray-600 mt-2">Tryk på knappen ovenfor for at starte en ny beregning</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select 
                  value={currentCustomerId || ''} 
                  onChange={(e) => switchCustomer(e.target.value)}
                  className="input-field max-w-xs"
                >
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowCustomerForm(true)}
                  className="btn-secondary"
                >
                  Tilføj ny kunde
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Bet Type:</label>
                <select 
                  value={currentBetType} 
                  onChange={(e) => switchBetType(e.target.value as 'qualifying' | 'bonus')}
                  className="input-field"
                >
                  <option value="qualifying">Bet 1 (Kvalificerende)</option>
                  <option value="bonus">Bet 2 (Bonus og Freebets)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Indtast navn på hold 1"
                  value={getCurrentCustomer()?.teamNames?.team1 || ''}
                  onChange={(e) => {
                    const customer = getCurrentCustomer();
                    if (customer && customer.teamNames) {
                      customer.teamNames.team1 = e.target.value;
                      setCustomers([...customers]);
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Indtast navn på hold 2"
                  value={getCurrentCustomer()?.teamNames?.team2 || ''}
                  onChange={(e) => {
                    const customer = getCurrentCustomer();
                    if (customer && customer.teamNames) {
                      customer.teamNames.team2 = e.target.value;
                      setCustomers([...customers]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Customer Form Modal */}
        {showCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Ny Beregning</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kundenavn</label>
                  <input 
                    type="text" 
                    className="input-field w-full" 
                    placeholder="Indtast kundens navn"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      placeholder="Indtast navn på hold 1"
                      value={team1Name}
                      onChange={(e) => setTeam1Name(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      placeholder="Indtast navn på hold 2"
                      value={team2Name}
                      onChange={(e) => setTeam2Name(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    onClick={() => setShowCustomerForm(false)}
                    className="btn-secondary"
                  >
                    Annuller
                  </button>
                  <button 
                    onClick={addCustomer}
                    className="btn-primary"
                  >
                    Fortsæt til odds
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Odds input */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Bookmaker Odds</h2>
                <p className="text-sm text-gray-600 mt-1">Indtast odds for hver bookmaker</p>
              </div>
              <div className="flex gap-3">
                <label className="btn-secondary flex items-center gap-2 cursor-pointer">
                  <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleCsvUpload}
                    className="hidden"
                  />
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                  Upload CSV
                </label>
                <button 
                  className="btn-secondary flex items-center gap-2"
                  onClick={downloadTemplate}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Download Skabelon
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {getCurrentCustomer() ? (
                <div className="space-y-4">
                  {getCurrentCustomer()!.bookmakers.map((bookmaker, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{bookmaker.name}</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={bookmaker.isActive}
                                onChange={(e) => {
                                  const customer = getCurrentCustomer();
                                  if (customer) {
                                    customer.bookmakers[index].isActive = e.target.checked;
                                    setCustomers([...customers]);
                                  }
                                }}
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-600">
                            Min. odds: {bookmaker.minOdds} | Indsats: {bookmaker.fixedStake} DKK
                          </p>
                          {bookmaker.bonusType !== 'none' && (
                            <div className="mt-1">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${
                                  bookmaker.bonusType === 'freebet' ? 'bg-green-100 text-green-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {bookmaker.bonusType === 'freebet' ? 'Freebet' : 'Matching Bonus'}: 
                                  {bookmaker.bonusAmount} DKK
                                  {bookmaker.isBonusLocked ? ' 🔒' : ' ✓'}
                                  {bookmaker.bonusOnlyIfLost ? ' (kun hvis tabt)' : ''}
                                </span>
                                {currentBetType === 'bonus' && (
                                  <label className="flex items-center gap-1">
                                    <input 
                                      type="checkbox" 
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={bookmaker.usedInBet1 || false}
                                      onChange={(e) => {
                                        const customer = getCurrentCustomer();
                                        if (customer) {
                                          customer.bookmakers[index].usedInBet1 = e.target.checked;
                                          setCustomers([...customers]);
                                        }
                                      }}
                                    />
                                    <span className="text-sm text-gray-600">Brugt i Bet 1</span>
                                  </label>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Kræver {bookmaker.qualifyingBetAmount} DKK kvalificerende bet med min. odds {bookmaker.bonusMinOdds}
                                {bookmaker.bonusOnlyIfLost ? ' - Bonus kun hvis kvalificerende bet tabes (spil på underdog)' : ''}
                              </p>
                              
                              {/* Bet 2 specific fields */}
                              {currentBetType === 'bonus' && (
                                <div className="mt-2">
                                  {bookmaker.bonusType === 'matchingBonus' && (
                                    <div className="flex items-center gap-2">
                                      <label className="text-sm text-gray-600">Saldo fra Bet 1:</label>
                                      <input 
                                        type="number" 
                                        className="input-field w-32" 
                                        value={bookmaker.bet1Balance || ''}
                                        placeholder="DKK"
                                        disabled={!bookmaker.usedInBet1}
                                        onChange={(e) => {
                                          const customer = getCurrentCustomer();
                                          if (customer) {
                                            customer.bookmakers[index].bet1Balance = parseFloat(e.target.value) || 0;
                                            setCustomers([...customers]);
                                          }
                                        }}
                                      />
                                    </div>
                                  )}
                                  
                                  {bookmaker.bonusType === 'freebet' && (
                                    <div className="space-y-2">
                                      {bookmaker.bonusOnlyIfLost && (
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-600">Bet 1 resultat:</label>
                                            <div className="flex items-center gap-2">
                                              <label className="flex items-center gap-1">
                                                <input 
                                                  type="radio" 
                                                  name={`${bookmaker.name}-bet1-result`}
                                                  value="lost"
                                                  className="form-radio h-4 w-4 text-red-600"
                                                  checked={bookmaker.bet1Lost === true}
                                                  onChange={() => {
                                                    const customer = getCurrentCustomer();
                                                    if (customer) {
                                                      customer.bookmakers[index].bet1Lost = true;
                                                      setCustomers([...customers]);
                                                    }
                                                  }}
                                                />
                                                <span className="text-sm text-red-600">Tabt</span>
                                              </label>
                                              <label className="flex items-center gap-1">
                                                <input 
                                                  type="radio" 
                                                  name={`${bookmaker.name}-bet1-result`}
                                                  value="won"
                                                  className="form-radio h-4 w-4 text-green-600"
                                                  checked={bookmaker.bet1Lost === false}
                                                  onChange={() => {
                                                    const customer = getCurrentCustomer();
                                                    if (customer) {
                                                      customer.bookmakers[index].bet1Lost = false;
                                                      setCustomers([...customers]);
                                                    }
                                                  }}
                                                />
                                                <span className="text-sm text-green-600">Vundet</span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                                            <strong>💡 Freebet betingelse:</strong> 
                                            <span className="ml-1">
                                              {bookmaker.bet1Lost === true ? 
                                                <span className="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span> : 
                                                bookmaker.bet1Lost === false ? 
                                                  <span className="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span> :
                                                  <span className="text-gray-500">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Gevinst fra Bet 1:</label>
                                        <input 
                                          type="number" 
                                          className="input-field w-32" 
                                          value={bookmaker.bet1Profit || ''}
                                          placeholder="DKK"
                                          onChange={(e) => {
                                            const customer = getCurrentCustomer();
                                            if (customer) {
                                              customer.bookmakers[index].bet1Profit = parseFloat(e.target.value) || 0;
                                              setCustomers([...customers]);
                                            }
                                          }}
                                        />
                                        <div className="text-xs text-gray-500 ml-2">
                                          {bookmaker.usedInBet1 ? `(Freebet: ${bookmaker.bonusAmount} DKK)` : '(Ikke brugt i Bet 1)'}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.team1 || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.team1 = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Uafgjort</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.draw || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.draw = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.team2 || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.team2 = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Opret en kunde for at indtaste odds
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                className="btn-primary flex items-center justify-center gap-2"
                onClick={calculateArbitrage}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                Find Bedste Arbitrage Mulighed
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Results */}
        <div className="lg:w-1/2">
          {lastCalculatedResult ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Arbitrage Muligheder</h2>
                  <p className="text-sm text-gray-600 mt-1">Beregnede indsatser og potentielle gevinster</p>
                </div>
                <button
                  onClick={handleSaveCalculation}
                  disabled={saveStatus === 'saving'}
                  className={`btn-secondary ${
                    saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                    saveStatus === 'error' ? 'bg-red-100 text-red-800' :
                    saveStatus === 'saving' ? 'opacity-50' : ''
                  }`}
                >
                  {saveStatus === 'saving' ? 'Saving...' :
                   saveStatus === 'saved' ? 'Saved!' :
                   saveStatus === 'error' ? 'Error' :
                   'Save Calculation'}
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className={`font-semibold text-lg mb-2 ${
                      lastCalculatedResult.isArbitrage ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {lastCalculatedResult.isArbitrage ? '✓ Arbitrage mulighed!' : '✗ Ingen arbitrage'}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total indsats:</span>
                        <span className="font-medium">{lastCalculatedResult.totalStake.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Faktisk omkostning:</span>
                        <span className="font-medium">{lastCalculatedResult.totalActualCost.toLocaleString('da-DK')} DKK</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Potentielle gevinster:</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hold 1:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.team1.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Uafgjort:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.draw.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hold 2:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.team2.toLocaleString('da-DK')} DKK</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Garanteret profit:</span>
                    <span className={`text-lg font-bold ${
                      lastCalculatedResult.isArbitrage ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {lastCalculatedResult.profit.toLocaleString('da-DK')} DKK ({lastCalculatedResult.profitPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Bookmaker Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bookmaker</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {getCurrentCustomer()?.teamNames?.team1 || 'Hold 1'}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uafgjort</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {getCurrentCustomer()?.teamNames?.team2 || 'Hold 2'}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Indsats</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gevinst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastCalculatedResult.allBookmakers.map((bm: any, index: number) => {
                      // Calculate potential win based on betType
                      const potentialWin = bm.betType === 'team1' ? bm.team1Odds * bm.fixedStake :
                                          bm.betType === 'draw' ? bm.drawOdds * bm.fixedStake :
                                          bm.team2Odds * bm.fixedStake;

                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{bm.name}</div>
                            {bm.actualCost !== bm.fixedStake && (
                              <div className="text-xs text-green-600">Med bonus</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {bm.team1Odds.toFixed(2)}
                              {bm.betType === 'team1' && (
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  Spil på {getCurrentCustomer()?.teamNames?.team1 || 'Hold 1'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {bm.drawOdds.toFixed(2)}
                              {bm.betType === 'draw' && (
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  Spil på Uafgjort
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {bm.team2Odds.toFixed(2)}
                              {bm.betType === 'team2' && (
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  Spil på {getCurrentCustomer()?.teamNames?.team2 || 'Hold 2'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="font-medium">{bm.fixedStake.toLocaleString('da-DK')} DKK</div>
                            {bm.actualCost !== bm.fixedStake && (
                              <div className="text-xs text-green-600">{bm.actualCost.toLocaleString('da-DK')} DKK</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="font-medium text-green-600">{potentialWin.toLocaleString('da-DK')} DKK</div>
                            {bm.actualCost !== bm.fixedStake && (
                              <div className="text-xs text-green-600">
                                Profit: {(potentialWin - bm.actualCost).toLocaleString('da-DK')} DKK
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    
                    {/* Total row */}
                    <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.team1.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.draw.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.team2.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">
                        <div>{lastCalculatedResult.totalStake.toLocaleString('da-DK')} DKK</div>
                        <div className="text-sm text-gray-600">{lastCalculatedResult.totalActualCost.toLocaleString('da-DK')} DKK</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="text-green-600">
                          Min: {Math.min(
                            lastCalculatedResult.potentialReturns.team1,
                            lastCalculatedResult.potentialReturns.draw,
                            lastCalculatedResult.potentialReturns.team2
                          ).toLocaleString('da-DK')} DKK
                        </div>
                        <div className="text-sm text-green-600">
                          Max: {Math.max(
                            lastCalculatedResult.potentialReturns.team1,
                            lastCalculatedResult.potentialReturns.draw,
                            lastCalculatedResult.potentialReturns.team2
                          ).toLocaleString('da-DK')} DKK
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingen beregninger endnu</h3>
              <p className="text-gray-600">Indtast odds og tryk på "Find Bedste Arbitrage Mulighed" for at se resultater</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedContent>
  );
}
