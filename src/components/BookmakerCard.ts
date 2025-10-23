// Compact Bookmaker Card Component - Enhanced UI for bookmaker input management

import { CustomerBookmaker } from '../main';
import { FormatterUtils } from '../utils/formatters';
import { AnimationUtils } from '../utils/animations';

export class BookmakerCard {
    private bookmaker: CustomerBookmaker;
    private customerId: string;
    private isExpanded: boolean = false;
    private element: HTMLElement | null = null;

    constructor(bookmaker: CustomerBookmaker, customerId: string) {
        this.bookmaker = bookmaker;
        this.customerId = customerId;
    }

    create(): HTMLElement {
        const card = document.createElement('div');
        card.className = 'bookmaker-compact-card';
        card.setAttribute('data-bookmaker', this.bookmaker.name.toLowerCase().replace(/\s+/g, '-'));
        
        card.innerHTML = this.renderCard();
        this.element = card;
        
        this.attachEventListeners();
        this.syncInputFields(); // Initial sync
        return card;
    }

    private renderCard(): string {
        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        const odds = this.bookmaker.odds || { team1: 0, draw: 0, team2: 0 };
        
        return `
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        ${this.bookmaker.name.charAt(0)}
                    </div>
                    <div>
                        <h3 class="font-semibold text-sm">${this.bookmaker.name}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            ${this.renderBadges()}
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center gap-2">
                    <!-- Active Toggle -->
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" 
                               id="${bookmakerId}-active" 
                               class="sr-only peer" 
                               ${this.bookmaker.isActive ? 'checked' : ''}>
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    
                    <!-- Expand/Collapse Button -->
                    <button class="expand-btn p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-4 h-4 transform transition-transform ${this.isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Collapsed View - Quick Odds Input -->
            <div class="collapsed-view ${this.isExpanded ? 'hidden' : ''}">
                <div class="flex items-center gap-3">
                    <div class="flex-1">
                        <label class="text-xs text-gray-500 block mb-1">Hold 1</label>
                        <input type="number" 
                               id="${bookmakerId}-team1-inline" 
                               class="inline-odds" 
                               value="${odds.team1 || ''}" 
                               placeholder="1.50" 
                               step="0.01" 
                               min="1.01">
                    </div>
                    <div class="flex-1">
                        <label class="text-xs text-gray-500 block mb-1">Uafgjort</label>
                        <input type="number" 
                               id="${bookmakerId}-draw-inline" 
                               class="inline-odds" 
                               value="${odds.draw || ''}" 
                               placeholder="3.20" 
                               step="0.01" 
                               min="1.01">
                    </div>
                    <div class="flex-1">
                        <label class="text-xs text-gray-500 block mb-1">Hold 2</label>
                        <input type="number" 
                               id="${bookmakerId}-team2-inline" 
                               class="inline-odds" 
                               value="${odds.team2 || ''}" 
                               placeholder="2.80" 
                               step="0.01" 
                               min="1.01">
                    </div>
                </div>
                
                <!-- Bet 2 Fields (only visible when collapsed in Bet 2 mode) -->
                ${this.renderBet2Fields(bookmakerId)}
            </div>

            <!-- Expanded View -->
            <div class="expanded-view ${this.isExpanded ? '' : 'hidden'}">
                ${this.renderExpandedContent(bookmakerId)}
            </div>
        `;
    }

    private renderBadges(): string {
        const badges = [];
        
        if (this.bookmaker.bonusType && this.bookmaker.bonusType !== 'none') {
            const bonusClass = this.bookmaker.bonusType === 'freebet' ? 'badge-success' : 'badge-primary';
            const bonusText = this.bookmaker.bonusType === 'freebet' ? 'Freebet' : 'Matching';
            const amount = FormatterUtils.formatStake(this.bookmaker.bonusAmount || 0);
            const onlyIfLost = this.bookmaker.bonusOnlyIfLost ? ' (kun hvis tabt)' : '';
            
            badges.push(`<span class="badge ${bonusClass}">${bonusText} ${amount}${onlyIfLost}</span>`);
        }
        
        if (this.bookmaker.isBonusLocked) {
            badges.push('<span class="badge badge-warning">🔒 Låst</span>');
        }
        
        if (this.bookmaker.minOdds) {
            badges.push(`<span class="badge badge-gradient">Min ${this.bookmaker.minOdds}</span>`);
        }
        
        return badges.join('');
    }

