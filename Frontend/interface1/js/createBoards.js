import {getBoards} from './HttpRequest.js'

export async function createBoards() {
    //Contenedor de tableros
    const board_container = document.getElementById('board-container');
    // Obtiene los datos de los tableros desde el almacenamiento de sesión.
    const boards = await getBoards(); // Espera a que se resuelva la función getBoards()
    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        // Genera el HTML para el tablero actual
        const boardHTML = `
            <div class="card" style="width: 20rem;">
                <a id="${board.id}" boardTitle="${board.title}" class="delete-board-button">Eliminar</a>
                <img src="${board.image}" class="card-img-top board-image" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${board.title}</h5>
                    <p class="card-text">${board.description}</p>
                    <a href="dashboard.html?boardId=${board.id}" class="btn btn-primary">Abrir</a>
                </div>
            </div>
        `;
        // Crea un nuevo elemento div
        const boardElement = document.createElement('div');
        // Establece el HTML generado para el tablero actual como el contenido del nuevo elemento
        boardElement.innerHTML = boardHTML;
        // Añade el nuevo elemento al contenedor con el ID "board-container"
        board_container.appendChild(boardElement);
    }
    const buttonAddBoard = `
    <div id="add-board-button">
        <a href="addBoard.html" class="add-board-button">Nuevo tablero</a>
    </div>
    `;

    // Crea un nuevo elemento div
    const buttonAddBoardElement = document.createElement('div');
    // Establece el HTML como el contenido del nuevo elemento
    buttonAddBoardElement.innerHTML = buttonAddBoard;
    // Añade el nuevo elemento al contenedor con el ID "board-container"
    document.getElementById('board-container').appendChild(buttonAddBoardElement);

    // Añade event listeners a los botones de eliminación para abrir el modal.
    openModal();

    // Asigna funcionalidad a los botones del modal.
    modalFunc();
}

// Función para abrir el modal cuando se hace clic en un botón de eliminación.
function openModal() {
    const deleteButtons = document.querySelectorAll(".delete-board-button");
    const modal = document.getElementById('myModal')
    const titleParagraph = modal.querySelector('.modal-body > p');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const boardToDelete = button.getAttribute("id");
            const boardTitle = button.getAttribute("boardTitle");
            modal.boardToDelete = boardToDelete // Almacena el ID del tablero que se va a eliminar en el objeto modal.
            titleParagraph.innerHTML = boardTitle // Establece el título del tablero que se va a eliminar en el modal.
            modal.style.display = "block"; // Muestra el modal.
        })
    })
}

// Función para manejar la lógica del modal.
function modalFunc() {
    const modal = document.getElementById('myModal')
    const closeModalButton = document.querySelectorAll(".close-button");
    
    // Añade event listeners al botón de cierre del modal.
    closeModalButton.forEach(button => {
        button.addEventListener('click', () => {
            modal.boardToDelete = ""; // Restablece el ID del tablero a eliminar.
            modal.style.display = "none"; // Oculta el modal.
        })
    })

    // Añade event listener al botón de confirmación de eliminación del tablero.
    const deleteBoard = document.querySelector('.confirm-button');
    deleteBoard.addEventListener('click', async () => {
        // Obtiene los datos de los tableros desde el almacenamiento de sesión y filtra el tablero que se va a eliminar.
        const boards = JSON.parse(sessionStorage.getItem("boards"));
        const currentBoards = boards.filter(board => board.id !== modal.boardToDelete);
        // Guarda los tableros actualizados en el almacenamiento de sesión.
        sessionStorage.setItem("boards", JSON.stringify(currentBoards));
        // Elimina los tableros anteriores del DOM.
        const oldBoardsHTML = document.querySelectorAll(".card")
        oldBoardsHTML.forEach(board => {
            board.remove();
        })
        // Oculta el modal y vuelve a cargar los tableros actualizados.
        modal.style.display = "none"; 
        await createBoards();
    })
}