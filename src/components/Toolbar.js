// Toolbar.js - Wiederverwendbare Toolbar-Komponente für Chat-Eingaben
import { languageManager } from '../i18n/LanguageManager.js';

export class Toolbar extends HTMLElement {
    constructor() {
        super();
        
        // Bind methods to this instance
        this.closeDropdownsOnOutsideClick = this.closeDropdownsOnOutsideClick.bind(this);
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        
        // Auf Sprachänderungen reagieren
        window.addEventListener('languageChanged', () => {
            this.render();
        });
        
        // Add global event listener to close dropdowns when clicking outside
        document.addEventListener('click', this.closeDropdownsOnOutsideClick);
    }
    
    disconnectedCallback() {
        // Remove global event listener when component is removed
        document.removeEventListener('click', this.closeDropdownsOnOutsideClick);
    }

    // Close dropdowns when clicking elsewhere
    closeDropdownsOnOutsideClick(event) {
        // If the click target is not a toolbar button and not inside a dropdown
        if (!event.target.closest('.toolbar-button') && 
            !event.target.closest('.dropdown')) {
            // Close all active dropdowns
            this.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }

    render() {
        // Übersetzungen laden
        const translations = {
            callout: languageManager.translate('common.toolbar.callout'),
            question: languageManager.translate('common.toolbar.question'),
            callouts: languageManager.translate('common.toolbar.callouts'),
            questions: languageManager.translate('common.toolbar.questions')
        };
        
        // Callout-Button und Dropdown
        const calloutItems = translations.callouts.map(callout => {
            return `<button data-prompt="${callout.text}">${callout.shortTitle}</button>`;
        }).join('');
        
        // Frage-Button und Dropdown
        const questionItems = translations.questions.map(question => {
            return `<button data-prompt="${question.text}">${question.shortTitle}</button>`;
        }).join('');
        
        this.innerHTML = `
            <div class="toolbar-container">
                <button class="toolbar-button" data-tag-type="Callout">
                    <i>@</i>${translations.callout}
                </button>
                <div class="dropdown dropdown-content">
                    ${calloutItems}
                </div>
                
                <button class="toolbar-button" data-tag-type="Frage">
                    <i>@</i>${translations.question}
                </button>
                <div class="dropdown dropdown-content">
                    ${questionItems}
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        // Event-Listener für Toolbar-Buttons
        this.querySelectorAll('.toolbar-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Dropdown finden und umschalten
                const dropdown = button.nextElementSibling;
                if (dropdown && dropdown.classList.contains('dropdown')) {
                    dropdown.classList.toggle('active');
                    
                    // Alle anderen Dropdowns schließen
                    this.querySelectorAll('.dropdown.active').forEach(openDropdown => {
                        if (openDropdown !== dropdown) {
                            openDropdown.classList.remove('active');
                        }
                    });
                }
            });
        });
        
        // Event-Listener für Dropdown-Items
        this.querySelectorAll('.dropdown-content button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const promptText = button.getAttribute('data-prompt');
                if (promptText) {
                    // Tag-Typ vom übergeordneten Button holen
                    const tagType = button.closest('.dropdown').previousElementSibling.getAttribute('data-tag-type');
                    
                    // Event auslösen, um den Text in den Chat-Input einzufügen
                    this.dispatchEvent(new CustomEvent('insert-tag', {
                        bubbles: true,
                        detail: {
                            tagType,
                            promptText
                        }
                    }));
                    
                    // Dropdown schließen
                    button.closest('.dropdown').classList.remove('active');
                }
            });
        });
    }
}

// Komponente registrieren
customElements.define('chat-toolbar', Toolbar); 