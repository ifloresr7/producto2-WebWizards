import { createBoards } from "./createBoards.js";
import { editBoardByID } from "./editBoards.js";
import { deleteBoardByID } from "./deleteBoards.js";

document.addEventListener('DOMContentLoaded', async () => {
    await createBoards();
    await deleteBoardByID();
    await editBoardByID();
});