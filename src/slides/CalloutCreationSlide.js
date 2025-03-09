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
                questions: languageManager.translate('slides.calloutCreation.calloutPreview.questions')
            }
        };
        
        const commonTranslations = {
            confirmationMessage: languageManager.translate('common.confirmationMessage'),
            placeholder: languageManager.translate('common.placeholder')
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
                                <h5>Callout-Vorschlag</h5>
                                <p>Ich habe einen Callout zum Thema "${calloutTranslations.calloutPreview.title}" erstellt. Hier ist der Vorschlag:</p>
                                
                                <div class="callout-preview">
                                    <div class="callout-header">
                                        <h6>${calloutTranslations.calloutPreview.title}</h6>
                                    </div>
                                    <div class="callout-description">
                                        <p>${calloutTranslations.calloutPreview.description}</p>
                                    </div>
                                    <div class="callout-questions-section">
                                        <p>Beantworten Sie folgende Fragen:</p>
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
                                
                                <p>Möchten Sie diesen Callout in Beabee anlegen?</p>
                            </div>
                            <div class="message-time">10:31</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                Ja, bitte anlegen.
                            </div>
                            <div class="message-time">10:32</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${commonTranslations.confirmationMessage}</p>
                                <p>Sie können die Antworten jederzeit über das @Callout-Tag in unseren Chats analysieren.</p>
                            </div>
                            <div class="message-time">10:32</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-0')">
                                <i>@</i>Callout
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-0')">
                                <i>@</i>Frage
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
