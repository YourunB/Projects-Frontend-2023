const inputSearch = document.getElementById('search-image');

let page = 1;
let search = 'all';

window.addEventListener("keypress", () => {
if (event.key === 'Enter' && inputSearch.value !== '') {
  page = 1;
  search = inputSearch.value;
  getImages(page, search);
}
});

function getImages(page, search) {
  const url = `https://api.unsplash.com/search/photos?client_id=4-EJtgSsL_fig8yHRfZ9DaV7_DqqHQZoahL2MaYrEw0&?page=${page}&query=${search}`;
  const options = {
    method: 'GET',
  };
  fetchAsync();
  async function fetchAsync() { 
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      if (error != "") {
        console.log("Error: " + error);
      }
    }
  }
  }
