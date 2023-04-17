export function getWalkingDirectionsURL(latitude, longitude) {
    // Construct the Google Maps URL with the latitude and longitude parameters and walking mode
    const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`;
    
    return window.open(mapsURL);
}