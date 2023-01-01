let bodyEl = document.querySelector('body');
let headEl = document.querySelector('.head-container');
let mainBody = document.getElementById('main-body');
const sidePanel = document.querySelector('.side-pannel');
let player = document.getElementById('player');

let navHeight = headEl.getBoundingClientRect().height;
let playerHeight = player.getBoundingClientRect().height

bodyEl.style.gridTemplateRows = `${navHeight}px auto`
mainBody.style.height = `calc(100vh - ${navHeight}px - ${playerHeight}px)`
// mainBody.style.transform = `translateY(${navHeight}px)`


// <div class="body-items" id="main-body"><div>\



