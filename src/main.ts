import './style.css';
import { BookmakerCard } from './components/BookmakerCard';

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
    bonusOnlyIfLost?: boolean;  // Om bonus kun gives hvis det kvalificerende bet tabes
    bet1Lost?: boolean;  // Om Bet 1 blev tabt (kun relevant for bonusOnlyIfLost bookmakere)
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

export interface CustomerBookmaker extends BookmakerInfo {
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
    bet1Balance?: number;  // Saldo fra Bet 1
    bet1Profit?: number;   // Profit fra Bet 1 (for freebet sider)
    usedInBet1?: boolean;  // Om siden blev brugt i Bet 1
    bet1Result?: 'won' | 'lost' | 'unknown';  // Resultat af Bet 1
    bet2Result?: 'won' | 'lost' | 'unknown';  // Resultat af Bet 2
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

interface CalculationHistory {
    id: string;
    timestamp: Date;
    teamNames: TeamNames;
    betType: 'qualifying' | 'bonus';
    result: ArbitrageResult;
    bookmakersUsed: string[];
    profit: number;
    profitPercentage: number;
    customerId: string;
    oddsData?: BookmakerOdds[]; // Store the odds data used for this calculation
}

interface User {
    id: string;
    name: string;
    email: string;
    customers: Customer[];
    calculationHistory: CalculationHistory[];
    preferences: {
        darkMode: boolean;
        defaultBookmakers: string[];
        autoSave: boolean;
    };
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
    { name: 'Jackpotbet', fixedStake: 1000, hasBonus: true, actualCost: 500, minOdds: 1.5, isActive: true, bonusType: 'matchingBonus', bonusAmount: 500, bonusMinOdds: 1.5, qualifyingBetAmount: 500, usedInBet1: true, bonusOnlyIfLost: false },
    { name: 'Getlucky', fixedStake: 100, hasBonus: false, actualCost: 100, minOdds: 1.8, isActive: true, bonusType: 'freebet', bonusAmount: 100, bonusMinOdds: 1.8, qualifyingBetAmount: 100, usedInBet1: true, bonusOnlyIfLost: false }
];

// Global state
let customers: Customer[] = [];
let currentCustomerId: string | null = null;
let currentBetType: 'qualifying' | 'bonus' = 'qualifying';
let lastCalculatedResult: ArbitrageResult | null = null;
let currentUser: User | null = null;
let calculationHistory: CalculationHistory[] = [];
let isDarkMode: boolean = false;

// LocalStorage Management Functions
function initializeUser(): User {
    const defaultUser: User = {
        id: 'default-user',
        name: 'Better Bets User',
        email: 'user@betterbets.com',
        customers: [],
        calculationHistory: [],
        preferences: {
            darkMode: false,
            defaultBookmakers: ['Unibet', 'Bet365', 'LeoVegas'],
            autoSave: true
        }
    };
    
    return defaultUser;
}

function loadFromLocalStorage(): void {
    try {
        // Load user preferences
        const savedPreferences = localStorage.getItem('bb_user_preferences');
        if (savedPreferences) {
            const prefs = JSON.parse(savedPreferences);
            isDarkMode = prefs.darkMode || false;
        }

        // Load calculation history
        const savedHistory = localStorage.getItem('bb_calculation_history');
        if (savedHistory) {
            calculationHistory = JSON.parse(savedHistory).map((item: any) => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }));
        }

        // Load current session
        const savedSession = localStorage.getItem('bb_current_session');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            customers = session.customers || [];
            currentCustomerId = session.currentCustomerId || null;
            currentBetType = session.currentBetType || 'qualifying';
        }

        // Initialize user if not exists
        if (!currentUser) {
            currentUser = initializeUser();
            currentUser.calculationHistory = calculationHistory;
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Initialize with defaults
        currentUser = initializeUser();
        calculationHistory = [];
    }
}

