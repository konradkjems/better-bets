// Calculator module for React integration

export interface BookmakerInfo {
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

export interface TeamNames {
    team1: string;
    team2: string;
}

export interface BookmakerOdds {
    name: string;
    team1: number;
    draw: number;
    team2: number;
    fixedStake: number;
    actualCost: number;
    minOdds: number;
    preferLoss?: boolean;
    avoidWin?: boolean;
    isActive: boolean;
    betType?: 'team1' | 'draw' | 'team2';
    originalOdds?: {
        team1: number;
        draw: number;
        team2: number;
    };
    favoritType?: 'team1' | 'team2';
    underdogType?: 'team1' | 'team2';
    returns?: {
        team1: number;
        draw: number;
        team2: number;
    };
}

export interface Customer {
    id: string;
    name: string;
    bookmakers: BookmakerInfo[];
    teamNames?: TeamNames;
    betType: 'qualifying' | 'bonus';
}

export interface ArbitrageResult {
    allBookmakers: {
        name: string;
        team1Odds: number;
        drawOdds: number;
        team2Odds: number;
        fixedStake: number;
        actualCost: number;
        minOdds: number;
        betType: 'team1' | 'draw' | 'team2';
        potentialReturn: number;
    }[];
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

// Global state
let customers: Customer[] = [];
let currentCustomerId: string | null = null;
let currentBetType: 'qualifying' | 'bonus' = 'qualifying';
let lastCalculatedResult: ArbitrageResult | null = null;

export function getCurrentCustomer(): Customer {
    return customers.find(c => c.id === currentCustomerId) || customers[0];
}

export function generateBookmakerId(bookmakerName: string): string {
    return bookmakerName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// Core arbitrage calculation function
export function calculateArbitrage(oddsData: BookmakerOdds[], customer: Customer): ArbitrageResult {
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
        team1: [] as BookmakerOdds[],
        draw: [] as BookmakerOdds[],
        team2: [] as BookmakerOdds[],
        deviation: Infinity
    };

    // Funktion til at evaluere en distribution
    const evaluateDistribution = (team1: BookmakerOdds[], draw: BookmakerOdds[], team2: BookmakerOdds[]): number => {
        const calculateReturnForBet = (bm: BookmakerOdds, odds: number) => {
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
    const tryDistribution = (remaining: typeof bookmakerReturns, team1: BookmakerOdds[], draw: BookmakerOdds[], team2: BookmakerOdds[]) => {
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
        let priorities: Array<{ type: 'team1' | 'draw' | 'team2'; need: number; odds: number; current: BookmakerOdds[] }> = [];
        
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
}

// Utility function to gather odds data from customer bookmakers
export function gatherOddsData(customer: Customer): BookmakerOdds[] {
    const isBet2 = customer.betType === 'bonus';

    return customer.bookmakers.map(bookmaker => {
        const odds = bookmaker.odds || { team1: 0, draw: 0, team2: 0 };

        // Bestem stake og actual cost baseret på bet type og bonus type
        let stake = bookmaker.fixedStake;
        let actualCost = bookmaker.actualCost;

        if (isBet2) {
            if (!bookmaker.usedInBet1) {
                // Hvis siden ikke blev brugt i Bet 1, skal den ikke inkluderes
                stake = 0;
                actualCost = 0;
            } else if (bookmaker.bonusType === 'matchingBonus') {
                // For matching bonus, brug den indtastede saldo
                stake = bookmaker.bet1Balance || 0;
                // Actual cost skal være lig med den oprindelige indbetaling, uanset saldo
                actualCost = bookmaker.qualifyingBetAmount || 0;
            } else if (bookmaker.bonusType === 'freebet') {
                // For freebets, tjek om bonus er tilgængelig
                if (bookmaker.bonusOnlyIfLost && bookmaker.bet1Lost === false) {
                    // Hvis bonus kun gives ved tab, men vi vandt, så ingen bonus
                    stake = 0;
                    actualCost = 0;
                } else {
                    // For freebets, brug bonus beløbet
                    stake = bookmaker.bonusAmount || 0;
                    // Actual cost skal være lig med freebet beløbet
                    actualCost = bookmaker.bonusAmount || 0;
                }
            }
        }

        // Marker odds under minimum ved at sætte dem til 0
        const validTeam1 = odds.team1 >= bookmaker.minOdds ? odds.team1 : 0;
        const validDraw = odds.draw >= bookmaker.minOdds ? odds.draw : 0;
        const validTeam2 = odds.team2 >= bookmaker.minOdds ? odds.team2 : 0;

        return {
            name: bookmaker.name,
            fixedStake: stake,  // Brug den beregnede stake
            actualCost: actualCost,  // Brug den beregnede actual cost
            minOdds: bookmaker.minOdds,
            preferLoss: bookmaker.preferLoss,
            avoidWin: bookmaker.avoidWin,
            isActive: bookmaker.isActive,
            team1: validTeam1,
            draw: validDraw,
            team2: validTeam2,
            originalOdds: {
                team1: odds.team1,
                draw: odds.draw,
                team2: odds.team2
            }
        };
    }).filter(odds => {
        // I Bet 2, tjek også at der er en gyldig stake og at siden blev brugt i Bet 1
        const hasValidStake = !isBet2 || odds.fixedStake > 0;
        const isUsedInBet2 = !isBet2 || customer.bookmakers.find(b => b.name === odds.name)?.usedInBet1;
        // Tjek at mindst ét gyldigt odds er indtastet og at bookmakeren er aktiv
        const hasValidOdds = odds.team1 > 0 || odds.draw > 0 || odds.team2 > 0;
        return hasValidOdds && odds.isActive && hasValidStake && isUsedInBet2;
    });
}

// CSV template generation
export function generateCsvTemplate(customers: Customer[]): string {
    const bookmakers = customers.length === 0 ? BOOKMAKERS : customers[0].bookmakers;
    const headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2'];
    
    const rows = bookmakers.map(bookmaker => [bookmaker.name, '', '', '']);
    
    const csvContent = '\uFEFF' + [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\r\n');
    
    return csvContent;
}

// Parse CSV data
export function parseCsvData(csvContent: string, customer: Customer): number {
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
            throw new Error('CSV skal indeholde kolonner med bookmaker navn og odds for alle tre udfald');
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

        return uploadedCount;
    } catch (error) {
        console.error('Error parsing CSV:', error);
        throw error;
    }
}

// Save calculation function for React integration
export async function saveCalculation(calculationData: any, getToken: () => Promise<string>) {
    try {
        const token = await getToken();
        const response = await fetch('/api/calculations/save', {
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
}

// Export the main calculator functions that will be used by React
export {
    BOOKMAKERS,
    customers,
    currentCustomerId,
    currentBetType,
    lastCalculatedResult
};
