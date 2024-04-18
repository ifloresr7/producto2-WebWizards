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
                <a id="${board.id}" boardTitle="${board.title}" class="action-button edit-board-button"><svg viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M930.56 192l-138.56-133.12A91.84 91.84 0 0 0 723.52 32a96 96 0 0 0-67.2 29.44L124.48 615.04a32 32 0 0 0-5.76 8.96V628.8L32 947.84a32 32 0 0 0 32 40 32 32 0 0 0 9.28 0l314.88-96h4.48a32 32 0 0 0 8.64-6.08l176.96-184.32a32 32 0 0 0-46.08-44.16l-155.2 160L192 636.48 704 105.92a32 32 0 0 1 22.4-9.92 33.92 33.92 0 0 1 22.72 8.96l138.56 133.12a32 32 0 0 1 0 45.12l-23.68 23.04A32 32 0 0 0 911.04 352l22.08-23.04A96 96 0 0 0 930.56 192zM108.8 908.48l55.68-210.24 152.32 146.24z" fill="#231815" /><path d="M688.32 462.72l-66.56 69.12A32 32 0 1 0 668.16 576L736 507.2a32 32 0 0 0-46.08-44.16zM822.72 369.92a32 32 0 0 0-45.12 0 32 32 0 0 0-7.04 10.56A32 32 0 0 0 777.6 416a32 32 0 0 0 22.4 9.28 32 32 0 0 0 12.48-2.24 32 32 0 0 0 10.24-7.04 32 32 0 0 0 7.04-34.88 38.4 38.4 0 0 0-7.04-11.2z" fill="#231815" /></svg></a>
                <a id="${board.id}" boardTitle="${board.title}" class="action-button delete-board-button"><svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#231815" /><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#231815" /></svg></a>
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
    deleteModal();
    // Asigna funcionalidad a los botones del modal.
    modalFunc();
}

// Función para abrir el modal cuando se hace clic en un botón de eliminación.
function deleteModal() {
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