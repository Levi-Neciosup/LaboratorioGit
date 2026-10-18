document.addEventListener('DOMContentLoaded', () => {
    
    // ================= PROTECCIÓN DE RUTA =================
    // Si no hay sesión, redirigir al login
    if(localStorage.getItem('nexo_session') !== 'active') {
        window.location.href = 'index.html';
        return; // Detener ejecución
    }

    // Mostrar nombre del usuario guardado si es necesario
    const userNameDisplay = document.querySelector('.user-info strong');
    if(userNameDisplay) {
        userNameDisplay.textContent = localStorage.getItem('nexo_user') || 'Usuario';
    }

    // ================= LÓGICA DEL CHATBOT =================
    const toggleChatBtn = document.getElementById('toggleChat');
    const closeChatBtn = document.getElementById('closeChat');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const quickReplies = document.getElementById('quickReplies');

    if (toggleChatBtn && chatbotWindow) {
        toggleChatBtn.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });

        closeChatBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    // Función para agregar mensajes al chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
    }

    // Simulador de respuesta del Bot
    function botResponse(userText) {
        setTimeout(() => {
            let response = "Entiendo. Déjame revisar eso por ti.";
            
            const text = userText.toLowerCase();
            if (text.includes('sla')) {
                response = "El SLA actual está al 96.8%, superando la meta del 95%. El tiempo de primera respuesta es de 4 minutos.";
            } else if (text.includes('ticket')) {
                response = "Puedes crear un ticket yendo a la sección 'Tickets' en el menú izquierdo. ¿Quieres que te redirija?";
            } else if (text.includes('humano') || text.includes('soporte')) {
                response = "Un agente de soporte se conectará contigo en breve. Por favor, mantente en línea.";
            } else if (text.includes('hola')) {
                response = "¡Hola! ¿Cómo puedo asistirte hoy?";
            } else if (text.includes('gracias')) {
                response = "¡De nada! Estoy aquí para ayudarte.";
            } else {
                response = "No estoy seguro de cómo responder a eso. Puedes preguntarme sobre 'SLA', 'crear ticket' o pedir 'hablar con un humano'.";
            }

            addMessage(response, 'bot');
        }, 1000); // 1 segundo de retraso simulado
    }

    // Enviar mensaje desde el formulario
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, 'user');
                chatInput.value = '';
                // Ocultar respuestas rápidas al empezar a chatear
                if (quickReplies) quickReplies.style.display = 'none';
                
                botResponse(text);
            }
        });
    }

    // Lógica para botones de respuesta rápida
    window.sendQuickReply = function(text) {
        addMessage(text, 'user');
        if (quickReplies) quickReplies.style.display = 'none';
        botResponse(text);
    };

    // ================= GRÁFICOS (Chart.js) =================
    // (Mantén tu código de gráficos intacto)
    // ...
});