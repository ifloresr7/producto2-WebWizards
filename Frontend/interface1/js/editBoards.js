import { getBoardID } from "./HttpRequest.js";

export async function editBoardByID() {
  const editButtons = document.querySelectorAll(".edit-board-button");
  const modalDiv = document.getElementById('modalDiv');
  let board = null;
  editButtons.forEach(button => {
    button.addEventListener('click', async () => { // Hacer la función callback async
      board = await getBoardID(button.getAttribute("id")); // Usar await aquí
      const modalPopUp = `
      <div class="modal" id="createPlayers" style="display: block;" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Editar tablero:</h5>
              </div>
              <div class="modal-body">
                <form id="player-form">
                  <div class="column">
                    <div class="mb-3">
                      <label for="title">Titulo:</label>
                      <input type="text" class="form-control" value="${board.title}" id="title" name="title" required>
                    </div>
                    <div class="mb-3">
                      <label for="description">Descripción:*</label>
                      <textarea type="text" class="form-control" value="${board.description}" id="description" name="description" required></textarea>
                    </div>
                    <div class="mb-3">
                      <div>            
                        <label for="onFileImgUpload">*Imagen actual:</label>
                        <img src="${board.image}" style="width:-webkit-fill-available;">
                        <span>  - Cambiar Imagen: </span>
                        <input type="checkbox" id="imageCheck">                
                      </div>
                      <input type="file" class="form-control" id="onFileImgUpload" name="onFileImgUpload" accept="image/png, image/jpeg" required>
                    </div>
                  </div>
                </form>
                <p>* Campo obligatorio.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary confirm-button" id="uploadButton">Modificar tablero</button>
                <button type="button" class="btn btn-secondary close-button" data-dismiss="modal")">Cerrar</button>
              </div>
            </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>`;
      // Una vez que se haya obtenido el board, abrir el modal de edición
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