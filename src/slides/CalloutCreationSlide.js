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
            calloutPreview: {
                title: languageManager.translate('slides.calloutCreation.calloutPreview.title'),
                description: languageManager.translate('slides.calloutCreation.calloutPreview.description'),
                questions: languageManager.translate('slides.calloutCreation.calloutPreview.questions'),
                previewTitle: languageManager.translate('slides.calloutCreation.calloutPreview.previewTitle'),
                introText: languageManager.translate('slides.calloutCreation.calloutPreview.introText'),
                questionsTitle: languageManager.translate('slides.calloutCreation.calloutPreview.questionsTitle'),
                confirmText: languageManager.translate('slides.calloutCreation.calloutPreview.confirmText'),
                userConfirmation: languageManager.translate('slides.calloutCreation.calloutPreview.userConfirmation'),
                successText: languageManager.translate('slides.calloutCreation.calloutPreview.successText')
            }
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
            <div class="chat-frame">
                <div class="chat-header">
                    <div class="chat-title">${calloutTranslations.title}</div>
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
                                ${calloutTranslations.userMessage}
                            </div>
                            <div class="message-time">10:30</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
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
                            </div>
                            <div class="message-time">10:31</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                ${calloutTranslations.calloutPreview.userConfirmation}
                            </div>
                            <div class="message-time">10:32</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${commonTranslations.confirmationMessage}</p>
                                <p>${calloutTranslations.calloutPreview.successText}</p>
                            </div>
                            <div class="message-time">10:32</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-0')">
                                <i>@</i>${commonTranslations.toolbar.callout}
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-0')">
                                <i>@</i>${commonTranslations.toolbar.question}
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${commonTranslations.placeholder}"
                                 id="chat-input-0">
                            </div>
                            <button class="send-button" onclick="sendMessage('chat-input-0')">
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
