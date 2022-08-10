function menuOpen() {
    document.querySelector('nav').classList += ' menu__open';
}

function menuClose() {
    document.querySelector('nav').classList.remove('menu__open');
}

function getSearch(event,buttonClick) {
    if (event.keyCode === 13) {
        localStorage.setItem("query",event.target.value)
    window.location.href = `${window.location.origin}/search.html`

    }
    else if (buttonClick) {
        console.log(event.target.value);

    }
}


