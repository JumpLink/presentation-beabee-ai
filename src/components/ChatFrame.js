// ChatFrame.js - Reusable chat frame component
export class ChatFrame extends HTMLElement {
    constructor() {
        super();
        this.title = '';
    }

    static get observedAttributes() {
        return ['title']; // Beobachte Änderungen am title-Attribut
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title' && oldValue !== newValue) {
            this.title = newValue;
            this.updateTitle(); // Aktualisiere nur den Titel, nicht das gesamte Element
        }
    }

    updateTitle() {
        const titleElement = this.querySelector('.chat-title');
        if (titleElement) {
            titleElement.textContent = this.title;
        }
    }

    connectedCallback() {
        this.title = this.getAttribute('title') || 'Chat';
        this.render();
        this.initializeEventListeners();
        
        // Initially hide messages (will be shown after first send button click)
        this.hideMessages();
        
        // Auf Sprachänderungen reagieren
        window.addEventListener('languageChanged', () => {
            // Der Titel wird über das Attribut aktualisiert, wenn die Slide-Komponente neu gerendert wird
            // Wir müssen hier nichts tun, da attributeChangedCallback aufgerufen wird
        });
    }

    render() {
        // Stelle sicher, dass der Titel aktuell ist
        this.title = this.getAttribute('title') || 'Chat';
        
        this.innerHTML = `
            <div class="chat-frame">
                <div class="chat-header">
                    <div class="chat-title">${this.title}</div>
                    <div class="chat-controls">
                        <button class="chat-control-button chat-minimize"></button>
                        <button class="chat-control-button chat-maximize"></button>
                        <button class="chat-control-button chat-close"></button>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-messages">
                    </div>
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        // Add event listeners for minimize, maximize, and close buttons
        const controls = this.querySelectorAll('.chat-control-button');
        controls.forEach(button => {
            button.addEventListener('click', () => {
                // Dispatch custom event that parent can listen to
                this.dispatchEvent(new CustomEvent('control-click', {
                    bubbles: true,
                    detail: {
                        action: button.classList[1].replace('chat-', '')
                    }
                }));
            });
        });
    }
    
    // Add a message to the chat
    addMessage(type, content, time = new Date().toLocaleTimeString()) {
        const messagesContainer = this.querySelector('.chat-messages');
        
        // Create a new chat message element
        const messageElement = document.createElement('chat-message');
        messageElement.setAttribute('type', type);
        messageElement.setAttribute('time', time);
        
        // Setze den Inhalt der Nachricht direkt
        messageElement.innerHTML = content;
        
        // Add the message to the container
        messagesContainer.appendChild(messageElement);
        
        // Scroll to the bottom of the messages container
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Show messages container if hidden
        this.showMessages();
        
        return messageElement;
    }
    
    // Clear all messages
    clearMessages() {
        const messagesContainer = this.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }
    
    // Hide messages (for initial state)
    hideMessages() {
        const messagesContainer = this.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.classList.add('hidden');
        }
    }
    
    // Show messages (after first send button click)
    showMessages() {
        const messagesContainer = this.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.classList.remove('hidden');
        }
    }
}

customElements.define('chat-frame', ChatFrame);