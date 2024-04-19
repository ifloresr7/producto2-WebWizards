export function createBoard() {
    return new Promise(async (resolve, reject) => {
        if (!sessionStorage.getItem('session')) {
            reject(new Error("No hay sesión almacenada en sessionStorage."));
            return;
        }
        const dataString = sessionStorage.getItem('session');
        if (!dataString) {
            reject(new Error("No se encontraron datos en sessionStorage para la clave 'session'."));
            return;
        }
        const parsedData = JSON.parse(dataString);
        if (!parsedData || !parsedData.data || !parsedData.data.id) {
            reject(new Error("El objeto 'data' no tiene la estructura esperada."));
            return;
        }
        const titleValue = document.getElementById('title').value;
        const descriptionValue = document.getElementById('description').value;
        const memberValue = document.getElementById('members').value;
        const imageInput = document.getElementById('image');
        const file = imageInput.files[0];
        let imageValue = null;
        if (file) {
            if (file.size > 80 * 1024) { // Size in bytes, 100KB = 100 * 1024 bytes
                document.getElementById('error').innerHTML = "La imagen seleccionada excede el tamaño máximo permitido de 80KB.";
                return;
            }
            try {
                imageValue = await readFileAsync(file);
            } catch (error) {
                console.error(error);
                reject(error);
                return;
            }
        } else {
            document.getElementById('error').innerHTML = "Por favor, selecciona una imagen .jpg";
            reject(new Error("No se seleccionó una imagen."));
            return;
        }

        if (!titleValue || !descriptionValue || !imageValue) {
            document.getElementById('error').innerHTML = "Por favor, completa todos los campos requeridos.";
            reject(new Error("Todos los campos son requeridos."));
            return;
        }
        const membersArray = memberValue.split(',').map(email => email.trim());
        const members = [parsedData.data.email];
        membersArray.forEach(element => {
            if(element != ""){
                members.push(element);
            }
        });
        const data = {
            title: titleValue,
            description: descriptionValue,
            image: imageValue,
            members: members,
            tasks: []
        };

        console.log(data);

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
                window.location.href = "./index.html";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}