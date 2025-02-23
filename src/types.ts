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

export interface Bookmaker {
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
    bet1Balance?: number;
    bet1Profit?: number;
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
}

export interface Customer {
    id?: string;
    name: string;
    email: string;
    bookmakers: Bookmaker[];
    settings?: {
        defaultStake?: number;
        preferredLeagues?: string[];
        notifications?: boolean;
    };
} 