function saveToLocalStorage(): void {
    try {
        // Save user preferences
        localStorage.setItem('bb_user_preferences', JSON.stringify({
            darkMode: isDarkMode,
            defaultBookmakers: currentUser?.preferences.defaultBookmakers || [],
            autoSave: currentUser?.preferences.autoSave || true
        }));

        // Save calculation history (max 100 entries)
        const historyToSave = calculationHistory.slice(-100);
        localStorage.setItem('bb_calculation_history', JSON.stringify(historyToSave));

        // Save current session
        localStorage.setItem('bb_current_session', JSON.stringify({
            customers,
            currentCustomerId,
            currentBetType,
            lastModified: new Date()
        }));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function saveCalculationToHistory(result: ArbitrageResult, teamNames: TeamNames, betType: 'qualifying' | 'bonus'): void {
    if (!currentUser || !currentUser.preferences.autoSave) return;

    // Gather the current odds data
    const oddsData = gatherOddsData();

    const historyEntry: CalculationHistory = {
        id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        teamNames,
        betType,
        result,
        bookmakersUsed: result.allBookmakers.map(bm => bm.name),
        profit: result.profit,
        profitPercentage: result.profitPercentage,
        customerId: currentCustomerId || 'default',
        oddsData: oddsData // Store the odds data
    };

    calculationHistory.unshift(historyEntry);
    
    // Keep only last 100 calculations
    if (calculationHistory.length > 100) {
        calculationHistory = calculationHistory.slice(0, 100);
    }

    if (currentUser) {
        currentUser.calculationHistory = calculationHistory;
    }

    saveToLocalStorage();
    
    // Update history UI if it exists
    updateHistoryUI();
}

function loadCalculationFromHistory(historyId: string): boolean {
    const historyEntry = calculationHistory.find(entry => entry.id === historyId);
    if (!historyEntry) return false;

    // Restore the calculation
    lastCalculatedResult = historyEntry.result;
    
    // Find or create customer
    let customer = customers.find(c => c.id === historyEntry.customerId);
    if (!customer) {
        customer = {
            id: historyEntry.customerId,
            name: `Customer ${historyEntry.customerId}`,
            bookmakers: BOOKMAKERS.map(bm => ({ ...bm })),
            teamNames: historyEntry.teamNames,
            betType: historyEntry.betType
        };
        customers.push(customer);
    } else {
        // Update existing customer with the loaded data
        customer.teamNames = historyEntry.teamNames;
        customer.betType = historyEntry.betType;
    }

    // Restore odds data if available
    if (historyEntry.oddsData) {
        historyEntry.oddsData.forEach(oddsData => {
            const bookmaker = customer.bookmakers.find(bm => bm.name === oddsData.name);
            if (bookmaker) {
                // Update the bookmaker with the saved odds
                bookmaker.odds = {
                    team1: oddsData.team1,
                    draw: oddsData.draw,
                    team2: oddsData.team2
                };
                bookmaker.isActive = oddsData.isActive;
            }
        });
    }

    // Set current customer and bet type
    currentCustomerId = customer.id;
    currentBetType = historyEntry.betType;

    // Save the updated customer data
    saveToLocalStorage();

    // Update UI
    createCustomerSelector();
    createBookmakerInputs();
    if (lastCalculatedResult) {
        updateUI(lastCalculatedResult);
    }

    return true;
}

function deleteCalculationFromHistory(historyId: string): void {
    calculationHistory = calculationHistory.filter(entry => entry.id !== historyId);
    
    if (currentUser) {
        currentUser.calculationHistory = calculationHistory;
    }

    saveToLocalStorage();
    updateHistoryUI();
}

function toggleDarkMode(): void {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    if (currentUser) {
        currentUser.preferences.darkMode = isDarkMode;
    }
    
    saveToLocalStorage();
}


function updateHistoryUI(): void {
    // Update history trigger badge
    const historyTrigger = document.querySelector('.history-trigger .badge') as HTMLElement;
    if (historyTrigger) {
        historyTrigger.textContent = calculationHistory.length.toString();
    }
    
    // Update history panel if it exists
    updateHistoryPanel();
}

function initializeThemeToggle(): void {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleDarkMode();
            updateThemeToggleButton();
        });
        updateThemeToggleButton();
    }
}

