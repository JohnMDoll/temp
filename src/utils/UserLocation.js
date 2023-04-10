
export const youarehere=()=>{
// check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  // get the user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
    // log the latitude and longitude
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    });
} else {
  // geolocation is not supported by the browser
    console.log("Geolocation is not supported by this browser.");
}}
