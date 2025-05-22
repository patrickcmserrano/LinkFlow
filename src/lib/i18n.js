// Simplified internationalization (i18n) system
import { addMessages, init, locale, _ } from 'svelte-i18n';
import { writable } from 'svelte/store';
// Import translations from individual files
import en from './locales/en';
import pt from './locales/pt';
import es from './locales/es';
// Language definitions
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'];
// Export translations for tests and reuse
export const translations = { en, pt, es };
// Add messages to the dictionary
addMessages('en', translations.en);
addMessages('pt', translations.pt);
addMessages('es', translations.es);
// Initialize i18n with appropriate settings
export function setupI18n() {
    const initialLocale = getInitialLocale();
    init({
        fallbackLocale: 'en',
        initialLocale: initialLocale,
    });
}
// Function to get the initial locale based on browser or localStorage
function getInitialLocale() {
    if (typeof window === 'undefined') {
        return 'en';
    }
    // Check if there's a preferred language stored in localStorage
    const savedLocale = localStorage.getItem('preferredLanguage');
    if (savedLocale && SUPPORTED_LANGUAGES.includes(savedLocale)) {
        return savedLocale;
    }
    // Use browser language if available
    const browserLocale = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.includes(browserLocale) ? browserLocale : 'en';
}
export function createI18nStore() {
    const { subscribe, set } = writable('en');
    const store = {
        subscribe,
        setLanguage(lang) {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('preferredLanguage', lang);
            }
            locale.set(lang);
            set(lang);
            return lang;
        },
        initialize() {
            // Get saved preference, if any
            const savedLang = typeof localStorage !== 'undefined'
                ? localStorage.getItem('preferredLanguage')
                : null;
            if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang)) {
                this.setLanguage(savedLang);
                return;
            }
            // Try to use browser language
            if (typeof navigator !== 'undefined') {
                const browserLang = navigator.language.split('-')[0];
                if (SUPPORTED_LANGUAGES.includes(browserLang)) {
                    this.setLanguage(browserLang);
                    return;
                }
            }
            // Use English as default
            this.setLanguage('en');
        },
        t(key, lang = 'en') {
            return translations[lang]?.[key] || key;
        },
        translations // Export translations for tests
    };
    return store;
}
export const i18n = createI18nStore();
// Configure on load
setupI18n();
export { _, locale };
//# sourceMappingURL=i18n.js.map