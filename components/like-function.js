import {getLikePost, getPosts, delLikePost} from "../api.js";
import { LIKE_PAGE} from "../routes.js";
import { posts, getToken, goToPage} from "../index.js";

export const likeFunction = (render, element) => {
    for (let likeEl of document.querySelectorAll(".like-button")) {
      const id = likeEl.dataset.id;  
      
    
      
      
     
      
      
     
   
      
      likeEl.addEventListener("click", (event) => {  
        event.stopPropagation();
        
  
        
       
        
          
          if (likeEl.classList != "like-button active") 
          { console.log(likeEl.classList);
              let isLiked = true;
              
             
              likeEl.classList.add("active");
              getLikePost({isLiked: isLiked, token: getToken(), id: id,});
              
             
              
              
              
              
              
          }
          else if (likeEl.classList == "like-button active")
          {console.log(likeEl.classList);
              let isLiked = false;
              likeEl.classList.remove("active");
              delLikePost({isLiked: isLiked, token: getToken(), id: id});
              
              
              
              
              
              
              
          }; 
          getPosts({token: getToken()})
          
          goToPage(element);
          
          
          

          
          
          
          
          
          
          
  
          
         
     
      });
    }};