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
        // Get translations using individual keys
        const translations = {
            title: languageManager.translate('slides.aiAnalysis.title'),
            userMessage: languageManager.translate('slides.aiAnalysis.userMessage'),
            analysis: languageManager.translate('slides.aiAnalysis.analysis')
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
                    <chat-message type="user" time="10:42">
                        ${translations.userMessage}
                    </chat-message>
                    
                    <chat-message type="ai" time="10:43">
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
                    </chat-message>
                </div>
                
                <div slot="toolbar">
                    <button class="toolbar-button toolbar-button-callout" onclick="toggleToolbarDropdown(event, 'toolbar-callout-dropdown-chat-input-1')">
                        <i>@</i>${commonTranslations.toolbar.callout}
                    </button>
                    <button class="toolbar-button toolbar-button-frage" onclick="toggleToolbarDropdown(event, 'toolbar-frage-dropdown-chat-input-1')">
                        <i>@</i>${commonTranslations.toolbar.question}
                    </button>
                </div>
                
                <chat-input slot="input" 
                           placeholder="${commonTranslations.placeholder}"
                           input-id="chat-input-1">
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
                window.showConversation('chat-input-1');
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
