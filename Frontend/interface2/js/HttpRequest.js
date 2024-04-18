document.addEventListener("DOMContentLoaded", function () {
    //En caso de existir se elimina la sesión actual.
    if (sessionStorage.getItem('session')) {
        sessionStorage.removeItem('session');
    }
    if (sessionStorage.getItem('boards')) {
        sessionStorage.removeItem('boards');
    }
    //Login
    document.getElementById('login').addEventListener("click", function (evt) {
        evt.preventDefault();
        let emailValue = document.getElementById('inputEmail').value;
        let passwordValue = document.getElementById('inputPassword').value;

        // Validar que los campos requeridos no estén vacíos
        if (!emailValue || !passwordValue) {
            document.getElementById('error').innerHTML = "Por favor, completa todos los campos requeridos.";
            return; // Detener el flujo de la función si hay campos vacíos
        }

        let data = {
            email: emailValue,
            password: passwordValue
        };
        fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
            }
            return response.json();
        })
        .then(data => {
            if(data.error){
                document.getElementById('error').innerHTML = data.error;
            }else{
                sessionStorage.setItem('session', JSON.stringify(data));
                window.location.href = "./index.html";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});