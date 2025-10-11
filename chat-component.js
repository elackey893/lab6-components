class ChatInterface extends HTMLElement {
    static get observedAttributes() {
        return ['data-bot-message', 'data-user-message'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const botMessage = this.getAttribute('data-bot-message') || 'Hello there! I\'m your friendly chatbot.';
        const userMessage = this.getAttribute('data-user-message') || 'Hi! Nice to meet you. What can you do?';

        this.innerHTML = `
      <header class="chat-header">
        <h1>Chat Assistant</h1>
        <p>Prototype: Pure HTML/CSS (Static)</p>
      </header>
      <chat-window id="chatWindow">
        <p class="Bot">${botMessage}</p>
        <p class="User">${userMessage}</p>
        <p class="Bot">Right now, I'm just a static demo — but soon I'll be interactive!</p>
        <p class="User">Cool! So this is just an example conversation?</p>
        <p class="Bot">Exactly. This version doesn’t use JavaScript yet — just plain HTML and CSS.</p>
      </chat-window>
      <form id="chatForm">
        <input type="text" placeholder="Type a message" id="messageBox" autocomplete="off" />
        <button id="sendBtn" type="button">Send</button>
      </form>
      <footer class="chat-footer">
        <span>💡 This is a static HTML/CSS demonstration. The input is disabled. See other approaches for interactive versions.</span>
      </footer>
    `;
    }
}

customElements.define('chat-interface', ChatInterface);