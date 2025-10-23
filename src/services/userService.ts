// User Service - Manages user preferences and settings

export interface UserPreferences {
    darkMode: boolean;
    compactView: boolean;
    defaultBookmakers: string[];
    autoSave: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
}

export class UserService {
    private static readonly PREFERENCES_KEY = 'bb_user_preferences';
    private static readonly USER_KEY = 'bb_user_data';

    static getDefaultPreferences(): UserPreferences {
        return {
            darkMode: false,
            compactView: false,
            defaultBookmakers: ['Unibet', 'Bet365', 'LeoVegas'],
            autoSave: true
        };
    }

    static getDefaultUser(): User {
        return {
            id: 'default-user',
            name: 'Better Bets User',
            email: 'user@betterbets.com',
            preferences: this.getDefaultPreferences()
        };
    }

    static loadUser(): User {
        try {
            const stored = localStorage.getItem(this.USER_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
        return this.getDefaultUser();
    }

    static saveUser(user: User): void {
        try {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    static loadPreferences(): UserPreferences {
        try {
            const stored = localStorage.getItem(this.PREFERENCES_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
        }
        return this.getDefaultPreferences();
    }

    static savePreferences(preferences: UserPreferences): void {
        try {
            localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.error('Error saving user preferences:', error);
        }
    }

    static updatePreference<K extends keyof UserPreferences>(
        key: K, 
        value: UserPreferences[K]
    ): void {
        const preferences = this.loadPreferences();
        preferences[key] = value;
        this.savePreferences(preferences);
    }

    static toggleDarkMode(): boolean {
        const preferences = this.loadPreferences();
        preferences.darkMode = !preferences.darkMode;
        this.savePreferences(preferences);
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', preferences.darkMode ? 'dark' : 'light');
        
        return preferences.darkMode;
    }

    static toggleCompactView(): boolean {
        const preferences = this.loadPreferences();
        preferences.compactView = !preferences.compactView;
        this.savePreferences(preferences);
        return preferences.compactView;
    }

    static toggleAutoSave(): boolean {
        const preferences = this.loadPreferences();
        preferences.autoSave = !preferences.autoSave;
        this.savePreferences(preferences);
        return preferences.autoSave;
    }

    static addDefaultBookmaker(bookmakerName: string): void {
        const preferences = this.loadPreferences();
        if (!preferences.defaultBookmakers.includes(bookmakerName)) {
            preferences.defaultBookmakers.push(bookmakerName);
            this.savePreferences(preferences);
        }
    }

    static removeDefaultBookmaker(bookmakerName: string): void {
        const preferences = this.loadPreferences();
        preferences.defaultBookmakers = preferences.defaultBookmakers.filter(
            name => name !== bookmakerName
        );
        this.savePreferences(preferences);
    }

    static setDefaultBookmakers(bookmakerNames: string[]): void {
        const preferences = this.loadPreferences();
        preferences.defaultBookmakers = bookmakerNames;
        this.savePreferences(preferences);
    }

    static exportUserData(): string {
        const user = this.loadUser();
        const preferences = this.loadPreferences();
        return JSON.stringify({
            user,
            preferences,
            exportDate: new Date().toISOString()
        }, null, 2);
    }

    static importUserData(jsonData: string): boolean {
        try {
            const data = JSON.parse(jsonData);
            if (data.user && data.preferences) {
                this.saveUser(data.user);
                this.savePreferences(data.preferences);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing user data:', error);
            return false;
        }
    }

    static resetToDefaults(): void {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.PREFERENCES_KEY);
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
