import { API } from "./ApiAddresses";

export const attractionsByHood = (hoods) => {
    return fetch(`${API}/attractions?hood=${hoods}`, {
    })
        .then(response => response.json())
}

export const getAttractions = () => {
    return fetch(`${API}/attractions`, {
    })
        .then(response => response.json())
}