const inputSearch = document.getElementById('search-image');
const clearSearch = document.getElementById('clear-search');
const btnSearch = document.getElementById('btn-search');
const main = document.getElementById('main');
const imageFull = document.getElementById('full-image');
const descriptionFull = document.getElementById('full-decription');
const downloadLink = document.getElementById('download');
const overlay = document.getElementById('overlay');
const overlayBack = document.getElementById('overlay-back');
const audioClick = document.getElementById('song-click');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnUp = document.getElementById('btn-up');

let page = 1;
let search = 'all';

inputSearch.addEventListener('keypress', () => {
  if (event.key === 'Enter' && inputSearch.value.length > 0) {
    clearCards();
    page = 1;
    search = inputSearch.value;
    getImages(page, search);
    page += 1;
    setTimeout(() => { fillWindow(); }, 250);
  }
});

btnSearch.addEventListener('click', () => {
  if (inputSearch.value.length > 0) {
    clearCards();
    page = 1;
    search = inputSearch.value;
    getImages(page, search);
    setTimeout(() => { fillWindow(); }, 250);
  }
});

inputSearch.addEventListener('input', () => {
  if (inputSearch.value === '' || inputSearch.value.length === 0) {
    clearSearch.classList.remove('header__clear-btn-active');
    btnSearch.classList.remove('header__search-btn-active');
    clearCards();
    page = 1;
    search = 'all';
    getImages(page, search);
    setTimeout(() => { fillWindow(); }, 250);
  } else {
    clearSearch.classList.add('header__clear-btn-active');
    btnSearch.classList.add('header__search-btn-active');
  }
});

clearSearch.addEventListener('click', () => {
  if (inputSearch.value.length > 0) {
    clearSearch.classList.remove('header__clear-btn-active');
    btnSearch.classList.remove('header__search-btn-active');
    inputSearch.value = '';
    clearCards();
    page = 1;
    search = 'all';
    getImages(page, search);
    setTimeout(() => { fillWindow(); }, 250);
  }
});

function fillWindow() {
  if (document.body.getBoundingClientRect().height <= window.screen.height) {
    page += 1;
    getImages(page, search);
  }
}

getImages(page, search);
function getImages(page, search = 'all') {
  let url = '';
  if (search === 'all') url = `https://api.unsplash.com/photos?client_id=4-EJtgSsL_fig8yHRfZ9DaV7_DqqHQZoahL2MaYrEw0&page=${page}`;
  else url = `https://api.unsplash.com/search/photos?client_id=4-EJtgSsL_fig8yHRfZ9DaV7_DqqHQZoahL2MaYrEw0&page=${page}&query=${search}`;
  const options = {
    method: 'GET',
  };
  fetchAsync();
  async function fetchAsync() { 
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (search === 'all') {
        for (let i = 0; i < data.length; i++) {
          createImage(data[i].urls.regular ,data[i].links.download, data[i].description, data[i].alt_description);
        }
      }

      if (search !== 'all') {
        for (let i = 0; i < data.results.length; i++) {
          createImage(data.results[i].urls.regular ,data.results[i].links.download, data.results[i].description, data.results[i].alt_description);
        }
      }

    } catch (error) {
      if (error != "") {
        console.log("Error: " + error + "\nCheck the app later.");
      }
    }
  }
}

function createImage(smallImage, fullImage, description, altDescription) {
  main.append(document.createElement('div'));
  main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].classList.add('cards');
  main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].append(document.createElement('img'));
  main.getElementsByTagName('img')[main.getElementsByTagName('img').length - 1].classList.add('cards__image');
  main.getElementsByClassName('cards__image')[main.getElementsByClassName('cards__image').length - 1].src = smallImage;
  main.getElementsByClassName('cards__image')[main.getElementsByClassName('cards__image').length - 1].setAttribute('data-download', fullImage);
  main.getElementsByClassName('cards__image')[main.getElementsByClassName('cards__image').length - 1].setAttribute('data-description', description);
  main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].append(document.createElement('p'));
  main.getElementsByTagName('p')[main.getElementsByTagName('p').length - 1].classList = 'cards__description';
  main.getElementsByClassName('cards__description')[main.getElementsByClassName('cards__description').length - 1].textContent = altDescription;
}

