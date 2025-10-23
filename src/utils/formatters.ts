// Formatter utilities for numbers, currency, dates, and other data

export class FormatterUtils {
    static formatCurrency(amount: number, currency: string = 'DKK', decimals: number = 0): string {
        return new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(amount);
    }

    static formatNumber(number: number, decimals: number = 2): string {
        return new Intl.NumberFormat('da-DK', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    }

    static formatPercentage(value: number, decimals: number = 1): string {
        return new Intl.NumberFormat('da-DK', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    }

    static formatOdds(odds: number, decimals: number = 2): string {
        return this.formatNumber(odds, decimals);
    }

    static formatStake(stake: number): string {
        return this.formatCurrency(stake, 'DKK', 0);
    }

    static formatProfit(profit: number): string {
        const formatted = this.formatCurrency(Math.abs(profit), 'DKK', 0);
        return profit >= 0 ? `+${formatted}` : `-${formatted}`;
    }

    static formatROI(roi: number): string {
        return this.formatPercentage(roi, 1);
    }

    static formatDate(date: Date, format: 'short' | 'medium' | 'long' | 'time' = 'medium'): string {
        const options: Intl.DateTimeFormatOptions = {
            short: { day: '2-digit', month: '2-digit', year: '2-digit' },
            medium: { day: '2-digit', month: 'short', year: 'numeric' },
            long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' }
        };

        return new Intl.DateTimeFormat('da-DK', options[format]).format(date);
    }

    static formatRelativeTime(date: Date): string {
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
            return this.formatDate(date, 'short');
        }
    }

    static formatDuration(milliseconds: number): string {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}t ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    }

    static formatFileSize(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${this.formatNumber(size, 1)} ${units[unitIndex]}`;
    }

    static formatTeamName(name: string, maxLength: number = 20): string {
        if (name.length <= maxLength) {
            return name;
        }
        return name.substring(0, maxLength - 3) + '...';
    }

    static formatBookmakerName(name: string): string {
        // Handle common bookmaker name variations
        const nameMap: { [key: string]: string } = {
            'Mr Green': 'Mr Green',
            'Mrgreen': 'Mr Green',
            'Mrplay': 'Mr Play',
            'Bet25': 'Bet25',
            '888sport': '888sport',
            'ComeOn': 'ComeOn',
            'NordicBet': 'NordicBet',
            'Cashpoint': 'Cashpoint',
            'Jackpotbet': 'Jackpotbet',
            'Getlucky': 'Get Lucky'
        };

        return nameMap[name] || name;
    }

    static formatBetType(betType: 'team1' | 'draw' | 'team2', teamNames?: { team1: string; team2: string }): string {
        if (!teamNames) {
            return betType === 'team1' ? 'Hold 1' : betType === 'draw' ? 'Uafgjort' : 'Hold 2';
        }

        switch (betType) {
            case 'team1':
                return teamNames.team1;
            case 'draw':
                return 'Uafgjort';
            case 'team2':
                return teamNames.team2;
        }
    }

    static formatCalculationSummary(result: any): string {
        const profit = this.formatProfit(result.profit);
        const roi = this.formatROI(result.profitPercentage);
        const stake = this.formatStake(result.totalStake);
        
        return `${profit} (${roi}) fra ${stake}`;
    }

    static formatHistoryEntry(entry: any): string {
        const teams = `${entry.teamNames.team1} vs ${entry.teamNames.team2}`;
        const profit = this.formatProfit(entry.profit);
        const time = this.formatRelativeTime(entry.timestamp);
        
        return `${teams} - ${profit} (${time})`;
    }

    static truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + '...';
    }

    static capitalizeFirst(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    static formatPhoneNumber(phone: string): string {
        // Danish phone number formatting
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 8) {
            return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6)}`;
        }
        return phone;
    }

    static formatEmail(email: string): string {
        return email.toLowerCase().trim();
    }

    static formatUrl(url: string): string {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    }

    static formatCsvValue(value: any): string {
        if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
        }
        return String(value);
    }

    static parseNumber(value: string): number {
        // Handle Danish number format (comma as decimal separator)
        const cleaned = value.replace(/[^\d,.-]/g, '');
        const normalized = cleaned.replace(',', '.');
        return parseFloat(normalized) || 0;
    }

    static parseCurrency(value: string): number {
        // Remove currency symbols and parse
        const cleaned = value.replace(/[^\d,.-]/g, '');
        return this.parseNumber(cleaned);
    }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static isValidPhoneNumber(phone: string): boolean {
        const phoneRegex = /^(\+45\s?)?(\d{2}\s?){3}\d{2}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    static generateId(): string {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    static generateShortId(): string {
        return Math.random().toString(36).substr(2, 8);
    }
}
