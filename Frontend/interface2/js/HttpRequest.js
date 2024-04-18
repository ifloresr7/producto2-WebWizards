document.addEventListener("DOMContentLoaded", function () {   
    document.getElementById('createBoard').addEventListener("click", function (evt) {
        evt.preventDefault();
        let titleValue = document.getElementById('title').value;
        let descriptionValue = document.getElementById('description').value;
        let memberValue = document.getElementById('members').value;
        let IMG64 = null;

        document.getElementById('image').addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    IMG64 = event.target.result;
                    console.log(IMG64);
                };
                reader.readAsDataURL(file);
            }
        });

        // Validar que los campos requeridos no estén vacíos
        if (!titleValue || !descriptionValue || !imageValue || !memberValue) {
            document.getElementById('error').innerHTML = "Por favor, completa todos los campos requeridos.";
            return; // Detener el flujo de la función si hay campos vacíos
        }

        let data = {
            title: titleValue,
            description: descriptionValue,
            image: imageValue,
            members:[] 
        };

        fetch("http://localhost:5000/board/create", {
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