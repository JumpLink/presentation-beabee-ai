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
            successText: languageManager.translate('slides.exampleResponses.successText'),
            userConfirmation: languageManager.translate('slides.exampleResponses.userConfirmation')
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
                            <div class="message-time">10:35</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>${commonTranslations.ui.exampleResponsesTitle}</h5>
                                <div class="responses-preview">
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
                            </div>
                            <div class="message-time">10:36</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                ${translations.userConfirmation}
                            </div>
                            <div class="message-time">10:37</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${commonTranslations.confirmationMessage}</p>
                                <p>${translations.successText}</p>
                            </div>
                            <div class="message-time">10:37</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-example')">
                                <i>@</i>${commonTranslations.toolbar.callout}
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-example')">
                                <i>@</i>${commonTranslations.toolbar.question}
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${commonTranslations.placeholder}"
                                 id="chat-input-example">
                            </div>
                            <button class="send-button" onclick="sendMessage('chat-input-example')">
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
