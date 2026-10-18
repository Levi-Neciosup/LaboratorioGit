document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTECCIÓN DE RUTA
    if(localStorage.getItem('nexo_session') !== 'active') {
        window.location.href = 'index.html';
        return; 
    }

    // 2. LÓGICA DE PESTAÑAS (Timeline)
    const tabs = document.querySelectorAll('.td-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('td-tab-active'));
            tab.classList.add('td-tab-active');
            // Aquí podrías añadir lógica para mostrar/ocultar contenido del timeline
        });
    });

    // 3. LÓGICA DEL CHATBOT (Asistente de Incidentes)
    const openChatBtn = document.getElementById('tdOpenChat');
    const closeChatBtn = document.getElementById('tdCloseChat');
    const chatWindow = document.getElementById('tdChatWindow');
    const chatForm = document.getElementById('tdChatForm');
    const chatInput = document.getElementById('tdChatInput');
    const chatBody = document.getElementById('tdChatBody');
    const quickReplies = document.getElementById('tdQuickReplies');

    if (openChatBtn && chatWindow) {
        openChatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    function tdAddMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('td-msg', sender === 'user' ? 'td-msg-user' : 'td-msg-bot');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function tdBotResponse(userText) {
        setTimeout(() => {
            let response = "Procesando tu consulta sobre el incidente PACS...";
            const text = userText.toLowerCase();
            
            if (text.includes('sla') || text.includes('tiempo')) {
                response = "Quedan 1 h 32 min de SLA. El objetivo P1 es de 2 horas y vence a las 00:12. La primera respuesta ya se cumplió en 2 min.";
            } else if (text.includes('nota') || text.includes('escalar')) {
                response = "Sugerencia de nota: 'Se realizó validación de cola DICOM. Se requiere apoyo de N3 (Proveedor) para revisar latencia en el servidor central. Se mantiene contingencia local en radiología.'";
            } else if (text.includes('n3') || text.includes('proveedor')) {
                response = "El escalamiento a N3 (Proveedores PACS) está programado para las 23:00 si no hay recuperación. Puedes usar el botón de 'Solicitar apoyo' en la ruta de escalamiento.";
            } else if (text.includes('hola')) {
                response = "Hola Ana. Estoy analizando el ticket INC-2481. ¿Necesitas redactar una nota o consultar el SLA?";
            } else {
                response = "Puedo ayudarte a redactar notas de seguimiento o darte detalles del SLA y la ruta de escalamiento. ¿Qué necesitas?";
            }
            tdAddMessage(response, 'bot');
        }, 1000); 
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                tdAddMessage(text, 'user');
                chatInput.value = '';
                if (quickReplies) quickReplies.style.display = 'none';
                tdBotResponse(text);
            }
        });
    }

    window.tdSendReply = function(text) {
        tdAddMessage(text, 'user');
        if (quickReplies) quickReplies.style.display = 'none';
        tdBotResponse(text);
    };
});