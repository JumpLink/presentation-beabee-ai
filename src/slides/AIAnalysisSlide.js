// AIAnalysisSlide.js - Component for the AI analysis slide
import { languageManager } from '../i18n/LanguageManager.js';

export class AIAnalysisSlide extends HTMLElement {
    constructor() {
        super();
        this.initialMessageShown = false;
        this.secondMessageShown = false; // Track if second message was shown (not used in this slide)
        this.conversationStep = 0; // Track the current step in the conversation
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        // Get translations using individual keys
        const translations = {
            title: languageManager.translate('slides.aiAnalysis.title'),
            userMessage: languageManager.translate('slides.aiAnalysis.userMessage'),
            analysis: languageManager.translate('slides.aiAnalysis.analysis')
        };
        
        const commonTranslations = {
            confirmationMessage: languageManager.translate('common.confirmationMessage'),
            placeholder: languageManager.translate('common.placeholder'),
            toolbar: {
                callout: languageManager.translate('common.toolbar.callout'),
                question: languageManager.translate('common.toolbar.question')
            }
        };
        
        this.innerHTML = `
            <div class="chat-container">
                <chat-frame title="${translations.title}">
                </chat-frame>
                
                <chat-input 
                    id="chat-input-1"
                    placeholder="${commonTranslations.placeholder}"
                    initial-message="${translations.userMessage}">
                </chat-input>
            </div>
        `;

        // Vorbereiten der Antwort für den Chat
        this.aiResponse = `
            <h5>${translations.analysis.title}</h5>
            
            <p>${translations.analysis.intro}</p>
            
            <div class="analysis-summary">
                <div class="category negative">
                    <h6>${translations.analysis.categories.negative.title}</h6>
                    <ul>
                        ${translations.analysis.categories.negative.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="category neutral">
                    <h6>${translations.analysis.categories.neutral.title}</h6>
                    <ul>
                        ${translations.analysis.categories.neutral.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="category positive">
                    <h6>${translations.analysis.categories.positive.title}</h6>
                    <ul>
                        ${translations.analysis.categories.positive.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <p class="conclusion">${translations.analysis.conclusion}</p>
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
            
            // Stelle die Nachrichten wieder her
            this.restoreMessages();
            
            // Event-Listener für Nachrichten neu initialisieren
            this.setupMessageEventListeners();
        });

        // Initialisiere die Event-Listener für Nachrichten
        this.setupMessageEventListeners();
    }
    
    // Methode zum Einrichten der Event-Listener für Nachrichten
    setupMessageEventListeners() {
        // Listen for message sent events
        const chatInput = this.querySelector('chat-input');
        const chatFrame = this.querySelector('chat-frame');
        
        if (chatInput && chatFrame) {
            // Entferne vorhandene Event-Listener, um doppelte Ausführung zu vermeiden
            chatInput.removeEventListener('message-sent', this.handleMessageSent);
            
            // Definiere den Event-Handler
            this.handleMessageSent = (e) => {
                // Konversationsschritte
                switch (this.conversationStep) {
                    case 0: // Erste Benutzernachricht wurde gesendet
                        // Erste Benutzernachricht hinzufügen
                        if (!this.initialMessageShown) {
                            this.initialMessageShown = true;
                            chatFrame.addMessage('user', e.detail.message);
                        }
                        
                        // AI-Antwort mit Verzögerung hinzufügen
                        setTimeout(() => {
                            chatFrame.addMessage('ai', this.aiResponse);
                            
                            // Gehe zum nächsten Schritt über und leere das Eingabefeld
                            setTimeout(() => {
                                chatInput.setInputValue('');
                                this.conversationStep = 1;
                            }, 300);
                        }, 800);
                        break;
                        
                    default: // Weitere Nachrichten werden einfach hinzugefügt
                        chatFrame.addMessage('user', e.detail.message);
                        break;
                }
            };
            
            // Füge den Event-Listener hinzu
            chatInput.addEventListener('message-sent', this.handleMessageSent);
        }
    }
    
    // Methode zum Wiederherstellen der Nachrichten nach einem Sprachwechsel
    restoreMessages() {
        const chatFrame = this.querySelector('chat-frame');
        if (!chatFrame) return;
        
        // Lösche zuerst alle vorhandenen Nachrichten
        chatFrame.clearMessages();
        
        // Nachrichten basierend auf dem aktuellen Konversationsschritt wiederherstellen
        if (this.initialMessageShown) {
            // Erste Benutzernachricht wiederherstellen
            chatFrame.showMessages(); // Stelle sicher, dass die Nachrichten sichtbar sind
            chatFrame.addMessage('user', this.getAttribute('initial-message') || this.querySelector('chat-input').getAttribute('initial-message'));
            
            // Wenn wir mindestens im Schritt 1 sind, füge die erste AI-Antwort hinzu
            if (this.conversationStep >= 1) {
                chatFrame.addMessage('ai', this.aiResponse);
            }
        }
    }
}

customElements.define('ai-analysis-slide', AIAnalysisSlide);