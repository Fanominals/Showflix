let query = localStorage.getItem("query");
let apiKey = "94c91bea";
const searchResults = document.querySelector(".search__results");
let data = [];

function getSearch(event) {
  if (event.keyCode === 13) {
      query = event.target.value;
      renderResults();
  }
}

async function renderResults() {
  document.querySelector(
    ".displaysearchresults"
  ).innerHTML = `Search Results for: "${query}"`;

  const results = await fetch(
    `http://www.omdbapi.com/?s=${query.replace(" ", "+")}&apikey=${apiKey}`
  );
  const resultsData = (await results.json()).Search;
  console.log(resultsData); 
  let promiseArr = [];

  resultsData.forEach(result => {
    promiseArr.push(fetch(`http://www.omdbapi.com/?i=${result.imdbID}&apikey=${apiKey}`).then((res) => res.json()))
  });



  await Promise.all(promiseArr).then((promise) => data = promise);

  console.log(data);

  if (resultsData) {
    searchResults.innerHTML = data
      .map((result) => resultsHTML(result))
      .join("");
  } else {
    searchResults.innerHTML = `
    Not Found. Please Try Again!
    `;
  }
}


renderResults();



function resultsHTML(result) {
  return ` <div class="search__result">
    <figure class="search__result--img--wrapper">
      <img
        src="${
          result.Poster === "N/A" ? "./assets/no-img-available.webp" : result.Poster
        }"
        alt=""
        class="search__result--img"
      />
      <div class="search__result--background"></div>
      <div class="search__result--background--info">
        <p class="search__result--year">${result.Year}</p>
        <p class="search__result--description">
          "${result.Plot}</h3>
        </p>
        <p class="search__result--genre">
        ${result.Genre}
        </p>
      </div>
    </figure>
    <div class="search__result--title">
      <h3 class="search__result--name">${result.Title}</h3>
      <h4 class="search__result--type">(${result.Type[0].toUpperCase() + result.Type.substring(1)})</h4>
    </div>
    <div class="search__result--ratings">
    ${ratingsHTML(result.imdbRating)}
    </div>
  </div>`;
}

function ratingsHTML(rating) {
  let ratingsHTML = '';
  rating /= 2;
if (rating) {
  for (let i = 0; i < Math.floor(rating); i++) {
  ratingsHTML += `<i class="fa-solid fa-star"></i>`
  }
  if (!Number.isInteger(rating)) {
    ratingsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`
  }
}
return ratingsHTML;
}

