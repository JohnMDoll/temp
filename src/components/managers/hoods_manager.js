import { API } from "./ApiAddresses"


export const getHoods = () => {
    return fetch(`${API}/hoods`, {
    })
        .then(response => response.json())
}