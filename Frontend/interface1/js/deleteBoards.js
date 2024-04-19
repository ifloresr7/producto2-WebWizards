import { deleteBoardID } from "./HttpRequest.js";

export function deleteBoardByID() {
    const deleteButtons = document.querySelectorAll(".delete-board-button");
    const modalDiv = document.getElementById('modalDiv');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            let modalPopUp = `<div id="myModal" class="modal" tabindex="-1" boardToDelete="" style="display: block;">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Eliminar tablero</h5>
                  <button type="button" class="btn-close close-button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>` + button.getAttribute("boardTitle") + `</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary close-button" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-primary confirm-button">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-backdrop fade show"></div>`;
            modalDiv.innerHTML = modalPopUp;
            const boardToDelete = button.getAttribute("id");
            modalDiv.boardToDelete = boardToDelete;
            modalDiv.style.display = "block";
            modalFunc();
        });
    });

}

// Función para manejar la lógica del modal.
function modalFunc() {
    const modalDiv = document.getElementById('modalDiv')
    const closeModalButton = document.querySelectorAll(".close-button");
    // Añade event listeners al botón de cierre del modal.
    closeModalButton.forEach(button => {
        button.addEventListener('click', () => {
            modalDiv.boardToDelete = ""; // Restablece el ID del tablero a eliminar.
            modalDiv.style.display = "none"; // Oculta el modal.
        })
    })

    // Añade event listener al botón de confirmación de eliminación del tablero.
    const deleteBoard = document.querySelector('.confirm-button');
    deleteBoard.addEventListener('click', async () => {
        await deleteBoardID(modalDiv.boardToDelete);
        modalDiv.style.display = "none";
        window.location.href = "./index.html";
    })
}