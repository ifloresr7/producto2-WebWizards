import { addFooter } from "../../components/footer/index.js";
import { addHeader } from "../../components/header/index.js";

if (!sessionStorage.getItem('session_mail')) {
    window.location.href = "./login.html";
}

document.addEventListener('DOMContentLoaded', async () => {
    await addHeader();
    addFooter();
});