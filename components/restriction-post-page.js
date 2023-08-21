import { AUTH_PAGE} from "../routes.js";
import { goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";

export function restrictionRenderPage({ appEl,}) {
    const appHtml =  `<div class="page-container">
      <div class="header-container"></div>
      <ul class="posts"> 
      <div class="restriction-box">
      <p class="restriction">
      Чтобы просматривать публикации этого пользователя необходимо <span class = "authorization" > 
      авторизоваться
        </span> 
        </p>
        </div>
        
      </ul>
    </div>`;
    
  
    appEl.innerHTML = appHtml;
    renderHeaderComponent({
        element: document.querySelector(".header-container"),
        
      });
    const authorization = document.querySelector(".authorization");
    authorization.addEventListener("click", () => {
    goToPage(AUTH_PAGE);       
    })
    
}
