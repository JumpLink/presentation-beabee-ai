// ChatMessage.js - Reusable chat message component
export class ChatMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const type = this.getAttribute('type') || 'user'; // 'user' or 'ai'
        const time = this.getAttribute('time') || '';
        const content = this.innerHTML;
        this.innerHTML = '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 16px;
                }
                
                .message {
                    padding: 12px 16px;
                    border-radius: 12px;
                    max-width: 80%;
                }
                
                .user-message {
                    background-color: var(--color-user-message, #2a2e38);
                    margin-left: auto;
                }
                
                .ai-message {
                    background-color: var(--color-ai-message, #383c4a);
                    margin-right: auto;
                }
                
                .message-content {
                    color: var(--color-text, #e1e3e6);
                    font-size: 16px;
                    line-height: 1.5;
                }
                
                .message-time {
                    color: var(--color-text-muted, #6c7280);
                    font-size: 12px;
                    margin-top: 4px;
                }
                
                /* Styling for message content */
                .message-content h5 {
                    margin-top: 0;
                    color: var(--color-primary, #56b6c2);
                }
                
                .message-content p {
                    margin: 8px 0;
                }
                
                .message-content ul {
                    padding-left: 20px;
                }
                
                .message-content li {
                    margin-bottom: 4px;
                }
                
                .tag {
                    color: var(--color-primary, #56b6c2);
                    font-weight: bold;
                }
                
                .response-item {
                    margin-bottom: 16px;
                    border-left: 3px solid var(--color-primary, #56b6c2);
                    padding-left: 12px;
                }
                
                .response-header {
                    margin-bottom: 4px;
                }
                
                .response-type {
                    font-weight: bold;
                    color: var(--color-primary, #56b6c2);
                }
                
                .response-content {
                    color: var(--color-text, #e1e3e6);
                }
                
                .category {
                    margin-bottom: 16px;
                    padding: 12px;
                    border-radius: 8px;
                }
                
                .category h6 {
                    margin-top: 0;
                    margin-bottom: 8px;
                    font-size: 16px;
                }
                
                .category.negative {
                    background-color: rgba(231, 76, 60, 0.1);
                    border-left: 3px solid #e74c3c;
                }
                
                .category.neutral {
                    background-color: rgba(241, 196, 15, 0.1);
                    border-left: 3px solid #f1c40f;
                }
                
                .category.positive {
                    background-color: rgba(46, 204, 113, 0.1);
                    border-left: 3px solid #2ecc71;
                }
                
                .analysis-summary {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin: 16px 0;
                }
                
                .conclusion {
                    font-weight: bold;
                    margin-top: 16px;
                }
                
                .image-preview {
                    margin: 16px 0;
                    text-align: center;
                }
                
                .image-preview img {
                    max-width: 100%;
                    border-radius: 8px;
                    margin-bottom: 8px;
                }
                
                .image-description {
                    font-style: italic;
                    color: var(--color-text-muted, #6c7280);
                }
            </style>
            
            <div class="message ${type}-message" part="message">
                <div class="message-content" part="message-content">
                    ${content}
                </div>
                ${time ? `<div class="message-time" part="message-time">${time}</div>` : ''}
            </div>
        `;
    }

    // Method to update message content
    updateContent(content) {
        const messageContent = this.shadowRoot.querySelector('.message-content');
        if (messageContent) {
            messageContent.innerHTML = content;
        }
    }

    // Method to update time
    updateTime(time) {
        const timeElement = this.shadowRoot.querySelector('.message-time');
        if (timeElement) {
            timeElement.textContent = time;
        } else if (time) {
            const messageElement = this.shadowRoot.querySelector('.message');
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = time;
            messageElement.appendChild(timeDiv);
        }
    }
}
