// ImageGenerationSlide.js - Component for the image generation slide
import { languageManager } from '../i18n/LanguageManager.js';

export class ImageGenerationSlide extends HTMLElement {
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
            title: languageManager.translate('slides.imageGeneration.title'),
            userMessage: languageManager.translate('slides.imageGeneration.userMessage'),
            preview: {
                title: languageManager.translate('slides.imageGeneration.imagePreview.title'),
                intro: languageManager.translate('slides.imageGeneration.imagePreview.intro'),
                description: languageManager.translate('slides.imageGeneration.imagePreview.description'),
                confirmText: languageManager.translate('slides.imageGeneration.imagePreview.confirmText'),
                userConfirmation: languageManager.translate('slides.imageGeneration.imagePreview.userConfirmation'),
                successText: languageManager.translate('slides.imageGeneration.imagePreview.successText')
            }
        };
        
        const commonTranslations = {
            confirmationMessage: languageManager.translate('common.confirmationMessage'),
            placeholder: languageManager.translate('common.placeholder')
        };
        
        this.innerHTML = `
            <div class="chat-container">
                <chat-frame title="${translations.title}">
                </chat-frame>
                
                <chat-input 
                    id="chat-input-3"
                    placeholder="${commonTranslations.placeholder}"
                    initial-message="${translations.userMessage}">
                </chat-input>
            </div>
        `;
        
        // Speichere die Nachrichten für die Konversationssimulation
        
        // Erste AI-Antwort
        this.aiResponse = `
            <h5>${translations.preview.title}</h5>
            <p>${translations.preview.intro}</p>
            
            <div class="image-preview">
                <!-- Image would be dynamically inserted here -->
                <p class="image-description">${translations.preview.description}</p>
            </div>
            
            <p>${translations.preview.confirmText}</p>
        `;
        
        // Zweite Benutzernachricht (Bestätigung)
        this.userResponse = `${translations.preview.userConfirmation}`;
        
        // Finale AI-Antwort
        this.finalResponse = `
            <p>${commonTranslations.confirmationMessage}</p>
            <p>${translations.preview.successText}</p>
        `;
    }

    initializeEventListeners() {
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
            this.initialMessageShown = false;
            this.secondMessageShown = false;
            this.conversationStep = 0;
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

customElements.define('image-generation-slide', ImageGenerationSlide);