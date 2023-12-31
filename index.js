import { getPosts, onAddPostClick, getPostsUser,  } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import { renderUserPostComponent } from "./components/user-post-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
  LIKE_PAGE,
  USER_LIKE_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

export let user = getUserFromLocalStorage();

export let page = null;
export let posts = [];



export const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export const logout = () => {
  user = null;
  removeUserFromLocalStorage();
  goToPage(POSTS_PAGE);
};

/**
 * Включает страницу приложения
 */
export const goToPage = (newPage, data) => {
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
      LIKE_PAGE,
      USER_LIKE_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      
      // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      renderApp()
    }

    if (newPage === POSTS_PAGE) { 
      page = LOADING_PAGE;
      renderApp();
      
      return getPosts({ token: getToken() })
        .then(() => { 
      return getPosts({ token: getToken() })
        .then((newPosts) => { 
          page = POSTS_PAGE;
          
          
          posts = newPosts; 
          renderApp();
        })
        .catch((error) => {
          console.log(error);
          goToPage(POSTS_PAGE);
        });
      })
    }
    if (newPage === LIKE_PAGE) { 

      return getPosts({ token: getToken() })
        .then(() => { 
          return getPosts({ token: getToken() })
        .then((newPosts) => { 
          page = POSTS_PAGE;
          
          
          posts = newPosts; 
          
          renderApp();

        }) 
      })
        .catch((error) => {
          console.log(error);
          goToPage(POSTS_PAGE);
        });
    }; 

    if (newPage === USER_LIKE_PAGE) {
      return getPosts({ token: getToken() })
        .then(() => { 
          return getPosts({ token: getToken() })
        .then((newPosts) => { 
          page = USER_POSTS_PAGE;
          
          
          posts = newPosts; 
          
          
          renderApp();
          

        }) 
      })
        .catch((error) => {
          console.log(error);
          goToPage(POSTS_PAGE);
        }) 
    } 

    

    if (newPage === USER_POSTS_PAGE) { 
      return getPostsUser({token: getToken(), id: data.userId}).
      then(() => {
      return getPostsUser({token: getToken(), id: data.userId}).
        then((userPost) =>  {
          page = USER_POSTS_PAGE;
          posts = userPost; 
          renderApp()
        })
      })
        
      
      
    }

    page = newPage;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

export const renderApp = () => {
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    getPosts({ token: getToken() }); 
    return renderAddPostPageComponent({
      appEl,
      
    }); 
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl, user

    });
  }

  if (page === USER_POSTS_PAGE) {
    // TODO: реализовать страницу фотографию пользвателя
   
    return renderUserPostComponent ({ appEl, posts, })
  }
};


goToPage(POSTS_PAGE, {onAddPostClick});
