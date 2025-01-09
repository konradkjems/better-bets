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
}

interface TeamNames {
    team1: string;
    team2: string;
}

interface BookmakerOdds {
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
}

interface CustomerBookmaker extends BookmakerInfo {
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
}

interface Customer {
    id: string;
    name: string;
    bookmakers: CustomerBookmaker[];
    teamNames?: TeamNames;
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
    { name: 'Unibet', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.4, isActive: true },
    { name: 'Bet365', fixedStake: 1000, hasBonus: false, actualCost: 1000, minOdds: 1.2, isActive: true },
    { name: 'LeoVegas', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true },
    { name: 'ComeOn', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.8, preferLoss: true, isActive: true },
    { name: 'NordicBet', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true },
    { name: 'Betsson', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true },
    { name: '888sport', fixedStake: 600, hasBonus: true, actualCost: 500, minOdds: 1.8, isActive: true },
    { name: 'Bet25', fixedStake: 250, hasBonus: false, actualCost: 250, minOdds: 1.5, isActive: true },
    { name: 'Expekt', fixedStake: 600, hasBonus: false, actualCost: 600, minOdds: 1.8, isActive: true },
    { name: 'Cashpoint', fixedStake: 500, hasBonus: false, actualCost: 500, minOdds: 1.8, isActive: true },
    { name: 'Jackpotbet', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.5, isActive: true },
    { name: 'Tipwin', fixedStake: 1600, hasBonus: true, actualCost: 800, minOdds: 1.5, avoidWin: true, isActive: true },
    { name: 'Betano', fixedStake: 2000, hasBonus: true, actualCost: 1000, minOdds: 1.8, isActive: true },
    { name: 'Mrgreen', fixedStake: 400, hasBonus: true, actualCost: 300, minOdds: 2.0, isActive: true }
];

// Global state
let customers: Customer[] = [];
let currentCustomerId = '';
let isFirstCalculation = true;

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
        bookmakers: BOOKMAKERS.map(bm => ({...bm}))
    };
    customers = [firstCustomer];
    currentCustomerId = 'kunde1';
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
        bookmakers: BOOKMAKERS.map(bm => ({...bm}))
    };
    customers.push(newCustomer);
    currentCustomerId = newId;
    createCustomerSelector();
    createBookmakerInputs();
}

