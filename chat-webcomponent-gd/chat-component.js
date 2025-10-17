import { getBotResponse } from './eliza.js';

class ChatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(180deg, #7b61ff, #5f80ff);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
        }

        .chat-widget {
          display: flex;
          flex-direction: column;
          width: 400px;
          height: 600px;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }

        .chat-header {
          background: #4a90e2;
          color: white;
          text-align: center;
          padding: 1rem;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .chat-header h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .chat-header p {
          margin: 0.25rem 0 0;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .messages {
          flex: 1;
          background: #f0f0f0;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .message {
          padding: 0.75em 1em;
          border-radius: 24px;
          max-width: 80%;
          word-wrap: break-word;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          position: relative;
          margin-bottom: 0.5rem;
        }

        .message.user {
          background: #007AFF;
          color: white;
          align-self: flex-end;
          border-radius: 24px 24px 0 24px;
        }

        .message.bot {
          background: #fff;
          border: 1px solid #e0e0e0;
          align-self: flex-start;
          border-radius: 24px 24px 24px 0;
        }

        .input-area {
          display: flex;
          padding: 0.5em;
          background: #fff;
          border-top: 1px solid #ccc;
        }

        .input-area input[type="text"] {
          flex: 1;
          padding: 0.5em;
          border: 1px solid #ccc;
          border-radius: 20px;
          font-size: 1em;
        }

        .input-area button {
          margin-left: 0.5em;
          padding: 0.5em 1em;
          border: 1px solid #ccc;
          border-radius: 20px;
          background: #f0f0f0;
        }

        .input-area button:hover {
          background: #ccc;
        }

        .chat-footer {
          background: #fff8e1;
          padding: 0.5rem;
          text-align: center;
          font-size: 0.8rem;
          color: #666;
          border-top: 1px solid #eee;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      </style>
      <div class="chat-widget">
        <header class="chat-header">
          <h1>Chat Assistant</h1>
          <p>Web Component – Fully Encapsulated (Shadow DOM)</p>
        </header>
        <div class="messages"></div>
        <form class="input-area">
          <input type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
        <footer class="chat-footer">
          <span>💡 This is the fully encapsulated Shadow DOM version. Fully self-contained!</span>
        </footer>
      </div>
    `;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = this.shadowRoot.querySelector('.input-area');
        const input = form.querySelector('input');
        const button = form.querySelector('button');

        const sendMsg = (e) => {
            e.preventDefault();
            const msg = input.value.trim();
            if (!msg) return;

            input.value = '';
            input.focus();

            this.addMessage(msg, true);
            this.addMessage(getBotResponse(msg), false);
        };

        button.addEventListener('click', sendMsg);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMsg(e);
        });
        form.addEventListener('submit', sendMsg);

        // Initial greeting
        this.addMessage('Hello! How can I help you today?', false);
    }

    addMessage(text, isUser) {
        const msgs = this.shadowRoot.querySelector('.messages');
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'bot'}`;
        div.textContent = text;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }
}

customElements.define('chat-interface', ChatInterface);