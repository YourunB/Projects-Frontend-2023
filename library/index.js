score();
function score() {
  console.log("Всего баллов: 50 \n1. Вёрстка соответствует макету. Ширина экрана 768px +26 \n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n3. На ширине экрана 768рх реализовано адаптивное меню +12");
}

let btnMenu = document.getElementById("btn-menu");
//let nav = document.getElementsByTagName("nav")[0];
let menu = document.getElementsByTagName("ul")[0];

function checkMenuImg() {
  if (menu.classList == "show-menu") btnMenu.src = "assets/svg/burger-menu-close.svg";
  else btnMenu.src = "assets/svg/burger-menu-open.svg";
}

btnMenu.addEventListener("click", ()=>{
  menu.classList.toggle("show-menu");
  checkMenuImg();
});

window.addEventListener("resize", function hideMenu() {
  if (window.innerWidth >= 1024) {
    menu.classList.remove("show-menu");
    checkMenuImg();
  }
});
