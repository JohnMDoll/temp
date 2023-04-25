import { API } from "./ApiAddresses";

export const attractionsByHood = (hoods) => {
    return fetch(`${API}/attractions?hood=${hoods}`, {
    })
        .then(response => response.json())
}