    private renderExpandedContent(bookmakerId: string): string {
        const odds = this.bookmaker.odds || { team1: 0, draw: 0, team2: 0 };
        
        return `
            <!-- Detailed Odds Grid -->
            <div class="odds-grid mb-4">
                <div>
                    <label class="odds-label">Hold 1</label>
                    <input type="number" 
                           id="${bookmakerId}-team1" 
                           class="inline-odds" 
                           value="${odds.team1 || ''}" 
                           placeholder="1.50" 
                           step="0.01" 
                           min="1.01">
                </div>
                <div>
                    <label class="odds-label">Uafgjort</label>
                    <input type="number" 
                           id="${bookmakerId}-draw" 
                           class="inline-odds" 
                           value="${odds.draw || ''}" 
                           placeholder="3.20" 
                           step="0.01" 
                           min="1.01">
                </div>
                <div>
                    <label class="odds-label">Hold 2</label>
                    <input type="number" 
                           id="${bookmakerId}-team2" 
                           class="inline-odds" 
                           value="${odds.team2 || ''}" 
                           placeholder="2.80" 
                           step="0.01" 
                           min="1.01">
                </div>
            </div>

            <!-- Bet Tracking (for Bet 2) - Moved before bonus info -->
            ${this.renderBetTracking(bookmakerId)}

            <!-- Bonus Information -->
            ${this.renderBonusInfo()}

            <!-- Additional Info -->
            <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-500">Fast Indsats:</span>
                        <span class="font-mono ml-2">${FormatterUtils.formatStake(this.bookmaker.fixedStake)}</span>
                    </div>
                    <div>
                        <span class="text-gray-500">Faktisk Omkostning:</span>
                        <span class="font-mono ml-2">${FormatterUtils.formatStake(this.bookmaker.actualCost)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    private renderBonusInfo(): string {
        if (!this.bookmaker.bonusType || this.bookmaker.bonusType === 'none') {
            return '';
        }

        return `
            <div class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-blue-800 dark:text-blue-200">
                        ${this.bookmaker.bonusType === 'freebet' ? 'Freebet Bonus' : 'Matching Bonus'}
                    </h4>
                    <span class="text-sm font-mono text-blue-600 dark:text-blue-400">
                        ${FormatterUtils.formatStake(this.bookmaker.bonusAmount || 0)}
                    </span>
                </div>
                
                <div class="text-sm text-blue-700 dark:text-blue-300">
                    <p>Kræver ${FormatterUtils.formatStake(this.bookmaker.qualifyingBetAmount || 0)} kvalificerende bet</p>
                    <p>Minimum odds: ${this.bookmaker.bonusMinOdds}</p>
                    ${this.bookmaker.bonusOnlyIfLost ? '<p class="text-orange-600 dark:text-orange-400">⚠️ Kun hvis kvalificerende bet taber</p>' : ''}
                </div>
                
                <!-- Brugt i Bet 1 Checkbox -->
                <div class="mt-3">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <div class="relative">
                            <input type="checkbox" 
                                   id="${this.generateBookmakerId(this.bookmaker.name)}-used-in-bet1-bonus" 
                                   class="sr-only peer" 
                                   ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                            <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                        </div>
                        <span class="text-sm text-blue-700 dark:text-blue-300">Brugt i Bet 1</span>
                    </label>
                </div>
            </div>
        `;
    }

    private renderBet2Fields(bookmakerId: string): string {
        // Only show in Bet 2 mode
        const currentBetType = (window as any).currentBetType;
        if (currentBetType !== 'bonus') {
            return '';
        }

        // Different fields based on bonus type
        if (this.bookmaker.bonusOnlyIfLost) {
            // For "only if lost" bonus: Show Bet 1 result radio buttons and "Gevinst fra Bet 1"
            return `
                <div class="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold mb-3 text-orange-800 dark:text-orange-200">Bet Resultater</h4>
                    
                    <!-- Bet 1 Resultat -->
                    <div class="mb-3">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-2">Bet 1 resultat</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="won" 
                                       ${this.bookmaker.bet1Result === 'won' ? 'checked' : ''}
                                       class="text-green-600 focus:ring-green-500">
                                <span class="text-sm text-green-600">Vundet</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="lost" 
                                       ${this.bookmaker.bet1Result === 'lost' ? 'checked' : ''}
                                       class="text-red-600 focus:ring-red-500">
                                <span class="text-sm text-red-600">Tabt</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Gevinst fra Bet 1 -->
                    <div class="mb-3">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Gevinst fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-profit" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Profit || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                            <span class="text-sm text-orange-600">(Freebet: ${this.bookmaker.bonusAmount || 0} DKK)</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Checkbox -->
                    <div class="mb-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                    
                    <div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            <p class="text-xs text-blue-700 dark:text-blue-300">
                                <span class="font-medium">Freebet betingelse:</span>
                                <span data-freebet-status>
                                    ${this.bookmaker.bet1Result === 'lost' ? 
                                        '<span class="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span>' :
                                        this.bookmaker.bet1Result === 'won' ?
                                        '<span class="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span>' :
                                        '<span class="text-gray-600">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>'
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else if (this.bookmaker.bonusType === 'matchingBonus') {
            // For matching bonus: Show only "Saldo fra Bet 1"
            return `
                <div class="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 class="font-semibold mb-3 text-blue-800 dark:text-blue-200">Bet Resultater</h4>
                    
                    <!-- Saldo fra Bet 1 -->
                    <div class="mb-3">
                        <label class="text-sm text-blue-700 dark:text-blue-300 block mb-1">Saldo fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-balance" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Balance || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Checkbox -->
                    <div class="mb-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-blue-700 dark:text-blue-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (this.bookmaker.bonusType === 'freebet' && this.bookmaker.bonusOnlyIfLost) {
            // For "only if lost" freebet: Show Bet 1 result radio buttons and "Gevinst fra Bet 1"
            return `
                <div class="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold mb-3 text-orange-800 dark:text-orange-200">Bet Resultater</h4>
                    
                    <!-- Bet 1 Resultat -->
                    <div class="mb-3">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-2">Bet 1 resultat</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="won" 
                                       ${this.bookmaker.bet1Result === 'won' ? 'checked' : ''}
                                       class="text-green-600 focus:ring-green-500">
                                <span class="text-sm text-green-600">Vundet</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="lost" 
                                       ${this.bookmaker.bet1Result === 'lost' ? 'checked' : ''}
                                       class="text-red-600 focus:ring-red-500">
                                <span class="text-sm text-red-600">Tabt</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Gevinst fra Bet 1 -->
                    <div class="mb-3">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Gevinst fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-profit" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Profit || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                            <span class="text-sm text-orange-600">(Freebet: ${this.bookmaker.bonusAmount || 0} DKK)</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Checkbox -->
                    <div class="mb-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                    
                    <div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            <p class="text-xs text-blue-700 dark:text-blue-300">
                                <span class="font-medium">Freebet betingelse:</span>
                                <span data-freebet-status>
                                    ${this.bookmaker.bet1Result === 'lost' ? 
                                        '<span class="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span>' :
                                        this.bookmaker.bet1Result === 'won' ?
                                        '<span class="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span>' :
                                        '<span class="text-gray-600">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>'
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // For other bonus types: Show only "Saldo fra Bet 1" (no radio buttons)
            return `
                <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 class="font-semibold mb-3">Bet Resultater</h4>
                    
                    <!-- Saldo fra Bet 1 -->
                    <div class="mb-3">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Saldo fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-balance" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Balance || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Toggle -->
                    <div class="mb-3">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                </div>
            `;
        }
    }

    private renderBetTracking(bookmakerId: string): string {
        // Only show in Bet 2 mode
        const currentBetType = (window as any).currentBetType;
        if (currentBetType !== 'bonus') {
            return '';
        }

        // Different fields based on bonus type
        if (this.bookmaker.bonusOnlyIfLost) {
            // For "only if lost" bonus: Show Bet 1 result radio buttons and "Gevinst fra Bet 1"
            return `
                <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold mb-3 text-orange-800 dark:text-orange-200">Bet Resultater</h4>
                    
                    <!-- Bet 1 Resultat -->
                    <div class="mb-4">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-2">Bet 1 resultat</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="won" 
                                       ${this.bookmaker.bet1Result === 'won' ? 'checked' : ''}
                                       class="text-green-600 focus:ring-green-500">
                                <span class="text-sm text-green-600">Vundet</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="lost" 
                                       ${this.bookmaker.bet1Result === 'lost' ? 'checked' : ''}
                                       class="text-red-600 focus:ring-red-500">
                                <span class="text-sm text-red-600">Tabt</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Gevinst fra Bet 1 -->
                    <div class="mb-4">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Gevinst fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-profit" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Profit || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                            <span class="text-sm text-orange-600">(Freebet: ${this.bookmaker.bonusAmount || 0} DKK)</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Toggle -->
                    <div class="mb-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                    
                    <div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            <p class="text-xs text-blue-700 dark:text-blue-300">
                                <span class="font-medium">Freebet betingelse:</span>
                                <span data-freebet-status>
                                    ${this.bookmaker.bet1Result === 'lost' ? 
                                        '<span class="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span>' :
                                        this.bookmaker.bet1Result === 'won' ?
                                        '<span class="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span>' :
                                        '<span class="text-gray-600">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>'
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } else if (this.bookmaker.bonusType === 'matchingBonus') {
            // For matching bonus: Show only "Saldo fra Bet 1"
            return `
                <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold mb-3 text-orange-800 dark:text-orange-200">Bet Resultater</h4>
                    
                    <!-- Saldo fra Bet 1 -->
                    <div class="mb-4">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Saldo fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-balance" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Balance || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Toggle -->
                    <div class="mb-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                </div>
            `;
        } else {
            // For other bonus types: Show both fields
            return `
                <div class="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 class="font-semibold mb-3 text-orange-800 dark:text-orange-200">Bet Resultater</h4>
                    
                    <!-- Saldo fra Bet 1 -->
                    <div class="mb-4">
                        <label class="text-sm text-orange-700 dark:text-orange-300 block mb-1">Saldo fra Bet 1</label>
                        <div class="flex items-center gap-2">
                            <input type="number" 
                                   id="${bookmakerId}-bet1-balance" 
                                   class="input-field text-sm flex-1" 
                                   value="${this.bookmaker.bet1Balance || ''}" 
                                   placeholder="0" 
                                   step="0.01" 
                                   min="0">
                            <span class="text-sm text-gray-500">DKK</span>
                        </div>
                    </div>
                    
                    <!-- Bet 1 Resultat -->
                    <div class="mb-4">
                        <label class="text-sm text-gray-600 dark:text-gray-400 block mb-2">Bet 1 Resultat</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="won" 
                                       ${this.bookmaker.bet1Result === 'won' ? 'checked' : ''}
                                       class="text-green-600 focus:ring-green-500">
                                <span class="text-sm text-gray-700">Vundet</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="lost" 
                                       ${this.bookmaker.bet1Result === 'lost' ? 'checked' : ''}
                                       class="text-red-600 focus:ring-red-500">
                                <span class="text-sm text-gray-700">Tabt</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" 
                                       name="${bookmakerId}-bet1-result" 
                                       value="unknown" 
                                       ${this.bookmaker.bet1Result === 'unknown' || !this.bookmaker.bet1Result ? 'checked' : ''}
                                       class="text-gray-600 focus:ring-gray-500">
                                <span class="text-sm text-gray-700">Ikke afgjort</span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Brugt i Bet 1 Toggle -->
                    <div class="mb-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <div class="relative">
                                <input type="checkbox" 
                                       id="${bookmakerId}-used-in-bet1" 
                                       class="sr-only peer" 
                                       ${this.bookmaker.usedInBet1 ? 'checked' : ''}>
                                <div class="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                            </div>
                            <span class="text-sm text-orange-700 dark:text-orange-300">Brugt i Bet 1</span>
                        </label>
                    </div>
                    
                </div>
            `;
        }
    }

    private attachEventListeners(): void {
        if (!this.element) return;

        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        
        // Active toggle
        const activeToggle = this.element.querySelector(`#${bookmakerId}-active`) as HTMLInputElement;
        activeToggle?.addEventListener('change', (e) => {
            this.bookmaker.isActive = (e.target as HTMLInputElement).checked;
            this.updateCustomerData();
        });

        // Expand/collapse button
        const expandBtn = this.element.querySelector('.expand-btn') as HTMLButtonElement;
        expandBtn?.addEventListener('click', () => {
            this.toggleExpanded();
        });

        // Inline odds inputs
        ['team1-inline', 'draw-inline', 'team2-inline'].forEach(type => {
            const input = this.element?.querySelector(`#${bookmakerId}-${type}`) as HTMLInputElement;
            input?.addEventListener('input', (e) => {
                const value = parseFloat((e.target as HTMLInputElement).value) || 0;
                const field = type.split('-')[0] as 'team1' | 'draw' | 'team2';
                
                if (!this.bookmaker.odds) {
                    this.bookmaker.odds = { team1: 0, draw: 0, team2: 0 };
                }
                this.bookmaker.odds[field] = value;
                
                // Sync with expanded view
                const expandedInput = this.element?.querySelector(`#${bookmakerId}-${field}`) as HTMLInputElement;
                if (expandedInput) {
                    expandedInput.value = value.toString();
                }
                
                this.updateCustomerData();
            });
        });

        // Detailed odds inputs
        ['team1', 'draw', 'team2'].forEach(type => {
            const input = this.element?.querySelector(`#${bookmakerId}-${type}`) as HTMLInputElement;
            input?.addEventListener('input', (e) => {
                const value = parseFloat((e.target as HTMLInputElement).value) || 0;
                
                if (!this.bookmaker.odds) {
                    this.bookmaker.odds = { team1: 0, draw: 0, team2: 0 };
                }
                this.bookmaker.odds[type as 'team1' | 'draw' | 'team2'] = value;
                
                // Sync with inline view
                const inlineInput = this.element?.querySelector(`#${bookmakerId}-${type}-inline`) as HTMLInputElement;
                if (inlineInput) {
                    inlineInput.value = value.toString();
                }
                
                this.updateCustomerData();
            });
        });

        // Bet 1 Balance
        const bet1Balance = this.element.querySelector(`#${bookmakerId}-bet1-balance`) as HTMLInputElement;
        bet1Balance?.addEventListener('input', (e) => {
            this.bookmaker.bet1Balance = parseFloat((e.target as HTMLInputElement).value) || 0;
            this.updateCustomerData();
        });

        // Bet 1 Profit (for only if lost bonus)
        const bet1Profit = this.element.querySelector(`#${bookmakerId}-bet1-profit`) as HTMLInputElement;
        bet1Profit?.addEventListener('input', (e) => {
            this.bookmaker.bet1Profit = parseFloat((e.target as HTMLInputElement).value) || 0;
            this.updateCustomerData();
        });

        // Used in Bet 1 Toggle
        const usedInBet1Toggle = this.element.querySelector(`#${bookmakerId}-used-in-bet1`) as HTMLInputElement;
        usedInBet1Toggle?.addEventListener('change', (e) => {
            this.bookmaker.usedInBet1 = (e.target as HTMLInputElement).checked;
            this.updateCustomerData();
        });

        // Used in Bet 1 Toggle (Bonus section)
        const usedInBet1BonusToggle = this.element.querySelector(`#${bookmakerId}-used-in-bet1-bonus`) as HTMLInputElement;
        usedInBet1BonusToggle?.addEventListener('change', (e) => {
            this.bookmaker.usedInBet1 = (e.target as HTMLInputElement).checked;
            this.updateCustomerData();
        });

        // Bet result tracking - Radio buttons
        const bet1ResultRadios = this.element.querySelectorAll(`input[name="${bookmakerId}-bet1-result"]`) as NodeListOf<HTMLInputElement>;
        bet1ResultRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if ((e.target as HTMLInputElement).checked) {
                    this.bookmaker.bet1Result = (e.target as HTMLInputElement).value as 'won' | 'lost' | 'unknown';
                    this.updateCustomerData();
                    this.updateFreebetStatus(); // Update freebet status text
                }
            });
        });

