import { API } from "./ApiAddresses"


export const getSavedMurals = () => {
    return fetch(`${API}/savedmurals`, {
    })
        .then(response => response.json())
}