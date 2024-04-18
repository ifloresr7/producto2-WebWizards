export function getBoards(){
    if (sessionStorage.getItem('session')) {
        let data = {
            id: '6620e3cb821d88fc2026f628'
        };
        console.log(data);
        fetch("http://localhost:5000/board/get-boards", {
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
                return data.error;
            }else{
                return JSON.stringify(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}