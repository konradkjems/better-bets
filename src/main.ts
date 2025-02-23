import { fetchSoccerMatches, convertApiOddsToBookmakerOdds, SOCCER_LEAGUES } from './api';
import type { BookmakerOdds, Bookmaker, Customer } from './types';
import { formatOdds, formatMoney, formatDate, calculateROI, groupBookmakersByType, validateStake, calculateTotalStake, calculateTotalProfit } from './utils';
import { handleFileUpload, downloadTemplate } from './fileHandlers';

interface BookmakerGroup {
    type: string;
    need: number;
    odds: number;
    current: BookmakerOdds[];
}

let selectedMatch: {
    homeTeam: string;
    awayTeam: string;
    bookmakers: BookmakerOdds[];
} | null = null;

let groups: BookmakerGroup[] = [];

// Resten af main.ts koden kommer her... 