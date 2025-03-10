// CalloutCreationSlide.js - Component for the callout creation slide
import { languageManager } from '../i18n/LanguageManager.js';

export class CalloutCreationSlide extends HTMLElement {
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
        // Get translations using the translate method
        const calloutTranslations = {
            title: languageManager.translate('slides.calloutCreation.title'),
            userMessage: languageManager.translate('slides.calloutCreation.userMessage'),
            calloutPreview: languageManager.translate('slides.calloutCreation.calloutPreview')
        };
        
        const commonTranslations = {
            confirmationMessage: languageManager.translate('common.confirmationMessage'),
            placeholder: languageManager.translate('common.placeholder'),
            toolbar: {
                callout: languageManager.translate('common.toolbar.callout'),
                question: languageManager.translate('common.toolbar.question')
            },
            ui: {
                created: languageManager.translate('common.ui.created')
            }
        };
        
        this.innerHTML = `
            <div class="chat-container">
                <chat-frame title="${calloutTranslations.title}">
                </chat-frame>
                
                <chat-input 
                    id="chat-input-0"
                    placeholder="${commonTranslations.placeholder}"
                    initial-message="${calloutTranslations.userMessage}">
                </chat-input>
            </div>
        `;
        
        // Speichere die Nachrichten für die Konversationssimulation
        
        // Erste AI-Antwort
        this.aiResponse = `
            <h5>${calloutTranslations.calloutPreview.previewTitle}</h5>
            <p>${calloutTranslations.calloutPreview.introText} "${calloutTranslations.calloutPreview.title}" ${commonTranslations.ui.created}</p>
            
            <div class="callout-preview">
                <div class="callout-header">
                    <h6>${calloutTranslations.calloutPreview.title}</h6>
                </div>
                <div class="callout-description">
                    <p>${calloutTranslations.calloutPreview.description}</p>
                </div>
                <div class="callout-questions-section">
                    <p>${calloutTranslations.calloutPreview.questionsTitle}</p>
                    <ul class="callout-questions-preview">
                        ${calloutTranslations.calloutPreview.questions.map(question => `
                            <li class="question-item">
                                <span class="question-text">${question.text}</span>
                                <span class="question-type">${question.type}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <p>${calloutTranslations.calloutPreview.confirmText}</p>
        `;
        
        // Zweite Benutzernachricht (Bestätigung)
        this.userResponse = `${calloutTranslations.calloutPreview.userConfirmation}`;
        
        // Finale AI-Antwort
        this.finalResponse = `
            <p>${commonTranslations.confirmationMessage}</p>
            <p>${calloutTranslations.calloutPreview.successText}</p>
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

customElements.define('callout-creation-slide', CalloutCreationSlide);
