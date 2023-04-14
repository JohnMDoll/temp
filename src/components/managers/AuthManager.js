export const loginUser = (user) => {
    return fetch("https://orca-app-vwaxr.ondigitalocean.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }
  
  export const registerUser = (user) => {
    return fetch("https://orca-app-vwaxr.ondigitalocean.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
  }