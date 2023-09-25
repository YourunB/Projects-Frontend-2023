const inputSearch = document.getElementById('search-image');
const main = document.getElementById('main');
const overlay = document.getElementById('overlay');

let page = 1;
let search = 'all';

window.addEventListener("keypress", () => {
if (event.key === 'Enter' && inputSearch.value !== '') {
  page = 1;
  search = inputSearch.value;
  getImages(page, search);
}
});


if (document.body.getBoundingClientRect().height <= window.screen.height) getImages(page, search);

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
        console.log("Error: " + error);
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
  main.getElementsByTagName('div')[main.getElementsByTagName('div').length - 1].append(document.createElement('p'));
  main.getElementsByTagName('p')[main.getElementsByTagName('p').length - 1].classList = 'cards__description';
  main.getElementsByClassName('cards__description')[main.getElementsByClassName('cards__description').length - 1].textContent = altDescription;
}

function throttle(callee, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

  window.addEventListener("scroll", throttle( () => {
    let pageSize = document.body.getBoundingClientRect().height;
    let displaySize = window.screen.height;
    let scrollPosition = window.scrollY;
    if (scrollPosition + displaySize > pageSize - 20) {
      page += 1;
      getImages(page, search);
    }
  }, 250));

  main.addEventListener('click', () => {
    if (event.target.classList == 'cards__image') {
      event.target.classList.add('cards__image_full');
      overlay.classList.remove('unvisible');
    } else {
      event.target.classList.remove('cards__image_full');
      overlay.classList.add('unvisible');
    }
  })
