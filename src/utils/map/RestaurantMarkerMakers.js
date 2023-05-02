import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import LM from 'leaflet.markercluster'
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

export const RestaurantMarkerMaker = (mapRef, restaurants) => {
    if (mapRef.restaurants.length > 0) {
        const clusters = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const iconUrls = childMarkers.map(marker => marker.options.icon.options.iconUrl)
                const iconSize = 80
                const icons = `<div class="cluster--container"><div class="cluster--count">${childMarkers.length}</div><img src="${restaurantIcon}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/></div>`
                return L.divIcon({
                    html: icons,
                    className: 'cluster-icon',
                    iconSize: L.point(iconSize, iconSize),
                })
            },
        })

        const markers = mapRef.restaurants.map((raunt) => {
            const address = raunt.address
            let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
            const icon = iconBuilder(raunt)
            const directions = getWalkingDirectionsURL(raunt.latitude, raunt.longitude)
            const position = [raunt.latitude, raunt.longitude]
            const leafletMarker = L.marker(position, { icon })
            leafletMarker.bindPopup(`
              <div style="text-align:center;">
                <div>
                  <h5><a className="link_styles">${raunt.title}</a></h5>
                  ${raunt.img === null? 
                    `</br>`
                    :
                    `<img class="popup--image" src="${urlReader(raunt.img)}" />`}
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
        mapRef.mapRef.addLayer(clusters);
    } else {
        return <div>Waiting for data</div>;
    }
    
}