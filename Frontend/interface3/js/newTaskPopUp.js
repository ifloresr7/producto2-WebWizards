import { dynamicColumn } from "./getTasksColumns.js";
import { colours } from "../../constants/colors.js";
import { addTask } from "./HttpRequest.js";

export function newTaskPopUp(idBoard) {
    document.getElementById('modalDiv').innerHTML = `
    <div id="modal" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear nueva tarea</h5>
                    <button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body new-task-form">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" name="title" required>
                        <label for="floatingInput">Título</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="" id="floatingTextarea" name="description" rows="1" required></textarea>
                        <label for="floatingTextarea">Descripción</label>
                    </div>
                    <div class="form-control status-container ">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="pendingStatus" value="pending" checked>
                            <label class="form-check-label" for="pendingStatus">
                                Pendiente
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="currentStatus" value="current">
                            <label class="form-check-label" for="currentStatus">
                                En progreso
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status" id="completeStatus" value="complete">
                            <label class="form-check-label" for="completeStatus">
                                Completado
                            </label>
                        </div>
                    </div>
                    <div class="date-color-wrapper">
                        <div class="input-form">
                            <label>Fecha límite</label>
                            <input class="date-input" required type="datetime-local" id="endTime" value="2023-01-01T10:10" name="endTime"/>
                        </div>
                        <div class="input-group">
                            <span id="colour-shade" class="input-group-text bg-light"></span>
                            <select id="colour-select" class="form-select form-select-sm" aria-label=".form-select-sm example" data-previous-colour="light" name="colour">
                                <option selected value="${colours.light.bsName}">${colours.light.name}</option>
                                <option value="${colours.primary.bsName}">${colours.primary.name}</option>
                                <option value="${colours.success.bsName}">${colours.success.name}</option>
                                <option value="${colours.danger.bsName}">${colours.danger.name}</option>
                                <option value="${colours.warning.bsName}">${colours.warning.name}</option>
                                <option value="${colours.info.bsName}">${colours.info.name}</option>
                                <option value="${colours.secondary.bsName}">${colours.secondary.name}</option>
                                <option value="${colours.dark.bsName}">${colours.dark.name}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" name="members">
                        <label for="floatingInput">Miembros</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary saveButton">Crear tarea</button>
                    </div>
                </form>  
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
    `;
    // Marca un status incial
    if(idBoard == "columnPending"){
        document.getElementById('pendingStatus').checked = true;
    }else if(idBoard == "columnCurrent"){
        document.getElementById('currentStatus').checked = true;
    }else{
        document.getElementById('completeStatus').checked = true;
    }

    closeModal();

    changeColour();

    createTask(idBoard);
};

// Funcionalidad para cerrar el modal
function closeModal() {
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modalDiv').innerHTML = "";
            dynamicColumn();
        });
    });
}

//Funcionalidad para cambiar el color del selector 
export function changeColour() {
    const colourSelector = document.getElementById('colour-select')
    const colourShade = document.getElementById('colour-shade')

    //se añade el event listener para cambiar el color de la etiqueta
    colourSelector.addEventListener('change', () => {
        const newColour = colourSelector.value;
        let previousColour = colourSelector.dataset.previousColour;
        
        colourShade.classList.remove(`bg-${previousColour}`)
        colourShade.classList.add(`bg-${colours[newColour].bsName}`);

        colourSelector.dataset.previousColour = newColour;

        colourSelector.blur();
    })
}

function createTask(idBoard) {
    const form = document.querySelector('.new-task-form');
    form.addEventListener('submit', (event) => {
        try {
            event.preventDefault();
            // Crear el nuevo objeto taskData
            const membersArray = event.target.members.value.split(",").map(email => email.trim());
            const members = [];
            membersArray.forEach(element => {
                if(element != ""){
                    members.push(element);
                }
            });
            const taskData = {
                title: event.target.title.value,
                description: event.target.description.value,
                endTime: event.target.endTime.value,
                order: getOrder(idBoard),
                status: event.target.status.value,
                colour: event.target.colour.value,
                members: members,
                boardId: new URLSearchParams(window.location.search).get('boardId'),
            };
            addTask(taskData);
            dynamicColumn();
        } catch (error) {
            console.log(error);
        } finally {
            document.getElementById('modalDiv').innerHTML = "";
        }
    });

    dynamicColumn();
}

function getOrder(idBoard){
    let counts;
    if(idBoard == "columnPending"){
        counts = document.querySelectorAll('.task.pending').length;
    }else if(idBoard == "columnCurrent"){
        counts = document.querySelectorAll('.task.current').length;
    }else{
        counts = document.querySelectorAll('.task.complete').length;
    }
    return counts;
}

