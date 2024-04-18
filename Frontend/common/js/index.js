import { addHeader } from "../../components/header/index.js";
import { addFooter } from "../../components/footer/index.js";
// Importamos las funciones para añadir el encabezado y el pie de página desde sus respectivos archivos.

// Script de jQuery Slim
// Se agrega el script de jQuery Slim utilizando document.write para cargarlo dinámicamente.
document.write('<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>');

// Script de Popper.js
// Se agrega el script de Popper.js utilizando document.write para cargarlo dinámicamente.
document.write('<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>');

// Script de Bootstrap
// Se agrega el script de Bootstrap utilizando document.write para cargarlo dinámicamente.
document.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>');

document.addEventListener('DOMContentLoaded', () => {
    // Se añade el encabezado y el pie de página cuando el DOM se ha cargado completamente.
    addHeader();
    addFooter();
});

if (!sessionStorage.getItem('session')) {
    // Si no hay una sesión almacenada en sessionStorage...
    if (window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
        // Y si la página actual no es ni login.html ni register.html...
        window.location.href = "./login.html";
        // Redirigimos al usuario a login.html.
    }
}
