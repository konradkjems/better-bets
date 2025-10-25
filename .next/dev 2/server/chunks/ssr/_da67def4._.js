module.exports = [
"[project]/src/lib/calculator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Calculator module for React integration
__turbopack_context__.s([
    "BOOKMAKERS",
    ()=>BOOKMAKERS,
    "calculateArbitrage",
    ()=>calculateArbitrage,
    "currentBetType",
    ()=>currentBetType,
    "currentCustomerId",
    ()=>currentCustomerId,
    "customers",
    ()=>customers,
    "gatherOddsData",
    ()=>gatherOddsData,
    "generateBookmakerId",
    ()=>generateBookmakerId,
    "generateCsvTemplate",
    ()=>generateCsvTemplate,
    "getCurrentCustomer",
    ()=>getCurrentCustomer,
    "lastCalculatedResult",
    ()=>lastCalculatedResult,
    "parseCsvData",
    ()=>parseCsvData,
    "saveCalculation",
    ()=>saveCalculation
]);
const BOOKMAKERS = [
    {
        name: 'Unibet',
        fixedStake: 2000,
        hasBonus: true,
        actualCost: 1000,
        minOdds: 1.4,
        isActive: true,
        bonusType: 'matchingBonus',
        bonusAmount: 1000,
        bonusMinOdds: 1.4,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Bet365',
        fixedStake: 1000,
        hasBonus: false,
        actualCost: 1000,
        minOdds: 1.2,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 1000,
        bonusMinOdds: 1.2,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'LeoVegas',
        fixedStake: 1000,
        hasBonus: false,
        actualCost: 1000,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 1000,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: true
    },
    {
        name: 'ComeOn',
        fixedStake: 2000,
        hasBonus: true,
        actualCost: 1000,
        minOdds: 1.8,
        preferLoss: true,
        isActive: true,
        bonusType: 'matchingBonus',
        bonusAmount: 1000,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Mr Green',
        fixedStake: 300,
        hasBonus: false,
        actualCost: 300,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 300,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 300,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'NordicBet',
        fixedStake: 500,
        hasBonus: false,
        actualCost: 500,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 500,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 500,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Bwin',
        fixedStake: 1000,
        hasBonus: false,
        actualCost: 1000,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 1000,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: '888sport',
        fixedStake: 500,
        hasBonus: false,
        actualCost: 500,
        minOdds: 2.0,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 500,
        bonusMinOdds: 2.0,
        qualifyingBetAmount: 500,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Bet25',
        fixedStake: 250,
        hasBonus: false,
        actualCost: 250,
        minOdds: 1.95,
        isActive: true,
        bonusType: 'matchingBonus',
        bonusAmount: 250,
        bonusMinOdds: 1.95,
        qualifyingBetAmount: 250,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Expekt',
        fixedStake: 1000,
        hasBonus: false,
        actualCost: 1000,
        minOdds: 1.5,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 1000,
        bonusMinOdds: 1.5,
        qualifyingBetAmount: 1000,
        usedInBet1: true,
        bonusOnlyIfLost: true
    },
    {
        name: 'Cashpoint',
        fixedStake: 500,
        hasBonus: false,
        actualCost: 500,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 500,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 500,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Jackpotbet',
        fixedStake: 500,
        hasBonus: false,
        actualCost: 500,
        minOdds: 1.5,
        isActive: true,
        bonusType: 'matchingBonus',
        bonusAmount: 500,
        bonusMinOdds: 1.5,
        qualifyingBetAmount: 500,
        usedInBet1: true,
        bonusOnlyIfLost: false
    },
    {
        name: 'Getlucky',
        fixedStake: 100,
        hasBonus: false,
        actualCost: 100,
        minOdds: 1.8,
        isActive: true,
        bonusType: 'freebet',
        bonusAmount: 100,
        bonusMinOdds: 1.8,
        qualifyingBetAmount: 100,
        usedInBet1: true,
        bonusOnlyIfLost: false
    }
];
// Global state
let customers = [];
let currentCustomerId = null;
let currentBetType = 'qualifying';
let lastCalculatedResult = null;
function getCurrentCustomer() {
    return customers.find((c)=>c.id === currentCustomerId) || customers[0];
}
function generateBookmakerId(bookmakerName) {
    return bookmakerName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}
function calculateArbitrage(oddsData, customer) {
    const isQualifyingBet = customer.betType === 'qualifying';
    // Beregn potentielle returns for hver bookmaker for hvert udfald
    const bookmakerReturns = oddsData.map((bm)=>{
        const bookmakerInfo = customer.bookmakers.find((b)=>b.name === bm.name);
        // Opdater calculateReturn til at tjekke for freebet uafhængigt af betType
        const calculateReturn = (odds, stake, isFreebet)=>{
            if (isFreebet) {
                return (odds - 1) * stake; // Kun gevinst, ikke indsats tilbage for freebets
            }
            return odds * stake; // Normal beregning
        };
        // Find det laveste odds (favorit) for denne bookmaker
        const team1Odds = bm.team1 || Infinity;
        const team2Odds = bm.team2 || Infinity;
        const favoritType = team1Odds <= team2Odds ? 'team1' : 'team2';
        const underdogType = team1Odds <= team2Odds ? 'team2' : 'team1';
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
    const totalPossibleReturn = bookmakerReturns.reduce((sum, bm)=>sum + (bm.returns?.team1 || 0) + (bm.returns?.draw || 0) + (bm.returns?.team2 || 0), 0);
    const targetReturnPerOutcome = totalPossibleReturn / 3;
    let bestDistribution = {
        team1: [],
        draw: [],
        team2: [],
        deviation: Infinity
    };
    // Funktion til at evaluere en distribution
    const evaluateDistribution = (team1, draw, team2)=>{
        const calculateReturnForBet = (bm, odds)=>{
            const bookmakerInfo = customer.bookmakers.find((b)=>b.name === bm.name);
            if (!isQualifyingBet && bookmakerInfo?.bonusType === 'freebet') {
                return (odds - 1) * bm.fixedStake;
            }
            return odds * bm.fixedStake;
        };
        const team1Return = team1.reduce((sum, bm)=>sum + calculateReturnForBet(bm, bm.team1), 0);
        const drawReturn = draw.reduce((sum, bm)=>sum + calculateReturnForBet(bm, bm.draw), 0);
        const team2Return = team2.reduce((sum, bm)=>sum + calculateReturnForBet(bm, bm.team2), 0);
        // Beregn afvigelse fra target
        const maxReturn = Math.max(team1Return, drawReturn, team2Return);
        const minReturn = Math.min(team1Return, drawReturn, team2Return);
        const avgReturn = (team1Return + drawReturn + team2Return) / 3;
        // Straf større afvigelser hårdere ved at kvadrere forskellen
        const baseDeviation = Math.pow(maxReturn - minReturn, 2) + Math.pow(Math.abs(team1Return - avgReturn), 2) + Math.pow(Math.abs(drawReturn - avgReturn), 2) + Math.pow(Math.abs(team2Return - avgReturn), 2);
        let penalty = 0;
        // Specialregler for kvalificerende bets
        if (isQualifyingBet) {
            // Tæl "kun hvis tab"-freebets på hvert udfald
            const bonusOnlyIfLostFreebets = [
                ...team1,
                ...draw,
                ...team2
            ].filter((bm)=>{
                const bookmakerInfo = customer.bookmakers.find((b)=>b.name === bm.name);
                return bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet';
            });
            const team1BonusOnlyIfLost = bonusOnlyIfLostFreebets.filter((bm)=>bm.betType === 'team1').length;
            const drawBonusOnlyIfLost = bonusOnlyIfLostFreebets.filter((bm)=>bm.betType === 'draw').length;
            const team2BonusOnlyIfLost = bonusOnlyIfLostFreebets.filter((bm)=>bm.betType === 'team2').length;
            // Straf hvis "kun hvis tab"-freebets ikke er balanceret fordelt
            const totalBonusOnlyIfLost = team1BonusOnlyIfLost + drawBonusOnlyIfLost + team2BonusOnlyIfLost;
            if (totalBonusOnlyIfLost > 0) {
                const idealPerOutcome = totalBonusOnlyIfLost / 3;
                const deviation = Math.abs(team1BonusOnlyIfLost - idealPerOutcome) + Math.abs(drawBonusOnlyIfLost - idealPerOutcome) + Math.abs(team2BonusOnlyIfLost - idealPerOutcome);
                penalty += deviation * 10000; // Stor straf for ubalanceret fordeling
            }
            [
                ...team1,
                ...draw,
                ...team2
            ].forEach((bm)=>{
                const bookmakerInfo = customer.bookmakers.find((b)=>b.name === bm.name);
                // Straf hvis vi bruger en bookmaker uden bonus i kvalificerende fase
                if (!bookmakerInfo?.bonusType || bookmakerInfo.bonusType === 'none') {
                    penalty += 5000;
                }
                // Tjek om odds er over minimum for bonus
                if (bookmakerInfo?.bonusMinOdds) {
                    const placedOdds = bm.betType === 'team1' ? bm.team1 : bm.betType === 'draw' ? bm.draw : bm.team2;
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
            [
                ...team1,
                ...draw,
                ...team2
            ].forEach((bm)=>{
                const bookmakerInfo = customer.bookmakers.find((b)=>b.name === bm.name);
                // For freebets vil vi gerne have højere odds for at maksimere gevinst
                // men stadig holde det balanceret
                if (bookmakerInfo?.bonusType === 'freebet') {
                    const placedOdds = bm.betType === 'team1' ? bm.team1 : bm.betType === 'draw' ? bm.draw : bm.team2;
                    // Mindre aggressiv bonus for højere odds
                    penalty -= (placedOdds - bookmakerInfo.minOdds) * 100;
                }
                // Straf for meget ubalancerede returns i Bet 2
                const returnSpread = maxReturn - minReturn;
                if (returnSpread > avgReturn * 0.1) {
                    penalty += Math.pow(returnSpread, 2);
                }
            });
        }
        // Generelle regler for alle typer bets
        const comeOnBet = [
            ...team1,
            ...draw,
            ...team2
        ].find((bm)=>bm.name === 'ComeOn');
        if (comeOnBet) {
            const comeOnData = bookmakerReturns.find((bm)=>bm.name === 'ComeOn');
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
    const tryDistribution = (remaining, team1, draw, team2)=>{
        if (remaining.length === 0) {
            const deviation = evaluateDistribution(team1, draw, team2);
            if (deviation < bestDistribution.deviation) {
                bestDistribution = {
                    team1,
                    draw,
                    team2,
                    deviation
                };
            }
            return;
        }
        const [current, ...rest] = remaining;
        // Beregn nuværende returns for hver gruppe
        const currentTeam1 = team1.reduce((sum, bm)=>sum + bm.team1 * bm.fixedStake, 0);
        const currentDraw = draw.reduce((sum, bm)=>sum + bm.draw * bm.fixedStake, 0);
        const currentTeam2 = team2.reduce((sum, bm)=>sum + bm.team2 * bm.fixedStake, 0);
        // Specialhåndtering for ComeOn - skal altid på det modsatte hold af favoritten
        if (current.name === 'ComeOn') {
            const team1Odds = current.team1 || Infinity;
            const team2Odds = current.team2 || Infinity;
            // Find ud af hvilket hold der er favoritten (laveste odds)
            const favoritType = team1Odds <= team2Odds ? 'team1' : 'team2';
            // Placer ComeOn på det modsatte hold af favoritten
            if (favoritType === 'team1' && current.team2 > 0) {
                tryDistribution(rest, team1, draw, [
                    ...team2,
                    current
                ]);
            } else if (favoritType === 'team2' && current.team1 > 0) {
                tryDistribution(rest, [
                    ...team1,
                    current
                ], draw, team2);
            }
            return;
        }
        // Prioriter placering baseret på bookmaker præferencer
        let priorities = [];
        // Specialhåndtering for "kun hvis tab"-freebets i kvalificerende bets
        if (isQualifyingBet) {
            const bookmakerInfo = customer.bookmakers.find((b)=>b.name === current.name);
            if (bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet') {
                // Tæl hvor mange "kun hvis tab"-freebets der allerede er på hvert udfald
                const existingBonusOnlyIfLost = [
                    ...team1,
                    ...draw,
                    ...team2
                ].filter((bm)=>{
                    const bmInfo = customer.bookmakers.find((b)=>b.name === bm.name);
                    return bmInfo?.bonusOnlyIfLost && bmInfo.bonusType === 'freebet';
                });
                const team1Count = existingBonusOnlyIfLost.filter((bm)=>bm.betType === 'team1').length;
                const drawCount = existingBonusOnlyIfLost.filter((bm)=>bm.betType === 'draw').length;
                const team2Count = existingBonusOnlyIfLost.filter((bm)=>bm.betType === 'team2').length;
                // Prioriter det udfald der har færrest "kun hvis tab"-freebets
                priorities = [
                    {
                        type: 'team1',
                        need: -team1Count,
                        odds: current.team1,
                        current: team1
                    },
                    {
                        type: 'draw',
                        need: -drawCount,
                        odds: current.draw,
                        current: draw
                    },
                    {
                        type: 'team2',
                        need: -team2Count,
                        odds: current.team2,
                        current: team2
                    }
                ].filter((p)=>p.odds > 0) // Fjern muligheder hvor odds er 0
                .sort((a, b)=>a.need - b.need); // Laveste count først
            }
        }
        // Hvis der ikke er sat nogen prioriteter endnu, brug standard logik
        if (priorities.length === 0) {
            if (current.preferLoss) {
                // For bookmakere der foretrækker tab, placer dem hvor der er lavest return
                priorities = [
                    {
                        type: 'team1',
                        need: -currentTeam1,
                        odds: current.team1,
                        current: team1
                    },
                    {
                        type: 'draw',
                        need: -currentDraw,
                        odds: current.draw,
                        current: draw
                    },
                    {
                        type: 'team2',
                        need: -currentTeam2,
                        odds: current.team2,
                        current: team2
                    }
                ].filter((p)=>p.odds > 0) // Fjern muligheder hvor odds er 0
                .sort((a, b)=>a.need - b.need);
            } else {
                // For normale bookmakere, placer dem hvor der er størst behov
                priorities = [
                    {
                        type: 'team1',
                        need: targetReturnPerOutcome - currentTeam1,
                        odds: current.team1,
                        current: team1
                    },
                    {
                        type: 'draw',
                        need: targetReturnPerOutcome - currentDraw,
                        odds: current.draw,
                        current: draw
                    },
                    {
                        type: 'team2',
                        need: targetReturnPerOutcome - currentTeam2,
                        odds: current.team2,
                        current: team2
                    }
                ].filter((p)=>p.odds > 0) // Fjern muligheder hvor odds er 0
                .sort((a, b)=>b.need - a.need);
            }
        }
        // Hvis der ikke er nogen gyldige muligheder, spring denne bookmaker over
        if (priorities.length === 0) return;
        // Prøv fordelingerne i prioriteret rækkefølge
        for (const group of priorities){
            if (group.type === 'team1') {
                tryDistribution(rest, [
                    ...team1,
                    current
                ], draw, team2);
            } else if (group.type === 'draw') {
                tryDistribution(rest, team1, [
                    ...draw,
                    current
                ], team2);
            } else {
                tryDistribution(rest, team1, draw, [
                    ...team2,
                    current
                ]);
            }
        }
    };
    tryDistribution(bookmakerReturns, [], [], []);
    // Konverter den bedste fordeling til det forventede format
    const allBookmakers = oddsData.map((bm)=>{
        let betType;
        let potentialReturn;
        if (bestDistribution.team1.find((b)=>b.name === bm.name)) {
            betType = 'team1';
            potentialReturn = bm.team1 * bm.fixedStake;
        } else if (bestDistribution.draw.find((b)=>b.name === bm.name)) {
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
    const totalStake = allBookmakers.reduce((sum, bm)=>sum + bm.fixedStake, 0);
    const totalActualCost = allBookmakers.reduce((sum, bm)=>sum + bm.actualCost, 0);
    const potentialReturns = {
        team1: allBookmakers.reduce((sum, bm)=>sum + (bm.betType === 'team1' ? bm.potentialReturn : 0), 0),
        draw: allBookmakers.reduce((sum, bm)=>sum + (bm.betType === 'draw' ? bm.potentialReturn : 0), 0),
        team2: allBookmakers.reduce((sum, bm)=>sum + (bm.betType === 'team2' ? bm.potentialReturn : 0), 0)
    };
    const minReturn = Math.min(potentialReturns.team1, potentialReturns.draw, potentialReturns.team2);
    const profit = minReturn - totalActualCost;
    const profitPercentage = profit / totalActualCost * 100;
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
function gatherOddsData(customer) {
    const isBet2 = customer.betType === 'bonus';
    return customer.bookmakers.map((bookmaker)=>{
        const odds = bookmaker.odds || {
            team1: 0,
            draw: 0,
            team2: 0
        };
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
            fixedStake: stake,
            actualCost: actualCost,
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
    }).filter((odds)=>{
        // I Bet 2, tjek også at der er en gyldig stake og at siden blev brugt i Bet 1
        const hasValidStake = !isBet2 || odds.fixedStake > 0;
        const isUsedInBet2 = !isBet2 || customer.bookmakers.find((b)=>b.name === odds.name)?.usedInBet1;
        // Tjek at mindst ét gyldigt odds er indtastet og at bookmakeren er aktiv
        const hasValidOdds = odds.team1 > 0 || odds.draw > 0 || odds.team2 > 0;
        return hasValidOdds && odds.isActive && hasValidStake && isUsedInBet2;
    });
}
function generateCsvTemplate(customers) {
    const bookmakers = customers.length === 0 ? BOOKMAKERS : customers[0].bookmakers;
    const headers = [
        'Bookmaker',
        'Hold 1',
        'Uafgjort',
        'Hold 2'
    ];
    const rows = bookmakers.map((bookmaker)=>[
            bookmaker.name,
            '',
            '',
            ''
        ]);
    const csvContent = '\uFEFF' + [
        headers.join(','),
        ...rows.map((row)=>row.join(','))
    ].join('\r\n');
    return csvContent;
}
function parseCsvData(csvContent, customer) {
    try {
        const lines = csvContent.split('\n').filter((line)=>line.trim());
        const headers = lines[0].split(',').map((h)=>h.trim().toLowerCase());
        // Support both Danish and English column names
        const bookmakerIndex = headers.findIndex((h)=>h.includes('bookmaker') || h.includes('bookie') || h.includes('site'));
        const team1Index = headers.findIndex((h)=>h.includes('team1') || h.includes('hold 1') || h.includes('home'));
        const drawIndex = headers.findIndex((h)=>h.includes('draw') || h.includes('uafgjort') || h.includes('x'));
        const team2Index = headers.findIndex((h)=>h.includes('team2') || h.includes('hold 2') || h.includes('away'));
        if (bookmakerIndex === -1 || team1Index === -1 || drawIndex === -1 || team2Index === -1) {
            throw new Error('CSV skal indeholde kolonner med bookmaker navn og odds for alle tre udfald');
        }
        let uploadedCount = 0;
        // Parse data rows
        for(let i = 1; i < lines.length; i++){
            const values = lines[i].split(',').map((v)=>v.trim());
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
            const bookmakerIndex_inArray = customer.bookmakers.findIndex((bm)=>bm.name.toLowerCase() === bookmakerName.toLowerCase());
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
async function saveCalculation(calculationData, getToken) {
    try {
        const token = await getToken();
        const response = await fetch('/api/calculations/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(calculationData)
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
;
}),
"[project]/src/components/calculator/Calculator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calculator",
    ()=>Calculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__usePromisifiedAuth__as__useAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-ssr] (ecmascript) <export usePromisifiedAuth as useAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/calculator.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Calculator() {
    const { getToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__usePromisifiedAuth__as__useAuth$3e$__["useAuth"])();
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentCustomerId, setCurrentCustomerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentBetType, setCurrentBetType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('qualifying');
    const [lastCalculatedResult, setLastCalculatedResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCustomerForm, setShowCustomerForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newCustomerName, setNewCustomerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [team1Name, setTeam1Name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [team2Name, setTeam2Name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const getCurrentCustomer = ()=>{
        return customers.find((c)=>c.id === currentCustomerId) || customers[0] || null;
    };
    const addCustomer = ()=>{
        if (!newCustomerName.trim() || !team1Name.trim() || !team2Name.trim()) {
            alert('Du skal udfylde alle felter for at fortsætte');
            return;
        }
        const newId = `kunde${customers.length + 1}`;
        const newCustomer = {
            id: newId,
            name: newCustomerName,
            bookmakers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOOKMAKERS"].map((bm)=>({
                    ...bm
                })),
            teamNames: {
                team1: team1Name,
                team2: team2Name
            },
            betType: 'qualifying'
        };
        setCustomers([
            ...customers,
            newCustomer
        ]);
        setCurrentCustomerId(newId);
        setCurrentBetType('qualifying');
        setShowCustomerForm(false);
        setNewCustomerName('');
        setTeam1Name('');
        setTeam2Name('');
    };
    const calculateArbitrageHandler = ()=>{
        const customer = getCurrentCustomer();
        if (!customer) {
            alert('Vælg en kunde først');
            return;
        }
        const oddsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gatherOddsData"])(customer);
        if (oddsData.length === 0) {
            alert('Indtast odds for mindst én aktiv bookmaker');
            return;
        }
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateArbitrage"])(oddsData, customer);
        setLastCalculatedResult(result);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold text-gray-900 mb-8",
                    children: "Arbitrage Calculator"
                }, void 0, false, {
                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm p-6 mb-6",
                    children: [
                        customers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCustomerForm(true),
                                    className: "btn-primary",
                                    children: "Start Ny Beregning"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mt-2",
                                    children: "Tryk på knappen ovenfor for at starte en ny beregning"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: currentCustomerId || '',
                                                    onChange: (e)=>setCurrentCustomerId(e.target.value),
                                                    className: "input-field max-w-xs",
                                                    children: customers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: customer.id,
                                                            children: customer.name
                                                        }, customer.id, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 93,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowCustomerForm(true),
                                                    className: "btn-secondary",
                                                    children: "Tilføj ny kunde"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium text-gray-700",
                                                    children: "Bet Type:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: currentBetType,
                                                    onChange: (e)=>setCurrentBetType(e.target.value),
                                                    className: "input-field",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "qualifying",
                                                            children: "Bet 1 (Kvalificerende)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "bonus",
                                                            children: "Bet 2 (Bonus og Freebets)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Hold 1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "input-field",
                                                    placeholder: "Indtast navn på hold 1",
                                                    value: getCurrentCustomer()?.teamNames?.team1 || '',
                                                    onChange: (e)=>{
                                                        const customer = getCurrentCustomer();
                                                        if (customer && customer.teamNames) {
                                                            customer.teamNames.team1 = e.target.value;
                                                            setCustomers([
                                                                ...customers
                                                            ]);
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                    children: "Hold 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    className: "input-field",
                                                    placeholder: "Indtast navn på hold 2",
                                                    value: getCurrentCustomer()?.teamNames?.team2 || '',
                                                    onChange: (e)=>{
                                                        const customer = getCurrentCustomer();
                                                        if (customer && customer.teamNames) {
                                                            customer.teamNames.team2 = e.target.value;
                                                            setCustomers([
                                                                ...customers
                                                            ]);
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this),
                        showCustomerForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-6 w-full max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold mb-4",
                                        children: "Ny Beregning"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                        children: "Kundenavn"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        className: "input-field w-full",
                                                        placeholder: "Indtast kundens navn",
                                                        value: newCustomerName,
                                                        onChange: (e)=>setNewCustomerName(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 160,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                children: "Hold 1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                                lineNumber: 172,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: "input-field w-full",
                                                                placeholder: "Indtast navn på hold 1",
                                                                value: team1Name,
                                                                onChange: (e)=>setTeam1Name(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                                children: "Hold 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                className: "input-field w-full",
                                                                placeholder: "Indtast navn på hold 2",
                                                                value: team2Name,
                                                                onChange: (e)=>setTeam2Name(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-end gap-2 mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowCustomerForm(false),
                                                        className: "btn-secondary",
                                                        children: "Annuller"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: addCustomer,
                                                        className: "btn-primary",
                                                        children: "Fortsæt til odds"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm p-6 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-gray-800 mb-4",
                            children: "Bookmaker Odds"
                        }, void 0, false, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: getCurrentCustomer() ? getCurrentCustomer().bookmakers.slice(0, 3).map((bookmaker, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-gray-200 rounded-lg p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-gray-800",
                                                            children: bookmaker.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: [
                                                                "Min. odds: ",
                                                                bookmaker.minOdds,
                                                                " | Indsats: ",
                                                                bookmaker.fixedStake,
                                                                " DKK"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "relative inline-flex items-center cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            className: "sr-only peer",
                                                            checked: bookmaker.isActive,
                                                            onChange: (e)=>{
                                                                const customer = getCurrentCustomer();
                                                                if (customer) {
                                                                    customer.bookmakers[index].isActive = e.target.checked;
                                                                    setCustomers([
                                                                        ...customers
                                                                    ]);
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 219,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: "Hold 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 245,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.01",
                                                            className: "input-field",
                                                            placeholder: "1.50",
                                                            value: bookmaker.odds?.team1 || '',
                                                            onChange: (e)=>{
                                                                const customer = getCurrentCustomer();
                                                                if (customer && customer.bookmakers[index].odds) {
                                                                    customer.bookmakers[index].odds.team1 = parseFloat(e.target.value) || 0;
                                                                    setCustomers([
                                                                        ...customers
                                                                    ]);
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 246,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: "Uafgjort"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.01",
                                                            className: "input-field",
                                                            placeholder: "3.20",
                                                            value: bookmaker.odds?.draw || '',
                                                            onChange: (e)=>{
                                                                const customer = getCurrentCustomer();
                                                                if (customer && customer.bookmakers[index].odds) {
                                                                    customer.bookmakers[index].odds.draw = parseFloat(e.target.value) || 0;
                                                                    setCustomers([
                                                                        ...customers
                                                                    ]);
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                                            children: "Hold 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "0.01",
                                                            className: "input-field",
                                                            placeholder: "2.80",
                                                            value: bookmaker.odds?.team2 || '',
                                                            onChange: (e)=>{
                                                                const customer = getCurrentCustomer();
                                                                if (customer && customer.bookmakers[index].odds) {
                                                                    customer.bookmakers[index].odds.team2 = parseFloat(e.target.value) || 0;
                                                                    setCustomers([
                                                                        ...customers
                                                                    ]);
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 218,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Vælg eller opret en kunde for at indtaste odds"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 300,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                lineNumber: 299,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-gray-800",
                                    children: "Beregningsresultater"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: calculateArbitrageHandler,
                                    className: "btn-primary",
                                    disabled: !getCurrentCustomer(),
                                    children: "Find Bedste Arbitrage Mulighed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this),
                        lastCalculatedResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-800 mb-3",
                                        children: "Sammenfatning"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                        lineNumber: 322,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Total Indsats:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold ml-2",
                                                        children: [
                                                            lastCalculatedResult.totalStake.toFixed(2),
                                                            " DKK"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Faktisk Omkostning:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold ml-2",
                                                        children: [
                                                            lastCalculatedResult.totalActualCost.toFixed(2),
                                                            " DKK"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Profit:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-semibold ml-2 ${lastCalculatedResult.profit > 0 ? 'text-green-600' : 'text-red-600'}`,
                                                        children: [
                                                            lastCalculatedResult.profit.toFixed(2),
                                                            " DKK"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Profit %:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-semibold ml-2 ${lastCalculatedResult.profitPercentage > 0 ? 'text-green-600' : 'text-red-600'}`,
                                                        children: [
                                                            lastCalculatedResult.profitPercentage.toFixed(2),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                                lineNumber: 338,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${lastCalculatedResult.isArbitrage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`,
                                            children: lastCalculatedResult.isArbitrage ? '✓ Arbitrage Mulighed' : '✗ Ingen Arbitrage'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/calculator/Calculator.tsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                lineNumber: 321,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-gray-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: 'Klik på "Find Bedste Arbitrage Mulighed" for at se resultater'
                            }, void 0, false, {
                                fileName: "[project]/src/components/calculator/Calculator.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/calculator/Calculator.tsx",
                            lineNumber: 357,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/calculator/Calculator.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/calculator/Calculator.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/calculator/Calculator.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-ssr] (ecmascript) <export usePromisifiedAuth as useAuth>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePromisifiedAuth"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_da67def4._.js.map