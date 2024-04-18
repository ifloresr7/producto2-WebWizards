document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('login').addEventListener("click", function (evt) {
        evt.preventDefault();
        let emailValue = document.getElementById('inputEmail').value;
        let passwordValue = document.getElementById('inputPassword').value;
        let data = {
            email: emailValue,
            password: passwordValue
        };
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:5000/user/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response);
            }
        };
        xhr.send(JSON.stringify(data));
    });
});