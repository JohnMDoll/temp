export const getSavedMurals = () => {
    return fetch("https://orca-app-vwaxr.ondigitalocean.app/savedmurals", {
    })
        .then(response => response.json())
}