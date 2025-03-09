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
        const translations = languageManager.translate('slides.exampleResponses');
        
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
                                <h5>Beispiel-Antworten</h5>
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
                                
                                <p>Möchtest du diese Beispiel-Antworten für Demonstrationszwecke in den Callout einfügen?</p>
                            </div>
                            <div class="message-time">10:36</div>
                        </div>
                        
                        <div class="message user-message">
                            <div class="message-content">
                                Ja, bitte füge sie ein.
                            </div>
                            <div class="message-time">10:37</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <p>${languageManager.translate('common.confirmationMessage')}</p>
                                <p>Du kannst sie jetzt für Analysen und Demonstrationen verwenden. Die Antworten decken verschiedene Perspektiven ab und eignen sich gut, um die Funktionen der KI-Analyse zu zeigen.</p>
                            </div>
                            <div class="message-time">10:37</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-example')">
                                <i>@</i>Callout
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-example')">
                                <i>@</i>Frage
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${languageManager.translate('common.placeholder')}"
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
