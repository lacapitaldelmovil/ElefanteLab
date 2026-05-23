// contact-form.js - Manejo del formulario de contacto para Elefante Lab

document.addEventListener('DOMContentLoaded', function() {
    function openWhatsAppContact(form, waNumber) {
        const nombre  = (form.querySelector('[name="nombre"]')  || {}).value || '';
        const email   = (form.querySelector('[name="email"]')   || {}).value || '';
        const empresa = (form.querySelector('[name="empresa"]') || {}).value || '';
        const asunto  = (form.querySelector('[name="asunto"]')  || {}).value || '';
        const tipo    = (form.querySelector('[name="tipo_proyecto"]') || {}).value || '';
        const mensaje = (form.querySelector('[name="mensaje"]') || {}).value || '';

        let text = '¡Hola Elefante Lab! 👋\n\n';
        if (nombre)  text += `*Nombre:* ${nombre}\n`;
        if (email)   text += `*Email:* ${email}\n`;
        if (empresa) text += `*Empresa:* ${empresa}\n`;
        if (asunto)  text += `*Asunto:* ${asunto}\n`;
        if (tipo)    text += `*Tipo de proyecto:* ${tipo}\n`;
        if (mensaje) text += `\n*Proyecto:*\n${mensaje}`;

        window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text), '_blank');
    }

    // Buscar todos los formularios de contacto en la página
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(function(form) {
        // Solo procesar formularios que tengan campos de contacto típicos
        const hasNombre = form.querySelector('input[name="nombre"], input[placeholder*="Nombre"]');
        const hasEmail = form.querySelector('input[name="email"], input[type="email"]');
        
        if (hasNombre || hasEmail) {
            // Asegurar que los campos tengan nombres
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                if (!input.name) {
                    const placeholder = input.placeholder || '';
                    if (placeholder.toLowerCase().includes('nombre')) input.name = 'nombre';
                    else if (placeholder.toLowerCase().includes('email')) input.name = 'email';
                    else if (placeholder.toLowerCase().includes('empresa')) input.name = 'empresa';
                    else if (placeholder.toLowerCase().includes('asunto')) input.name = 'asunto';
                    else if (placeholder.toLowerCase().includes('proyecto') || placeholder.toLowerCase().includes('mensaje')) input.name = 'mensaje';
                }
                if (input.tagName === 'SELECT' && !input.name) {
                    input.name = 'tipo_proyecto';
                }
            });

            // Añadir ID si no tiene
            if (!form.id) {
                form.id = 'contactForm_' + Math.random().toString(36).substr(2, 9);
            }

            // Crear div para mensajes si no existe
            let formMessage = form.querySelector('.form-message');
            if (!formMessage) {
                formMessage = document.createElement('div');
                formMessage.className = 'form-message';
                formMessage.style.cssText = 'margin-top: 15px; display: none; padding: 10px; border-radius: 5px;';
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.parentNode.insertBefore(formMessage, submitBtn.nextSibling);
                } else {
                    form.appendChild(formMessage);
                }
            }

            // Manejar envío del formulario
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const waNumber = form.dataset.whatsapp;
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.textContent : 'Enviar';
                
                if (submitBtn) {
                    submitBtn.textContent = 'Enviando...';
                    submitBtn.disabled = true;
                }
                
                const formData = new FormData(form);
                
                // Convert FormData to URL-encoded string for the server
                const urlEncodedData = new URLSearchParams(formData).toString();
                
                // Endpoint Node.js – same for all pages regardless of path
                const apiPath = '/api/contact';
                
                fetch(apiPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: urlEncodedData
                })
                .then(response => response.json().then(data => ({ response, data })))
                .then(({ response, data }) => {
                    formMessage.style.display = 'block';
                    if (response.ok && data.success) {
                        formMessage.style.backgroundColor = 'rgba(0, 212, 170, 0.1)';
                        formMessage.style.color = '#00D4AA';
                        formMessage.style.border = '1px solid #00D4AA';
                        formMessage.innerHTML = '✅ ' + data.message;
                        if (waNumber) {
                            openWhatsAppContact(form, waNumber);
                        }
                        form.reset();
                    } else {
                        formMessage.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                        formMessage.style.color = '#ff6b6b';
                        formMessage.style.border = '1px solid #ff6b6b';
                        formMessage.innerHTML = '❌ ' + data.message;
                    }
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                    
                    // Ocultar mensaje después de 5 segundos
                    setTimeout(function() {
                        formMessage.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
                    formMessage.style.color = '#ff6b6b';
                    formMessage.style.border = '1px solid #ff6b6b';
                    formMessage.innerHTML = '❌ Error de conexión. Por favor intenta de nuevo.';
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
            });
        }
    });
});
