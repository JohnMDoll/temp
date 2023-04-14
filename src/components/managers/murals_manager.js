export const getMurals = () => {
    return fetch("https://orca-app-vwaxr.ondigitalocean.app/murals", {
    })
        .then(response => response.json())
}

export const getSingleMural = (id) => {
    return fetch(`https://orca-app-vwaxr.ondigitalocean.app/murals/${id}`, {
    })
        .then(res => res.json())
};

export const muralsByHood = (hoods) => {
    return fetch(`https://orca-app-vwaxr.ondigitalocean.app/murals?hoods=${hoods}`, {
    })
        .then(response => response.json())
}