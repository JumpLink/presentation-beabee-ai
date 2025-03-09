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
                            <div class="message-time">10:50</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>${translations.preview.title}</h5>
                                <p>${translations.preview.intro}</p>
                                
                                <div class="image-preview">
                                    <!-- Image would be dynamically inserted here -->
                                    <p class="image-description">${translations.preview.description}</p>
                                </div>
                                
                                <p>${translations.preview.confirmText}</p>
                            </div>
                            <div class="message-time">10:51</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                ${translations.preview.userConfirmation}
                            </div>
                            <div class="message-time">10:52</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${commonTranslations.confirmationMessage}</p>
                                <p>${translations.preview.successText}</p>
                            </div>
                            <div class="message-time">10:52</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-3')">
                                <i>@</i>${commonTranslations.toolbar.callout}
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-3')">
                                <i>@</i>${commonTranslations.toolbar.question}
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${commonTranslations.placeholder}"
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
