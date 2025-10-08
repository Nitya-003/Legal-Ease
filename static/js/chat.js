const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');

if (messageInput) {
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    messageInput.value = '';
    
    showTypingIndicator();
    
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        removeTypingIndicator();
        if (data.success) {
            addBotMessage(data.response);
        }
    })
    .catch(error => {
        removeTypingIndicator();
        console.error('Chat error:', error);
        addBotMessage('Sorry, I encountered an error. Please try again.');
    });
}

function askQuestion(question) {
    messageInput.value = question;
    sendMessage();
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-bubble">
                ${escapeHtml(message)}
            </div>
            <div class="message-time">Just now</div>
        </div>
        <div class="message-avatar">
            <i data-lucide="user"></i>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    lucide.createIcons();
    scrollToBottom();
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i data-lucide="bot"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${escapeHtml(message)}
            </div>
            <div class="message-time">Just now</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    lucide.createIcons();
    scrollToBottom();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i data-lucide="bot"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <span class="loading-pulse">Typing...</span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    lucide.createIcons();
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = chatMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
