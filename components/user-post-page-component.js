import { USER_POSTS_PAGE, POSTS_PAGE, LIKE_PAGE, USER_LIKE_PAGE} from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, getToken} from "../index.js";
import { restrictionRenderPage } from "./restriction-post-page.js";
import { likeFunction } from "./like-function.js";


export function renderUserPostComponent ({ appEl, posts,}) {
  if(!getToken()) {  
    return restrictionRenderPage({ appEl,});
  }
  else { const render = () => { 

  const appHtml = posts.map((post) => {
    return  `<div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id=${post.user.id}>
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
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
            ${post.description}
          </p>
          <p class="post-date">
            дата
          </p>
        </li>                
      </ul>
    </div>`
    });
             

  appEl.innerHTML = appHtml;

  likeFunction(render, LIKE_PAGE);

  
  
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
    
  });
   
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      }); 
    }); 
  }
  
}; render ();  
};
  
}

