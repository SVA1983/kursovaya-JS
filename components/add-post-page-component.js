import  {onAddPostClick, uploadImage}  from "../api.js";
import {getToken} from "../index.js";
export function renderAddPostPageComponent({ appEl, }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
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
        // onImageUrlChange(imageUrl);
        render();
      });

    

    document.getElementById("add-button").addEventListener("click", () => {
      const addImg = document.querySelector(".file-upload-input");
      const addTextDescription = document.getElementById("add-text");
      onAddPostClick({
        description: addTextDescription.value,
        imageUrl,
        token: getToken() 
      })
      .then((response) => { console.log(response);
        
      }).catch((err) => {
        
      });
    });
  };

  render();
}
