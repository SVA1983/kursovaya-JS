import {delPostUser} from "../api.js";
import { getToken, goToPage,  } from "../index.js";
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