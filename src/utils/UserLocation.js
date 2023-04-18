
export const youarehere = () => {
// check if geolocation is supported by the browser
let userLoc = "[36.1626638,-86.7816016]"
if ("geolocation" in navigator) {
  // get the user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
    // log the latitude and longitude
    userLoc = `[${position.coords.latitude},${position.coords.longitude}]`
    localStorage.setItem('userLocation', userLoc)
    return
    });
    return
} else {
  // geolocation is not supported by the browser
    console.log("Geolocation is not supported by this browser.");
    localStorage.setItem('userLocation', userLoc)
    return
  }
}
