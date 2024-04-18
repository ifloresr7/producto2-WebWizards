export async function addHeader() {
    const header = `
    <header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="index.html">WebWizards</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="index.html">Inicio</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Tableros
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">`;
    const boards = JSON.parse(sessionStorage.getItem('boards'));
    if (boards && boards.length > 0) {
        boards.forEach(board => {
            header += `<a class="dropdown-item" href="dashboard.html?boardId=${board.id}">${board.title}</a>`;
            if (dropdownMenu.innerHTML.trim() !== "") {
                header += '<div class="dropdown-divider"></div>' + itemHTML;
            }
        });
    }


    header += `
                <div class="dropdown-divider"></div>
                <a id="addBoardDropDownButton" class="dropdown-item" href="addBoard.html">Crear tablero</a>
            </div>
          <a class="nav-link dropdown-toggle" id="addBoardDropDownButton" href="login.html">Cerrar Sesión</a>          
        </li>
      </ul>
    </div>
  </nav>
</header>`
    document.getElementById('header-container').innerHTML = header;
}