function updateThemeToggleButton(): void {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('svg');
    const text = themeToggle.querySelector('.theme-text');
    
    if (isDarkMode) {
        if (icon) {
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            `;
        }
        if (text) {
            text.textContent = 'Light Mode';
        }
    } else {
        if (icon) {
            icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            `;
        }
        if (text) {
            text.textContent = 'Dark Mode';
        }
    }
}


function initializeHistoryPanel(): void {
    const historyTrigger = document.querySelector('.history-trigger');
    const historyPanel = document.getElementById('historyPanel');
    const closeHistory = document.getElementById('closeHistory');
    
    if (historyTrigger && historyPanel) {
        historyTrigger.addEventListener('click', () => {
            historyPanel.classList.toggle('closed');
            historyPanel.classList.toggle('open');
        });
    }
    
    if (closeHistory && historyPanel) {
        closeHistory.addEventListener('click', () => {
            historyPanel.classList.add('closed');
            historyPanel.classList.remove('open');
        });
    }
    
    // Initialize filters
    const timeFilter = document.getElementById('timeFilter') as HTMLSelectElement;
    const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement;
    const searchHistory = document.getElementById('searchHistory') as HTMLInputElement;
    
    [timeFilter, typeFilter, searchHistory].forEach(element => {
        element?.addEventListener('change', updateHistoryPanel);
        element?.addEventListener('input', updateHistoryPanel);
    });
    
    updateHistoryPanel();
}

function updateHistoryPanel(): void {
    const historyList = document.getElementById('historyList');
    const totalCalculations = document.getElementById('totalCalculations');
    const totalProfit = document.getElementById('totalProfit');
    const avgROI = document.getElementById('avgROI');
    
    if (!historyList) return;
    
    // Get filter values
    const timeFilter = (document.getElementById('timeFilter') as HTMLSelectElement)?.value || 'all';
    const typeFilter = (document.getElementById('typeFilter') as HTMLSelectElement)?.value || 'all';
    const searchQuery = (document.getElementById('searchHistory') as HTMLInputElement)?.value || '';
    
    // Filter history
    let filteredHistory = calculationHistory;
    
    if (timeFilter !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (timeFilter) {
            case 'today':
                filterDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                filterDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                filterDate.setDate(now.getDate() - 30);
                break;
        }
        
        filteredHistory = filteredHistory.filter(item => item.timestamp >= filterDate);
    }
    
    if (typeFilter !== 'all') {
        filteredHistory = filteredHistory.filter(item => item.betType === typeFilter);
    }
    
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredHistory = filteredHistory.filter(item => 
            item.teamNames.team1.toLowerCase().includes(query) ||
            item.teamNames.team2.toLowerCase().includes(query) ||
            item.bookmakersUsed.some(bm => bm.toLowerCase().includes(query))
        );
    }
    
    // Render history list
    if (filteredHistory.length === 0) {
        historyList.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>No calculations found</p>
                <p class="text-sm">Try adjusting your filters</p>
            </div>
        `;
    } else {
        historyList.innerHTML = filteredHistory.map(item => `
            <div class="history-item p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-gray-500">${formatRelativeTime(item.timestamp)}</span>
                    <span class="text-sm font-semibold ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${item.profit >= 0 ? '+' : ''}${item.profit.toFixed(0)} DKK
                    </span>
                </div>
                <div class="mb-2">
                    <span class="font-medium">${item.teamNames.team1} vs ${item.teamNames.team2}</span>
                    <span class="ml-2 badge ${item.betType === 'qualifying' ? 'badge-primary' : 'badge-success'}">${item.betType}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">${item.bookmakersUsed.length} bookmakers</span>
                    <div class="flex gap-2">
                        <button class="load-calculation text-xs btn-secondary px-2 py-1" data-id="${item.id}">Load</button>
                        <button class="delete-calculation text-xs btn-secondary px-2 py-1 text-red-600" data-id="${item.id}">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for action buttons
        historyList.querySelectorAll('.load-calculation').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = (e.target as HTMLElement).getAttribute('data-id');
                if (id) {
                    loadCalculationFromHistory(id);
                    // Close history panel
                    const historyPanel = document.getElementById('historyPanel');
                    if (historyPanel) {
                        historyPanel.classList.add('closed');
                        historyPanel.classList.remove('open');
                    }
                }
            });
        });
        
        historyList.querySelectorAll('.delete-calculation').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = (e.target as HTMLElement).getAttribute('data-id');
                if (id && confirm('Are you sure you want to delete this calculation?')) {
                    deleteCalculationFromHistory(id);
                }
            });
        });
    }
    
    // Update stats
    if (totalCalculations) {
        totalCalculations.textContent = calculationHistory.length.toString();
    }
    
    if (totalProfit) {
        const total = calculationHistory.reduce((sum, item) => sum + item.profit, 0);
        totalProfit.textContent = `${total >= 0 ? '+' : ''}${total.toFixed(0)} DKK`;
        totalProfit.className = `font-semibold ${total >= 0 ? 'text-green-600' : 'text-red-600'}`;
    }
    
    if (avgROI) {
        const avg = calculationHistory.length > 0 
            ? calculationHistory.reduce((sum, item) => sum + item.profitPercentage, 0) / calculationHistory.length 
            : 0;
        avgROI.textContent = `${avg.toFixed(1)}%`;
    }
}

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Lige nu';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} min siden`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} time${hours > 1 ? 'r' : ''} siden`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} dag${days > 1 ? 'e' : ''} siden`;
    } else {
        return date.toLocaleDateString('da-DK');
    }
}

