// AIAnalysisSlide.js - Component for the AI analysis slide
import { languageManager } from '../i18n/LanguageManager.js';

export class AIAnalysisSlide extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const translations = languageManager.translate('slides.aiAnalysis');
        
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
                            <div class="message-time">10:42</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>Analyse der Veränderungen in der politischen Debatte</h5>
                                
                                <p>Basierend auf den Antworten zur Frage 1 lassen sich folgende Wahrnehmungen identifizieren:</p>
                                
                                <div class="analysis-summary">
                                    <div class="category negative">
                                        <h6>Negative Wahrnehmungen:</h6>
                                        <ul>
                                            ${translations.analysis.negative.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="category neutral">
                                        <h6>Neutrale Wahrnehmungen:</h6>
                                        <ul>
                                            ${translations.analysis.neutral.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="category positive">
                                        <h6>Positive Wahrnehmungen:</h6>
                                        <ul>
                                            ${translations.analysis.positive.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                                
                                <p class="conclusion">Die Analyse zeigt, dass die Veränderungen überwiegend negativ wahrgenommen werden, insbesondere die Normalisierung rechter Rhetorik und die aggressivere Diskussionskultur.</p>
                            </div>
                            <div class="message-time">10:43</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-1')">
                                <i>@</i>Callout
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-1')">
                                <i>@</i>Frage
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${languageManager.translate('common.placeholder')}"
                                 id="chat-input-1">
                            </div>
                            <button class="send-button" onclick="sendMessage('chat-input-1')">
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
