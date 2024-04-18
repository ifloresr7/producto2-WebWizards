export function addHeader() {
    let header = `
    <header>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="index.html">WebWizards</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="index.html">Inicio</span></a>
        </li>`;
    if (sessionStorage.getItem('boards')) {
        const boards = JSON.parse(sessionStorage.getItem('boards'));
        header += `        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tableros</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">`;
        if (boards && boards.length > 0) {
            boards.forEach(board => {
                header += `<a class="dropdown-item" href="dashboard.html?boardId=${board.id}">${board.title}</a><div class="dropdown-divider"></div>`;
            });
        }
        header += `        
        <div class="dropdown-divider"></div>
        <a id="addBoardDropDownButton" class="dropdown-item" href="addBoard.html">Crear tablero</a>
    </div>
</li>
<li class="nav-item">
`;
    }
    if (!sessionStorage.getItem('session')) {
        if (window.location.pathname !== "/login.html") {
            header += `<li class="nav-item"><a class="nav-link" href="login.html">Iniciar sesión</a></li>`;
        }else{
            header += `<li class="nav-item"><a class="nav-link" href="register.html">Registrarse</a></li>`;
        }
    }else{
        header += `<li class="nav-item"><a class="nav-link" href="login.html">Cerrar Sesión</a></li>`;
    }
    header += `
        </li>
      </ul>
    </div>
  </nav>
</header>`;
    document.getElementById('header-container').innerHTML = header;
}
