// ChatInput.js - Reusable chat input component
import './Toolbar.js'; // Importiere die Toolbar-Komponente
import { languageManager } from '../i18n/LanguageManager.js';

export class ChatInput extends HTMLElement {
    constructor() {
        super();
        this.inputId = this.getAttribute('id') || 'chat-input';
        this.placeholderKey = this.getAttribute('placeholder') || 'common.placeholder';
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
        
        // Auf Sprachänderungen reagieren
        window.addEventListener('languageChanged', () => {
            // Nur den Placeholder aktualisieren, ohne den gesamten Inhalt neu zu rendern
            this.updatePlaceholder();
        });
    }
    
    // Methode zum Aktualisieren des Placeholders
    updatePlaceholder() {
        const inputElement = this.querySelector(`#${this.inputId}`);
        if (inputElement) {
            // Wenn der Placeholder ein Übersetzungsschlüssel ist, übersetzen
            if (this.placeholderKey.includes('.')) {
                inputElement.setAttribute('data-placeholder', languageManager.translate(this.placeholderKey));
            } else {
                // Andernfalls den Wert direkt verwenden
                inputElement.setAttribute('data-placeholder', this.placeholderKey);
            }
        }
    }

    render() {
        // Placeholder übersetzen, wenn es ein Übersetzungsschlüssel ist
        let placeholder = this.placeholderKey;
        if (this.placeholderKey.includes('.')) {
            placeholder = languageManager.translate(this.placeholderKey);
        }
        
        this.innerHTML = `
            <div class="chat-input-wrapper">
                <chat-toolbar></chat-toolbar>
                <div class="input-container">
                    <div 
                        id="${this.inputId}" 
                        class="chat-input" 
                        contenteditable="true" 
                        data-placeholder="${placeholder}">
                    </div>
                    <button class="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        const input = this.querySelector(`#${this.inputId}`);
        const sendButton = this.querySelector('.send-button');
        const toolbar = this.querySelector('chat-toolbar');

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
        
        // Handle tag insertion from toolbar
        if (toolbar) {
            toolbar.addEventListener('insert-tag', (e) => {
                const { tagType, promptText } = e.detail;
                this.insertTag(tagType, promptText);
            });
        }
        
        // Schließe Dropdowns beim Klicken außerhalb
        document.addEventListener('click', (e) => {
            if (!e.target.closest('chat-toolbar')) {
                this.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Neue Methode zum Einfügen von Tags
    insertTag(tagType, promptText) {
        const input = this.querySelector(`#${this.inputId}`);
        if (!input) return;
        
        // Formatiere den Text mit dem entsprechenden Tag
        const tagText = `@${tagType}: ${promptText}`;
        const formattedTag = `<span class="tag">${tagText}</span> `;
        
        // Fokussiere das Eingabefeld
        input.focus();
        
        try {
            // HTML direkt an der Cursor-Position einfügen
            document.execCommand('insertHTML', false, formattedTag);
            
            // Input-Event auslösen, um Höhe anzupassen
            const inputEvent = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            input.dispatchEvent(inputEvent);
        } catch (e) {
            console.error('Fehler beim Einfügen des Tags:', e);
            
            // Fallback: Tag am Ende anfügen
            input.innerHTML += formattedTag;
            this.adjustInputHeight(input);
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
