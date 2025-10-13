import { getBotResponse } from './eliza.js';

class SimpleChat extends HTMLElement {
    connectedCallback() {
        const msgs = this.querySelector('.messages');
        const form = this.querySelector('.input-area');
        const input = form.querySelector('input');

        const addMsg = (text, isUser) => {
            const div = document.createElement('div');
            div.className = `message ${isUser ? 'user' : 'bot'}`;
            div.textContent = text;
            msgs.appendChild(div);
            msgs.scrollTop = msgs.scrollHeight;
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = input.value.trim();
            if (!msg) return;
            input.value = '';
            input.focus();
            addMsg(msg, true);
            addMsg(getBotResponse(msg), false);
        });
    }
}

customElements.define('simple-chat', SimpleChat);