// Theme Service - Manages dark mode and theme switching

export class ThemeService {
    private static readonly THEME_KEY = 'bb_theme';
    private static readonly THEME_ATTRIBUTE = 'data-theme';

    static init(): void {
        const savedTheme = this.getSavedTheme();
        this.applyTheme(savedTheme);
    }

    static getSavedTheme(): 'light' | 'dark' {
        try {
            const saved = localStorage.getItem(this.THEME_KEY);
            if (saved === 'dark' || saved === 'light') {
                return saved;
            }
        } catch (error) {
            console.error('Error loading saved theme:', error);
        }
        return 'light';
    }

    static getCurrentTheme(): 'light' | 'dark' {
        const current = document.documentElement.getAttribute(this.THEME_ATTRIBUTE);
        return current === 'dark' ? 'dark' : 'light';
    }

    static setTheme(theme: 'light' | 'dark'): void {
        this.applyTheme(theme);
        this.saveTheme(theme);
    }

    static toggleTheme(): 'light' | 'dark' {
        const current = this.getCurrentTheme();
        const newTheme = current === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }

    private static applyTheme(theme: 'light' | 'dark'): void {
        document.documentElement.setAttribute(this.THEME_ATTRIBUTE, theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1f2937' : '#ffffff');
        }
    }

    private static saveTheme(theme: 'light' | 'dark'): void {
        try {
            localStorage.setItem(this.THEME_KEY, theme);
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    }

    static isDarkMode(): boolean {
        return this.getCurrentTheme() === 'dark';
    }

    static addThemeChangeListener(callback: (theme: 'light' | 'dark') => void): void {
        // Listen for changes to the data-theme attribute
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === this.THEME_ATTRIBUTE) {
                    const theme = this.getCurrentTheme();
                    callback(theme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [this.THEME_ATTRIBUTE]
        });
    }

    static createThemeToggleButton(): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = 'theme-toggle btn-glass flex items-center gap-2';
        button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
            <span class="theme-text">Dark Mode</span>
        `;

        button.addEventListener('click', () => {
            const newTheme = this.toggleTheme();
            this.updateToggleButton(button, newTheme);
        });

        // Set initial state
        this.updateToggleButton(button, this.getCurrentTheme());

        return button;
    }

    private static updateToggleButton(button: HTMLButtonElement, theme: 'light' | 'dark'): void {
        const icon = button.querySelector('svg');
        const text = button.querySelector('.theme-text');
        
        if (theme === 'dark') {
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

    static createSystemThemeDetector(): void {
        // Detect system theme preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Only set to dark if user hasn't explicitly set a preference
            if (!localStorage.getItem(this.THEME_KEY)) {
                this.setTheme('dark');
            }
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-switch if user hasn't set a preference
                if (!localStorage.getItem(this.THEME_KEY)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}
