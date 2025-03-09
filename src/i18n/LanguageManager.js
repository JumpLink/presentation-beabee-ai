// Language manager for handling translations
import { translations as enTranslations } from './en.js';
import { translations as deTranslations } from './de.js';

export class LanguageManager {
    constructor() {
        this.currentLanguage = 'de'; // Default language
        this.translations = {
            en: enTranslations,
            de: deTranslations
        };
        
        // Initialize language from browser or localStorage
        this.initLanguage();
    }

    initLanguage() {
        // Try to get language from localStorage
        const savedLang = localStorage.getItem('preferred_language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
            return;
        }

        // Try to get language from browser
        const browserLang = navigator.language.split('-')[0];
        if (this.translations[browserLang]) {
            this.currentLanguage = browserLang;
            return;
        }

        // Fallback to default language (German)
        this.currentLanguage = 'de';
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('preferred_language', lang);
            // Dispatch event for language change
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        } else {
            console.error(`Language ${lang} not supported`);
        }
    }

    translate(key) {
        // Split the key by dots to access nested properties
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];

        // Traverse the nested object
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return Object.keys(this.translations);
    }
}

// Create and export singleton instance
export const languageManager = new LanguageManager(); 