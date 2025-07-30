import { renderHome } from './modules/home.js';
import { renderLogin } from './modules/login.js';
import { renderRegister } from './modules/register.js';

function router(route) {
  switch(route) {
    case '#login':
      renderLogin();
      break;
    case '#register':
      renderRegister();
      break;
    default:
      renderHome();
  }
}

window.addEventListener('hashchange', () => router(location.hash));
window.addEventListener('load', () => router(location.hash));
