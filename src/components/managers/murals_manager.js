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
    return fetch(`${API}/murals?hoods=${hoods}`, {
    })
        .then(response => response.json())
}