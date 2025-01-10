import './style.css';

interface BookmakerInfo {
    name: string;
    fixedStake: number;
    hasBonus: boolean;
    actualCost: number;
    minOdds: number;
    preferLoss?: boolean;  // For bookmakere hvor vi foretrækker at tabe
    avoidWin?: boolean;    // For bookmakere hvor vi vil undgå at vinde
    isActive: boolean;     // Om bookmakeren er aktiv i beregningen
    bonusType?: 'freebet' | 'matchingBonus' | 'none';  // Type af bonus
    bonusAmount?: number;  // Størrelse på bonus (for freebet eller matchingBonus)
    bonusMinOdds?: number;  // Minimum odds for at bruge bonus
    qualifyingBetAmount?: number;  // Beløb der skal spilles for at låse bonus op
    isBonusLocked?: boolean;  // Om bonussen er låst op eller ej
    usedInBet1?: boolean;  // Om bookmakeren blev brugt i Bet 1
}

interface TeamNames {
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

interface CustomerBookmaker extends BookmakerInfo {
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
    bet1Balance?: number;  // Saldo fra Bet 1
    bet1Profit?: number;   // Profit fra Bet 1 (for freebet sider)
    usedInBet1?: boolean;  // Om siden blev brugt i Bet 1
}

interface Customer {
    id: string;
    name: string;
    bookmakers: CustomerBookmaker[];
    teamNames?: TeamNames;
    betType: 'qualifying' | 'bonus';  // Tilføj betType til Customer interface
}

interface ArbitrageResult {
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
    { name: 'Unibet', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.4, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.4, qualifyingBetAmount: 1000, usedInBet1: true },
    { name: 'Bet365', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.2, isActive: true, bonusType: 'freebet', bonusAmount: 1000, bonusMinOdds: 1.2, qualifyingBetAmount: 1000, usedInBet1: true },
    { name: 'LeoVegas', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true },
    { name: 'ComeOn', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.8, preferLoss: true, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.8, qualifyingBetAmount: 1000, usedInBet1: true },
    { name: 'NordicBet', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true },
    { name: 'Betsson', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true },
    { name: '888sport', fixedStake: 600, hasBonus: true, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true },
    { name: 'Bet25', fixedStake: 250, hasBonus: false, actualCost: 250, minOdds: 1.5, isActive: true, bonusType: 'freebet', bonusAmount: 250, bonusMinOdds: 1.5, qualifyingBetAmount: 250, usedInBet1: true },
    { name: 'Expekt', fixedStake: 600, hasBonus: false, actualCost: 600, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 600, bonusMinOdds: 1.8, qualifyingBetAmount: 600, usedInBet1: true },
    { name: 'Cashpoint', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 500, bonusMinOdds: 1.8, qualifyingBetAmount: 500, usedInBet1: true },
    { name: 'Jackpotbet', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.5, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.5, qualifyingBetAmount: 1000, usedInBet1: true },
    { name: 'Tipwin', fixedStake: 1600, hasBonus: true, actualCost: 800, minOdds: 1.5, avoidWin: true, isActive: true, bonusType: 'matchingBonus', bonusAmount: 800, bonusMinOdds: 1.5, qualifyingBetAmount: 800, usedInBet1: true },
    { name: 'Betano', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.8, isActive: true, bonusType: 'matchingBonus', bonusAmount: 1000, bonusMinOdds: 1.8, qualifyingBetAmount: 1000, usedInBet1: true },
    { name: 'Mrgreen', fixedStake: 400, hasBonus: true, actualCost: 300, minOdds: 2.0, isActive: true, bonusType: 'freebet', bonusAmount: 300, bonusMinOdds: 2.0, qualifyingBetAmount: 300, usedInBet1: true }
];

// Global state
let customers: Customer[] = [];
let currentCustomerId = '';
let isFirstCalculation = true;
let currentBetType: 'qualifying' | 'bonus' = 'qualifying';  // Default til qualifying bets

// Tilføj global variabel til at gemme sidste beregning
let lastCalculatedResult: ArbitrageResult | null = null;

// Tilføj type definition for window
declare global {
    interface Window {
        handleFileUpload: (event: Event) => void;
    }
}

// Funktion til at initialisere den første kunde
function initializeFirstCustomer(): boolean {
    const customerName = prompt('Indtast navn på den første kunde:');
    if (!customerName) {
        alert('Du skal indtaste et navn for at fortsætte');
        return false;
    }

    const firstCustomer: Customer = {
        id: 'kunde1',
        name: customerName,
        bookmakers: BOOKMAKERS.map(bm => ({...bm})),
        teamNames: {
            team1: 'Team 1',
            team2: 'Team 2'
        },
        betType: 'qualifying'  // Start med qualifying bets
    };
    customers = [firstCustomer];
    currentCustomerId = 'kunde1';
    currentBetType = 'qualifying';
    createCustomerSelector();
    return true;
}

// Hjælpefunktioner til at håndtere kunder
export function getCurrentCustomer(): Customer {
    return customers.find(c => c.id === currentCustomerId) || customers[0];
}

function addCustomer() {
    const customerName = prompt('Indtast kundens navn:');
    if (!customerName) {
        alert('Du skal indtaste et navn for at fortsætte');
        return;
    }

    const newId = `kunde${customers.length + 1}`;
    const newCustomer: Customer = {
        id: newId,
        name: customerName,
        bookmakers: BOOKMAKERS.map(bm => ({...bm})),
        teamNames: {
            team1: 'Team 1',
            team2: 'Team 2'
        },
        betType: 'qualifying'  // Start med qualifying bets
    };
    customers.push(newCustomer);
    currentCustomerId = newId;
    currentBetType = 'qualifying';
    createCustomerSelector();
    createBookmakerInputs();
}

function switchCustomer(customerId: string) {
    // Gem den nuværende kundes indstillinger
    const currentCustomer = getCurrentCustomer();
    currentCustomer.bookmakers = currentCustomer.bookmakers.map(bookmaker => {
        const bookmakerId = generateBookmakerId(bookmaker.name);
        const team1Input = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement;
        const drawInput = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement;
        const team2Input = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement;
        const activeToggle = document.getElementById(`${bookmakerId}-active`) as HTMLInputElement;

        const odds = {
            team1: parseFloat(team1Input?.value || '0') || 0,
            draw: parseFloat(drawInput?.value || '0') || 0,
            team2: parseFloat(team2Input?.value || '0') || 0
        };

        // Synkroniser odds til alle andre kunder
        customers.forEach(customer => {
            if (customer.id !== currentCustomer.id) {
                const targetBookmaker = customer.bookmakers.find(bm => bm.name === bookmaker.name);
                if (targetBookmaker) {
                    targetBookmaker.odds = { ...odds };
                }
            }
        });

        return {
            ...bookmaker,
            isActive: activeToggle ? activeToggle.checked : bookmaker.isActive,
            odds
        };
    });

    // Skift til den nye kunde
    currentCustomerId = customerId;
    createBookmakerInputs();
    
    // Skjul resultater når der skiftes kunde
    const results = document.getElementById('results');
    if (results) results.classList.add('hidden');
}

function createCustomerSelector() {
    const container = document.getElementById('customerSelector');
    if (!container) return;

    if (customers.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <button id="startCalculationButton" class="btn-primary">
                    Start Ny Beregning
                </button>
                <p class="text-gray-600 mt-2">Tryk på knappen ovenfor for at starte en ny beregning</p>
            </div>
        `;
        
        const startButton = document.getElementById('startCalculationButton');
        startButton?.addEventListener('click', () => {
            container.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h2 class="text-xl font-bold mb-4">Ny Beregning</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Kundenavn</label>
                            <input type="text" id="customerNameInput" class="input-field w-full" placeholder="Indtast kundens navn">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                                <input type="text" id="team1NameInput" class="input-field w-full" placeholder="Indtast navn på hold 1">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                                <input type="text" id="team2NameInput" class="input-field w-full" placeholder="Indtast navn på hold 2">
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <button id="continueButton" class="btn-primary">
                                Fortsæt til odds
                            </button>
                        </div>
                    </div>
                </div>
            `;

            const continueButton = document.getElementById('continueButton');
            continueButton?.addEventListener('click', () => {
                const customerName = (document.getElementById('customerNameInput') as HTMLInputElement)?.value;
                const team1Name = (document.getElementById('team1NameInput') as HTMLInputElement)?.value;
                const team2Name = (document.getElementById('team2NameInput') as HTMLInputElement)?.value;

                if (!customerName) {
                    alert('Du skal indtaste et kundenavn for at fortsætte');
                    return;
                }

                if (!team1Name || !team2Name) {
                    alert('Du skal indtaste navne på begge hold for at fortsætte');
                    return;
                }

                // Opret den første kunde med holdnavne
                const firstCustomer: Customer = {
                    id: 'kunde1',
                    name: customerName,
                    bookmakers: BOOKMAKERS.map(bm => ({...bm})),
                    teamNames: {
                        team1: team1Name,
                        team2: team2Name
                    },
                    betType: 'qualifying'  // Start med qualifying bets
                };
                customers = [firstCustomer];
                currentCustomerId = 'kunde1';
                currentBetType = 'qualifying';

                // Opdater visningen
                createCustomerSelector();  // Dette vil nu vise bet type vælgeren
                createBookmakerInputs();
            });
        });
        return;
    }

    const currentCustomer = getCurrentCustomer();

    container.innerHTML = `
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <select id="customerSelect" class="input-field max-w-xs">
                        ${customers.map(customer => `
                            <option value="${customer.id}" ${customer.id === currentCustomerId ? 'selected' : ''}>
                                ${customer.name}
                            </option>
                        `).join('')}
                    </select>
                    <button id="addCustomerButton" class="btn-secondary">
                        Tilføj ny kunde
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <label class="text-sm font-medium text-gray-700">Bet Type:</label>
                    <select id="betTypeSelect" class="input-field">
                        <option value="qualifying" ${currentBetType === 'qualifying' ? 'selected' : ''}>
                            Bet 1 (Kvalificerende)
                        </option>
                        <option value="bonus" ${currentBetType === 'bonus' ? 'selected' : ''}>
                            Bet 2 (Bonus og Freebts)
                        </option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                    <input type="text" 
                           id="team1Name" 
                           class="input-field" 
                           placeholder="Indtast navn på hold 1"
                           value="${currentCustomer.teamNames?.team1 || ''}"
                    >
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                    <input type="text" 
                           id="team2Name" 
                           class="input-field" 
                           placeholder="Indtast navn på hold 2"
                           value="${currentCustomer.teamNames?.team2 || ''}"
                    >
                </div>
            </div>
        </div>
    `;

    // Tilføj event listeners
    const select = document.getElementById('customerSelect') as HTMLSelectElement;
    select?.addEventListener('change', (e) => {
        switchCustomer((e.target as HTMLSelectElement).value);
    });

    const betTypeSelect = document.getElementById('betTypeSelect') as HTMLSelectElement;
    betTypeSelect?.addEventListener('change', (e) => {
        const newBetType = (e.target as HTMLSelectElement).value as 'qualifying' | 'bonus';
        currentBetType = newBetType;
        const customer = getCurrentCustomer();
        if (customer) {
            customer.betType = newBetType;
            // Genopbyg UI med den nye bet type
            createBookmakerInputs();
            
            // Skjul resultater når der skiftes bet type
            const results = document.getElementById('results');
            if (results) results.classList.add('hidden');
        }
    });

    const addButton = document.getElementById('addCustomerButton');
    addButton?.addEventListener('click', addCustomer);

    // Tilføj event listeners til holdnavne inputs
    const team1Input = document.getElementById('team1Name') as HTMLInputElement;
    const team2Input = document.getElementById('team2Name') as HTMLInputElement;

    team1Input?.addEventListener('input', () => {
        const customer = getCurrentCustomer();
        if (!customer.teamNames) customer.teamNames = { team1: '', team2: '' };
        customer.teamNames.team1 = team1Input.value;
        if (lastCalculatedResult) {
            updateUI(lastCalculatedResult);
        }
    });

    team2Input?.addEventListener('input', () => {
        const customer = getCurrentCustomer();
        if (!customer.teamNames) customer.teamNames = { team1: '', team2: '' };
        customer.teamNames.team2 = team2Input.value;
        if (lastCalculatedResult) {
            updateUI(lastCalculatedResult);
        }
    });
}

