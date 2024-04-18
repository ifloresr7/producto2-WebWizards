document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('register').addEventListener("click", function (evt) {
        evt.preventDefault();
        let emailValue = document.getElementById('inputEmail').value;
        let passwordValue = document.getElementById('inputPassword').value;
        let data = {
            email: emailValue,
            password: passwordValue
        };
        fetch("http://localhost:5000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});