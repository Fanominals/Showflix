
let apiKey = "94c91bea";
const searchResults = document.querySelector(".search__results");
let data = [];

function getSearch(event) {
  if (event.keyCode === 13) {
    localStorage.setItem("query",event.target.value) ;
    renderResults();
  }
}

async function renderResults() {
  let query = localStorage.getItem("query");
  if (localStorage.getItem("query")) {
    window.localStorage.removeItem("query");
    
    document.querySelector(
      ".displaysearchresults"
    ).innerHTML = `Search Results for: "${query}"`;

    searchResults.classList += ' loading__overlay--visible'
    const results = await fetch(
      `https://www.omdbapi.com/?s=${query.replace(" ", "+")}&apikey=${apiKey}`
    );
    const resultsData = (await results.json()).Search;
    let promiseArr = [];
    if (resultsData) {
      resultsData.forEach((result) => {
        promiseArr.push(
          fetch(
            `https://www.omdbapi.com/?i=${result.imdbID}&apikey=${apiKey}`
          ).then((res) => res.json())
        );
      });
  
      await Promise.all(promiseArr).then((promise) => (data = promise));
  
      searchResults.classList.remove('loading__overlay--visible');
      searchResults.innerHTML = data
        .map((result) => resultsHTML(result))
        .join("");
    } else {
      searchResults.innerHTML = `
      <div class="no__search__query">
                <h2>Not Found. Please try again!</h2>
                <figure class="no__search__query--wrapper"><img src="./assets/not-found.svg" alt=""></figure>
              </div>
      `;
    }
  }
  
  
}

renderResults();

function resultsHTML(result) {
  return `<div class="search__result">
    <figure class="search__result--img--wrapper">
      <img
        src="${
          result.Poster === "N/A"
            ? "./assets/no-img-available.webp"
            : result.Poster
        }"
        alt=""
        class="search__result--img"
      />
      <div class="search__result--background"></div>
      <div class="search__result--background--info">
        <p class="search__result--year">${result.Year}</p>
        <p class="search__result--description">
          "${result.Plot}"</h3>
        </p>
        <p class="search__result--genre">
        ${result.Genre}
        </p>
      </div>
    </figure>
    <div class="search__result--title">
      <h3 class="search__result--name">${result.Title}</h3>
      <div class="search__result--ratings">
      ${ratingsHTML(result.imdbRating)}
      </div>
      <p class="search__result--description--low">
        "${result.Plot}"</h3>
        </p>
      <h4 class="search__result--type">${
        result.Type[0].toUpperCase() + result.Type.substring(1)
      }</h4>
    </div>
   
  </div>`;
}

function ratingsHTML(rating) {
  let ratingsHTML = "";
  rating /= 2;
  if (rating) {
    for (let i = 0; i < Math.floor(rating); i++) {
      ratingsHTML += `<i class="fa-solid fa-star"></i>`;
    }
    if (!Number.isInteger(rating)) {
      ratingsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
  }
  return ratingsHTML;
}

function menuOpen() {
  document.querySelector('nav').classList += ' menu__open';
}

function menuClose() {
  document.querySelector('nav').classList.remove('menu__open');
}

