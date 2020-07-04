import {createElementDOM, renderPage, getNextLevel} from '../utils';
import introElement from './intro.js';

const header = `\
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="assets/img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="assets/img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>`;

const content = `\
  <div class="rules  central--none">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото
    <img src="assets/img/photo_icon.png" width="16" height="16"> или рисунок
    <img src="assets/img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

const rulesTemplate = `\
  ${header}
  ${content}
`;

const rulesElement = createElementDOM(rulesTemplate);

const headerBack = rulesElement.querySelector('.header__back');

const rulesSubmit = rulesElement.querySelector('.rules__button');

headerBack.onclick = () => {
  renderPage(introElement);
};

rulesElement.querySelector('.rules__input').oninput = (evt) => {
  rulesSubmit.disabled = (!evt.target.value);
};

rulesSubmit.onclick = (evt) => {
  evt.preventDefault();
  getNextLevel()();
};

export default rulesElement;
