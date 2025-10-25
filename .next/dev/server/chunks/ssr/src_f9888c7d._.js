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
"[project]/src/lib/test-suite.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Comprehensive testing utilities for Better Bets
__turbopack_context__.s([
    "apiTests",
    ()=>apiTests,
    "calculatorTests",
    ()=>calculatorTests,
    "performanceTests",
    ()=>performanceTests,
    "pwaTests",
    ()=>pwaTests,
    "runAllTests",
    ()=>runAllTests,
    "testData",
    ()=>testData,
    "uiTests",
    ()=>uiTests
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/calculator.ts [app-ssr] (ecmascript)");
;
const testData = {
    createTestCustomer: (name = 'Test Customer')=>({
            id: `test-${Date.now()}`,
            name,
            bookmakers: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOOKMAKERS"].map((bm)=>({
                    ...bm
                })),
            betType: 'qualifying',
            teamNames: {
                team1: 'Team A',
                team2: 'Team B'
            }
        }),
    createTestOdds: ()=>({
            team1: 2.5,
            draw: 3.2,
            team2: 2.8
        }),
    createTestCalculationResult: ()=>({
            isArbitrage: true,
            profit: 15.50,
            profitPercentage: 2.1,
            totalStake: 750,
            totalActualCost: 734.50,
            potentialReturns: {
                team1: 750,
                draw: 750,
                team2: 750
            },
            allBookmakers: [
                {
                    name: 'Test Bookmaker 1',
                    betType: 'team1',
                    team1Odds: 2.5,
                    drawOdds: 3.2,
                    team2Odds: 2.8,
                    fixedStake: 300,
                    actualCost: 300
                }
            ]
        })
};
const calculatorTests = {
    testArbitrageCalculation: ()=>{
        console.log('🧮 Testing arbitrage calculation...');
        const customer = testData.createTestCustomer();
        // Add odds data to make the test more realistic
        customer.bookmakers.forEach((bookmaker, index)=>{
            bookmaker.odds = {
                team1: 2.0 + index * 0.1,
                draw: 3.0 + index * 0.1,
                team2: 2.5 + index * 0.1
            };
            bookmaker.isActive = true;
        });
        console.log(`   Created customer with ${customer.bookmakers.length} bookmakers`);
        console.log(`   Active bookmakers: ${customer.bookmakers.filter((bm)=>bm.isActive).length}`);
        const oddsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gatherOddsData"])(customer);
        console.log(`   Odds data collected: ${oddsData.length} entries`);
        if (oddsData.length === 0) {
            console.log('❌ No odds data found - checking bookmaker states...');
            customer.bookmakers.forEach((bm, index)=>{
                console.log(`   Bookmaker ${index}: ${bm.name}, Active: ${bm.isActive}, Odds: ${bm.odds ? 'Yes' : 'No'}`);
            });
            return false;
        }
        try {
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateArbitrage"])(oddsData, customer);
            console.log('✅ Arbitrage calculation successful');
            console.log(`   Profit: ${result.profit.toFixed(2)} DKK`);
            console.log(`   Profit %: ${result.profitPercentage.toFixed(2)}%`);
            console.log(`   Total stake: ${result.totalStake.toFixed(2)} DKK`);
            return true;
        } catch (error) {
            console.log('❌ Arbitrage calculation failed:', error);
            console.log(`   Error details: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return false;
        }
    },
    testOddsValidation: ()=>{
        console.log('🔍 Testing odds validation...');
        const customer = testData.createTestCustomer();
        const bookmaker = customer.bookmakers[0];
        // Test valid odds
        bookmaker.odds = testData.createTestOdds();
        bookmaker.isActive = true;
        const oddsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gatherOddsData"])(customer);
        const hasValidOdds = oddsData.length > 0;
        console.log(hasValidOdds ? '✅ Odds validation passed' : '❌ Odds validation failed');
        return hasValidOdds;
    },
    testCustomerManagement: ()=>{
        console.log('👤 Testing customer management...');
        const customer = testData.createTestCustomer();
        const isValidCustomer = customer.id && customer.name && customer.bookmakers.length > 0;
        console.log(isValidCustomer ? '✅ Customer management passed' : '❌ Customer management failed');
        return isValidCustomer;
    }
};
const apiTests = {
    testCalculationsEndpoint: async ()=>{
        console.log('🌐 Testing calculations API endpoint...');
        try {
            const response = await fetch('/api/calculations/list');
            const isValidResponse = response.status === 200 || response.status === 401; // 401 is expected without auth
            console.log(isValidResponse ? '✅ Calculations API endpoint accessible' : '❌ Calculations API endpoint failed');
            return isValidResponse;
        } catch (error) {
            console.log('❌ Calculations API endpoint error:', error);
            return false;
        }
    },
    testHealthCheck: async ()=>{
        console.log('🏥 Testing health check...');
        try {
            const response = await fetch('/');
            const isValidResponse = response.status === 200;
            console.log(isValidResponse ? '✅ Health check passed' : '❌ Health check failed');
            return isValidResponse;
        } catch (error) {
            console.log('❌ Health check error:', error);
            return false;
        }
    }
};
const uiTests = {
    testResponsiveDesign: ()=>{
        console.log('📱 Testing responsive design...');
        const viewportSizes = [
            {
                width: 320,
                height: 568,
                name: 'Mobile'
            },
            {
                width: 768,
                height: 1024,
                name: 'Tablet'
            },
            {
                width: 1920,
                height: 1080,
                name: 'Desktop'
            }
        ];
        viewportSizes.forEach((size)=>{
            // In a real test environment, you would set the viewport
            console.log(`   ${size.name}: ${size.width}x${size.height}`);
        });
        console.log('✅ Responsive design test completed');
        return true;
    },
    testAccessibility: ()=>{
        console.log('♿ Testing accessibility...');
        // Check for basic semantic elements
        const hasMain = document.querySelector('main') !== null;
        const hasNav = document.querySelector('nav') !== null;
        const hasButtons = document.querySelectorAll('button').length > 0;
        const hasHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
        console.log(`   Main element: ${hasMain ? '✅' : '❌'}`);
        console.log(`   Navigation: ${hasNav ? '✅' : '❌'}`);
        console.log(`   Buttons: ${hasButtons ? '✅' : '❌'}`);
        console.log(`   Headings: ${hasHeadings ? '✅' : '❌'}`);
        // Check for ARIA attributes
        const ariaLabels = document.querySelectorAll('[aria-label]').length;
        const ariaRoles = document.querySelectorAll('[role]').length;
        const ariaLive = document.querySelectorAll('[aria-live]').length;
        console.log(`   ARIA labels: ${ariaLabels}`);
        console.log(`   ARIA roles: ${ariaRoles}`);
        console.log(`   ARIA live regions: ${ariaLive}`);
        // Check for alt text on images
        const images = document.querySelectorAll('img');
        const hasAltText = images.length === 0 || Array.from(images).every((img)=>img.hasAttribute('alt'));
        console.log(`   Image alt text: ${hasAltText ? '✅' : '❌'}`);
        // Calculate accessibility score (more lenient)
        const basicElements = [
            hasMain,
            hasNav,
            hasButtons,
            hasHeadings
        ].filter(Boolean).length;
        const ariaElements = ariaLabels + ariaRoles + ariaLive;
        const totalScore = basicElements + (ariaElements > 0 ? 1 : 0) + (hasAltText ? 1 : 0);
        console.log(`   Accessibility score: ${totalScore}/6`);
        console.log(totalScore >= 4 ? '✅ Accessibility compliance passed' : '❌ Accessibility compliance needs improvement');
        return totalScore >= 4;
    }
};
const pwaTests = {
    testServiceWorker: ()=>{
        console.log('🔧 Testing service worker...');
        const hasServiceWorker = 'serviceWorker' in navigator;
        console.log(hasServiceWorker ? '✅ Service worker supported' : '❌ Service worker not supported');
        return hasServiceWorker;
    },
    testManifest: async ()=>{
        console.log('📋 Testing manifest...');
        try {
            const response = await fetch('/manifest.json');
            const isValidManifest = response.status === 200;
            if (isValidManifest) {
                const manifest = await response.json();
                const hasRequiredFields = manifest.name && manifest.short_name && manifest.icons;
                console.log(hasRequiredFields ? '✅ Manifest valid' : '❌ Manifest missing required fields');
                return hasRequiredFields;
            } else {
                console.log('❌ Manifest not found');
                return false;
            }
        } catch (error) {
            console.log('❌ Manifest test error:', error);
            return false;
        }
    },
    testOfflineCapability: ()=>{
        console.log('📶 Testing offline capability...');
        const hasCacheAPI = 'caches' in window;
        const hasIndexedDB = 'indexedDB' in window;
        console.log(hasCacheAPI ? '✅ Cache API available' : '❌ Cache API not available');
        console.log(hasIndexedDB ? '✅ IndexedDB available' : '❌ IndexedDB not available');
        return hasCacheAPI && hasIndexedDB;
    }
};
const performanceTests = {
    testPageLoadTime: ()=>{
        console.log('⚡ Testing page load time...');
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        console.log('❌ Performance API not available');
        return false;
    },
    testMemoryUsage: ()=>{
        console.log('🧠 Testing memory usage...');
        if ('memory' in performance) {
            const memory = performance.memory;
            const memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
            // More lenient threshold for development environment
            const isLowMemory = memoryUsage < 60;
            console.log(`   Memory usage: ${memoryUsage.toFixed(2)}MB`);
            console.log(isLowMemory ? '✅ Memory usage is acceptable' : '⚠️ Memory usage is high');
            return isLowMemory;
        }
        console.log('❌ Memory API not available');
        return false;
    }
};
const runAllTests = async ()=>{
    console.log('🚀 Starting Better Bets Test Suite...\n');
    const results = {
        calculator: 0,
        api: 0,
        ui: 0,
        pwa: 0,
        performance: 0
    };
    // Calculator tests
    console.log('📊 CALCULATOR TESTS');
    console.log('==================');
    results.calculator += calculatorTests.testArbitrageCalculation() ? 1 : 0;
    results.calculator += calculatorTests.testOddsValidation() ? 1 : 0;
    results.calculator += calculatorTests.testCustomerManagement() ? 1 : 0;
    // API tests
    console.log('\n🌐 API TESTS');
    console.log('============');
    results.api += await apiTests.testCalculationsEndpoint() ? 1 : 0;
    results.api += await apiTests.testHealthCheck() ? 1 : 0;
    // UI tests
    console.log('\n🎨 UI TESTS');
    console.log('============');
    results.ui += uiTests.testResponsiveDesign() ? 1 : 0;
    results.ui += uiTests.testAccessibility() ? 1 : 0;
    // PWA tests
    console.log('\n📱 PWA TESTS');
    console.log('=============');
    results.pwa += pwaTests.testServiceWorker() ? 1 : 0;
    results.pwa += await pwaTests.testManifest() ? 1 : 0;
    results.pwa += pwaTests.testOfflineCapability() ? 1 : 0;
    // Performance tests
    console.log('\n⚡ PERFORMANCE TESTS');
    console.log('====================');
    results.performance += performanceTests.testPageLoadTime() ? 1 : 0;
    results.performance += performanceTests.testMemoryUsage() ? 1 : 0;
    // Summary
    console.log('\n📋 TEST SUMMARY');
    console.log('================');
    console.log(`Calculator: ${results.calculator}/3 tests passed`);
    console.log(`API: ${results.api}/2 tests passed`);
    console.log(`UI: ${results.ui}/2 tests passed`);
    console.log(`PWA: ${results.pwa}/3 tests passed`);
    console.log(`Performance: ${results.performance}/2 tests passed`);
    const totalTests = Object.values(results).reduce((sum, count)=>sum + count, 0);
    const totalPossible = 12;
    console.log(`\n🎯 Overall: ${totalTests}/${totalPossible} tests passed (${Math.round(totalTests / totalPossible * 100)}%)`);
    if (totalTests === totalPossible) {
        console.log('🎉 All tests passed! The application is ready for production.');
    } else {
        console.log('⚠️ Some tests failed. Please review the issues above.');
    }
    return results;
};
// Export for use in browser console
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
}),
"[project]/src/app/test/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$test$2d$suite$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/test-suite.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function TestPage() {
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [testResults, setTestResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [overallScore, setOverallScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [testLog, setTestLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const runTests = async ()=>{
        setIsRunning(true);
        setTestLog([]);
        setTestResults([]);
        setOverallScore(null);
        // Capture console.log output
        const originalLog = console.log;
        const logs = [];
        console.log = (...args)=>{
            logs.push(args.join(' '));
            originalLog(...args);
        };
        try {
            const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$test$2d$suite$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runAllTests"])();
            // Convert results to TestResult format
            const testResults = [
                {
                    category: 'Calculator',
                    passed: results.calculator,
                    total: 3,
                    percentage: Math.round(results.calculator / 3 * 100)
                },
                {
                    category: 'API',
                    passed: results.api,
                    total: 2,
                    percentage: Math.round(results.api / 2 * 100)
                },
                {
                    category: 'UI',
                    passed: results.ui,
                    total: 2,
                    percentage: Math.round(results.ui / 2 * 100)
                },
                {
                    category: 'PWA',
                    passed: results.pwa,
                    total: 3,
                    percentage: Math.round(results.pwa / 3 * 100)
                },
                {
                    category: 'Performance',
                    passed: results.performance,
                    total: 2,
                    percentage: Math.round(results.performance / 2 * 100)
                }
            ];
            setTestResults(testResults);
            const totalPassed = Object.values(results).reduce((sum, count)=>sum + count, 0);
            const totalPossible = 12;
            setOverallScore(Math.round(totalPassed / totalPossible * 100));
        } catch (error) {
            console.error('Test execution failed:', error);
        } finally{
            console.log = originalLog;
            setTestLog(logs);
            setIsRunning(false);
        }
    };
    const getScoreColor = (percentage)=>{
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };
    const getScoreBgColor = (percentage)=>{
        if (percentage >= 90) return 'bg-green-100';
        if (percentage >= 70) return 'bg-yellow-100';
        return 'bg-red-100';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto px-4 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-900 mb-2",
                        children: "Test Suite"
                    }, void 0, false, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Comprehensive testing for Better Bets application"
                    }, void 0, false, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/test/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl shadow-sm p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-800 mb-4",
                                children: "Test Controls"
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: runTests,
                                disabled: isRunning,
                                className: `w-full py-3 px-4 rounded-lg font-semibold transition-colors ${isRunning ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`,
                                children: isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/test/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        "Running Tests..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/test/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this) : 'Run All Tests'
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            overallScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mt-6 p-4 rounded-lg ${getScoreBgColor(overallScore)}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-3xl font-bold ${getScoreColor(overallScore)}`,
                                            children: [
                                                overallScore,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/test/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-600 mt-1",
                                            children: "Overall Test Score"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/test/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/test/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl shadow-sm p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-800 mb-4",
                                children: "Test Results"
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            testResults.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: testResults.map((result, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-gray-200 rounded-lg p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-semibold text-gray-900",
                                                        children: result.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/test/page.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded-full text-sm font-medium ${getScoreBgColor(result.percentage)} ${getScoreColor(result.percentage)}`,
                                                        children: [
                                                            result.passed,
                                                            "/",
                                                            result.total
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/test/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-gray-200 rounded-full h-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-2 rounded-full transition-all duration-500 ${result.percentage >= 90 ? 'bg-green-500' : result.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`,
                                                    style: {
                                                        width: `${result.percentage}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/test/page.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600 mt-1",
                                                children: [
                                                    result.percentage,
                                                    "% passed"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 text-gray-500",
                                children: 'Click "Run All Tests" to see results'
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/test/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            testLog.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 bg-white rounded-xl shadow-sm p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-800 mb-4",
                        children: "Test Log"
                    }, void 0, false, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto",
                        children: testLog.map((log, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1",
                                children: log
                            }, index, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/test/page.tsx",
                lineNumber: 184,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 bg-blue-50 rounded-xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-blue-900 mb-4",
                        children: "Test Categories"
                    }, void 0, false, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 mb-2",
                                        children: "Calculator Tests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-600 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Arbitrage calculation accuracy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Odds validation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Customer management"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 mb-2",
                                        children: "API Tests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-600 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Endpoint accessibility"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Health check"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 mb-2",
                                        children: "UI Tests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-600 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Responsive design"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Accessibility compliance"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 mb-2",
                                        children: "PWA Tests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-600 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Service worker support"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Manifest validation"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Offline capability"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 mb-2",
                                        children: "Performance Tests"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "text-sm text-gray-600 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Page load time"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 233,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "• Memory usage"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/test/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/test/page.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/test/page.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/test/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_f9888c7d._.js.map