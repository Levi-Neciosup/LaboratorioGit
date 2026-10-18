document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // --- Credenciales Predeterminadas (Simulación de Base de Datos) ---
    const VALID_EMAIL = 'admin@nexo.com';
    const VALID_PASS = '123456';

    // Mostrar/Ocultar contraseña
    if(togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = passwordInput.value.trim();

            // Validación
            if(email === VALID_EMAIL && password === VALID_PASS) {
                // Éxito: Guardar sesión y redirigir
                localStorage.setItem('nexo_session', 'active');
                localStorage.setItem('nexo_user', 'Ana Vargas');
                window.location.href = 'inicio.html';
            } else {
                // Error: Mostrar mensaje
                errorDiv.style.display = 'block';
                // Ocultar error después de 3 segundos
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 3000);
            }
        });
    }
});