// Tilføj type definition for window
declare global {
    interface Window {
        handleFileUpload: (event: Event) => void;
        BookmakerCard: typeof BookmakerCard;
        currentBetType: 'qualifying' | 'bonus';
        customers: Customer[];
    }
}

// Make BookmakerCard available globally
window.BookmakerCard = BookmakerCard;
window.currentBetType = currentBetType;
window.customers = customers;

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
            const container = document.getElementById('customerSelector');
            if (!container) return;

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
            <div class="flex justify-end mt-4">
                <button id="continueToOddsButton" class="btn-primary">
                    Fortsæt til odds
                </button>
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
        window.currentBetType = currentBetType; // Update global reference
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

    const continueToOddsButton = document.getElementById('continueToOddsButton');
    continueToOddsButton?.addEventListener('click', () => {
        const team1Name = (document.getElementById('team1Name') as HTMLInputElement)?.value;
        const team2Name = (document.getElementById('team2Name') as HTMLInputElement)?.value;

        if (!team1Name || !team2Name) {
            alert('Du skal indtaste navne på begge hold for at fortsætte');
            return;
        }

        // Opdater kundens holdnavne
        const customer = getCurrentCustomer();
        if (customer) {
            customer.teamNames = {
                team1: team1Name,
                team2: team2Name
            };
            saveToLocalStorage();
            
            // Opdater UI hvis der er et resultat
            if (lastCalculatedResult) {
                updateUI(lastCalculatedResult);
            }
            
            // Sikr at bookmaker inputs er oprettet og synlige
            createBookmakerInputs();
            
            // Scroll til odds sektionen og fokuser på første bookmaker
            const bookmakerInputs = document.getElementById('bookmakerInputs');
            if (bookmakerInputs) {
                bookmakerInputs.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Fokuser på første bookmaker input efter en kort forsinkelse
                setTimeout(() => {
                    const firstOddsInput = bookmakerInputs.querySelector('input[type="number"]') as HTMLInputElement;
                    if (firstOddsInput) {
                        firstOddsInput.focus();
                    }
                }, 500);
            }
            
            // Vis en kort bekræftelse
            const button = continueToOddsButton as HTMLButtonElement;
            const originalText = button.textContent;
            button.textContent = '✓ Fortsætter til odds...';
            button.classList.add('bg-green-600', 'hover:bg-green-700');
            button.classList.remove('btn-primary');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-600', 'hover:bg-green-700');
                button.classList.add('btn-primary');
            }, 2000);
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
    // Ensure ID starts with a letter for valid CSS selector
    let id = bookmakerName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (/^[0-9]/.test(id)) {
        id = 'bm-' + id;
    }
    return id;
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

            // Tjek for jævn fordeling af "kun hvis tab"-freebets
            const onlyIfLostFreebets = [...team1, ...draw, ...team2].filter(bm => {
                const bookmakerInfo = customer.bookmakers.find(b => b.name === bm.name);
                return bookmakerInfo?.bonusOnlyIfLost && bookmakerInfo.bonusType === 'freebet';
            });

            if (onlyIfLostFreebets.length > 1) {
                // Tæl hvor mange "kun hvis tab"-freebets der er på hvert udfald
                const team1Count = onlyIfLostFreebets.filter(bm => bm.betType === 'team1').length;
                const drawCount = onlyIfLostFreebets.filter(bm => bm.betType === 'draw').length;
                const team2Count = onlyIfLostFreebets.filter(bm => bm.betType === 'team2').length;

                // Beregn afvigelse fra jævn fordeling
                const totalCount = onlyIfLostFreebets.length;
                const expectedPerOutcome = totalCount / 3;
                
                const team1Deviation = Math.abs(team1Count - expectedPerOutcome);
                const drawDeviation = Math.abs(drawCount - expectedPerOutcome);
                const team2Deviation = Math.abs(team2Count - expectedPerOutcome);

                // Straf for ujævn fordeling - jo større afvigelse, jo større straf
                const distributionPenalty = (team1Deviation + drawDeviation + team2Deviation) * 10000;
                penalty += distributionPenalty;

                // Ekstra straf hvis alle "kun hvis tab"-freebets er på samme udfald
                if (team1Count === totalCount || drawCount === totalCount || team2Count === totalCount) {
                    penalty += 50000; // Meget stor straf for at placere alle på samme udfald
                }
            }
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

// Update summary cards with calculation results
function updateSummaryCards(result: ArbitrageResult, team1Name: string, team2Name: string): void {
    // Update profit card
    const profitCard = document.getElementById('profitCard');
    const profitValue = document.getElementById('profitValue');
    const profitPercentage = document.getElementById('profitPercentage');
    const profitIcon = document.getElementById('profitIcon');
    
    if (profitCard && profitValue && profitPercentage && profitIcon) {
        const profitClass = result.isArbitrage ? 'text-green-600' : 'text-red-600';
        const iconClass = result.isArbitrage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
        
        profitValue.textContent = `${result.profit.toLocaleString('da-DK')} DKK`;
        profitValue.className = `text-2xl font-bold ${profitClass}`;
        profitPercentage.textContent = `${result.profitPercentage.toFixed(2)}% ROI`;
        profitPercentage.className = `text-sm ${profitClass}`;
        profitIcon.className = `w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`;
    }

    // Update stake card
    const stakeValue = document.getElementById('stakeValue');
    const actualCost = document.getElementById('actualCost');
    
    if (stakeValue && actualCost) {
        stakeValue.textContent = `${result.totalStake.toLocaleString('da-DK')} DKK`;
        actualCost.textContent = `${result.totalActualCost.toLocaleString('da-DK')} DKK faktisk`;
    }

    // Update status card
    const statusCard = document.getElementById('statusCard');
    const statusValue = document.getElementById('statusValue');
    const statusSubtext = document.getElementById('statusSubtext');
    const statusIcon = document.getElementById('statusIcon');
    
    if (statusCard && statusValue && statusSubtext && statusIcon) {
        const statusClass = result.isArbitrage ? 'text-green-600' : 'text-red-600';
        const iconClass = result.isArbitrage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
        
        statusValue.textContent = result.isArbitrage ? 'Arbitrage fundet!' : 'Ingen arbitrage';
        statusValue.className = `text-lg font-bold ${statusClass}`;
        statusSubtext.textContent = result.isArbitrage ? 'Garanteret profit' : 'Prøv andre odds';
        statusIcon.className = `w-8 h-8 rounded-full flex items-center justify-center ${iconClass}`;
    }

    // Update potential returns
    const team1Return = document.getElementById('team1Return');
    const team1Label = document.getElementById('team1Label');
    const drawReturn = document.getElementById('drawReturn');
    const team2Return = document.getElementById('team2Return');
    const team2Label = document.getElementById('team2Label');
    
    if (team1Return && team1Label) {
        team1Return.textContent = `${result.potentialReturns.team1.toLocaleString('da-DK')} DKK`;
        team1Label.textContent = team1Name;
    }
    
    if (drawReturn) {
        drawReturn.textContent = `${result.potentialReturns.draw.toLocaleString('da-DK')} DKK`;
    }
    
    if (team2Return && team2Label) {
        team2Return.textContent = `${result.potentialReturns.team2.toLocaleString('da-DK')} DKK`;
        team2Label.textContent = team2Name;
    }
}

// Opdater updateUI funktionen til at håndtere empty state
function updateUI(result: ArbitrageResult): void {
    if (!result) return;
    lastCalculatedResult = result;

    // Gem beregning til historik
    const customer = getCurrentCustomer();
    if (customer && customer.teamNames) {
        saveCalculationToHistory(result, customer.teamNames, currentBetType);
    }

    const team1Name = customer.teamNames?.team1 || 'Hold 1';
    const team2Name = customer.teamNames?.team2 || 'Hold 2';

    const resultsElement = document.getElementById('results');
    const emptyState = document.getElementById('emptyState');
    const resultsBody = document.getElementById('resultsBody') as HTMLElement;
    
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
            <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gevinst</th>
        `;
    }

    // Generer tabel med alle bookmakere
    let tableHTML = '';
    result.allBookmakers.forEach((bm: ArbitrageResult['allBookmakers'][0]) => {
        // Beregn gevinst baseret på betType
        const potentialWin = bm.betType === 'team1' ? bm.team1Odds * bm.fixedStake :
                            bm.betType === 'draw' ? bm.drawOdds * bm.fixedStake :
                            bm.team2Odds * bm.fixedStake;

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
                <td class="px-4 py-3 text-right">
                    <div class="font-medium text-green-600">${potentialWin.toLocaleString('da-DK')} DKK</div>
                    ${bm.actualCost !== bm.fixedStake ? 
                        `<div class="text-xs text-green-600">Profit: ${(potentialWin - bm.actualCost).toLocaleString('da-DK')} DKK</div>` : 
                        ''}
                </td>
            </tr>
        `;
    });

    // Tilføj total række
    tableHTML += `
        <tr class="bg-gray-50 font-semibold border-t-2 border-gray-200">
            <td class="px-4 py-3">Total</td>
            <td class="px-4 py-3 text-right">${result.potentialReturns.team1.toLocaleString('da-DK')} DKK</td>
            <td class="px-4 py-3 text-right">${result.potentialReturns.draw.toLocaleString('da-DK')} DKK</td>
            <td class="px-4 py-3 text-right">${result.potentialReturns.team2.toLocaleString('da-DK')} DKK</td>
            <td class="px-4 py-3 text-right">
                <div>${result.totalStake.toLocaleString('da-DK')} DKK</div>
                <div class="text-sm text-gray-600">${result.totalActualCost.toLocaleString('da-DK')} DKK</div>
            </td>
            <td class="px-4 py-3 text-right">
                <div class="text-green-600">Min: ${Math.min(
                    result.potentialReturns.team1,
                    result.potentialReturns.draw,
                    result.potentialReturns.team2
                ).toLocaleString('da-DK')} DKK</div>
                <div class="text-sm text-green-600">Max: ${Math.max(
                    result.potentialReturns.team1,
                    result.potentialReturns.draw,
                    result.potentialReturns.team2
                ).toLocaleString('da-DK')} DKK</div>
            </td>
        </tr>
    `;
    
    resultsBody.innerHTML = tableHTML;

    // Update summary cards
    updateSummaryCards(result, team1Name, team2Name);
}

