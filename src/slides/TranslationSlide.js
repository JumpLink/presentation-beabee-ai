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
        // Get translations using individual keys
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
            <chat-frame title="${translations.title}">
                <div slot="messages">
                    <chat-message type="user" time="10:45">
                        ${translations.userMessage}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:46">
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
                    </chat-message>
                    
                    <chat-message type="user" time="10:47">
                        ${translations.preview.userConfirmation}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:47">
                        <p>${commonTranslations.confirmationMessage}</p>
                        <p>${translations.preview.successText}</p>
                    </chat-message>
                </div>
                
                <div slot="toolbar">
                    <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-2')">
                        <i>@</i>${commonTranslations.toolbar.callout}
                    </button>
                    <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-2')">
                        <i>@</i>${commonTranslations.toolbar.question}
                    </button>
                </div>
                
                <chat-input slot="input" 
                           placeholder="${commonTranslations.placeholder}"
                           input-id="chat-input-2">
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
                window.showConversation('chat-input-2');
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
