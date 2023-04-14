export const getHoods = () => {
    return fetch("https://orca-app-vwaxr.ondigitalocean.app/hoods", {
    })
        .then(response => response.json())
}