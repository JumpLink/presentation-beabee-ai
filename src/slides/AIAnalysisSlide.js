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
        const translations = {
            title: languageManager.translate('slides.aiAnalysis.title'),
            userMessage: languageManager.translate('slides.aiAnalysis.userMessage'),
            analysis: languageManager.translate('slides.aiAnalysis.analysis')
        };
        
        const commonTranslations = {
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
                            <div class="message-time">10:42</div>
                        </div>
                        
                        <div class="message ai-message">
                            <div class="message-content">
                                <h5>${translations.analysis.title}</h5>
                                
                                <p>${translations.analysis.intro}</p>
                                
                                <div class="analysis-summary">
                                    <div class="category negative">
                                        <h6>${translations.analysis.categories.negative.title}</h6>
                                        <ul>
                                            ${translations.analysis.categories.negative.items.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="category neutral">
                                        <h6>${translations.analysis.categories.neutral.title}</h6>
                                        <ul>
                                            ${translations.analysis.categories.neutral.items.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    <div class="category positive">
                                        <h6>${translations.analysis.categories.positive.title}</h6>
                                        <ul>
                                            ${translations.analysis.categories.positive.items.map(item => `<li>${item}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                                
                                <p class="conclusion">${translations.analysis.conclusion}</p>
                            </div>
                            <div class="message-time">10:43</div>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-1')">
                                <i>@</i>${commonTranslations.toolbar.callout}
                            </button>
                            <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-1')">
                                <i>@</i>${commonTranslations.toolbar.question}
                            </button>
                        </div>
                        
                        <div class="chat-input-wrapper">
                            <div class="chat-input" 
                                 contenteditable="true"
                                 data-placeholder="${commonTranslations.placeholder}"
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
