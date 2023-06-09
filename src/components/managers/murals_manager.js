import { API } from "./ApiAddresses";

export const getMurals = () => {
    return fetch(`${API}/murals`, {
    })
        .then(response => response.json())
}

export const getSingleMural = (id) => {
    return fetch(`${API}/murals/${id}`, {
    })
        .then(res => res.json())
};

export const muralsByHood = (hoods) => {
    return fetch(`${API}/murals?hood=${hoods}`, {
    })
        .then(response => response.json())
}