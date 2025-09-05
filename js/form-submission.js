document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form'); // Asume que tu formulario tiene el id 'contact-form'

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            // event.preventDefault(); // Previene el envío por defecto del formulario

            // Aquí iría la lógica para enviar el email en el futuro
            // Por ahora, solo un console.log y un mensaje al usuario
            console.log('Formulario enviado (simulado).');
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');

            // Opcional: Resetear el formulario después del envío
            contactForm.reset();
        });
    }
});