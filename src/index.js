import {pageRender} from './js/render';

import './css/main.scss';

const button = document.querySelector("#btn");
const showMore = document.querySelector("#showMore");
let page = 1;

button.addEventListener("click", () => {
    page = 1;
    pageRender(page)
});

showMore.addEventListener("click", () => {
    page += 1;
    pageRender(page)
});