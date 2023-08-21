import {getLikePost, delLikePost, delPostUser} from "../api.js";
import { LIKE_PAGE} from "../routes.js";
import { posts, getToken, goToPage, renderApp, } from "../index.js";

export function delPost(element, userId) {

    for (let delEl of document.querySelectorAll(".del-post")) {
        const id = delEl.dataset.id; 
        delEl.addEventListener("click", (event) => {
          event.stopPropagation();
          delPostUser({token: getToken(), id});
          goToPage(element, userId)
        })
    }; 
    
};  