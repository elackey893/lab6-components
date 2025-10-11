import { getBotResponse } from './eliza.js';

const DEBUG = false;
const log = (msg) => { if (DEBUG) console.log(msg); };

function showResponse(response) {
    addToChatWindow(response, 'Bot');
}

function getResponse(message) {
    return getBotResponse(message);
}

function processMessage(message) {
    let response = getResponse(message);
    showResponse(response);
}

function addToChatWindow(message, speaker) {
    let chatWindow = document.getElementById('chatWindow');
    const p = document.createElement('p');
    p.className = speaker;
    p.textContent = message;
    chatWindow.appendChild(p);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
}

function send() {
    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value.trim();
    if (!message) return; // Skip empty messages

    messageBox.value = ''; // Clear the field
    messageBox.focus();

    addToChatWindow(message, 'User');
    processMessage(message);
}

function init() {
    log('Initializing DOM chat interface');
    const sendBtn = document.getElementById('sendBtn');
    const messageBox = document.getElementById('messageBox');

    sendBtn.addEventListener('click', send);

    // Enter key support
    messageBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            send();
        }
    });

    // Initial bot greeting
    addToChatWindow("Hello! How can I help you today?", 'Bot');
}

window.addEventListener('DOMContentLoaded', init);