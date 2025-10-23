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
