document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PROTECCIÓN DE RUTA
    if(localStorage.getItem('nexo_session') !== 'active') {
        window.location.href = 'index.html';
        return; 
    }

    // 2. CONFIGURACIÓN DE GRÁFICOS (Chart.js)
    
    // Gráfico de Barras: Evolución de Incidentes
    const barCtx = document.getElementById('indBarChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['10 oct', '11 oct', '12 oct', '13 oct', '14 oct', '15 oct', '16 oct'],
                datasets: [
                    {
                        label: 'Recibidos',
                        data: [75, 82, 68, 95, 78, 72, 65],
                        backgroundColor: '#1e3a8a', // Azul oscuro
                        borderRadius: 6,
                        barPercentage: 0.6
                    },
                    {
                        label: 'Resueltos',
                        data: [70, 78, 72, 90, 80, 75, 68],
                        backgroundColor: '#93c5fd', // Azul claro
                        borderRadius: 6,
                        barPercentage: 0.6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false } // Ocultamos la leyenda nativa porque usamos HTML
                },
                scales: {
                    y: { 
                        beginAtZero: true, 
                        grid: { borderDash: [4, 4], color: '#e2e8f0' },
                        ticks: { stepSize: 25 }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // Gráfico de Dona: Compromisos de SLA
    const donutCtx = document.getElementById('indDoughnutChart');
    if (donutCtx) {
        new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Dentro de SLA', 'Fuera de SLA'],
                datasets: [{
                    data: [96.8, 3.2],
                    backgroundColor: [
                        '#10b981', // Verde
                        '#e2e8f0'  // Gris claro
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    // 3. LÓGICA DEL CHATBOT (Analista de Datos)
    const openChatBtn = document.getElementById('indOpenChat');
    const closeChatBtn = document.getElementById('indCloseChat');
    const chatWindow = document.getElementById('indChatWindow');
    const chatForm = document.getElementById('indChatForm');
    const chatInput = document.getElementById('indChatInput');
    const chatBody = document.getElementById('indChatBody');
    const quickReplies = document.getElementById('indQuickReplies');

    if (openChatBtn && chatWindow) {
        openChatBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
        closeChatBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    function indAddMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('ind-msg', sender === 'user' ? 'ind-msg-user' : 'ind-msg-bot');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function indBotResponse(userText) {
        setTimeout(() => {
            let response = "Analizando los datos del periodo...";
            const text = userText.toLowerCase();
            
            if (text.includes('resolución') || text.includes('tiempo')) {
                response = "El tiempo de resolución bajó a 2h 18min (↓ 24 min frente a septiembre) gracias a la optimización del nivel 1.";
            } else if (text.includes('n3') || text.includes('proveedor')) {
                response = "El SLA de N3 (Proveedores) está en 92.0%. Tienen un tiempo de resolución de 15h 22min. Se sugiere revisar los acuerdos de cobertura.";
            } else if (text.includes('sla') || text.includes('cumplimiento')) {
                response = "El cumplimiento global de SLA es del 96.8%, superando la meta del 95%. La respuesta a críticos se mantiene en un 100%.";
            } else if (text.includes('hola')) {
                response = "Hola. Estoy listo para analizar contigo los KPIs, SLAs o el desempeño por niveles. ¿Qué dato necesitas?";
            } else {
                response = "Puedo darte detalles sobre el cumplimiento de SLA, los tiempos de resolución o el desempeño del nivel 3 (Proveedores).";
            }
            indAddMessage(response, 'bot');
        }, 1000); 
    }

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                indAddMessage(text, 'user');
                chatInput.value = '';
                if (quickReplies) quickReplies.style.display = 'none';
                indBotResponse(text);
            }
        });
    }

    window.indSendReply = function(text) {
        indAddMessage(text, 'user');
        if (quickReplies) quickReplies.style.display = 'none';
        indBotResponse(text);
    };
});