import  {onAddPostClick, uploadImage, getPosts}  from "../api.js";
import {getToken, goToPage} from "../index.js";
import { ADD_POSTS_PAGE, POSTS_PAGE} from "../routes.js";


export function renderAddPostPageComponent({ appEl, page}) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <img class="return-button" src="assets/images/pngwing.com(1).png" alt="">
      
        <h3 class="form-title">Добавить пост</h3>
        
          <div class="upload-image-container">
          <div class="upload=image">
          ${
            imageUrl
              ? `
              <div class="file-upload-image-conrainer">
                <img class="file-upload-image" src="${imageUrl}">
                <button class="file-upload-remove-button button">Заменить фото</button>
              </div>
              `
              : `
                <label class="file-upload-label secondary-button">
                    <input
                      type="file"
                      class="file-upload-input"
                      style="display:none"
                    />
                    Выберите фото
                </label>
              
          `
          }
      
      </div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4" id="add-text"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>  
        </div>
      </div>
    </div>
  `;
  appEl.innerHTML = appHtml;

  const returnButton = document.querySelector(".return-button");
  returnButton.addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  const fileInputElement = document.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          // onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    document
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        
        
        imageUrl = "";
        
        render();
      });

    

    document.getElementById("add-button").addEventListener("click", () => {
      
      const addTextDescription = document.getElementById("add-text");
      if (!addTextDescription.value) {
        alert("Введите описание");
        return;
        
      }
      if (!imageUrl) {
        alert("Добавте фотографию");
        return;
      }
      else {
      onAddPostClick({
        description: addTextDescription.value.
        replaceAll("&", "&amp;").
        replaceAll("<", "&lt;").
        replaceAll(">", "&gt;").
        replaceAll('"', "&quot;"),
        imageUrl,
        token: getToken() 
      });
      goToPage(POSTS_PAGE);
    };
    });
  };

  render();
  
};


