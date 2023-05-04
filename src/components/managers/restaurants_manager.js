import { API } from "./ApiAddresses"

export const restaurantsByHood = (hoods) => {
    return fetch(`${API}/restaurants?hood=${hoods}`, {
    })
        .then(response => response.json())
}

export const getRestaurants = () => {
    return fetch(`${API}/restaurants`, {
    })
        .then(response => response.json())
}