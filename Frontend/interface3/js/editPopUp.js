import { dynamicColumn } from "./getTasksColumns.js";
import { colours } from "../../constants/colors.js";
import { changeColour } from "./newTaskPopUp.js";

export function editPopUp(item) {
    let memberTask = "";
    item.members.forEach(member => {
        memberTask = `${member.email},`;
    });
    document.getElementById('modalDiv').innerHTML = `
    <div id="modal" class="modal" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar tarea:</h5>
                    <button type="button" class="btn-close closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body new-task-form">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInput" placeholder="" value="${item.title}" name="title" required>
                        <label for="floatingInput">Título</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="" id="floatingTextarea" name="description" rows="1" required>${item.description}</textarea>
                        <label for="floatingTextarea">Descripción</label>
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
                        <input type="text" class="form-control" id="floatingInput" placeholder="" name="members" required>
                        <label for="floatingInput">${memberTask}</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary closeButton" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary saveButton">Editar tarea</button>
                    </div>
                </form>  
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
    `;

    // Se marca el color selected que venía en la tarea
    const colourSelector = document.getElementById("colour-select");
    const colourSelectOptions = Array.from(colourSelector.children);
    colourSelectOptions.forEach(option => {
        if (option.value === item.colour) {
            option.selected = true
        }
    })

    //Se pinta la etiqueta del color select
    const colourShade = document.getElementById("colour-shade");
    colourShade.classList.remove(`bg-light`)
    colourShade.classList.add(`bg-${colours[item.colour].bsName}`);
    colourSelector.dataset.previousColour = item.colour;
    

    //Se añade la funcionalidad a los botones de cerrar
    document.querySelectorAll('.closeButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modalDiv').innerHTML = "";
            dynamicColumn();
        });
    });

    //Se añade la funcionalidad al botón de guardar
    document.querySelectorAll('.saveButton').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('modalDiv').innerHTML = "";
            dynamicColumn();
        });
    });
    changeColour();
}