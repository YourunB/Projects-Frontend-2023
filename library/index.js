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
let pageLogin = false;
let pageUser = "";
let pageUserName = "";


let overlay = document.getElementsByClassName("overlay")[0];


//user-ico
let btnLogin = document.getElementsByClassName("user-img")[0];
let profilDrop = document.getElementById("profile1");
let btnProfileReg = document.getElementById("profile-reg");
let btnProfileLog = document.getElementById("profil-log"); 


//login window
let loginWindow = document.getElementById("login");
let btnCloseLogin = document.getElementById("login-close");
let btnLoginRegOpen = document.getElementById("login-reg");
let btnLogIn = document.getElementById("log-in");
let inputLoginMail = document.getElementById("login-mail");
let inputLoginPass = document.getElementById("login-pass");


let btnSignUp = document.getElementById("btnSignUp"); //btn from Digital Library Cards


//reg window
let registerWindow = document.getElementById("register");
let btnCloseRegister = document.getElementById("register-close");
let btnRegisterSave = document.getElementById("register-btn-save");
let btnRegGoToLogin = document.getElementById("register-login");
let inputRegFirstName = document.getElementById("register-first-name");
let inputRegLastName = document.getElementById("register-last-name");
let inputRegMail = document.getElementById("register-mail");
let inputRegPass = document.getElementById("register-pass");

//------------------------Register-window-----------------------

btnRegisterSave.addEventListener("click", () => {
  //event.preventDefault();
  console.log(inputRegMail.validity.valid)
  if (inputRegFirstName.value.length === 0 || inputRegLastName.value.length === 0 || inputRegMail.value.length === 0 || inputRegPass.value.length === 0) {
    alert("Fill in all the fields");
    return;
  }
  if (inputRegFirstName.validity.valid === false || inputRegLastName.validity.valid === false || inputRegMail.validity.valid === false || inputRegPass.validity.valid === false) {
    alert("Enter the correct data");
    return;
  }
  if (inputRegPass.value.length > 0 && inputRegPass.value.length < 8) {
    alert("Password must be 8 characters or more");
    return
  }
  if (!inputRegFirstName.value.trim() || !inputRegLastName.value.trim() || !inputRegMail.value.trim() || !inputRegPass.value.trim()) {
    alert("The string must not be empty");
    return;
  }

  let storedUser = JSON.parse(localStorage.getItem("userData"));
  if (storedUser !== null) {
    for (let i = 0; i < storedUser.length; i++) {
      for (let key in storedUser[i]) {
        if (storedUser[i][key] === inputRegMail.value) {
          alert("User with this email is already registered");
          return
        }
      }
    }
  }

  let cardNumber = randomNumber();
  let user = {
    nameFirst: inputRegFirstName.value,
    nameLast: inputRegLastName.value,
    mail: inputRegMail.value,
    pass: inputRegPass.value,
    card: cardNumber,
  }

  if (storedUser !== null) { 
    storedUser.push(user);
  } else {
    storedUser = [];
    storedUser.push(user);
  }

  localStorage.setItem("userData", JSON.stringify(storedUser));
  clearInput();
});

btnRegGoToLogin.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
  loginWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  clearInput();
});

//------------------------end register window---------------------

//---------------------------login-window-------------------------

btnLoginRegOpen.addEventListener("click", () => {
  registerWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  loginWindow.classList.add("unvisible");
  clearInput();
});

btnLogIn.addEventListener("click", () => {
  //event.preventDefault();
  if (inputLoginMail.value.length === 0 || inputLoginPass.value.length === 0) {
    alert("Fill in all the fields");
    return;
  }
  if (inputLoginMail.validity.valid === false || inputLoginPass.validity.valid === false) {
    alert("Enter the correct data");
    return;
  }
  if (inputLoginPass.value.length > 0 && inputLoginPass.value.length < 8) {
    alert("Password must be 8 characters or more");
    return
  }
  if (!inputLoginMail.value.trim() || !inputLoginPass.value.trim()) {
    alert("The string must not be empty");
    return;
  }

  let storedUser = JSON.parse(localStorage.getItem("userData"));
  if (storedUser !== null) {
    for (let i = 0; i < storedUser.length; i++) {
      for (let key in storedUser[i]) {
        if (storedUser[i][key] === inputLoginMail.value) {
          let user = i;
          for (let key2 in storedUser[user]) {
            if (storedUser[user][key2] === inputLoginPass.value) {

              pageLogin = true;
              pageUser = storedUser[user].nameFirst.slice(0,1).toUpperCase() + storedUser[user].nameLast.slice(0,1).toUpperCase();
              pageUserName = storedUser[user].nameFirst + " " + storedUser[user].nameLast;

              checkLogin();

              overlay.classList.add("unvisible");
              loginWindow.classList.add("unvisible");
              clearInput();
              alert("Hello " + storedUser[user].nameFirst + " !");
              return
            }
          }
        }
      }
    }
  }
  
  alert("The user does not exist or the password is incorrect");
});

//------------------------end login-window------------------------

function clearInput() {
  for (let i = 0; i < registerWindow.getElementsByTagName("input").length; i++) {registerWindow.getElementsByTagName("input")[i].value = "";}
  for (let i = 0; i < loginWindow.getElementsByTagName("input").length; i++) {loginWindow.getElementsByTagName("input")[i].value = "";}
}

function randomNumber(min = 10000000000, max = 99999999999) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let res = Math.floor(Math.random() * (max - min + 1)) + min;
  return res.toString(16).slice(0,9).toUpperCase();
}

btnCloseRegister.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
});

btnLogin.addEventListener("click", () => { profilDrop.classList.toggle("unvisible"); });

btnCloseLogin.addEventListener("click", () => {
  loginWindow.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
});

btnSignUp.addEventListener("click", () => {
  registerWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
});

btnProfileReg.addEventListener("click", () => {
  registerWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  profilDrop.classList.add("unvisible");
});

btnProfileLog.addEventListener("click", () => {
  loginWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  profilDrop.classList.add("unvisible");
});

overlay.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
  loginWindow.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
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

//------------------------------------------------all page ------------------------------------------

//profile2
let profile2 = document.getElementById("profile2");
let btnMyProfile = document.getElementById("profile2-my-profyle");
let btnProfileLogOut = document.getElementById("profile2-log-out");

//icon-login
let btnUser = document.getElementById("user-login");

btnUser.addEventListener("click", () => { profile2.classList.remove("unvisible"); }); //open profile2

//close area click profile1 and profile2
window.addEventListener("click", () => {
  if (event.target.classList.value !== "user-img" && event.target.closest("#profile1") === null) profilDrop.classList.add("unvisible");
  if (event.target.classList.value !== "user-login" && event.target.closest("#profile2") === null) profile2.classList.add("unvisible");
});

//check logIn or logOut and change page
function checkLogin() {
  if (pageLogin === true) {
    btnLogin.classList.add("unvisible");
    btnUser.textContent = pageUser;
    btnUser.classList.remove("unvisible");
  }

  if (pageLogin === false) {
    btnLogin.classList.remove("unvisible");
    btnUser.textContent = "";
    btnUser.classList.add("unvisible");
  }
}
