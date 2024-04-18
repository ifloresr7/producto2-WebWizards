export function addBoard(event) { // Define una función llamada addBoard que toma un evento como parámetro.
    event.preventDefault(); // Previene el comportamiento predeterminado del evento (en este caso, el envío del formulario).
    // Crea un objeto boardData que contiene la información del tablero, extrayendo los valores del formulario del evento.
    const boardData = {
        id: (Math.random() * 10000).toString(), // Genera un ID aleatorio para el tablero.
        title: event.target.elements.title.value, // Obtiene el valor del campo de título del formulario.
        description: event.target.elements.description.value, // Obtiene el valor del campo de descripción del formulario.
        image: event.target.elements.image.value, // Obtiene el valor del campo de imagen del formulario.
    }
    if (!sessionStorage.getItem("boards")) { // Verifica si no hay datos almacenados en la sesión bajo la clave "boards".
        // Si no hay datos, crea un nuevo arreglo con el objeto boardData y lo guarda en la sesión como un JSON.
        sessionStorage.setItem("boards", JSON.stringify([boardData]))
    } else {
        // Si ya hay datos almacenados, obtiene esos datos, los convierte de JSON a un objeto JavaScript.
        const existingBoards = JSON.parse(sessionStorage.getItem("boards"))
        // Agrega el nuevo objeto boardData al arreglo de tableros existente.
        existingBoards.push(boardData)
        // Vuelve a guardar el arreglo actualizado en la sesión como un JSON.
        sessionStorage.setItem("boards", JSON.stringify(existingBoards))
    }
    // Redirecciona la página actual a "dashboard.html" después de que se complete el proceso de agregar el tablero.
    window.location.href = "dashboard.html"
}