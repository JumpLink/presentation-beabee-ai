// ExampleResponsesSlide.js - Component for the example responses slide
import { languageManager } from '../i18n/LanguageManager.js';

export class ExampleResponsesSlide extends HTMLElement {
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
            <chat-frame title="${translations.title}">
                <div slot="messages">
                    <chat-message type="user" time="10:35">
                        ${translations.userMessage}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:36">
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
                    </chat-message>
                    
                    <chat-message type="user" time="10:37">
                        ${translations.userConfirmation}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:37">
                        <p>${commonTranslations.confirmationMessage}</p>
                        <p>${translations.successText}</p>
                    </chat-message>
                </div>
                
                <div slot="toolbar">
                    <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-example')">
                        <i>@</i>${commonTranslations.toolbar.callout}
                    </button>
                    <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-example')">
                        <i>@</i>${commonTranslations.toolbar.question}
                    </button>
                </div>
                
                <chat-input slot="input" 
                           placeholder="${commonTranslations.placeholder}"
                           input-id="chat-input-example">
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
                window.showConversation('chat-input-example');
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
