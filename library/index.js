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

//-----------------------------------------header-----------------------------------------

let btnLogin = document.getElementsByClassName("user-img")[0];
let profilDrop = document.getElementById("profile1");

let registerWindow = document.getElementById("register");
let btnCloseRegister = document.getElementById("register-close");

btnLogin.addEventListener("click", () => {
  if (document.body.getBoundingClientRect().width > 768) profilDrop.classList.toggle("unvisible");
  if (document.body.getBoundingClientRect().width <= 768) registerWindow.classList.toggle("unvisible");
});

window.addEventListener("click", () => {
  if (event.target.classList.value !== "user-img" && event.target.closest("#profile1") === null) profilDrop.classList.add("unvisible");
  if (event.target.classList.value !== "user-img" && event.target.closest("#register") === null) registerWindow.classList.add("unvisible");
});

window.addEventListener("resize", () => {
  if (document.body.getBoundingClientRect().width <= 768 && profilDrop.classList.value === "profile") {
    profilDrop.classList.add("unvisible");
    registerWindow.classList.remove("unvisible");
  }
  if (document.body.getBoundingClientRect().width > 768 && registerWindow.classList.value === "login") {
    profilDrop.classList.remove("unvisible");
    registerWindow.classList.add("unvisible");
  }
});

btnCloseRegister.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
});

//-------------------------------------------about----------------------------------------

let btnAbout = document.getElementsByClassName("btn-about");
let btnArrow = document.getElementsByClassName("arrow");

function disBtn(position) {
  for (let i = 0; i < btnAbout.length; i++) {btnAbout[i].disabled = false;}

  if (slidePos === 0) {
    btnArrow[0].disabled = true;
    btnAbout[0].disabled = true;
  }
  else btnArrow[0].disabled = false;

  if (slidePos === -475) btnAbout[1].disabled = true;
  if (slidePos === -950) btnAbout[2].disabled = true;
  if (slidePos === -1425) btnAbout[3].disabled = true;

  if (slidePos === -1900) {
    btnArrow[1].disabled = true;
    btnAbout[4].disabled = true;
  }
  else btnArrow[1].disabled = false;
}

let slidePos = 0;
btnAbout[0].addEventListener("click", () => {
  slidePos = 0;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});
btnAbout[1].addEventListener("click", () => {
  slidePos = -475;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});
btnAbout[2].addEventListener("click", () => {
  slidePos = -950;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});
btnAbout[3].addEventListener("click", () => {
  slidePos = -1425;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});
btnAbout[4].addEventListener("click", () => {
  slidePos = -1900;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});

btnArrow[0].addEventListener("click", () => {
  slidePos = slidePos + 475;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});

btnArrow[1].addEventListener("click", () => {
  slidePos = -475 + slidePos;
  document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
  disBtn(slidePos);
});

window.addEventListener("resize", function(event) {
  if (this.document.body.getBoundingClientRect().width <= 1439 && this.document.body.getBoundingClientRect().width >= 1024 && slidePos <= -1425) {
    slidePos = -1425;
    document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
    disBtn(slidePos);
  }
  if (this.document.body.getBoundingClientRect().width >= 1440 && slidePos <= -1425) {
    slidePos = -950;
    document.getElementsByClassName("about__images_image")[0].style.transform = "translate("+ slidePos +"px,0)";
    disBtn(slidePos);
  }
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

//--------------------------------------Digital Library Cards--------------------------------------

let btnCheckCard = document.getElementById("btnCheckCard");

btnCheckCard.addEventListener("click", () =>{
  preventDefault();
});
