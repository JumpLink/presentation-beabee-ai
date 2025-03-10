// ChatInput.js - Reusable chat input component
export class ChatInput extends HTMLElement {
    constructor() {
        super();
        this.inputId = this.getAttribute('id') || 'chat-input';
        this.placeholder = this.getAttribute('placeholder') || 'Write a message...';
        this.initialMessage = this.getAttribute('initial-message') || '';
        this.initialMessageSent = false;
    }

    connectedCallback() {
        this.render();
        this.initializeEventListeners();
        
        // Apply initial message if provided
        if (this.initialMessage) {
            const inputElement = this.querySelector(`#${this.inputId}`);
            if (inputElement) {
                inputElement.innerText = this.initialMessage;
                this.adjustInputHeight(inputElement);
                this.highlightTags(inputElement);
            }
        }
    }

    render() {
        this.innerHTML = `
            <div class="chat-input-container">
                <div class="chat-input" 
                     contenteditable="true" 
                     placeholder="${this.placeholder}" 
                     id="${this.inputId}">
                </div>
                <button class="send-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="30" height="30">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        `;
    }

    initializeEventListeners() {
        const input = this.querySelector(`#${this.inputId}`);
        const sendButton = this.querySelector('.send-button');

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
        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }
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
        // Diese Methode ist jetzt hauptsächlich für manuell eingegebene Tags,
        // da Tags aus den Dropdown-Buttons bereits formatiert sind
        const html = inputElement.innerHTML;
        
        // Wenn keine Tags vorhanden sind, nichts tun
        if (!html || html.indexOf('@') === -1) return;
        
        // Nach unformatierten @Tags suchen (nicht innerhalb von spans)
        // Dies ist nur für manuell eingegebene Tags relevant
        const newHtml = html.replace(/(?<!<span[^>]*>)(@\w+:[^?!.]*[?!.])/g, '<span class="tag">$1</span>');
        
        // Nur aktualisieren, wenn sich etwas geändert hat
        if (newHtml !== html) {
            // Speichere Cursor-Position
            const selection = window.getSelection();
            let range = null;
            
            if (selection && selection.rangeCount > 0) {
                range = selection.getRangeAt(0).cloneRange();
            }
            
            // Update HTML
            inputElement.innerHTML = newHtml;
            
            // Cursor-Position wiederherstellen
            if (range) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    sendMessage() {
        const input = this.querySelector(`#${this.inputId}`);
        const message = input.textContent.trim();

        if (message) {
            // Wenn die Nachricht nicht leer ist und nicht gleich der initialen Nachricht
            // oder die initiale Nachricht bereits gesendet wurde, sende die Nachricht
            if (message !== this.initialMessage || this.initialMessageSent) {
                this.dispatchEvent(new CustomEvent('message-sent', {
                    bubbles: true,
                    detail: { message }
                }));
                input.textContent = '';
                this.adjustInputHeight(input);
            } else {
                // Markiere die initiale Nachricht als gesendet, um Duplikate zu vermeiden
                this.initialMessageSent = true;
                this.dispatchEvent(new CustomEvent('message-sent', {
                    bubbles: true,
                    detail: { message, isInitialMessage: true }
                }));
                input.textContent = '';
                this.adjustInputHeight(input);
            }
        }
    }

    // Methode zum Setzen des Eingabewerts
    setInputValue(text) {
        const inputElement = this.querySelector(`#${this.inputId}`);
        if (inputElement) {
            inputElement.innerText = text;
            this.adjustInputHeight(inputElement);
            this.highlightTags(inputElement);
        }
    }

    // Methode zum Setzen des Fokus auf das Eingabefeld
    focusInput() {
        const inputElement = this.querySelector(`#${this.inputId}`);
        if (inputElement) {
            inputElement.focus();
            
            // Cursor ans Ende des Textes setzen
            if (document.createRange && window.getSelection) {
                const range = document.createRange();
                range.selectNodeContents(inputElement);
                range.collapse(false); // false = collapse to end
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
}

customElements.define('chat-input', ChatInput);
