export const restaurantsByHood = (hoods) => {
    return fetch(`${API}/restaurants?hood=${hoods}`, {
    })
        .then(response => response.json())
}