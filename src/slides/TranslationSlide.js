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
        const translations = languageManager.translate('slides.translation');
        
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
                            <div class="message-time">11:15</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>Englische Übersetzung der Antworten</h5>
                                
                                <p>Hier sind die übersetzten Antworten zu Frage 1 "What changes have you noticed in political debate?":</p>
                                
                                <div class="analysis-summary">
                                    <div class="category neutral">
                                        <h6>Übersetzte Antworten (Beispiel):</h6>
                                        <ul>
                                            <li>"I've noticed that right-wing rhetoric has become increasingly normalized in public discourse. Terms and positions that would have been considered extreme a few years ago are now part of everyday political discussions."</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <p class="conclusion">Alle Antworten wurden ins Englische übersetzt, wobei die ursprüngliche Bedeutung und der Kontext erhalten geblieben sind.</p>
                            </div>
                            <div class="message-time">11:16</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-2')">
                                <i>@</i>Callout
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-2')">
                                <i>@</i>Frage
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${languageManager.translate('common.placeholder')}"
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
