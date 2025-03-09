// ChatInput.js - Reusable chat input component
export class ChatInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
    }

    render() {
        const placeholder = this.getAttribute('placeholder') || 'Write a message...';
        const inputId = this.getAttribute('input-id') || 'chat-input';

        this.shadowRoot.innerHTML = `
            <div class="chat-input" 
                 contenteditable="true" 
                 data-placeholder="${placeholder}" 
                 id="${inputId}">
            </div>
            <button class="send-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                </svg>
            </button>
        `;
    }

    initializeEventListeners() {
        const input = this.shadowRoot.querySelector('.chat-input');
        const sendButton = this.shadowRoot.querySelector('.send-button');

        // Handle input events
        input.addEventListener('input', () => {
            this.adjustInputHeight(input);
            this.highlightTags(input);
        });

        // Handle enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Handle send button click
        sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
    }

    adjustInputHeight(inputElement) {
        inputElement.style.height = 'auto';
        if (!inputElement.textContent.trim()) {
            inputElement.style.height = '60px';
        } else {
            inputElement.style.height = inputElement.scrollHeight + 'px';
        }
    }

    highlightTags(inputElement) {
        const text = inputElement.textContent;
        if (!text) return;

        const highlightedText = text
            .replace(/@Callout:/g, '<span class="tag">@Callout:</span>')
            .replace(/@Frage:/g, '<span class="tag">@Frage:</span>');

        if (highlightedText !== text) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const startOffset = range.startOffset;

            inputElement.innerHTML = highlightedText;

            if (inputElement.childNodes.length > 0) {
                try {
                    const newRange = document.createRange();
                    const textNode = inputElement.childNodes[0];
                    newRange.setStart(textNode, Math.min(startOffset, textNode.length));
                    newRange.setEnd(textNode, Math.min(startOffset, textNode.length));
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                } catch (e) {
                    console.error('Error restoring cursor position:', e);
                }
            }
        }
    }

    sendMessage() {
        const input = this.shadowRoot.querySelector('.chat-input');
        const message = input.textContent.trim();

        if (message) {
            this.dispatchEvent(new CustomEvent('messageSent', {
                detail: { message }
            }));
            input.textContent = '';
            this.adjustInputHeight(input);
        }
    }
}
