import L from 'leaflet';
import restaurantIcon from "../../assets/restaurant_icon.png"
import restaurantPin from "../../assets/restaurant_pin.png"
import { getWalkingDirectionsURL } from '../UserDirections';
import { urlReader } from '../urlReader';

const iconBuilder = (restaurant) => { 
    const marker = L.icon({
        iconUrl: restaurantPin,
        iconSize: [40, 40],
        className: "single-marker",
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
    return marker
}

export const RestaurantMarkerMaker = ({mapRef, restaurants}) => {
    if (restaurants.length > 0) {
        const clusters = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const iconSize = 80
                const icons = `<div class="cluster--container"><div class="cluster--count">${childMarkers.length}</div><img src="${restaurantIcon}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/></div>`
                return L.divIcon({
                    html: icons,
                    className: 'cluster-icon',
                    iconSize: L.point(iconSize, iconSize),
                })
            },
        })

        const markers = restaurants.map((restaurant) => {
            const address = restaurant.address
            let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
            const icon = iconBuilder(restaurant)
            const directions = getWalkingDirectionsURL(restaurant.latitude, restaurant.longitude)
            const position = [restaurant.latitude, restaurant.longitude]
            const leafletMarker = L.marker(position, { icon })
            leafletMarker.bindPopup(`
              <div style="text-align:center;">
                <div>
                  <h5><a className="link_styles">${restaurant.title}</a></h5>
                  ${restaurant.img === null? 
                    `</br>`
                    :
                    `<img class="popup--image" src="${urlReader(restaurant.img)}" />`}
                  <div class="popup--address">
                    <h5>
                      <span onclick="window.open('${directions}')" title="Click for walking directions" className="link_styles">
                        ${formattedAddress}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            `)
            return leafletMarker
        })

        clusters.addLayers(markers);
        mapRef.addLayer(clusters);
    } else {
        return <div>Waiting for data</div>;
    }
    
}