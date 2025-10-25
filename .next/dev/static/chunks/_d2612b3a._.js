(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/calculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/csv-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Enhanced CSV utilities for Better Bets
__turbopack_context__.s([
    "downloadCsvFile",
    ()=>downloadCsvFile,
    "exportCalculationResults",
    ()=>exportCalculationResults,
    "generateCsvTemplate",
    ()=>generateCsvTemplate,
    "parseCsvData",
    ()=>parseCsvData,
    "validateCsvFile",
    ()=>validateCsvFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/calculator.ts [app-client] (ecmascript)");
;
function generateCsvTemplate(customers, options = {}) {
    const { includeHeaders = true, includeEmptyRows = true, format = 'template', delimiter = ',' } = options;
    const bookmakers = customers.length === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BOOKMAKERS"] : customers[0].bookmakers;
    let headers;
    let rows;
    switch(format){
        case 'template':
            headers = [
                'Bookmaker',
                'Hold 1',
                'Uafgjort',
                'Hold 2',
                'Min. Odds',
                'Indsats'
            ];
            rows = bookmakers.map((bookmaker)=>[
                    bookmaker.name,
                    '',
                    '',
                    '',
                    bookmaker.minOdds.toString(),
                    bookmaker.fixedStake.toString()
                ]);
            break;
        case 'data':
            headers = [
                'Bookmaker',
                'Hold 1',
                'Uafgjort',
                'Hold 2',
                'Aktiv'
            ];
            rows = bookmakers.map((bookmaker)=>[
                    bookmaker.name,
                    bookmaker.odds?.team1?.toString() || '',
                    bookmaker.odds?.draw?.toString() || '',
                    bookmaker.odds?.team2?.toString() || '',
                    bookmaker.isActive ? 'Ja' : 'Nej'
                ]);
            break;
        case 'results':
            headers = [
                'Bookmaker',
                'Bet Type',
                'Indsats',
                'Odds',
                'Potentiel Gevinst'
            ];
            rows = bookmakers.filter((bm)=>bm.isActive && bm.odds).map((bookmaker)=>[
                    bookmaker.name,
                    'Hold 1',
                    bookmaker.fixedStake.toString(),
                    bookmaker.odds.team1.toString(),
                    (bookmaker.fixedStake * bookmaker.odds.team1).toFixed(2)
                ]);
            break;
        default:
            headers = [
                'Bookmaker',
                'Hold 1',
                'Uafgjort',
                'Hold 2'
            ];
            rows = bookmakers.map((bookmaker)=>[
                    bookmaker.name,
                    '',
                    '',
                    ''
                ]);
    }
    if (!includeEmptyRows && format === 'template') {
        rows = rows.filter((row)=>row.some((cell)=>cell.trim() !== ''));
    }
    const csvContent = '\uFEFF' + [
        ...includeHeaders ? [
            headers.join(delimiter)
        ] : [],
        ...rows.map((row)=>row.join(delimiter))
    ].join('\r\n');
    return csvContent;
}
function parseCsvData(csvContent, customer, options = {}) {
    const { delimiter = ',', skipEmptyRows = true } = options;
    const result = {
        success: false,
        importedCount: 0,
        errors: [],
        warnings: []
    };
    try {
        // Remove BOM if present
        const cleanContent = csvContent.replace(/^\uFEFF/, '');
        const lines = cleanContent.split(/\r?\n/).filter((line)=>skipEmptyRows ? line.trim() : true);
        if (lines.length < 2) {
            result.errors.push('CSV filen skal indeholde mindst en header og en datarække');
            return result;
        }
        const headers = lines[0].split(delimiter).map((h)=>h.trim().toLowerCase());
        // Support multiple column name variations
        const bookmakerIndex = headers.findIndex((h)=>h.includes('bookmaker') || h.includes('bookie') || h.includes('site') || h.includes('udbyder'));
        const team1Index = headers.findIndex((h)=>h.includes('team1') || h.includes('hold 1') || h.includes('home') || h.includes('hjemme'));
        const drawIndex = headers.findIndex((h)=>h.includes('draw') || h.includes('uafgjort') || h.includes('x') || h.includes('uafgjort'));
        const team2Index = headers.findIndex((h)=>h.includes('team2') || h.includes('hold 2') || h.includes('away') || h.includes('ude'));
        if (bookmakerIndex === -1) {
            result.errors.push('CSV skal indeholde en kolonne med bookmaker navne');
            return result;
        }
        if (team1Index === -1 || drawIndex === -1 || team2Index === -1) {
            result.errors.push('CSV skal indeholde kolonner med odds for alle tre udfald (Hold 1, Uafgjort, Hold 2)');
            return result;
        }
        // Parse data rows
        for(let i = 1; i < lines.length; i++){
            const line = lines[i].trim();
            if (!line) continue;
            const values = line.split(delimiter).map((v)=>v.trim().replace(/"/g, ''));
            if (values.length < Math.max(bookmakerIndex, team1Index, drawIndex, team2Index) + 1) {
                result.warnings.push(`Række ${i + 1}: Ufuldstændig data, springer over`);
                continue;
            }
            const bookmakerName = values[bookmakerIndex];
            if (!bookmakerName) {
                result.warnings.push(`Række ${i + 1}: Ingen bookmaker navn, springer over`);
                continue;
            }
            // Parse odds with better number handling
            const parseOdds = (oddsStr)=>{
                const cleaned = oddsStr.replace(/[^\d.,]/g, '').replace(',', '.');
                const parsed = parseFloat(cleaned);
                return isNaN(parsed) || parsed <= 0 ? null : parsed;
            };
            const team1Odds = parseOdds(values[team1Index] || '');
            const drawOdds = parseOdds(values[drawIndex] || '');
            const team2Odds = parseOdds(values[team2Index] || '');
            if (!team1Odds || !drawOdds || !team2Odds) {
                result.warnings.push(`Række ${i + 1}: Ugyldige odds for ${bookmakerName}`);
                continue;
            }
            // Find matching bookmaker (case-insensitive)
            const bookmakerIndex_inArray = customer.bookmakers.findIndex((bm)=>bm.name.toLowerCase() === bookmakerName.toLowerCase());
            if (bookmakerIndex_inArray !== -1) {
                const bookmaker = customer.bookmakers[bookmakerIndex_inArray];
                // Validate minimum odds
                if (team1Odds < bookmaker.minOdds || drawOdds < bookmaker.minOdds || team2Odds < bookmaker.minOdds) {
                    result.warnings.push(`${bookmakerName}: Odds under minimum (${bookmaker.minOdds})`);
                }
                bookmaker.odds = {
                    team1: team1Odds,
                    draw: drawOdds,
                    team2: team2Odds
                };
                bookmaker.isActive = true;
                result.importedCount++;
            } else {
                result.warnings.push(`Bookmaker ikke fundet: ${bookmakerName}`);
            }
        }
        result.success = result.importedCount > 0;
        if (result.importedCount === 0) {
            result.errors.push('Ingen gyldige odds blev importeret');
        }
    } catch (error) {
        result.errors.push(`Fejl ved parsing af CSV: ${error instanceof Error ? error.message : 'Ukendt fejl'}`);
    }
    return result;
}
function exportCalculationResults(calculationResult, customer, options = {}) {
    const { includeHeaders = true, delimiter = ',' } = options;
    const headers = [
        'Bookmaker',
        'Bet Type',
        'Odds',
        'Indsats (DKK)',
        'Faktisk Omkostning (DKK)',
        'Potentiel Gevinst (DKK)',
        'Profit (DKK)'
    ];
    const rows = calculationResult.allBookmakers.map((bm)=>{
        const betType = bm.betType === 'team1' ? 'Hold 1' : bm.betType === 'draw' ? 'Uafgjort' : 'Hold 2';
        const odds = bm.betType === 'team1' ? bm.team1Odds : bm.betType === 'draw' ? bm.drawOdds : bm.team2Odds;
        const potentialWin = bm.fixedStake * odds;
        const profit = potentialWin - bm.actualCost;
        return [
            bm.name,
            betType,
            odds.toFixed(2),
            bm.fixedStake.toFixed(2),
            bm.actualCost.toFixed(2),
            potentialWin.toFixed(2),
            profit.toFixed(2)
        ];
    });
    // Add summary row
    rows.push([
        'TOTAL',
        '',
        '',
        calculationResult.totalStake.toFixed(2),
        calculationResult.totalActualCost.toFixed(2),
        '',
        calculationResult.profit.toFixed(2)
    ]);
    const csvContent = '\uFEFF' + [
        ...includeHeaders ? [
            headers.join(delimiter)
        ] : [],
        ...rows.map((row)=>row.join(delimiter))
    ].join('\r\n');
    return csvContent;
}
function downloadCsvFile(content, filename) {
    const blob = new Blob([
        content
    ], {
        type: 'text/csv;charset=utf-8;'
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
function validateCsvFile(file) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
        return {
            valid: false,
            error: 'Filen skal være en CSV fil'
        };
    }
    if (file.size > 5 * 1024 * 1024) {
        return {
            valid: false,
            error: 'Filen er for stor (max 5MB)'
        };
    }
    if (file.size === 0) {
        return {
            valid: false,
            error: 'Filen er tom'
        };
    }
    return {
        valid: true
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/history/EnhancedCalculationHistory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EnhancedCalculationHistory",
    ()=>EnhancedCalculationHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__usePromisifiedAuth__as__useAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript) <export usePromisifiedAuth as useAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function EnhancedCalculationHistory({ className = '' }) {
    _s();
    const { getToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__usePromisifiedAuth__as__useAuth$3e$__["useAuth"])();
    const [calculations, setCalculations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('date');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desc');
    const [filterBy, setFilterBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedCalculations, setSelectedCalculations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showBulkActions, setShowBulkActions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EnhancedCalculationHistory.useEffect": ()=>{
            fetchCalculations();
        }
    }["EnhancedCalculationHistory.useEffect"], []);
    const fetchCalculations = async ()=>{
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) throw new Error('No authentication token');
            const response = await fetch('/api/calculations/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch calculations');
            }
            const data = await response.json();
            setCalculations(data.calculations || []);
        } catch (err) {
            console.error('Error fetching calculations:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch calculations');
        } finally{
            setLoading(false);
        }
    };
    const deleteCalculation = async (id)=>{
        if (!id) return;
        try {
            const token = await getToken();
            if (!token) throw new Error('No authentication token');
            const response = await fetch(`/api/calculations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete calculation');
            }
            setCalculations((prev)=>prev.filter((calc)=>calc._id !== id));
        } catch (err) {
            console.error('Error deleting calculation:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete calculation');
        }
    };
    const deleteSelectedCalculations = async ()=>{
        try {
            const token = await getToken();
            if (!token) throw new Error('No authentication token');
            const deletePromises = selectedCalculations.filter((id)=>id) // Filter out undefined IDs
            .map((id)=>fetch(`/api/calculations/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }));
            await Promise.all(deletePromises);
            setCalculations((prev)=>prev.filter((calc)=>calc._id && !selectedCalculations.includes(calc._id)));
            setSelectedCalculations([]);
            setShowBulkActions(false);
        } catch (err) {
            console.error('Error deleting calculations:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete calculations');
        }
    };
    const exportSelectedCalculations = ()=>{
        const selectedCalcs = calculations.filter((calc)=>calc._id && selectedCalculations.includes(calc._id));
        if (selectedCalcs.length === 0) return;
        // Create a combined CSV export
        const csvContent = selectedCalcs.map((calc)=>{
            const result = calc.results;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportCalculationResults"])(result, {
                id: calc._id || '',
                name: calc.customerName,
                teamNames: calc.teamNames,
                bookmakers: calc.bookmakers.map((bm)=>({
                        ...bm,
                        hasBonus: bm.bonusType !== 'none'
                    })),
                betType: calc.betType
            }, {
                includeHeaders: false,
                delimiter: ','
            });
        }).join('\n');
        const headers = 'Bookmaker,Bet Type,Odds,Indsats (DKK),Faktisk Omkostning (DKK),Potentiel Gevinst (DKK),Profit (DKK)\n';
        const fullCsvContent = headers + csvContent;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadCsvFile"])(fullCsvContent, `calculations_export_${new Date().toISOString().split('T')[0]}.csv`);
    };
    const filteredAndSortedCalculations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]": ()=>{
            let filtered = calculations.filter({
                "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations].filtered": (calc)=>calc != null
            }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations].filtered"]);
            // Filter by search term
            if (searchTerm) {
                filtered = filtered.filter({
                    "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]": (calc)=>calc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || `${calc.teamNames.team1} vs ${calc.teamNames.team2}`.toLowerCase().includes(searchTerm.toLowerCase())
                }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]"]);
            }
            // Filter by profitability
            if (filterBy === 'profitable') {
                filtered = filtered.filter({
                    "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]": (calc)=>calc.results.profit > 0
                }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]"]);
            } else if (filterBy === 'loss') {
                filtered = filtered.filter({
                    "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]": (calc)=>calc.results.profit <= 0
                }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]"]);
            }
            // Sort
            filtered.sort({
                "EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]": (a, b)=>{
                    let aValue;
                    let bValue;
                    switch(sortBy){
                        case 'date':
                            aValue = new Date(a.createdAt).getTime();
                            bValue = new Date(b.createdAt).getTime();
                            break;
                        case 'profit':
                            aValue = a.results.profit;
                            bValue = b.results.profit;
                            break;
                        case 'stake':
                            aValue = a.results.totalStake;
                            bValue = b.results.totalStake;
                            break;
                        default:
                            aValue = new Date(a.createdAt).getTime();
                            bValue = new Date(b.createdAt).getTime();
                    }
                    if (sortOrder === 'asc') {
                        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                    } else {
                        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                    }
                }
            }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]"]);
            return filtered;
        }
    }["EnhancedCalculationHistory.useMemo[filteredAndSortedCalculations]"], [
        calculations,
        searchTerm,
        sortBy,
        sortOrder,
        filterBy
    ]);
    const handleSelectAll = ()=>{
        if (selectedCalculations.length === filteredAndSortedCalculations.length) {
            setSelectedCalculations([]);
        } else {
            setSelectedCalculations(filteredAndSortedCalculations.map((calc)=>calc._id).filter((id)=>!!id));
        }
    };
    const handleSelectCalculation = (id)=>{
        if (!id) return;
        setSelectedCalculations((prev)=>prev.includes(id) ? prev.filter((calcId)=>calcId !== id) : [
                ...prev,
                id
            ]);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-white rounded-xl shadow-sm p-6 ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                    lineNumber: 206,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
            lineNumber: 204,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-white rounded-xl shadow-sm p-6 ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-red-600 mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-12 h-12 mx-auto",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 218,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900 mb-2",
                        children: "Error Loading History"
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchCalculations,
                        className: "btn-primary",
                        children: "Try Again"
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
            lineNumber: 214,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `bg-white rounded-xl shadow-sm p-6 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-800",
                        children: "Calculation History"
                    }, void 0, false, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: [
                                    filteredAndSortedCalculations.length,
                                    " calculations"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            selectedCalculations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-blue-600",
                                children: [
                                    selectedCalculations.length,
                                    " selected"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search by customer name or event...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "input-field"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterBy,
                                        onChange: (e)=>setFilterBy(e.target.value),
                                        className: "input-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All Calculations"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 268,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "profitable",
                                                children: "Profitable Only"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 269,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "loss",
                                                children: "Loss Only"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                        lineNumber: 263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: `${sortBy}-${sortOrder}`,
                                        onChange: (e)=>{
                                            const [sort, order] = e.target.value.split('-');
                                            setSortBy(sort);
                                            setSortOrder(order);
                                        },
                                        className: "input-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "date-desc",
                                                children: "Newest First"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 281,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "date-asc",
                                                children: "Oldest First"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 282,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "profit-desc",
                                                children: "Highest Profit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 283,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "profit-asc",
                                                children: "Lowest Profit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "stake-desc",
                                                children: "Highest Stake"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 285,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "stake-asc",
                                                children: "Lowest Stake"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    selectedCalculations.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 p-3 bg-blue-50 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-blue-800",
                                children: [
                                    selectedCalculations.length,
                                    " calculation(s) selected"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: exportSelectedCalculations,
                                className: "btn-secondary text-sm",
                                children: "Export Selected"
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: deleteSelectedCalculations,
                                className: "btn-danger text-sm",
                                children: "Delete Selected"
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCalculations([]),
                                className: "text-sm text-gray-600 hover:text-gray-800",
                                children: "Clear Selection"
                            }, void 0, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: filteredAndSortedCalculations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-8 text-gray-500",
                    children: calculations.length === 0 ? 'No calculations found' : 'No calculations match your filters'
                }, void 0, false, {
                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                    lineNumber: 322,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 pb-2 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: selectedCalculations.length === filteredAndSortedCalculations.length && filteredAndSortedCalculations.length > 0,
                                    onChange: handleSelectAll,
                                    className: "form-checkbox"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-600",
                                    children: "Select All"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this),
                        filteredAndSortedCalculations.map((calculation)=>{
                            if (!calculation) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `border rounded-lg p-4 transition-colors ${calculation._id && selectedCalculations.includes(calculation._id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: calculation._id ? selectedCalculations.includes(calculation._id) : false,
                                            onChange: ()=>handleSelectCalculation(calculation._id),
                                            className: "form-checkbox mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                            lineNumber: 351,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-gray-900",
                                                            children: calculation.customerName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2 py-1 rounded-full text-xs font-medium ${calculation.results.profit > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`,
                                                                    children: [
                                                                        calculation.results.profit > 0 ? '+' : '',
                                                                        calculation.results.profit.toFixed(2),
                                                                        " DKK"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 364,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-gray-500",
                                                                    children: new Date(calculation.createdAt).toLocaleDateString('da-DK')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 371,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: "Total Stake:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 379,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        calculation.results.totalStake.toFixed(2),
                                                                        " DKK"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 380,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: "Actual Cost:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        calculation.results.totalActualCost.toFixed(2),
                                                                        " DKK"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 382,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: "Min Return:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        Math.min(calculation.results.potentialReturns.team1, calculation.results.potentialReturns.draw, calculation.results.potentialReturns.team2).toFixed(2),
                                                                        " DKK"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 388,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: "Max Return:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        Math.max(calculation.results.potentialReturns.team1, calculation.results.potentialReturns.draw, calculation.results.potentialReturns.team2).toFixed(2),
                                                                        " DKK"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                    lineNumber: 377,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mt-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                const csvContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportCalculationResults"])(calculation.results, {
                                                                    id: calculation._id || '',
                                                                    name: calculation.customerName,
                                                                    teamNames: calculation.teamNames,
                                                                    bookmakers: calculation.bookmakers.map((bm)=>({
                                                                            ...bm,
                                                                            hasBonus: bm.bonusType !== 'none'
                                                                        })),
                                                                    betType: calculation.betType
                                                                });
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["downloadCsvFile"])(csvContent, `calculation_${calculation._id}.csv`);
                                                            },
                                                            className: "btn-secondary text-sm",
                                                            children: "Export CSV"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>calculation._id && deleteCalculation(calculation._id),
                                                            className: "btn-danger text-sm",
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                            lineNumber: 358,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                    lineNumber: 350,
                                    columnNumber: 17
                                }, this)
                            }, calculation._id, false, {
                                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                                lineNumber: 342,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/history/EnhancedCalculationHistory.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_s(EnhancedCalculationHistory, "SrstLA/13Bo4Jpzw4c34R7hEfqs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__usePromisifiedAuth__as__useAuth$3e$__["useAuth"]
    ];
});
_c = EnhancedCalculationHistory;
var _c;
__turbopack_context__.k.register(_c, "EnhancedCalculationHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript) <export usePromisifiedAuth as useAuth>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePromisifiedAuth"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$client$2d$boundary$2f$PromisifiedAuthProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/client-boundary/PromisifiedAuthProvider.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_d2612b3a._.js.map