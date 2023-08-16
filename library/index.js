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

menu.addEventListener("click", ()=>{
  if (event.target.tagName === "A")
  menu.classList.toggle("show-menu");
  checkMenuImg();
});

window.addEventListener("click", ()=>{
  if (event.target.tagName !== "UL" && event.target.tagName !== "LI" && event.target.id !== "btn-menu")
  menu.classList.remove("show-menu");
  checkMenuImg();
});

//-------------------------------------------abput----------------------------------------

let btnAbout = document.getElementsByClassName("btn-about")
btnAbout[0].addEventListener("click", () => {
  alert("sss")
});


//-----------------------------------------favorites--------------------------------------

let radioWinter = document.getElementById("winter");
let radioSpring = document.getElementById("spring");
let radioSummer = document.getElementById("summer");
let radioAutumn = document.getElementById("autumn");
let books = document.getElementsByClassName("favorites__books_container");

let timerId = [];
function showBook(name) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].dataset.book !== name) {
      books[i].classList.add("slow-unvisible");
      timerId[i] = setTimeout(() => {books[i].classList.add("unvisible");}, 990); 
    }
    else {
      books[i].classList.add("slow-visible");
      timerId[i] = setTimeout(() => {
        books[i].classList.remove("slow-unvisible");
        books[i].classList.remove("unvisible");
      }, 980);
    }
  }
}

function resetAnime() {
  for (let i = 0; i < timerId.length; i++) {
    clearTimeout(timerId[i]);
  }
}

radioWinter.addEventListener("click", () => { if (radioWinter.checked) showBook(radioWinter.id); })
radioSpring.addEventListener("click", () => { if (radioSpring.checked) showBook(radioSpring.id); })
radioSummer.addEventListener("click", () => { if (radioSummer.checked) showBook(radioSummer.id); })
radioAutumn.addEventListener("click", () => { if (radioAutumn.checked) showBook(radioAutumn.id); })
