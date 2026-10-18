document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTECCIÓN DE RUTA (Asegura que haya iniciado sesión)
    if(localStorage.getItem('nexo_session') !== 'active') {
        window.location.href = 'index.html';
        return; 
    }

    // 2. LÓGICA DEL CHATBOT DE CRISIS (Dedicado)
    const openChatBtn = document.getElementById('openCriticaChat');
    const closeChatBtn = document.getElementById('closeCriticaChat');
    const chatWindow = document.getElementById('criticaChatWindow');
    const chatForm = document.getElementById('criticaChatForm');
    const chatInput = document.getElementById('criticaChatInput');
    const chatBody = document.getElementById('criticaChatBody');
    const quickActions = document.getElementById('criticaQuickActions');

    // Abrir / Cerrar
    if (openChatBtn && chatWindow) {
        openChatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    // Función para agregar mensajes al DOM
    function addCriticalMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add(sender === 'user' ? 'msg-user' : 'msg-bot');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Simulador de respuesta del equipo de guardia
    function criticalBotResponse(userText) {
        setTimeout(() => {
            let response = "Recibido. El equipo de guardia está monitoreando la situación.";
            const text = userText.toLowerCase();
            
            if (text.includes('pacs') || text.includes('caído')) {
                response = "Entendido. Diego Ruiz (N2) ya está trabajando en la intermitencia del PACS. Te mantendremos informado en este canal.";
            } else if (text.includes('diego')) {
                response = "He enviado una notificación push a Diego Ruiz para que se comunique contigo de inmediato por este medio.";
            } else if (text.includes('gracias')) {
                response = "A la orden. Recuerda documentar cualquier acción en el ticket INC-2481.";
            }
            
            addCriticalMessage(response, 'bot');
        }, 1200); 
    }

    // Enviar mensaje desde el formulario
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                addCriticalMessage(text, 'user');
                chatInput.value = '';
                if (quickActions) quickActions.style.display = 'none';
                criticalBotResponse(text);
            }
        });
    }

    // Botones de acción rápida
    window.sendCriticaReply = function(text) {
        addCriticalMessage(text, 'user');
        if (quickActions) quickActions.style.display = 'none';
        criticalBotResponse(text);
    };

    // 3. INTERACCIÓN EXTRA: Simular acción en el botón "Activar Incidente"
    const btnActivar = document.querySelector('.btn-critical-pulse');
    if(btnActivar) {
        btnActivar.addEventListener('click', () => {
            alert('🚨 PROTOCOLO P1 ACTIVADO.\n\nSe ha notificado al equipo de guardia y se ha abierto el canal de crisis. La línea de tiempo ha comenzado.');
        });
    }
});