export function generateBookmakerId(bookmakerName: string): string {
    return bookmakerName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function calculateArbitrage(oddsData: BookmakerOdds[]): ArbitrageResult {
    const customer = getCurrentCustomer();
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

        const tipwinBet = [...team1, ...draw, ...team2].find(bm => bm.name === 'Tipwin');
        if (tipwinBet && tipwinBet.betType !== 'draw') {
            penalty += 50000;
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

        // Specialhåndtering for Tipwin - skal altid på uafgjort
        if (current.name === 'Tipwin') {
            if (current.draw > 0) { // Kun hvis der er et gyldigt uafgjort odds
                tryDistribution(rest, team1, [...draw, current], team2);
            }
            return;
        } else if (current.name === 'ComeOn') {
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
        let priorities = [];
        
        if (current.preferLoss) {
            // For bookmakere der foretrækker tab, placer dem hvor der er lavest return
            priorities = [
                { type: 'team1', need: -currentTeam1, odds: current.team1, current: team1 },
                { type: 'draw', need: -currentDraw, odds: current.draw, current: draw },
                { type: 'team2', need: -currentTeam2, odds: current.team2, current: team2 }
            ]
            .filter(p => p.odds > 0) // Fjern muligheder hvor odds er 0
            .sort((a, b) => a.need - b.need);
        } else {
            // For normale bookmakere, placer dem hvor der er størst behov
            priorities = [
                { type: 'team1', need: targetReturnPerOutcome - currentTeam1, odds: current.team1, current: team1 },
                { type: 'draw', need: targetReturnPerOutcome - currentDraw, odds: current.draw, current: draw },
                { type: 'team2', need: targetReturnPerOutcome - currentTeam2, odds: current.team2, current: team2 }
            ]
            .filter(p => p.odds > 0) // Fjern muligheder hvor odds er 0
            .sort((a, b) => b.need - a.need);
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

// Tilføj funktion til at vise/skjule loading state
function showLoading(show: boolean) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }
}

// Opdater updateUI funktionen til at håndtere empty state
function updateUI(result: ArbitrageResult): void {
    if (!result) return;
    lastCalculatedResult = result;

    const customer = getCurrentCustomer();
    const team1Name = customer.teamNames?.team1 || 'Hold 1';
    const team2Name = customer.teamNames?.team2 || 'Hold 2';

    const resultsElement = document.getElementById('results');
    const emptyState = document.getElementById('emptyState');
    const resultsBody = document.getElementById('resultsBody') as HTMLElement;
    const profitInfo = document.getElementById('profitInfo') as HTMLElement;
    
    if (resultsElement && emptyState) {
        resultsElement.classList.remove('hidden');
        emptyState.classList.add('hidden');
    }

    // Opdater tabeloverskrifterne med holdnavne
    const tableHeaders = document.querySelector('thead tr');
    if (tableHeaders) {
        tableHeaders.innerHTML = `
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bookmaker</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">${team1Name}</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uafgjort</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">${team2Name}</th>
            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Indsats</th>
        `;
    }

    // Generer tabel med alle bookmakere
    let tableHTML = '';
    result.allBookmakers.forEach((bm: ArbitrageResult['allBookmakers'][0]) => {
        tableHTML += `
            <tr class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-3">
                    <div class="font-medium text-gray-900">${bm.name}</div>
                    ${bm.actualCost !== bm.fixedStake ? 
                        '<div class="text-xs text-green-600">Med bonus</div>' : 
                        ''}
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${bm.team1Odds.toFixed(2)}
                        ${bm.betType === 'team1' ? 
                            `<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på ${team1Name}</span>` : 
                            ''}
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${bm.drawOdds.toFixed(2)}
                        ${bm.betType === 'draw' ? 
                            '<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på Uafgjort</span>' : 
                            ''}
                    </div>
                </td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        ${bm.team2Odds.toFixed(2)}
                        ${bm.betType === 'team2' ? 
                            `<span class="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Spil på ${team2Name}</span>` : 
                            ''}
                    </div>
                </td>
                <td class="px-4 py-3 text-right">
                    <div class="font-medium">${bm.fixedStake.toLocaleString('da-DK')} DKK</div>
                    ${bm.actualCost !== bm.fixedStake ? 
                        `<div class="text-xs text-green-600">${bm.actualCost.toLocaleString('da-DK')} DKK</div>` : 
                        ''}
                </td>
            </tr>
        `;
    });
    
    resultsBody.innerHTML = tableHTML;

    const profitClass = result.isArbitrage ? 'text-green-600' : 'text-red-600';
    profitInfo.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <div class="${profitClass} font-semibold text-lg mb-2">
                    ${result.isArbitrage ? '✓ Arbitrage mulighed!' : '✗ Ingen arbitrage'}
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Total indsats:</span>
                        <span class="font-medium">${result.totalStake.toLocaleString('da-DK')} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Faktisk kostnad:</span>
                        <span class="font-medium">${result.totalActualCost.toLocaleString('da-DK')} DKK</span>
                    </div>
                </div>
            </div>
            <div>
                <div class="font-semibold text-gray-800 mb-2">Potentielle gevinster:</div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">${team1Name}:</span>
                        <span class="font-medium">${result.potentialReturns.team1.toLocaleString('da-DK')} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">Uafgjort:</span>
                        <span class="font-medium">${result.potentialReturns.draw.toLocaleString('da-DK')} DKK</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-600">${team2Name}:</span>
                        <span class="font-medium">${result.potentialReturns.team2.toLocaleString('da-DK')} DKK</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
                <span class="text-gray-700 font-medium">Garanteret profit:</span>
                <span class="${profitClass} text-lg font-bold">
                    ${result.profit.toLocaleString('da-DK')} DKK (${result.profitPercentage.toFixed(2)}%)
                </span>
            </div>
        </div>
    `;
}

function createBookmakerInputs(): void {
    const container = document.getElementById('bookmakerInputs');
    if (!container) return;

    container.innerHTML = '';

    const customer = getCurrentCustomer();
    if (!customer) return;  // Sikr at vi har en kunde

    const isBet2 = customer.betType === 'bonus';
    const bookmakers = customer.bookmakers;

    bookmakers.forEach(bookmaker => {
        const bookmakerId = generateBookmakerId(bookmaker.name);
        const div = document.createElement('div');
        div.className = 'bookmaker-card';

        // Brug type guard til at bestemme odds
        const odds = bookmaker.odds || { team1: 0, draw: 0, team2: 0 };

        div.innerHTML = `
            <div class="bookmaker-header">
                <div>
                    <div class="flex items-center gap-2">
                        <h3 class="bookmaker-title">${bookmaker.name}</h3>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="${bookmakerId}-active" class="sr-only peer" ${bookmaker.isActive ? 'checked' : ''}>
                            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <span class="bookmaker-info">Min. odds: ${bookmaker.minOdds} | Indsats: ${bookmaker.fixedStake} DKK</span>
                    ${bookmaker.bonusType !== 'none' ? 
                        `<div class="bookmaker-bonus mt-1">
                            <div class="flex items-center gap-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-md text-sm ${
                                    bookmaker.bonusType === 'freebet' ? 'bg-green-100 text-green-800' : 
                                    'bg-blue-100 text-blue-800'
                                }">
                                    ${bookmaker.bonusType === 'freebet' ? 'Freebet' : 'Matching Bonus'}: 
                                    ${bookmaker.bonusAmount} DKK
                                    ${bookmaker.isBonusLocked ? '🔒' : '✓'}
                                </span>
                                ${isBet2 ? `
                                    <label class="flex items-center gap-1">
                                        <input type="checkbox" 
                                               id="${bookmakerId}-used-in-bet1"
                                               class="form-checkbox h-4 w-4 text-blue-600"
                                               ${bookmaker.usedInBet1 ? 'checked' : ''}>
                                        <span class="text-sm text-gray-600">Brugt i Bet 1</span>
                                    </label>
                                ` : ''}
                            </div>
                            <span class="text-xs text-gray-600 block">
                                Kræver ${bookmaker.qualifyingBetAmount} DKK kvalificerende bet med min. odds ${bookmaker.bonusMinOdds}
                            </span>
                            ${isBet2 ? `
                                <div class="mt-2">
                                    ${bookmaker.bonusType === 'matchingBonus' ? `
                                        <div class="flex items-center gap-2">
                                            <label class="text-sm text-gray-600">Saldo fra Bet 1:</label>
                                            <input type="number" 
                                                   id="${bookmakerId}-bet1-balance" 
                                                   class="input-field w-32" 
                                                   value="${bookmaker.bet1Balance || ''}"
                                                   placeholder="DKK"
                                                   ${!bookmaker.usedInBet1 ? 'disabled' : ''}>
                                        </div>
                                    ` : bookmaker.bonusType === 'freebet' ? `
                                        <div class="flex items-center gap-2">
                                            <label class="text-sm text-gray-600">Gevinst fra Bet 1:</label>
                                            <input type="number" 
                                                   id="${bookmakerId}-bet1-profit" 
                                                   class="input-field w-32" 
                                                   value="${bookmaker.bet1Profit || ''}"
                                                   placeholder="DKK">
                                            <div class="text-xs text-gray-500 ml-2">
                                                ${bookmaker.usedInBet1 ? `(Freebet: ${bookmaker.bonusAmount} DKK)` : '(Ikke brugt i Bet 1)'}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>` 
                        : ''}
                </div>
            </div>
            <div class="odds-grid">
                <div>
                    <label class="odds-label">Hold 1</label>
                    <input type="number" step="0.01" min="${bookmaker.minOdds}" 
                           class="input-field" 
                           id="${bookmakerId}-team1" 
                           value="${odds.team1 || ''}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${bookmakerId}-team1-error">
                        Min. ${bookmaker.minOdds}
                    </div>
                </div>
                <div>
                    <label class="odds-label">Uafgjort</label>
                    <input type="number" step="0.01" min="${bookmaker.minOdds}" 
                           class="input-field" 
                           id="${bookmakerId}-draw" 
                           value="${odds.draw || ''}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${bookmakerId}-draw-error">
                        Min. ${bookmaker.minOdds}
                    </div>
                </div>
                <div>
                    <label class="odds-label">Hold 2</label>
                    <input type="number" step="0.01" min="${bookmaker.minOdds}" 
                           class="input-field" 
                           id="${bookmakerId}-team2" 
                           value="${odds.team2 || ''}"
                           placeholder="Odds">
                    <div class="text-xs text-red-600 hidden mt-1" id="${bookmakerId}-team2-error">
                        Min. ${bookmaker.minOdds}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);

        // Tilføj event listeners for Bet 1 checkboxes og inputs
        if (isBet2) {
            const usedInBet1Checkbox = document.getElementById(`${bookmakerId}-used-in-bet1`) as HTMLInputElement;
            if (usedInBet1Checkbox) {
                usedInBet1Checkbox.addEventListener('change', () => {
                    bookmaker.usedInBet1 = usedInBet1Checkbox.checked;
                    
                    // Opdater input felter baseret på checkbox status
                    if (bookmaker.bonusType === 'matchingBonus') {
                        const balanceInput = document.getElementById(`${bookmakerId}-bet1-balance`) as HTMLInputElement;
                        if (balanceInput) {
                            balanceInput.disabled = !usedInBet1Checkbox.checked;
                            if (!usedInBet1Checkbox.checked) {
                                balanceInput.value = '';
                                bookmaker.bet1Balance = 0;
                            }
                        }
                    }
                });
            }

            if (bookmaker.bonusType === 'matchingBonus') {
                const balanceInput = document.getElementById(`${bookmakerId}-bet1-balance`) as HTMLInputElement;
                if (balanceInput) {
                    balanceInput.addEventListener('change', () => {
                        const value = parseFloat(balanceInput.value) || 0;
                        bookmaker.bet1Balance = value;
                    });
                }
            } else if (bookmaker.bonusType === 'freebet') {
                const profitInput = document.getElementById(`${bookmakerId}-bet1-profit`) as HTMLInputElement;
                if (profitInput) {
                    profitInput.addEventListener('change', () => {
                        const value = parseFloat(profitInput.value) || 0;
                        bookmaker.bet1Profit = value;
                    });
                }
            }
        }

        // Tilføj event listeners til odds inputs med synkronisering
        ['team1', 'draw', 'team2'].forEach(type => {
            const input = document.getElementById(`${bookmakerId}-${type}`) as HTMLInputElement;
            const error = document.getElementById(`${bookmakerId}-${type}-error`);
            
            if (input && error) {
                // Validering på input event
                input.addEventListener('input', () => {
                    const value = parseFloat(input.value) || 0;
                    
                    // Validering
                    if (value > 0 && value < bookmaker.minOdds) {
                        error.classList.remove('hidden');
                        input.classList.add('border-yellow-500');
                    } else {
                        error.classList.add('hidden');
                        input.classList.remove('border-yellow-500');
                    }
                });

                // Synkronisering på blur event
                input.addEventListener('blur', () => {
                    const value = parseFloat(input.value) || 0;
                    if (!bookmaker.odds) {
                        bookmaker.odds = { team1: 0, draw: 0, team2: 0 };
                    }
                    bookmaker.odds[type as keyof typeof odds] = value;
                });
            }
        });

        // Tilføj toggle funktionalitet
        const toggle = document.getElementById(`${bookmakerId}-active`) as HTMLInputElement;
        if (toggle) {
            toggle.addEventListener('change', () => {
                const card = toggle.closest('.bookmaker-card');
                if (card) {
                    if (toggle.checked) {
                        card.classList.remove('opacity-50');
                    } else {
                        card.classList.add('opacity-50');
                    }
                }
                bookmaker.isActive = toggle.checked;
            });

            // Sæt initial opacity baseret på isActive
            const card = toggle.closest('.bookmaker-card');
            if (card && !bookmaker.isActive) {
                card.classList.add('opacity-50');
            }
        }
    });
}

function gatherOddsData(): BookmakerOdds[] {
    const customer = getCurrentCustomer();
    const isBet2 = customer.betType === 'bonus';

    return customer.bookmakers.map(bookmaker => {
        const bookmakerId = generateBookmakerId(bookmaker.name);
        const team1Input = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement;
        const drawInput = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement;
        const team2Input = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement;
        const activeToggle = document.getElementById(`${bookmakerId}-active`) as HTMLInputElement;

        const team1Value = parseFloat(team1Input.value) || 0;
        const drawValue = parseFloat(drawInput.value) || 0;
        const team2Value = parseFloat(team2Input.value) || 0;
        const isActive = activeToggle ? activeToggle.checked : bookmaker.isActive;

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
                // For freebets, brug bonus beløbet
                stake = bookmaker.bonusAmount || 0;
                // Actual cost skal være lig med freebet beløbet
                actualCost = bookmaker.bonusAmount || 0;
            }
        }

        // Marker odds under minimum ved at sætte dem til 0
        const validTeam1 = team1Value >= bookmaker.minOdds ? team1Value : 0;
        const validDraw = drawValue >= bookmaker.minOdds ? drawValue : 0;
        const validTeam2 = team2Value >= bookmaker.minOdds ? team2Value : 0;

        // Vis visuel feedback på input felterne
        const updateInputStyle = (value: number, input: HTMLInputElement, errorId: string) => {
            const error = document.getElementById(errorId);
            if (value > 0 && value < bookmaker.minOdds) {
                if (error) error.classList.remove('hidden');
                input.classList.add('border-yellow-500');
            } else {
                if (error) error.classList.add('hidden');
                input.classList.remove('border-yellow-500');
            }
        };

        updateInputStyle(team1Value, team1Input, `${bookmakerId}-team1-error`);
        updateInputStyle(drawValue, drawInput, `${bookmakerId}-draw-error`);
        updateInputStyle(team2Value, team2Input, `${bookmakerId}-team2-error`);

        return {
            name: bookmaker.name,
            fixedStake: stake,  // Brug den beregnede stake
            actualCost: actualCost,  // Brug den beregnede actual cost
            minOdds: bookmaker.minOdds,
            preferLoss: bookmaker.preferLoss,
            avoidWin: bookmaker.avoidWin,
            isActive,
            team1: validTeam1,
            draw: validDraw,
            team2: validTeam2,
            originalOdds: {
                team1: team1Value,
                draw: drawValue,
                team2: team2Value
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

function downloadTemplate() {
    // Brug standard bookmakere hvis der ikke er nogen aktiv kunde
    const bookmakers = customers.length === 0 ? BOOKMAKERS : getCurrentCustomer().bookmakers;
    const headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2'];
    
    const rows = bookmakers.map(bookmaker => [bookmaker.name, '', '', '']);
    
    const csvContent = '\uFEFF' + [
        headers.join(';'),
        ...rows.map(row => row.join(';'))
    ].join('\r\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'odds_skabelon.csv');
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Event handler
document.addEventListener('DOMContentLoaded', () => {
    createBookmakerInputs(); // Vis tomme inputs først
    
    const calculateButton = document.getElementById('calculateButton');
    calculateButton?.addEventListener('click', async () => {
        // Tjek om det er første beregning
        if (isFirstCalculation) {
            if (!initializeFirstCustomer()) {
                return; // Stop hvis brugeren ikke indtaster et navn
            }
            isFirstCalculation = false;
            createBookmakerInputs(); // Genopbyg inputs med den nye kunde
        }

        const oddsData = gatherOddsData();

        if (oddsData.length === 0) {
            alert('Venligst udfyld odds for mindst én bookmaker');
            return;
        }

        showLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const result = calculateArbitrage(oddsData);
            updateUI(result);
        } finally {
            showLoading(false);
        }
    });

    const downloadButton = document.getElementById('downloadTemplate');
    console.log('Download button found:', downloadButton); // Debug log
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            console.log('Download button clicked'); // Debug log
            downloadTemplate();
        });
    } else {
        console.error('Download button not found in DOM');
    }

    // Importer og tilføj handleFileUpload til window objektet
    import('./fileHandlers').then(module => {
        window.handleFileUpload = module.handleFileUpload;
    });
}); 