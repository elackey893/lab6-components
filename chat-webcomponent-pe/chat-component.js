import { getBotResponse } from './eliza.js';

class SimpleChat extends HTMLElement {
    connectedCallback() {
        const messages = this.querySelector('.messages');
        const form = this.querySelector('.input-area');
        const input = form.querySelector('input');
        const button = form.querySelector('button');

        if (!messages || !form) return; // Bail if markup missing

        const addMessage = (text, isUser) => {
            const div = document.createElement('div');
            div.className = `message ${isUser ? 'user' : 'bot'}`;
            div.textContent = text;
            messages.appendChild(div);
            messages.scrollTop = messages.scrollHeight; // Auto-scroll
        };

        const sendMessage = (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (!message) return;

            input.value = ''; // Clear input
            input.focus();

            addMessage(message, true); // User message
            addMessage(getBotResponse(message), false); // Bot response
        };

        // Attach listeners
        button.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage(e);
        });
        form.addEventListener('submit', sendMessage);

        // Initial greeting if no messages yet
        if (messages.children.length === 0) {
            addMessage('Hello! How can I help you?', false);
        }
    }
}

customElements.define('simple-chat', SimpleChat);