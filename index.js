
function getSearch(event) {
    if (event.keyCode === 13) {
        localStorage.setItem("query",event.target.value)
        window.location.href = `${window.location.origin}/search.html`
    }
}