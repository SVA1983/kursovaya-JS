import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage, getToken} from "../index.js";
import { restrictionRenderPage } from "./restriction-post-page.js";


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
        <div class="post-header" data-user-id=${post.id}>
            <img src="${post.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="642d00579b190443860c2f32" class="like-button">
            <img src="./assets/images/like-active.svg">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${post.likes.length}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          дата
        </p>
      </li>                
    </ul>
  </div>`
  })
             ; 

  appEl.innerHTML = appHtml;
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

