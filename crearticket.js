document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    const successModal = document.getElementById('successModal');
    const ticketIdSpan = document.getElementById('ticketId');

    // --- LÓGICA DE ADJUNTAR ARCHIVOS ---
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    
    // Usamos un objeto para guardar los archivos y evitar duplicados
    let selectedFiles = new DataTransfer(); 

    // 1. Abrir explorador al hacer clic en la zona
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // 2. Manejar selección desde el explorador
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // 3. Manejar Drag & Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    // Función para procesar los archivos
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Validación de peso (10MB) y tipo
            const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                alert(`El archivo ${file.name} no es un formato válido (solo PNG, JPG, PDF).`);
                continue;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert(`El archivo ${file.name} supera los 10MB.`);
                continue;
            }

            // Agregar al DataTransfer (simula la lista del input real)
            selectedFiles.items.add(file);
            
            // Renderizar en el HTML
            renderFileItem(file);
        }
        // Actualizar el input real con los archivos seleccionados
        fileInput.files = selectedFiles.files;
    }

    // Función para mostrar el archivo en la lista
    function renderFileItem(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-item-info">
                <i class="fa-solid fa-file"></i>
                <span>${file.name} (${(file.size / 1024).toFixed(0)} KB)</span>
            </div>
            <button type="button" class="btn-remove-file" title="Eliminar archivo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        // Lógica para eliminar el archivo de la lista
        const btnRemove = fileItem.querySelector('.btn-remove-file');
        btnRemove.addEventListener('click', () => {
            fileItem.remove();
            // Remover del objeto DataTransfer
            const newTransfer = new DataTransfer();
            for (let i = 0; i < selectedFiles.files.length; i++) {
                if (selectedFiles.files[i].name !== file.name) {
                    newTransfer.items.add(selectedFiles.files[i]);
                }
            }
            selectedFiles = newTransfer;
            fileInput.files = selectedFiles.files;
        });

        fileList.appendChild(fileItem);
    }
    // --- FIN LÓGICA DE ADJUNTAR ARCHIVOS ---


    // Manejar el envío del formulario
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        if (!ticketForm.checkValidity()) {
            ticketForm.reportValidity();
            return;
        }

        // Simulación de creación de ticket
        const randomId = Math.floor(1000 + Math.random() * 9000);
        ticketIdSpan.textContent = `INC-${randomId}`;

        successModal.classList.add('active');
    });

    // Función para cerrar el modal
    window.closeModal = () => {
        successModal.classList.remove('active');
        ticketForm.reset(); 
        
        // Limpiar la lista de archivos visual y el input real
        fileList.innerHTML = '';
        selectedFiles = new DataTransfer();
        fileInput.files = selectedFiles.files;
    };

    // Cerrar modal al hacer clic fuera
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });
});