export const getSavedMurals = () => {
    return fetch("http://localhost:8000/savedmurals", {
    })
        .then(response => response.json())
}