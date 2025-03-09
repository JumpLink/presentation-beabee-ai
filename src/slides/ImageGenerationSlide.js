// ImageGenerationSlide.js - Component for the image generation slide
import { languageManager } from '../i18n/LanguageManager.js';

export class ImageGenerationSlide extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const translations = languageManager.translate('slides.imageGeneration');
        
        this.innerHTML = `
            <div class="chat-frame">
                <div class="chat-header">
                    <div class="chat-title">${translations.title}</div>
                    <div class="chat-controls">
                        <button class="chat-control-button chat-minimize"></button>
                        <button class="chat-control-button chat-maximize"></button>
                        <button class="chat-control-button chat-close"></button>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-messages">
                        <div class="message user-message">
                            <div class="message-content">
                                ${translations.userMessage}
                            </div>
                            <div class="message-time">11:30</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>Generiertes Teaser-Bild</h5>
                                
                                <p>Hier ist ein Teaser-Bild für den Callout zum Thema Einfluss des rechten Populismus auf die politische Debatte in Deutschland:</p>
                                
                                <div class="image-container">
                                    <img src="./src/assets/ai-generated-image-example.png" alt="Teaser image for callout about right-wing populism" class="generated-image">
                                </div>
                                
                                <p>Dieses Bild stellt visuell das Thema des Callouts dar und verdeutlicht den Einfluss des rechten Populismus auf den politischen Diskurs in Deutschland.</p>
                                
                                <p>Möchtest du dieses Bild als Teaser-Bild für den Callout speichern?</p>
                            </div>
                            <div class="message-time">11:31</div>
                        </div>

                        <div class="message user-message">
                            <div class="message-content">
                                Ja, bitte speichern.
                            </div>
                            <div class="message-time">11:32</div>
                        </div>

                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${languageManager.translate('common.confirmationMessage')}</p>
                                <p>Es wird nun bei der Anzeige des Callouts in Beabee verwendet.</p>
                            </div>
                            <div class="message-time">11:32</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-3')">
                                <i>@</i>Callout
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-3')">
                                <i>@</i>Frage
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${languageManager.translate('common.placeholder')}"
                                 id="chat-input-3">
                            </div>
                            <button class="send-button" onclick="sendMessage('chat-input-3')">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });
    }
}
