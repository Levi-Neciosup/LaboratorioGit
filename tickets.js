document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTECCIÓN DE RUTA
    if(localStorage.getItem('nexo_session') !== 'active') {
        window.location.href = 'index.html';
        return; 
    }

    // 2. LÓGICA DE TABS (Pestañas)
    const tabs = document.querySelectorAll('.tk-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('tk-tab-active'));
            tab.classList.add('tk-tab-active');
        });
    });

    // 3. FORMULARIO DE REGISTRO RÁPIDO
    const quickForm = document.getElementById('tkForm');
    const submitBtn = document.getElementById('tkSubmitBtn');

    if(quickForm) {
        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animación de carga en el botón
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Registrando... ⏳';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // Simulamos la llamada a la base de datos
            setTimeout(() => {
                alert('✅ Ticket registrado exitosamente.\nEl SLA ha comenzado a correr y se ha asignado al equipo correspondiente.');
                quickForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // 4. LÓGICA DEL CHATBOT (Asistente de Tickets)
    const openChatBtn = document.getElementById('tkOpenChat');
    const closeChatBtn = document.getElementById('tkCloseChat');
    const chatWindow = document.getElementById('tkChatWindow');
    const chatForm = document.getElementById('tkChatForm');
    const chatInput = document.getElementById('tkChatInput');
    const chatBody = document.getElementById('tkChatBody');
    const quickReplies = document.getElementById('tkQuickReplies');

    if (openChatBtn && chatWindow) {
        openChatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    function tkAddMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('tk-msg', sender === 'user' ? 'tk-msg-user' : 'tk-msg-bot');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function tkBotResponse(userText) {
        setTimeout(() => {
            let response = "Entiendo. Déjame buscar esa información por ti.";
            const text = userText.toLowerCase();
            
            if (text.includes('p1') || text.includes('crítico')) {
                response = "Para un ticket P1 (Crítico), por favor usa el formulario rápido, selecciona Prioridad P1 y asegúrate de llamar también a la Extensión 7000.";
            } else if (text.includes('estado') || text.includes('mis tickets')) {
                response = "Actualmente tienes 8 tickets asignados. 1 está en estado Crítico (PACS) y 2 están en curso normales.";
            } else if (text.includes('hola')) {
                response = "¡Hola Ana! Estoy aquí para ayudarte con la gestión de tickets. Puedes preguntarme por prioridades o estados.";
            } else {
                response = "Puedo ayudarte a entender las prioridades (P1, P2, P3) o a revisar el estado de tus tickets. ¿Qué necesitas?";
            }
            tkAddMessage(response, 'bot');
        }, 1000); 
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                tkAddMessage(text, 'user');
                chatInput.value = '';
                if (quickReplies) quickReplies.style.display = 'none';
                tkBotResponse(text);
            }
        });
    }

    window.tkSendReply = function(text) {
        tkAddMessage(text, 'user');
        if (quickReplies) quickReplies.style.display = 'none';
        tkBotResponse(text);
    };
});