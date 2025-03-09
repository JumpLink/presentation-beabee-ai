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
            placeholder: languageManager.translate('common.placeholder'),
            toolbar: {
                callout: languageManager.translate('common.toolbar.callout'),
                question: languageManager.translate('common.toolbar.question')
            }
        };
        
        this.innerHTML = `
            <chat-frame title="${translations.title}">
                <div slot="messages">
                    <chat-message type="user" time="10:50">
                        ${translations.userMessage}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:51">
                        <h5>${translations.preview.title}</h5>
                        <p>${translations.preview.intro}</p>
                        
                        <div class="image-preview">
                            <!-- Image would be dynamically inserted here -->
                            <p class="image-description">${translations.preview.description}</p>
                        </div>
                        
                        <p>${translations.preview.confirmText}</p>
                    </chat-message>
                    
                    <chat-message type="user" time="10:52">
                        ${translations.preview.userConfirmation}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:52">
                        <p>${commonTranslations.confirmationMessage}</p>
                        <p>${translations.preview.successText}</p>
                    </chat-message>
                </div>
                
                <div slot="toolbar">
                    <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-3')">
                        <i>@</i>${commonTranslations.toolbar.callout}
                    </button>
                    <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-3')">
                        <i>@</i>${commonTranslations.toolbar.question}
                    </button>
                </div>
                
                <chat-input slot="input" 
                           placeholder="${commonTranslations.placeholder}"
                           input-id="chat-input-3">
                </chat-input>
            </chat-frame>
        `;
    }

    initializeEventListeners() {
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.render();
        });

        // Listen for message sent events
        const chatInput = this.querySelector('chat-input');
        if (chatInput) {
            chatInput.addEventListener('messageSent', (e) => {
                window.showConversation('chat-input-3');
            });
        }

        // Listen for control button clicks
        const chatFrame = this.querySelector('chat-frame');
        if (chatFrame) {
            chatFrame.addEventListener('controlClick', (e) => {
                const action = e.detail.action;
                switch (action) {
                    case 'minimize':
                        // Handle minimize
                        break;
                    case 'maximize':
                        // Handle maximize
                        break;
                    case 'close':
                        // Handle close
                        break;
                }
            });
        }
    }
}
