let bodyEl = document.querySelector('body');
let headEl = document.querySelector('.head-container');
let mainBody = document.getElementById('main-body');
const sidePanel = document.querySelector('.side-pannel');


let navHeight = headEl.getBoundingClientRect().height;

bodyEl.style.gridTemplateRows = `${navHeight}px auto`
mainBody.style.height = `calc(100vh - ${navHeight}px)`
// mainBody.style.transform = `translateY(${navHeight}px)`



