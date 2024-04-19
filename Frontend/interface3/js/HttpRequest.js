export function getAllTasks(boardId) {
    return new Promise((resolve, reject) => {
        fetch("https://3ckwp3-5000.csb.app/board/" + boardId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                reject('Failed to fetch tasks');
            });
    });
}

export function addTask(data){
    console.log(data);
    return new Promise((resolve, reject) => {
        fetch("https://3ckwp3-5000.csb.app/task/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(data => {
            if (data.error) {
                reject(data.error);
            } else {
                window.location.reload();
                resolve();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            reject('Failed to fetch tasks');
        });
    });
}

export function deleteTask(id){
    return new Promise((resolve, reject) => {
        fetch("https://3ckwp3-5000.csb.app/task/delete?taskId=" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then(data => {
            if (data.error) {
                reject(data.error);
            } else {
                window.location.reload();
                resolve();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            reject('Failed to fetch tasks');
        });
    });
}