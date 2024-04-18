import { addBoard } from "./addBoard.js"; // Importa la función addBoard desde el archivo addBoard.js.
document.addEventListener('DOMContentLoaded', async () => {
    // Añade un event listener para ajustar la altura del textarea cuando se modifica su valor.
    document.getElementById('floatingTextarea').addEventListener('input', adjustTextareaHeight);
    // Añade un event listener para el evento submit del formulario.
    const form = document.querySelector(".add-board-form");
    form.addEventListener('submit', (event) => {
        addBoard(event); // Llama a la función addBoard cuando se envía el formulario.
    })
    // Funcionalidad para regresar a la página de inicio.
    document.getElementById('returnButton').addEventListener('click', function () {
        window.location.href = "homepage.html"; // Redirige a la página de inicio cuando se hace clic en el botón de retorno.
    });
    document.getElementById('inputFile').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                // Aquí puedes usar base64String, por ejemplo, para mostrar la imagen en una etiqueta <img>
                document.getElementById('preview').src = base64String;
                // También puedes enviar base64String al servidor, almacenarlo en localStorage, etc.
            };
            reader.readAsDataURL(file);
        }
    });
});
// Función para ajustar la altura del textarea dinámicamente según el contenido.
function adjustTextareaHeight() {
    const textarea = document.getElementById('floatingTextarea');
    textarea.style.height = 'auto'; // Resetea la altura a auto.
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura para que se ajuste al contenido.
}