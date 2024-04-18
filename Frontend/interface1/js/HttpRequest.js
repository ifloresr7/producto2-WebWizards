export function getBoards() {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('session')) {
            let dataString = sessionStorage.getItem('session');
            if (dataString !== null) {
                let parsedData = JSON.parse(dataString);
                if (parsedData && parsedData.data && parsedData.data.id) {
                    console.log(parsedData.data.id);
                    fetch("http://localhost:5000/board/get-boards?id=" + parsedData.data.id, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("La solicitud no fue exitosa.");
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.error) {
                                reject(data.error);
                            } else {
                                resolve(data.data);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            reject(error);
                        });
                } else {
                    reject(new Error("El objeto 'data' no tiene la estructura esperada."));
                }
            } else {
                reject(new Error("No se encontraron datos en sessionStorage para la clave 'data'."));
            }
        }
    });
}

export function getBoardByID(id) {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5000/board/" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("La solicitud no fue exitosa.");
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}