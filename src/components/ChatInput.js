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
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .chat-input-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                }
                
                .chat-input {
                    background-color: var(--color-chat-input-bg, #2a2e38);
                    border: 1px solid var(--color-border-light, #3a3f4b);
                    border-radius: 24px;
                    padding: 12px 18px;
                    color: var(--color-text, #e1e3e6);
                    font-size: 16px;
                    outline: none;
                    min-height: 60px;
                    max-height: none;
                    height: auto;
                    overflow-y: auto;
                    font-family: inherit;
                    line-height: 1.4;
                    transition: height 0.2s ease;
                    width: 100%;
                    box-sizing: border-box;
                    flex: 1;
                }
                
                .chat-input[contenteditable="true"] {
                    cursor: text;
                    white-space: pre-wrap;
                    word-break: break-word;
                    overflow: visible;
                }
                
                .chat-input[contenteditable="true"]:empty:before {
                    content: attr(data-placeholder);
                    color: var(--color-text-placeholder, #6c7280);
                    pointer-events: none;
                }
                
                .tag {
                    color: var(--color-primary, #56b6c2);
                    font-weight: bold;
                }
                
                .send-button {
                    background-color: var(--color-primary, #56b6c2);
                    color: var(--color-background-dark, #1e2129);
                    border: none;
                    border-radius: 50%;
                    width: 62px;
                    height: 62px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s ease;
                    flex-shrink: 0;
                }
                
                .send-button:hover {
                    background-color: var(--color-primary-hover, #67c7d3);
                }
                
                .send-button svg {
                    width: 30px;
                    height: 30px;
                }
            </style>
            
            <div class="chat-input-container" part="chat-input-container">
                <div class="chat-input" 
                     contenteditable="true" 
                     data-placeholder="${placeholder}" 
                     part="chat-input">
                </div>
                <button class="send-button" part="send-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
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
        // Reset height to auto to get the correct scrollHeight
        inputElement.style.height = 'auto';
        
        // If the input is empty, set it to the default height
        if (!inputElement.textContent.trim()) {
            inputElement.style.height = '60px'; // Default min-height
        } else {
            // Set height to scrollHeight to fit all content
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
