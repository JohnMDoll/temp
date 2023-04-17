export const getMurals = () => {
    return fetch("http://localhost:8000/murals", {
    })
        .then(response => response.json())
}

export const getSingleMural = (id) => {
    return fetch(`http://localhost:8000/murals/${id}`, {
    })
        .then(res => res.json())
};

export const muralsByHood = (hoods) => {
    return fetch(`http://localhost:8000/murals?hoods=${hoods}`, {
    })
        .then(response => response.json())
}