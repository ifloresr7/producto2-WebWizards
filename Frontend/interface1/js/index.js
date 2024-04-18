import { createBoards } from "./createBoards.js";
import { editModal } from "./editBoards.js";

document.addEventListener('DOMContentLoaded', async () => {
    await createBoards();
    await editModal();
});