function menuOpen() {
    document.querySelector('nav').classList += ' menu__open';
}

function menuClose() {
    document.querySelector('nav').classList.remove('menu__open');
}

function getSearch(event) {
    console.log(window.location);
    event.preventDefault();
    localStorage.setItem("query", event.target[0].value)
    window.location.href = `./` 
}


