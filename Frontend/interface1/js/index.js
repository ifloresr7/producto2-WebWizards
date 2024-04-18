import { createBoards } from "./createBoards.js"; // Importa la función createBoards desde el archivo createBoards.js.

document.addEventListener('DOMContentLoaded', async () => {
    // Cuando el DOM se haya cargado completamente, se llama a la función createBoards para crear los tableros.
    // Se espera que la función createBoards se complete antes de continuar.
    await createBoards();
});