function createBookmakerInputs(): void {
    const container = document.getElementById('bookmakerInputs');
    if (!container) return;

    container.innerHTML = '';

    const customer = getCurrentCustomer();
    if (!customer) return;  // Sikr at vi har en kunde

    const bookmakers = customer.bookmakers;


    // Create bookmaker cards (always use compact view)
    bookmakers.forEach(bookmaker => {
        // Use compact card component
        const cardComponent = new BookmakerCard(bookmaker, customer.id);
        const cardElement = cardComponent.create();
        container.appendChild(cardElement);
    });
}

function gatherOddsData(): BookmakerOdds[] {
    const customer = getCurrentCustomer();
    const isBet2 = customer.betType === 'bonus';

    return customer.bookmakers.map(bookmaker => {
        const bookmakerId = generateBookmakerId(bookmaker.name);
        const team1Input = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement || 
                          document.getElementById(`${bookmakerId}-team1-inline`) as HTMLInputElement;
        const drawInput = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement || 
                         document.getElementById(`${bookmakerId}-draw-inline`) as HTMLInputElement;
        const team2Input = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement || 
                          document.getElementById(`${bookmakerId}-team2-inline`) as HTMLInputElement;
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

// Download CSV template
function downloadTemplate() {
    const customer = getCurrentCustomer();
    const bookmakers = customer.bookmakers;
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

// Export results to CSV
function exportResultsToCSV(result: ArbitrageResult): void {
    let csvContent = 'Bookmaker,Odds Hold 1,Odds Uafgjort,Odds Hold 2,Indsats,Gevinst\n';
    
    result.allBookmakers.forEach(bm => {
        const team1Odds = bm.team1Odds || 0;
        const drawOdds = bm.drawOdds || 0;
        const team2Odds = bm.team2Odds || 0;
        const stake = bm.fixedStake || 0;
        const profit = bm.potentialReturn || 0;
        
        csvContent += `${bm.name},${team1Odds},${drawOdds},${team2Odds},${stake},${profit}\n`;
    });
    
    // Add summary
    csvContent += `\nSummary\n`;
    csvContent += `Total Indsats,${result.totalStake}\n`;
    csvContent += `Faktisk Omkostning,${result.totalActualCost}\n`;
    csvContent += `Profit,${result.profit}\n`;
    csvContent += `ROI,${result.profitPercentage.toFixed(2)}%\n`;
    csvContent += `Arbitrage,${result.isArbitrage ? 'Ja' : 'Nej'}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `arbitrage-resultat-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event handler
document.addEventListener('DOMContentLoaded', () => {
    // Initialize user system and load from localStorage
    loadFromLocalStorage();
    
    // Create default customer if none exists
    if (customers.length === 0) {
        const defaultCustomer: Customer = {
            id: 'default-customer',
            name: 'Standard Kunde',
            bookmakers: BOOKMAKERS.map(bm => ({...bm})),
            teamNames: {
                team1: 'Hold 1',
                team2: 'Hold 2'
            },
            betType: 'qualifying'
        };
        customers.push(defaultCustomer);
        currentCustomerId = defaultCustomer.id;
        saveToLocalStorage();
    }
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Initialize UI components
    initializeThemeToggle();
    initializeHistoryPanel();
    
    createCustomerSelector(); // Vis tomme inputs først
    
    // Create bookmaker inputs if customer has team names
    const customer = getCurrentCustomer();
    if (customer && customer.teamNames && customer.teamNames.team1 && customer.teamNames.team2) {
        createBookmakerInputs();
    }
    
    const calculateButton = document.getElementById('calculateButton');
    calculateButton?.addEventListener('click', async () => {
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

    const exportButton = document.getElementById('exportResults');
    exportButton?.addEventListener('click', () => {
        if (lastCalculatedResult) {
            exportResultsToCSV(lastCalculatedResult);
        }
    });

    const downloadButton = document.getElementById('downloadTemplate');
    downloadButton?.addEventListener('click', () => {
        downloadTemplate();
    });

    // Upload button event listener
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('oddsFile') as HTMLInputElement;
    
    uploadButton?.addEventListener('click', () => {
        fileInput?.click();
    });
    
    fileInput?.addEventListener('change', (event) => {
        if (window.handleFileUpload) {
            window.handleFileUpload(event);
        } else {
            // Fallback: import and use the function
            import('./fileHandlers').then(module => {
                module.handleFileUpload(event);
            });
        }
    });

    // Importer og tilføj handleFileUpload til window objektet
    import('./fileHandlers').then(module => {
        window.handleFileUpload = module.handleFileUpload;
    });
}); 