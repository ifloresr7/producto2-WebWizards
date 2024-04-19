import { dynamicColumn } from "./getTasksColumns.js";
import { deleteTask } from "./HttpRequest.js";
export function deletePopUp(item) {
    const tasks = JSON.parse(sessionStorage.getItem("tasks"));
    const modalDIV = document.getElementById('modalDiv');
    // Crear el elemento div para el modal
    let modal = `<div id="modal" class="modal" tabindex="-1" style="display: block;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Eliminar tarea:</h5><button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Realmente quieres eliminar esta tarjeta?</div><div class="modal-footer"><button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary saveButton">Eliminar</button></div></div></div></div><div class="modal-backdrop fade show"></div>`;
    modalDIV.innerHTML = modal;
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modalDiv').innerHTML = "";
            dynamicColumn();
        });
    });
    document.querySelectorAll('.saveButton').forEach(button => {
        button.addEventListener('click', () => {
            try {
                deleteTask(item.id);
                dynamicColumn();
            } catch (error) {
                console.log(error);
            } finally {
                document.getElementById('modalDiv').innerHTML = "";
            }
        });
    });
}