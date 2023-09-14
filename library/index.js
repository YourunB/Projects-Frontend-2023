score();
function score() {
  console.log("Всего баллов: 200 \n Вёрстка соответствует макету. \n Вёрстка валидная. \n Реализованы все пункты ТЗ");
}

let btnMenu = document.getElementById("btn-menu");
//let nav = document.getElementsByTagName("nav")[0];
let menu = document.getElementsByTagName("ul")[1];

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
//main page controll
let pageLoginIndex;
let pageLogin = false;
let pageLoginSubscription = false;
let pageUser = "";
let pageUserName = "";
let pageCounts = {
  visits: 0,
  //bonuses: 1240,
  //books: 0,
}

//overlay
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


//reg window
let registerWindow = document.getElementById("register");
let btnCloseRegister = document.getElementById("register-close");
let btnRegisterSave = document.getElementById("register-btn-save");
let btnRegGoToLogin = document.getElementById("register-login");
let inputRegFirstName = document.getElementById("register-first-name");
let inputRegLastName = document.getElementById("register-last-name");
let inputRegMail = document.getElementById("register-mail");
let inputRegPass = document.getElementById("register-pass");


//profile2
let profile2 = document.getElementById("profile2");
let btnMyProfile = document.getElementById("profile2-my-profyle");
let btnProfileLogOut = document.getElementById("profile2-log-out");
let profile2Number = document.getElementById("profile2-number");

//icon-login
let btnUser = document.getElementById("user-login");

//modal my profile window
let windowMyProfile = document.getElementById("my-profile-window");
let btnCloseProfileWindow = document.getElementById("close-profile-window");
let btnCopyProfileCard = document.getElementById("btn-modal-profile-copy");
let listMyProfile = document.getElementsByClassName("modal-profile_list")[0];

//modal buy window
let windowModalBuy = document.getElementById("window-modal-buy");
let btnWindowModalBuyBook = document.getElementById("buy-book");
let btnWindowModalBuyClose = document.getElementById("close-modal-buy");
let inputWindowModalBuyCard = document.getElementById("bank-card-number");
let inputWindowModalBuyExCode1 = document.getElementById("expiration-code1");
let inputWindowModalBuyExCode2 = document.getElementById("expiration-code2");
let inputWindowModalBuyCVC = document.getElementById("cvc");
let inputWindowModalBuyHolder = document.getElementById("сardholder-name");
let inputWindowModalBuyPost = document.getElementById("postal-code");
let inputWindowModalBuyCity = document.getElementById("city-town");

//digital-card-section
let formDigitalLogin = document.getElementById("form-digital-login");
let formDigitalLogout = document.getElementById("form-digital-logout");
let inputDigitalCardUser = document.getElementById("cardName-login");
let inputDigitalCardNumber = document.getElementById("cardNumber-login");
let inputDigitalCardUserLogout = document.getElementById("cardName");
let inputDigitalCardNumberLogout = document.getElementById("cardNumber");
let btnDigitalCardsLogin = document.getElementById("btnLogIn");
let btnSignUp = document.getElementById("btnSignUp");
let btnDigitalCardProfile = document.getElementById("btn-digital-profile");

let btnCheckCard = document.getElementById("btnCheckCard");

//-------------------------modal buy window---------------------
btnWindowModalBuyClose.addEventListener("click", () => {
  windowModalBuy.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
});

//------------------------Register-window-----------------------

btnRegisterSave.addEventListener("click", () => {
  //event.preventDefault();
  //console.log(inputRegMail.validity.valid) //check valid input data
  if (inputRegFirstName.value.length === 0 || inputRegLastName.value.length === 0 || inputRegMail.value.length === 0 || inputRegPass.value.length === 0) {
    alert("Fill in all the fields");
    return;
  }//проверка на валидацию из html
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
    subscription: false,
    visits: 1,
    bonuses: 1240,
    books: 0,
    buttonsNumber: [],
  }

  if (storedUser !== null) { 
    storedUser.push(user);
  } else {
    storedUser = [];
    storedUser.push(user);
  }

  localStorage.setItem("userData", JSON.stringify(storedUser));

  registerWindow.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
});

btnRegGoToLogin.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
  loginWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
  clearInput();
});

