export const getHoods = () => {
    return fetch("http://localhost:8000/hoods", {
    })
        .then(response => response.json())
}