import { addBoard } from "./addBoard.js"; // Importa la función addBoard desde el archivo addBoard.js.
document.addEventListener('DOMContentLoaded', async () => {
    // Añade un event listener para ajustar la altura del textarea cuando se modifica su valor.
    document.getElementById('description').addEventListener('input', adjustTextareaHeight);
    // Añade un event listener para el evento submit del formulario.
    
    document.querySelector(".add-board-form").addEventListener('submit', (event) => {
        addBoard(event); // Llama a la función addBoard cuando se envía el formulario.
    });

    document.getElementById('returnButton').addEventListener('click', function () {
        window.location.href = "index.html"; // Redirige a la página de inicio cuando se hace clic en el botón de retorno.
    });
});
// Función para ajustar la altura del textarea dinámicamente según el contenido.
function adjustTextareaHeight() {
    const textarea = document.getElementById('floatingTextarea');
    textarea.style.height = 'auto'; // Resetea la altura a auto.
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura para que se ajuste al contenido.
}