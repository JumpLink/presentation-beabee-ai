// TranslationSlide.js - Component for the translation slide
import { languageManager } from '../i18n/LanguageManager.js';

export class TranslationSlide extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const translations = {
            title: languageManager.translate('slides.translation.title'),
            userMessage: languageManager.translate('slides.translation.userMessage'),
            preview: {
                title: languageManager.translate('slides.translation.translationPreview.title'),
                intro: languageManager.translate('slides.translation.translationPreview.intro'),
                confirmText: languageManager.translate('slides.translation.translationPreview.confirmText'),
                userConfirmation: languageManager.translate('slides.translation.translationPreview.userConfirmation'),
                successText: languageManager.translate('slides.translation.translationPreview.successText'),
                questionContext: languageManager.translate('slides.translation.translationPreview.questionContext'),
                exampleTitle: languageManager.translate('slides.translation.translationPreview.exampleTitle'),
                exampleTranslation: languageManager.translate('slides.translation.translationPreview.exampleTranslation'),
                conclusion: languageManager.translate('slides.translation.translationPreview.conclusion')
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
                            <div class="message-time">10:45</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>${translations.preview.title}</h5>
                                <p>${translations.preview.intro}</p>
                                
                                <p>${translations.preview.questionContext}</p>
                                
                                <div class="translations-preview">
                                    <div class="category neutral">
                                        <h6>${translations.preview.exampleTitle}</h6>
                                        <ul>
                                            <li>${translations.preview.exampleTranslation}</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <p class="conclusion">${translations.preview.conclusion}</p>
                                
                                <p>${translations.preview.confirmText}</p>
                            </div>
                            <div class="message-time">10:46</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                ${translations.preview.userConfirmation}
                            </div>
                            <div class="message-time">10:47</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${commonTranslations.confirmationMessage}</p>
                                <p>${translations.preview.successText}</p>
                            </div>
                            <div class="message-time">10:47</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-2')">
                                <i>@</i>${commonTranslations.toolbar.callout}
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-2')">
                                <i>@</i>${commonTranslations.toolbar.question}
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${commonTranslations.placeholder}"
                                 id="chat-input-2">
                            </div>
                            <button class="send-button" onclick="sendMessage('chat-input-2')">
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