btnWindowModalBuyBook.addEventListener("click", () => {
  if (!inputWindowModalBuyCard.value.trim() || !inputWindowModalBuyExCode1.value.trim() || !inputWindowModalBuyExCode2.value.trim() || !inputWindowModalBuyCVC.value.trim() || !inputWindowModalBuyHolder.value.trim() || !inputWindowModalBuyPost.value.trim() || !inputWindowModalBuyCity.value.trim()) {
    alert("The string must not be empty");
    return;
  }
  if (inputWindowModalBuyCard.validity.valid === false || inputWindowModalBuyCard.value.length !== 16) {
    alert("In the bank card number field, you must enter numbers (16 digits in total)");
    return;
  }
  if (inputWindowModalBuyExCode1.validity.valid === false || inputWindowModalBuyExCode2.validity.valid === false || inputWindowModalBuyExCode1.value.length !== 2 || inputWindowModalBuyExCode2.value.length !== 2) {
    alert("Expiration code field must consist of digits (2 digits in total)");
    return;
  }
  if (inputWindowModalBuyCVC.validity.valid === false || inputWindowModalBuyCVC.value.length !== 3) {
    alert("CVC field must consist of digits (3 digits in total)");
    return;
  }
  if (inputWindowModalBuyHolder.validity.valid === false || inputWindowModalBuyHolder.value.length < 1) {
    alert("Enter a сardholder-name from letters on English");
    return;
  }
  if (inputWindowModalBuyPost.validity.valid === false || inputWindowModalBuyPost.value.length < 1) {
    alert("Postal code can consist only of numbers and letters");
    return;
  }
  if (inputWindowModalBuyCity.validity.valid === false || inputWindowModalBuyCity.value.length < 1) {
    alert("The name of the city / town must be made up of letters (in English)");
    return;
  }

  if (pageLoginIndex !== "undefined") {
    let storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser !== null) {
      storedUser[pageLoginIndex].subscription = true;
      localStorage.setItem("userData", JSON.stringify(storedUser));
      pageLoginSubscription = true;
    }
  }

  windowModalBuy.classList.add("unvisible");
  overlay.classList.add("unvisible");
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

              storedUser[user].visits = storedUser[user].visits + 1;
              
              pageLoginIndex = user; //get index user
              pageLogin = true; // log in or not
              pageUser = storedUser[user].nameFirst.slice(0,1).toUpperCase() + storedUser[user].nameLast.slice(0,1).toUpperCase();
              pageUserName = storedUser[user].nameFirst + " " + storedUser[user].nameLast;
              btnUser.title = pageUserName;
              profile2Number.textContent = storedUser[user].card;

              inputDigitalCardUser.value = pageUserName; //to digital card section
              inputDigitalCardNumber.value = storedUser[user].card;

              if (storedUser[user].subscription === true) pageLoginSubscription = true;

              document.getElementsByClassName("counts")[0].textContent = storedUser[user].visits; //add counts to page on preload
              document.getElementsByClassName("counts")[1].textContent = storedUser[user].bonuses;
              document.getElementsByClassName("counts")[2].textContent = storedUser[user].books;
              document.getElementsByClassName("digital-counts__box_count")[0].textContent = storedUser[user].visits
              document.getElementsByClassName("digital-counts__box_count")[1].textContent = storedUser[user].bonuses;
              document.getElementsByClassName("digital-counts__box_count")[2].textContent = storedUser[user].books;
              document.getElementById("card-number").textContent = storedUser[user].card;

              checkLogin();

              overlay.classList.add("unvisible");
              loginWindow.classList.add("unvisible");
              clearInput();
              alert("Hello " + storedUser[user].nameFirst + " !");
              localStorage.setItem("userData", JSON.stringify(storedUser));
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
  for (let i = 0; i < windowModalBuy.getElementsByTagName("input").length; i++) {windowModalBuy.getElementsByTagName("input")[i].value = "";}
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

btnProfileLogOut.addEventListener("click", () => {
  profile2.classList.add("unvisible");
  pageLogin = false;
  checkLogin();
});

overlay.addEventListener("click", () => {
  registerWindow.classList.add("unvisible");
  loginWindow.classList.add("unvisible");
  windowMyProfile.classList.add("unvisible");
  windowModalBuy.classList.add("unvisible");
  overlay.classList.add("unvisible");
  clearInput();
});

//modal profile window
btnMyProfile.addEventListener("click", () => {
  windowMyProfile.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
});

btnCloseProfileWindow.addEventListener("click", () => {
  windowMyProfile.classList.add("unvisible");
  overlay.classList.add("unvisible");
});

btnCopyProfileCard.addEventListener("click", () => { copyCardNumber(); });
document.getElementById("card-number").addEventListener("click", () => { copyCardNumber(); });

function copyCardNumber() {
  navigator.clipboard.writeText(document.getElementById("card-number").textContent);
}

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
let bookName = document.getElementsByClassName("book-name");

let buttonsFavoritesBuy = document.getElementsByClassName("favorites__books_box_btn-buy");

for (let i = 0; i < buttonsFavoritesBuy.length; i++) { //click button Buy in favorites section
  buttonsFavoritesBuy[i].addEventListener("click", () => {
    if (pageLogin === false && buttonsFavoritesBuy[i].textContent === "Buy") {
      loginWindow.classList.remove("unvisible");
      overlay.classList.remove("unvisible");
      return;
    }
    if (pageLogin === true && pageLoginSubscription === true && buttonsFavoritesBuy[i].textContent === "Buy") {
      buttonsFavoritesBuy[i].textContent = "Own";
      buttonsFavoritesBuy[i].disabled = true;
      if (pageLoginIndex !== "undefined") {
        let storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser !== null) {
          storedUser[pageLoginIndex].books = storedUser[pageLoginIndex].books + 1;
          storedUser[pageLoginIndex].buttonsNumber.push(i);
          document.getElementsByClassName("counts")[2].textContent = storedUser[pageLoginIndex].books;
          document.getElementsByClassName("digital-counts__box_count")[2].textContent = storedUser[pageLoginIndex].books;

          listMyProfile.append(document.createElement("li"));
          listMyProfile.getElementsByTagName("li")[listMyProfile.getElementsByTagName("li").length - 1].textContent = bookName[i].textContent.slice(0, bookName[i].textContent.indexOf("By ")) + "," + bookName[i].textContent.slice(bookName[i].textContent.indexOf("By ")+2, bookName[i].textContent.length);

          localStorage.setItem("userData", JSON.stringify(storedUser));
        }
      }
      return;
    }
    if (pageLogin === true && buttonsFavoritesBuy[i].textContent === "Buy") {
      windowModalBuy.classList.remove("unvisible");
      overlay.classList.remove("unvisible");
      btnWindowModalBuyClose.disabled = true;
      return;
    }
  });
}

