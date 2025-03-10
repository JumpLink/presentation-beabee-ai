// LanguageSelector.js - Wiederverwendbare Komponente für die Sprachauswahl
import { languageManager } from '../i18n/LanguageManager.js';

export class LanguageSelector extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        
        // Auf Sprachänderungen reagieren, um den aktiven Button zu aktualisieren
        window.addEventListener('languageChanged', () => {
            this.updateActiveButton();
        });
    }
    
    render() {
        // Unterstützte Sprachen abrufen
        const supportedLanguages = languageManager.getSupportedLanguages();
        
        // Buttons für jede unterstützte Sprache erstellen
        const languageButtons = supportedLanguages.map(lang => {
            const isActive = lang === languageManager.getCurrentLanguage() ? 'active' : '';
            return `<button data-lang="${lang}" class="${isActive}">${lang.toUpperCase()}</button>`;
        }).join('');
        
        this.innerHTML = `
            <div class="language-selector-container">
                ${languageButtons}
            </div>
        `;
    }
    
    updateActiveButton() {
        // Aktiven Button basierend auf der aktuellen Sprache aktualisieren
        const currentLang = languageManager.getCurrentLanguage();
        this.querySelectorAll('button').forEach(button => {
            const buttonLang = button.getAttribute('data-lang');
            if (buttonLang === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    initializeEventListeners() {
        // Event-Listener für Sprachbuttons
        this.querySelectorAll('button').forEach(button => {
            const lang = button.getAttribute('data-lang');
            
            button.addEventListener('click', () => {
                // Aktive Sprache setzen
                languageManager.setLanguage(lang);
                
                // Aktiven Button aktualisieren
                this.updateActiveButton();
            });
        });
    }
}

// Komponente registrieren
customElements.define('language-selector', LanguageSelector); 