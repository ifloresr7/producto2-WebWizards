import { getBoardByID } from "./HttpRequest.js";

export async function editModal() {
    const editButtons = document.querySelectorAll(".edit-board-button");
    let board = null;
    editButtons.forEach(button => {
        button.addEventListener('click', async () => { // Hacer la función callback async
            board = await getBoardByID(button.getAttribute("id")); // Usar await aquí
            // Una vez que se haya obtenido el board, abrir el modal de edición
            openEditModal(board);
        });
    });
}

function openEditModal(board) {
    const modal = document.getElementById("modal"); // Asegúrate de que modal sea el elemento correcto
    const modalEdit = `
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
                <input type="text" class="form-control" value="${board.description}" id="description" name="description" required>
              </div>
              <div class="mb-3">
                <div>            
                  <label for="onFileImgUpload">*Imagen actual:</label>
                  <a [href]="player?.photo" target="_blank"> Ver imagen</a>
                  <span>  - Cambiar Imagen: </span>
                  <input type="checkbox" #imageCheck (change)="onImageCheckChange(imageCheck.checked)">                
                </div>
                <input type="file" class="form-control" [disabled]="!imageCheck.checked" #onFileImgUpload name="onFileImgUpload" accept="image/png, image/jpeg" (change)="getImage($event)" required>
              </div>
            </div>
          </form>
          <p>* Campo obligatorio.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="uploadButton" [disabled]="!formCompleted" (click)="uploadPlayer()">Modificar jugador</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="closeEditPlayerModal()">Cerrar</button>
        </div>
      </div>
  </div>
</div>
<div class="modal-backdrop fade show"></div>`;
modal.innerHTML = modalEdit;
}