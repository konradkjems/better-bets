// History Service - Manages calculation history and localStorage operations

export interface CalculationHistory {
    id: string;
    timestamp: Date;
    teamNames: {
        team1: string;
        team2: string;
    };
    betType: 'qualifying' | 'bonus';
    result: any; // ArbitrageResult type
    bookmakersUsed: string[];
    profit: number;
    profitPercentage: number;
    customerId: string;
    oddsData?: any[]; // BookmakerOdds[] type
}

export interface HistoryFilters {
    timeRange: 'today' | 'week' | 'month' | 'all';
    betType: 'all' | 'qualifying' | 'bonus';
    searchQuery: string;
}

export class HistoryService {
    private static readonly STORAGE_KEY = 'bb_calculation_history';
    private static readonly MAX_HISTORY_SIZE = 100;

    static saveCalculation(calculation: CalculationHistory): void {
        try {
            const history = this.getHistory();
            history.unshift(calculation);
            
            // Keep only the most recent calculations
            if (history.length > this.MAX_HISTORY_SIZE) {
                history.splice(this.MAX_HISTORY_SIZE);
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
        } catch (error) {
            console.error('Error saving calculation to history:', error);
        }
    }

    static getHistory(): CalculationHistory[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (!stored) return [];
            
            const history = JSON.parse(stored);
            return history.map((item: any) => ({
                ...item,
                timestamp: new Date(item.timestamp)
            }));
        } catch (error) {
            console.error('Error loading calculation history:', error);
            return [];
        }
    }

    static filterHistory(filters: HistoryFilters): CalculationHistory[] {
        const history = this.getHistory();
        let filtered = [...history];

        // Filter by time range
        const now = new Date();
        switch (filters.timeRange) {
            case 'today':
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                filtered = filtered.filter(item => item.timestamp >= today);
                break;
            case 'week':
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(item => item.timestamp >= weekAgo);
                break;
            case 'month':
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(item => item.timestamp >= monthAgo);
                break;
        }

        // Filter by bet type
        if (filters.betType !== 'all') {
            filtered = filtered.filter(item => item.betType === filters.betType);
        }

        // Filter by search query
        if (filters.searchQuery.trim()) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
                item.teamNames.team1.toLowerCase().includes(query) ||
                item.teamNames.team2.toLowerCase().includes(query) ||
                item.bookmakersUsed.some(bm => bm.toLowerCase().includes(query))
            );
        }

        return filtered;
    }

    static deleteCalculation(id: string): void {
        try {
            const history = this.getHistory();
            const filtered = history.filter(item => item.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
        } catch (error) {
            console.error('Error deleting calculation from history:', error);
        }
    }

    static clearHistory(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing calculation history:', error);
        }
    }

    static exportHistory(): string {
        const history = this.getHistory();
        return JSON.stringify(history, null, 2);
    }

    static importHistory(jsonData: string): boolean {
        try {
            const history = JSON.parse(jsonData);
            if (Array.isArray(history)) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing calculation history:', error);
            return false;
        }
    }

    static getHistoryStats(): {
        totalCalculations: number;
        totalProfit: number;
        averageROI: number;
        successRate: number;
    } {
        const history = this.getHistory();
        
        if (history.length === 0) {
            return {
                totalCalculations: 0,
                totalProfit: 0,
                averageROI: 0,
                successRate: 0
            };
        }

        const totalProfit = history.reduce((sum, item) => sum + item.profit, 0);
        const averageROI = history.reduce((sum, item) => sum + item.profitPercentage, 0) / history.length;
        const profitableCalculations = history.filter(item => item.profit > 0).length;
        const successRate = (profitableCalculations / history.length) * 100;

        return {
            totalCalculations: history.length,
            totalProfit,
            averageROI,
            successRate
        };
    }
}
