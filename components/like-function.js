import {getLikePost, delLikePost} from "../api.js";
import {  getToken, goToPage, } from "../index.js";

export const likeFunction = (element, userId) => {
    for (let likeEl of document.querySelectorAll(".like-button")) {
      const id = likeEl.dataset.id;  
   
      likeEl.addEventListener("click", (event) => {  
        event.stopPropagation();

          if (likeEl.classList != "like-button active") 
          { 
              let isLiked = true;
  
              likeEl.classList.add("active");
              getLikePost({isLiked: isLiked, token: getToken(), id: id,});
          
          }
          else if (likeEl.classList == "like-button active")
          {
              let isLiked = false;
              likeEl.classList.remove("active");
              delLikePost({isLiked: isLiked, token: getToken(), id: id});
          
          }; goToPage(element, userId)

          
          
          
          

          
          
          
          
          
          
          
  
          
         
     
      });
    }};