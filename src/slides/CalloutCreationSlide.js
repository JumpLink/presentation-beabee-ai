// CalloutCreationSlide.js - Component for the callout creation slide
import { languageManager } from '../i18n/LanguageManager.js';

export class CalloutCreationSlide extends HTMLElement {
    constructor() {
        super();
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
            <chat-frame title="${calloutTranslations.title}">
                <div slot="messages">
                    <chat-message type="user" time="10:30">
                        ${calloutTranslations.userMessage}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:31">
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
                    </chat-message>
                    
                    <chat-message type="user" time="10:32">
                        ${calloutTranslations.calloutPreview.userConfirmation}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:32">
                        <p>${commonTranslations.confirmationMessage}</p>
                        <p>${calloutTranslations.calloutPreview.successText}</p>
                    </chat-message>
                </div>
                
                <div slot="toolbar">
                    <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-0')">
                        <i>@</i>${commonTranslations.toolbar.callout}
                    </button>
                    <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-0')">
                        <i>@</i>${commonTranslations.toolbar.question}
                    </button>
                </div>
                
                <chat-input slot="input" 
                           placeholder="${commonTranslations.placeholder}"
                           input-id="chat-input-0">
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
                window.showConversation('chat-input-0');
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