for (let i = 0; i < windowModalBuy.getElementsByTagName("input").length; i++) {
  windowModalBuy.getElementsByTagName("input")[i].addEventListener("input", () => {
    checkInputModalBuy();
  });
}

function checkInputModalBuy() {
  let count = 0;
  for (let i = 0; i < windowModalBuy.getElementsByTagName("input").length; i++) { if (windowModalBuy.getElementsByTagName("input")[i].value.length > 0) count = count + 1; }
  if (count === 7) btnWindowModalBuyBook.disabled = false;
  else btnWindowModalBuyBook.disabled = true;
}

let timerId = [];
function showBook(name) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].dataset.book !== name) {
      books[i].classList.add("slow-unvisible");
      timerId[i] = setTimeout(() => {books[i].classList.add("unvisible");}, 490); 
    }
    else {
      books[i].classList.add("slow-visible");
      timerId[i] = setTimeout(() => {
        books[i].classList.remove("slow-unvisible");
        books[i].classList.remove("unvisible");
      }, 480);
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

btnCheckCard.addEventListener("click", () =>{
  event.preventDefault();
});

btnDigitalCardsLogin.addEventListener("click", () => {
  loginWindow.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
});

btnCheckCard.addEventListener("click", () => {
  if (inputDigitalCardUserLogout.value.length === 0 || inputDigitalCardNumberLogout.value.length === 0) {
    alert("Fill in all the fields");
    return;
  }
  if (inputDigitalCardUserLogout.validity.valid === false || inputDigitalCardNumberLogout.validity.valid === false) {
    alert("Enter the correct data");
    return;
  }
  if (!inputDigitalCardUserLogout.value.trim() || !inputDigitalCardNumberLogout.value.trim()) {
    alert("The input must not be empty");
    return;
  }
  
  let storedUser = JSON.parse(localStorage.getItem("userData"));
  if (storedUser !== null) {
    for (let i = 0; i < storedUser.length; i++) {
      for (let key in storedUser[i]) {
        if (String(storedUser[i][key]).toLowerCase() === inputDigitalCardUserLogout.value.toLowerCase()) {
          let user = i;
          for (let key2 in storedUser[user]) {
            if (String(storedUser[user][key2]).toLowerCase() === inputDigitalCardNumberLogout.value.toLowerCase()) {

              document.getElementsByClassName("digital-counts__box_count")[0].textContent = storedUser[user].visits
              document.getElementsByClassName("digital-counts__box_count")[1].textContent = storedUser[user].bonuses;
              document.getElementsByClassName("digital-counts__box_count")[2].textContent = storedUser[user].books;
              document.getElementsByClassName("digital-counts-double")[0].classList.remove("unvisible");
              btnCheckCard.classList.add("unvisible");

              setTimeout(()=>{
                document.getElementsByClassName("digital-counts-double")[0].classList.add("unvisible");
                btnCheckCard.classList.remove("unvisible");
                inputDigitalCardUserLogout.value = "Reader's name";
                inputDigitalCardNumberLogout.value = "Card number";
              }, 10000);

              return
            }
          }
        }
      }
    }
  }

  alert("Sorry, no such user was found");
});

btnDigitalCardProfile.addEventListener("click", () => {
  windowMyProfile.classList.remove("unvisible");
  overlay.classList.remove("unvisible");
});

//------------------------------------------------all page ------------------------------------------

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
    if (pageLoginSubscription === true) {
      if (pageLoginIndex !== "undefined") {
        let storedUser = JSON.parse(localStorage.getItem("userData"));
        if (storedUser !== null) {
          for (let i = 0; i < storedUser[pageLoginIndex].buttonsNumber.length; i++) {
            buttonsFavoritesBuy[storedUser[pageLoginIndex].buttonsNumber[i]].textContent = "Own";
            buttonsFavoritesBuy[storedUser[pageLoginIndex].buttonsNumber[i]].disabled = true;
            listMyProfile.append(document.createElement("li"));
            listMyProfile.getElementsByTagName("li")[listMyProfile.getElementsByTagName("li").length - 1].textContent = bookName[storedUser[pageLoginIndex].buttonsNumber[i]].textContent.slice(0, bookName[storedUser[pageLoginIndex].buttonsNumber[i]].textContent.indexOf("By ")) + "," + bookName[storedUser[pageLoginIndex].buttonsNumber[i]].textContent.slice(bookName[storedUser[pageLoginIndex].buttonsNumber[i]].textContent.indexOf("By ")+2, bookName[storedUser[pageLoginIndex].buttonsNumber[i]].textContent.length)
          }
          document.getElementsByClassName("counts")[2].textContent = storedUser[pageLoginIndex].books;
        }
      }
    }
    formDigitalLogin.classList.remove("unvisible");
    formDigitalLogout.classList.add("unvisible");
    document.getElementsByClassName("reader-card")[0].classList.add("unvisible");
    document.getElementsByClassName("reader-card")[1].classList.remove("unvisible");
    document.getElementsByClassName("modal-profile__left_initials")[0].textContent = pageUser;
    document.getElementsByClassName("modal-profile__left_name")[0].textContent = pageUserName;
  }

  if (pageLogin === false) {
    btnLogin.classList.remove("unvisible");
    btnUser.textContent = "";
    btnUser.classList.add("unvisible");
    pageLoginSubscription = false;
    //pageCounts.books = 0;
    for (let i = 0; i < buttonsFavoritesBuy.length; i++) {
      buttonsFavoritesBuy[i].textContent = "Buy";
      buttonsFavoritesBuy[i].disabled = false;
    }
    for (let i = listMyProfile.getElementsByTagName("li").length - 1; i > -1; i--) {
      listMyProfile.getElementsByTagName("li")[i].remove();
    }
    inputDigitalCardUserLogout.value = "Reader's name";
    inputDigitalCardNumberLogout.value = "Card number";
    formDigitalLogin.classList.add("unvisible");
    formDigitalLogout.classList.remove("unvisible");
    document.getElementsByClassName("reader-card")[0].classList.remove("unvisible");
    document.getElementsByClassName("reader-card")[1].classList.add("unvisible");
  }
}

