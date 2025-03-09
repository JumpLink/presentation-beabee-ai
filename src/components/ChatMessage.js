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

        this.shadowRoot.innerHTML = `
            <div class="message ${type}-message">
                <div class="message-content">
                    ${content}
                </div>
                ${time ? `<div class="message-time">${time}</div>` : ''}
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