// Tilføj funktion til at synkronisere odds mellem kunder
function syncOddsAcrossCustomers(bookmakerName: string, oddsType: 'team1' | 'draw' | 'team2', value: number) {
    customers.forEach(customer => {
        const bookmaker = customer.bookmakers.find(bm => bm.name === bookmakerName);
        if (bookmaker) {
            if (!bookmaker.odds) {
                bookmaker.odds = { team1: 0, draw: 0, team2: 0 };
            }
            bookmaker.odds[oddsType] = value;
        }
    });

    // Opdater UI for den aktuelle kunde
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
            // Vis formular til at indtaste kunde- og holdnavne
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
                    }
                };
                customers = [firstCustomer];
                currentCustomerId = 'kunde1';

                // Opdater visningen
                container.innerHTML = `
                    <div class="text-center py-4">
                        <p class="text-gray-600 mb-4">Indtast odds for hver bookmaker og tryk på "Find Bedste Arbitrage Mulighed" når du er klar</p>
                    </div>
                `;
                createBookmakerInputs();
            });
        });
        return;
    }

    const currentCustomer = getCurrentCustomer();

    container.innerHTML = `
        <div class="flex flex-col gap-4">
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
    // Beregn potentielle returns for hver bookmaker for hvert udfald
    const bookmakerReturns = oddsData.map(bm => {
        // Find det laveste odds (favorit) for denne bookmaker, men kun for hold 1 og hold 2
        const team1Odds = bm.team1 || Infinity;
        const team2Odds = bm.team2 || Infinity;
        
        // Bestem favorit og underdog (kun mellem hold 1 og 2)
        const favoritType = team1Odds <= team2Odds ? 'team1' : 'team2';
        const underdogType = team1Odds <= team2Odds ? 'team2' : 'team1';

        return {
            ...bm,
            favoritType,
            underdogType,
            returns: {
                team1: bm.team1 * bm.fixedStake,
                draw: bm.draw * bm.fixedStake,
                team2: bm.team2 * bm.fixedStake
            }
        };
    });

    // Find target return (gennemsnit af alle mulige returns)
    const totalPossibleReturn = bookmakerReturns.reduce((sum, bm) => 
        sum + bm.returns.team1 + bm.returns.draw + bm.returns.team2, 0);
    const targetReturnPerOutcome = totalPossibleReturn / 3;

    let bestDistribution = {
        team1: [] as BookmakerOdds[],
        draw: [] as BookmakerOdds[],
        team2: [] as BookmakerOdds[],
        deviation: Infinity
    };

    // Funktion til at evaluere en distribution
    const evaluateDistribution = (team1: BookmakerOdds[], draw: BookmakerOdds[], team2: BookmakerOdds[]): number => {
        const team1Return = team1.reduce((sum, bm) => sum + bm.team1 * bm.fixedStake, 0);
        const drawReturn = draw.reduce((sum, bm) => sum + bm.draw * bm.fixedStake, 0);
        const team2Return = team2.reduce((sum, bm) => sum + bm.team2 * bm.fixedStake, 0);

        // Beregn afvigelse fra target
        const baseDeviation = Math.max(
            Math.abs(team1Return - drawReturn),
            Math.abs(team1Return - team2Return),
            Math.abs(drawReturn - team2Return)
        );

        // Straf for uønskede placeringer
        let penalty = 0;

        // Tjek ComeOn placering
        const comeOnBet = [...team1, ...draw, ...team2].find(bm => bm.name === 'ComeOn');
        if (comeOnBet) {
            const comeOnData = bookmakerReturns.find(bm => bm.name === 'ComeOn');
            if (comeOnData) {
                // Hvis ComeOn er placeret på favoritten eller uafgjort, giv straf
                const isOnFavorit = comeOnBet.betType === comeOnData.favoritType;
                const isOnDraw = comeOnBet.betType === 'draw';
                
                if (isOnFavorit || isOnDraw) {
                    penalty += 50000; // Meget høj straf for at sikre at reglen overholdes
                }
            }
        }

        // Tjek Tipwin placering
        const tipwinBet = [...team1, ...draw, ...team2].find(bm => bm.name === 'Tipwin');
        if (tipwinBet) {
            // Hvis Tipwin ikke er placeret på uafgjort, giv en meget høj straf
            if (tipwinBet.betType !== 'draw') {
                penalty += 50000; // Meget høj straf for at sikre at Tipwin altid placeres på uafgjort
            }
        }

        // Straf hvis vi vinder på en bookmaker der foretrækker tab
        [...team1, ...draw, ...team2].forEach(bm => {
            if (bm.preferLoss) {
                const potentialWin = bm.betType === 'team1' ? team1Return :
                                   bm.betType === 'draw' ? drawReturn :
                                   team2Return;
                if (potentialWin === Math.max(team1Return, drawReturn, team2Return)) {
                    penalty += 10000; // Stor straf for at vinde på preferLoss bookmakere
                }
            }
            if (bm.avoidWin) {
                const potentialWin = bm.betType === 'team1' ? team1Return :
                                   bm.betType === 'draw' ? drawReturn :
                                   team2Return;
                if (potentialWin === Math.max(team1Return, drawReturn, team2Return)) {
                    penalty += 5000; // Mindre straf for at vinde på avoidWin bookmakere
                }
            }
        });

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
        const selectedOdds = bm.betType === 'team1' ? bm.team1Odds : 
                           bm.betType === 'draw' ? bm.drawOdds : 
                           bm.team2Odds;
        
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

// Opdater type definition for odds
type OddsValues = {
    team1: string | number;
    draw: string | number;
    team2: string | number;
};

// Type guard for at tjekke om et objekt er en CustomerBookmaker
function isCustomerBookmaker(bookmaker: BookmakerInfo | CustomerBookmaker): bookmaker is CustomerBookmaker {
    return 'odds' in bookmaker;
}

function createBookmakerInputs(): void {
    const container = document.getElementById('bookmakerInputs');
    if (!container) return;

    container.innerHTML = '';

    // Hvis der ikke er nogen kunde endnu, vis standard bookmakere uden værdier
    const bookmakers = customers.length === 0 ? BOOKMAKERS : getCurrentCustomer().bookmakers;

    bookmakers.forEach(bookmaker => {
        const bookmakerId = generateBookmakerId(bookmaker.name);
        const div = document.createElement('div');
        div.className = 'bookmaker-card';

        // Brug type guard til at bestemme odds
        const odds = isCustomerBookmaker(bookmaker) && bookmaker.odds ? bookmaker.odds : { team1: 0, draw: 0, team2: 0 };

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
                    ${bookmaker.hasBonus ? 
                        `<span class="bookmaker-info text-green-600 block">
                            Bonus: Koster ${bookmaker.actualCost} DKK
                        </span>` : 
                        ''}
                </div>
            </div>
            <div class="odds-grid">
                <div>
                    <label class="odds-label">Hold 1</label>
                    <input type="number" step="0.01" min="${bookmaker.minOdds}" 
                           class="input-field" 
                           id="${bookmakerId}-team1" 
                           value="${odds.team1 || ''}"
                           placeholder="Odds"
                           ${customers.length === 0 ? 'disabled' : ''}>
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
                           placeholder="Odds"
                           ${customers.length === 0 ? 'disabled' : ''}>
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
                           placeholder="Odds"
                           ${customers.length === 0 ? 'disabled' : ''}>
                    <div class="text-xs text-red-600 hidden mt-1" id="${bookmakerId}-team2-error">
                        Min. ${bookmaker.minOdds}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);

        // Kun tilføj event listeners hvis der er en aktiv kunde
        if (customers.length > 0) {
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
                        syncOddsAcrossCustomers(bookmaker.name, type as 'team1' | 'draw' | 'team2', value);
                    });
                }
            });

            // Tilføj toggle funktionalitet
            const toggle = document.getElementById(`${bookmakerId}-active`) as HTMLInputElement;
            if (toggle) {
                const currentBookmaker = bookmaker;
                toggle.addEventListener('change', () => {
                    const card = toggle.closest('.bookmaker-card');
                    if (card) {
                        if (toggle.checked) {
                            card.classList.remove('opacity-50');
                        } else {
                            card.classList.add('opacity-50');
                        }
                    }
                    // Gem den opdaterede aktiv/inaktiv status
                    const customer = getCurrentCustomer();
                    const bookmaker = customer.bookmakers.find(bm => bm.name === currentBookmaker.name);
                    if (bookmaker) {
                        bookmaker.isActive = toggle.checked;
                    }
                });

                // Sæt initial opacity baseret på isActive
                const card = toggle.closest('.bookmaker-card');
                if (card && !currentBookmaker.isActive) {
                    card.classList.add('opacity-50');
                }
            }
        } else {
            // Hvis der ikke er nogen kunde, deaktiver alle toggles
            const toggle = document.getElementById(`${bookmakerId}-active`) as HTMLInputElement;
            if (toggle) {
                toggle.disabled = true;
            }
        }
    });
}

function gatherOddsData(): BookmakerOdds[] {
    const customer = getCurrentCustomer();
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
            fixedStake: bookmaker.fixedStake,
            actualCost: bookmaker.actualCost,
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
        // Tjek at mindst ét gyldigt odds er indtastet og at bookmakeren er aktiv
        const hasValidOdds = odds.team1 > 0 || odds.draw > 0 || odds.team2 > 0;
        return hasValidOdds && odds.isActive;
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

function parseDecimalValue(value: string): number {
    // Fjern eventuelle whitespace og citationstegn
    const cleaned = value.trim().replace(/^"(.*)"$/, '$1');
    
    // Hvis værdien indeholder komma, antag at det er decimalseparator
    if (cleaned.includes(',')) {
        // Erstat komma med punktum og fjern eventuelle andre kommaer
        const parts = cleaned.split(',');
        if (parts.length > 2) {
            // Hvis der er flere kommaer, tag kun de første to dele
            return parseFloat(parts[0] + '.' + parts[1]);
        }
        return parseFloat(cleaned.replace(',', '.'));
    }
    
    // Ellers prøv at parse direkte
    return parseFloat(cleaned);
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