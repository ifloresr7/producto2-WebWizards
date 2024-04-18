import { createBoard } from "./HttpRequest.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Añade un event listener para ajustar la altura del textarea cuando se modifica su valor.
    document.getElementById('description').addEventListener('input', adjustTextareaHeight);
    // Añade un event listener para el evento submit del formulario.

    document.getElementById('add-board-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        // Llama a la función createBoard cuando se envía el formulario.
        createBoard().then(() => {
        }).catch(error => {
            console.error('Error al crear el tablero:', error);
            // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje al usuario.
        }).finally(() => {
            window.location.href = "index.html";            
        });
    });

    document.getElementById('returnButton').addEventListener('click', function () {
        window.location.href = "index.html"; // Redirige a la página de inicio cuando se hace clic en el botón de retorno.
    });
});
// Función para ajustar la altura del textarea dinámicamente según el contenido.
function adjustTextareaHeight() {
    const textarea = document.getElementById('description');
    textarea.style.height = 'auto'; // Resetea la altura a auto.
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura para que se ajuste al contenido.
}