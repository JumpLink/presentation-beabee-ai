// ChatFrame.js - Reusable chat frame component
export class ChatFrame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Chat';
        this.render(title);
        this.initializeEventListeners();
    }

    render(title) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                }
                
                .chat-frame {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    background-color: var(--color-background-dark, #1e2129);
                    border: 1px solid var(--color-border-light, #3a3f4b);
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                }
                
                .chat-header {
                    background-color: rgba(30, 33, 41, 0.95);
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--color-border-light, #3a3f4b);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                }
                
                .chat-title {
                    color: var(--color-primary, #56b6c2);
                    font-size: 18px;
                    font-weight: bold;
                    margin: 0;
                }
                
                .chat-controls {
                    display: flex;
                    gap: 8px;
                }
                
                .chat-control-button {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                }
                
                .chat-minimize {
                    background-color: #f1c40f;
                }
                
                .chat-maximize {
                    background-color: #2ecc71;
                }
                
                .chat-close {
                    background-color: #e74c3c;
                }
                
                .chat-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 0;
                    background-color: var(--color-background-light, #282c34);
                }
                
                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    min-height: 0;
                }
                
                .chat-input-container {
                    display: flex;
                    flex-direction: column;
                    padding: 16px;
                    background-color: var(--color-user-message, #2a2e38);
                    flex-shrink: 0;
                }
                
                .chat-toolbar {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                
                ::slotted([slot="toolbar"]) {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                
                ::slotted([slot="messages"]) {
                    display: block;
                    width: 100%;
                }
                
                ::slotted([slot="input"]) {
                    display: block;
                    width: 100%;
                }
            </style>
            
            <div class="chat-frame" part="chat-frame">
                <div class="chat-header" part="chat-header">
                    <div class="chat-title" part="chat-title">${title}</div>
                    <div class="chat-controls">
                        <button class="chat-control-button chat-minimize"></button>
                        <button class="chat-control-button chat-maximize"></button>
                        <button class="chat-control-button chat-close"></button>
                    </div>
                </div>
                <div class="chat-container" part="chat-container">
                    <div class="chat-messages" part="chat-messages">
                        <slot name="messages"></slot>
                    </div>
                    <div class="chat-input-container" part="chat-input-container">
                        <div class="chat-toolbar" part="chat-toolbar">
                            <slot name="toolbar"></slot>
                        </div>
                        <slot name="input"></slot>
                    </div>
                </div>
            </div>
        `;
    }

    initializeEventListeners() {
        // Add event listeners for minimize, maximize, and close buttons
        const controls = this.shadowRoot.querySelectorAll('.chat-control-button');
        controls.forEach(button => {
            button.addEventListener('click', () => {
                // Dispatch custom event that parent can listen to
                this.dispatchEvent(new CustomEvent('controlClick', {
                    detail: {
                        action: button.classList[1].replace('chat-', '')
                    }
                }));
            });
        });
    }
}