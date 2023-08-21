import { USER_POSTS_PAGE, } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, getToken} from "../index.js";
import { restrictionRenderPage } from "./restriction-post-page.js";
import { likeFunction } from "./like-function.js";
import { delPost } from "./del-post-page.js";


export function renderUserPostComponent ({ appEl, posts,}) {
  if(!getToken()) {  
    return restrictionRenderPage({ appEl,});
  }
  else { 
    const render = () => { 

      if (posts.length === 0 ) { 
        const appHtml =  `<div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">   
          </ul>
        </div>`;
      
        appEl.innerHTML = appHtml;
      }
      else {

  const appHtml = posts.map((post) => {
    return  `<div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
        <div class="post-header" data-user-id=${post.user.id}>
        <div class="user-ind-box">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
        </div>
            <div>
            <p data-id="${post.id}" class="del-post">${getToken() ? "..." : ""}</p>
            </div>
        </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-id="${post.id}" class="${post.isLiked ? "like-button active" : "like-button"}">
            <img src=${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"} >
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            <br>
            ${post.description}
          </p>
          <p class="post-date">
          ${post.createdAt}
          </p>
        </li>                
      </ul>
    </div>`
    });
             

  appEl.innerHTML = appHtml;
      };

  

  
  
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
    
  });
   
  for (let userEl of document.querySelectorAll(".post-header")) {
    likeFunction(render, USER_POSTS_PAGE, {userId: userEl.dataset.userId,});
    delPost(USER_POSTS_PAGE, {userId: userEl.dataset.userId,});
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      }); 
    }); 
  }
  
}; render ();  
};
  
}