        const bet2ResultRadios = this.element.querySelectorAll(`input[name="${bookmakerId}-bet2-result"]`) as NodeListOf<HTMLInputElement>;
        bet2ResultRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if ((e.target as HTMLInputElement).checked) {
                    this.bookmaker.bet2Result = (e.target as HTMLInputElement).value as 'won' | 'lost' | 'unknown';
                    this.updateCustomerData();
                }
            });
        });
    }

    private toggleExpanded(): void {
        this.isExpanded = !this.isExpanded;
        
        const expandedView = this.element?.querySelector('.expanded-view') as HTMLElement;
        const collapsedView = this.element?.querySelector('.collapsed-view') as HTMLElement;
        const expandIcon = this.element?.querySelector('.expand-btn svg') as HTMLElement;
        
        if (this.isExpanded) {
            // Show expanded view, hide collapsed view
            if (expandedView) {
                expandedView.classList.remove('hidden');
                AnimationUtils.fadeIn(expandedView, 200);
            }
            if (collapsedView) {
                collapsedView.classList.add('hidden');
            }
        } else {
            // Show collapsed view, hide expanded view
            if (expandedView) {
                AnimationUtils.fadeOut(expandedView, 200).then(() => {
                    expandedView.classList.add('hidden');
                });
            }
            if (collapsedView) {
                collapsedView.classList.remove('hidden');
            }
        }
        
        if (expandIcon) {
            expandIcon.style.transform = this.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        
        // Update card class
        if (this.element) {
            if (this.isExpanded) {
                this.element.classList.add('expanded');
            } else {
                this.element.classList.remove('expanded');
            }
        }
        
        // Sync input fields when toggling
        this.syncInputFields();
    }

    private syncInputFields(): void {
        if (!this.element) return;
        
        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        
        // Sync odds fields
        ['team1', 'draw', 'team2'].forEach(field => {
            const expandedInput = this.element?.querySelector(`#${bookmakerId}-${field}`) as HTMLInputElement;
            const inlineInput = this.element?.querySelector(`#${bookmakerId}-${field}-inline`) as HTMLInputElement;
            
            if (expandedInput && inlineInput) {
                // Sync both ways - use the value from the currently visible input
                if (this.isExpanded) {
                    // If expanded view is visible, sync from expanded to inline
                    const expandedValue = parseFloat(expandedInput.value) || 0;
                    inlineInput.value = expandedValue.toString();
                } else {
                    // If collapsed view is visible, sync from inline to expanded
                    const inlineValue = parseFloat(inlineInput.value) || 0;
                    expandedInput.value = inlineValue.toString();
                }
            }
        });
        
        // Sync bet 1 balance fields
        const bet1BalanceExpanded = this.element?.querySelector(`#${bookmakerId}-bet1-balance`) as HTMLInputElement;
        const bet1BalanceCollapsed = this.element?.querySelector(`#${bookmakerId}-bet1-balance-collapsed`) as HTMLInputElement;
        
        if (bet1BalanceExpanded && bet1BalanceCollapsed) {
            if (this.isExpanded) {
                const expandedValue = parseFloat(bet1BalanceExpanded.value) || 0;
                bet1BalanceCollapsed.value = expandedValue.toString();
            } else {
                const collapsedValue = parseFloat(bet1BalanceCollapsed.value) || 0;
                bet1BalanceExpanded.value = collapsedValue.toString();
            }
        }
        
        // Sync bet 1 profit fields
        const bet1ProfitExpanded = this.element?.querySelector(`#${bookmakerId}-bet1-profit`) as HTMLInputElement;
        const bet1ProfitCollapsed = this.element?.querySelector(`#${bookmakerId}-bet1-profit-collapsed`) as HTMLInputElement;
        
        if (bet1ProfitExpanded && bet1ProfitCollapsed) {
            if (this.isExpanded) {
                const expandedValue = parseFloat(bet1ProfitExpanded.value) || 0;
                bet1ProfitCollapsed.value = expandedValue.toString();
            } else {
                const collapsedValue = parseFloat(bet1ProfitCollapsed.value) || 0;
                bet1ProfitExpanded.value = collapsedValue.toString();
            }
        }
    }

    private updateFreebetStatus(): void {
        if (!this.element) return;
        
        // Find all freebet status elements and update them
        const freebetStatusElements = this.element.querySelectorAll('[data-freebet-status]');
        freebetStatusElements.forEach(element => {
            const statusElement = element as HTMLElement;
            if (this.bookmaker.bonusOnlyIfLost) {
                if (this.bookmaker.bet1Result === 'lost') {
                    statusElement.innerHTML = '<span class="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span>';
                } else if (this.bookmaker.bet1Result === 'won') {
                    statusElement.innerHTML = '<span class="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span>';
                } else {
                    statusElement.innerHTML = '<span class="text-gray-600">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>';
                }
            }
        });
    }

    private updateCustomerData(): void {
        // Find the customer and update the bookmaker data
        const customers = (window as any).customers;
        const customer = customers.find((c: any) => c.id === this.customerId);
        
        if (customer) {
            const bookmakerIndex = customer.bookmakers.findIndex((b: any) => b.name === this.bookmaker.name);
            if (bookmakerIndex !== -1) {
                customer.bookmakers[bookmakerIndex] = { ...this.bookmaker };
            }
        }
    }

    private generateBookmakerId(name: string): string {
        // Ensure ID starts with a letter for valid CSS selector
        let id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (/^[0-9]/.test(id)) {
            id = 'bm-' + id;
        }
        return id;
    }

    // Public methods for external control
    public expand(): void {
        if (!this.isExpanded) {
            this.toggleExpanded();
        }
    }

    public collapse(): void {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
    }

    public setActive(active: boolean): void {
        this.bookmaker.isActive = active;
        const activeToggle = this.element?.querySelector('input[type="checkbox"]') as HTMLInputElement;
        if (activeToggle) {
            activeToggle.checked = active;
        }
        this.updateCustomerData();
    }

    public updateOdds(odds: { team1: number; draw: number; team2: number }): void {
        this.bookmaker.odds = odds;
        
        // Update all input fields
        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        ['team1', 'draw', 'team2'].forEach(type => {
            const input = this.element?.querySelector(`#${bookmakerId}-${type}`) as HTMLInputElement;
            const inlineInput = this.element?.querySelector(`#${bookmakerId}-${type}-inline`) as HTMLInputElement;
            
            if (input) input.value = odds[type as 'team1' | 'draw' | 'team2'].toString();
            if (inlineInput) inlineInput.value = odds[type as 'team1' | 'draw' | 'team2'].toString();
        });
        
        this.updateCustomerData();
    }

    public syncInputFields(): void {
        if (!this.element) return;
        
        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        
        // Sync odds fields
        ['team1', 'draw', 'team2'].forEach(field => {
            const expandedInput = this.element?.querySelector(`#${bookmakerId}-${field}`) as HTMLInputElement;
            const inlineInput = this.element?.querySelector(`#${bookmakerId}-${field}-inline`) as HTMLInputElement;
            
            if (expandedInput && inlineInput) {
                // Sync both ways - use the value from the currently visible input
                if (this.isExpanded) {
                    // If expanded view is visible, sync from expanded to inline
                    const expandedValue = parseFloat(expandedInput.value) || 0;
                    inlineInput.value = expandedValue.toString();
                } else {
                    // If collapsed view is visible, sync from inline to expanded
                    const inlineValue = parseFloat(inlineInput.value) || 0;
                    expandedInput.value = inlineValue.toString();
                }
            }
        });
    }

    public setUsedInBet1(used: boolean): void {
        this.bookmaker.usedInBet1 = used;
        const bookmakerId = this.generateBookmakerId(this.bookmaker.name);
        
        // Update both checkboxes
        const usedInBet1Toggle = this.element?.querySelector(`#${bookmakerId}-used-in-bet1`) as HTMLInputElement;
        const usedInBet1BonusToggle = this.element?.querySelector(`#${bookmakerId}-used-in-bet1-bonus`) as HTMLInputElement;
        
        if (usedInBet1Toggle) usedInBet1Toggle.checked = used;
        if (usedInBet1BonusToggle) usedInBet1BonusToggle.checked = used;
        
        this.updateCustomerData();
    }

    public destroy(): void {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}
