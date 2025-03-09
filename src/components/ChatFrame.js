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
            <div class="chat-frame">
                <div class="chat-header">
                    <div class="chat-title">${title}</div>
                    <div class="chat-controls">
                        <button class="chat-control-button chat-minimize"></button>
                        <button class="chat-control-button chat-maximize"></button>
                        <button class="chat-control-button chat-close"></button>
                    </div>
                </div>
                <div class="chat-container">
                    <div class="chat-messages">
                        <slot name="messages"></slot>
                    </div>
                    <div class="chat-input-container">
                        <div class="chat-toolbar">
                            <slot name="toolbar"></slot>
                        </div>
                        <div class="chat-input-wrapper">
                            <slot name="input"></slot>
                        </div>
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