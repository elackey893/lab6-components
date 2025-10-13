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
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function send(e) {
    e.preventDefault(); // Stop form reload
    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value.trim();
    if (!message) return;

    messageBox.value = '';
    messageBox.focus();

    addToChatWindow(message, 'User');
    processMessage(message);
}

function init() {
    log('Initializing DOM chat interface');
    const sendBtn = document.getElementById('sendBtn');
    const chatForm = document.getElementById('chatForm');

    // Listen on form submit (handles button click + Enter)
    chatForm.addEventListener('submit', send);

    // Initial bot greeting
    addToChatWindow("Hello! How can I help you today?", 'Bot');
}

window.addEventListener('DOMContentLoaded', init);