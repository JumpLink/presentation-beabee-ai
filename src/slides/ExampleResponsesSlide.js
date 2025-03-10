// ExampleResponsesSlide.js - Component for the example responses slide
import { languageManager } from '../i18n/LanguageManager.js';

export class ExampleResponsesSlide extends HTMLElement {
    constructor() {
        super();
        this.initialMessageShown = false;
        this.secondMessageShown = false; // Track if second message was shown
        this.conversationStep = 0; // Track the current step in the conversation
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        // Get translations using individual keys
        const translations = {
            title: languageManager.translate('slides.exampleResponses.title'),
            userMessage: languageManager.translate('slides.exampleResponses.userMessage'),
            responses: languageManager.translate('slides.exampleResponses.responses'),
            confirmText: languageManager.translate('slides.exampleResponses.confirmText'),
            userConfirmation: languageManager.translate('slides.exampleResponses.userConfirmation'),
            successText: languageManager.translate('slides.exampleResponses.successText')
        };
        
        const commonTranslations = {
            confirmationMessage: languageManager.translate('common.confirmationMessage'),
            placeholder: languageManager.translate('common.placeholder'),
            toolbar: {
                callout: languageManager.translate('common.toolbar.callout'),
                question: languageManager.translate('common.toolbar.question')
            },
            ui: {
                exampleResponsesTitle: languageManager.translate('common.ui.exampleResponsesTitle')
            }
        };
        
        this.innerHTML = `
            <div class="chat-container">
                <chat-frame title="${translations.title}">
                </chat-frame>
                
                <chat-input 
                    id="chat-input-example"
                    placeholder="${commonTranslations.placeholder}"
                    initial-message="${translations.userMessage}">
                </chat-input>
            </div>
        `;

        // Speichere die Nachrichten für die Konversationssimulation
        
        // Erste AI-Antwort
        this.aiResponse = `
            <h5>${commonTranslations.ui.exampleResponsesTitle}</h5>
            
            <div class="response-examples">
                ${translations.responses.map(response => `
                    <div class="response-item">
                        <div class="response-header">
                            <span class="response-type">${response.type}</span>
                        </div>
                        <div class="response-content">
                            <p>${response.content}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <p>${translations.confirmText}</p>
        `;

        // Zweite Benutzernachricht (Bestätigung)
        this.userResponse = `${translations.userConfirmation}`;

        // Finale AI-Antwort
        this.finalResponse = `
            <p>${commonTranslations.confirmationMessage}</p>
            <p>${translations.successText}</p>
        `;
    }

    initializeEventListeners() {
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            // Speichere den aktuellen Zustand
            const currentStep = this.conversationStep;
            const wasInitialMessageShown = this.initialMessageShown;
            const wasSecondMessageShown = this.secondMessageShown;
            
            // Render mit neuen Übersetzungen
            this.render();
            
            // Stelle den Zustand wieder her
            this.conversationStep = currentStep;
            this.initialMessageShown = wasInitialMessageShown;
            this.secondMessageShown = wasSecondMessageShown;
            
            // Wenn wir bereits im Schritt 1 sind und die zweite Nachricht noch nicht gesendet wurde,
            // aktualisiere die Eingabe mit der übersetzten Bestätigungsnachricht
            if (this.conversationStep === 1 && !this.secondMessageShown) {
                const chatInput = this.querySelector('chat-input');
                if (chatInput) {
                    chatInput.setInputValue(this.userResponse);
                    chatInput.focusInput();
                }
            }
        });

        // Listen for message sent events
        const chatInput = this.querySelector('chat-input');
        const chatFrame = this.querySelector('chat-frame');
        
        if (chatInput && chatFrame) {
            chatInput.addEventListener('message-sent', (e) => {
                // Konversationsschritte
                switch (this.conversationStep) {
                    case 0: // Erste Benutzernachricht wurde gesendet
                        // Erste Benutzernachricht hinzufügen
                        if (!this.initialMessageShown) {
                            this.initialMessageShown = true;
                            chatFrame.addMessage('user', e.detail.message);
                        }
                        
                        // Erste AI-Antwort mit Verzögerung hinzufügen
                        setTimeout(() => {
                            chatFrame.addMessage('ai', this.aiResponse);
                            
                            // Zweite Benutzernachricht in das Eingabefeld eintragen
                            setTimeout(() => {
                                chatInput.setInputValue(this.userResponse);
                                chatInput.focusInput();
                                
                                // Zum nächsten Schritt übergehen
                                this.conversationStep = 1;
                            }, 300);
                        }, 800);
                        break;
                        
                    case 1: // Zweite Benutzernachricht wurde gesendet
                        // Zweite Benutzernachricht hinzufügen, nur wenn sie noch nicht angezeigt wurde
                        if (!this.secondMessageShown) {
                            this.secondMessageShown = true;
                            chatFrame.addMessage('user', e.detail.message);
                            
                            // Finale AI-Antwort mit Verzögerung hinzufügen
                            setTimeout(() => {
                                chatFrame.addMessage('ai', this.finalResponse);
                                
                                // Eingabefeld leeren und zum nächsten Schritt übergehen
                                chatInput.setInputValue('');
                                this.conversationStep = 2;
                            }, 800);
                        }
                        break;
                        
                    default: // Weitere Nachrichten werden einfach hinzugefügt
                        chatFrame.addMessage('user', e.detail.message);
                        break;
                }
            });
        }
    }
}

// Komponente registrieren
customElements.define('example-responses-slide', ExampleResponsesSlide);