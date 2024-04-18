export async function createBoards() {
    let deleteIconHTML = ""

    try {
        // Intenta cargar el HTML del icono de eliminación desde un archivo externo.
        const res = await fetch('/components/deleteButton.html')

        if (!res.ok) {
            throw new Error('Error loading delete icon') // Lanza un error si no se pudo cargar el HTML del icono de eliminación.
        }

        const deleteIcon = await res.text()
        deleteIconHTML = deleteIcon // Almacena el HTML del icono de eliminación.
    } catch (err) {
        console.log(err) // Maneja cualquier error ocurrido durante la carga del HTML del icono de eliminación.
    } 

    // Obtiene la sección donde se mostrarán los tableros.
    const boardsSection = document.getElementById("board-container");

    // Obtiene los datos de los tableros desde el almacenamiento de sesión.
    const boards = JSON.parse(sessionStorage.getItem("boards"));

    // Genera el HTML para cada tablero.
    const htmlBoards = boards.map(board => {
        // Establece la URL de la imagen del tablero o una imagen predeterminada si no se proporciona.
        const image = board.image ? board.image : "/assets/default.png";

        return (
        `<div class="card" style="width: 20rem;">
            <a id="${board.id}" boardTitle="${board.title}" class="delete-board-button">
                ${deleteIconHTML} <!-- Inserta el HTML del icono de eliminación -->
            </a>
            <img src=${image} class="card-img-top board-image" alt="...">
            <div class="card-body">
                <h5 class="card-title">${board.title}</h5>
                <p class="card-text">${board.description}</p>
                <a href=dashboard.html?boardId=${board.id} class="btn btn-primary">Abrir</a>
            </div>
        </div>`
        )
    })

    const allHtmlBoards = htmlBoards.join(""); // Une todos los elementos HTML de los tableros en una cadena.

    boardsSection.insertAdjacentHTML("afterbegin", allHtmlBoards); // Inserta el HTML de los tableros en la sección del tablero.

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