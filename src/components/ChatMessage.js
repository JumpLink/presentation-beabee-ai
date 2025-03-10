// ChatMessage.js - Reusable chat message component
export class ChatMessage extends HTMLElement {
    constructor() {
        super();
        this.type = 'user'; // 'user' or 'ai'
        this.timeString = '';
        this.messageContent = '';
    }

    connectedCallback() {
        this.type = this.getAttribute('type') || 'user';
        this.timeString = this.getAttribute('time') || '';
        this.messageContent = this.innerHTML;
        
        this.render();
    }

    render() {
        // Hervorheben von Tags in der Nachricht
        const highlightedContent = this.highlightTags(this.messageContent);

        this.innerHTML = `
            <div class="message ${this.type}-message">
                <div class="message-content">
                    ${highlightedContent}
                </div>
                ${this.timeString ? `<div class="message-time">${this.timeString}</div>` : ''}
            </div>
        `;
    }

    // Methode zum Hervorheben von Tags
    highlightTags(content) {
        if (!content) return '';
        
        // Verbesserte Regex, die nur den Tag plus Inhalt bis zum Satzende erfasst
        return content.replace(/(@\w+:[^?!.]*[?!.])/g, '<span class="tag">$1</span>');
    }

    // Method to update message content
    updateContent(content) {
        this.messageContent = content;
        const messageContent = this.querySelector('.message-content');
        if (messageContent) {
            // Hervorheben von Tags beim Aktualisieren
            messageContent.innerHTML = this.highlightTags(content);
        }
    }

    // Method to update time
    updateTime(time) {
        this.timeString = time;
        const timeElement = this.querySelector('.message-time');
        if (timeElement) {
            timeElement.textContent = time;
        } else if (time) {
            const messageElement = this.querySelector('.message');
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = time;
            messageElement.appendChild(timeDiv);
        }
    }
}

customElements.define('chat-message', ChatMessage);
