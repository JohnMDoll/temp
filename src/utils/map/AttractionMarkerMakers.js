import L from 'leaflet';
import attractionIcon from "../../assets/attractions_icon.png"
import attractionPin from "../../assets/attractions_pin.png"
import { getWalkingDirectionsURL } from '../UserDirections';
import { urlReader } from '../urlReader';

const iconBuilder = (attraction) => {
    const marker = L.icon({
        iconUrl: attractionPin,
        iconSize: [40, 40],
        className: `single-marker`,
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
    return marker
}

export const AttractionMarkerMaker = ({attractionRef, attractions}) => {
    if (attractions.length > 0) {
        const clusters = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const iconSize = 80
                const icons = `<div class="cluster--container"><div class="cluster--count">${childMarkers.length}</div><img src="${attractionIcon}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/></div>`
                return L.divIcon({
                    html: icons,
                    className: `cluster-icon`,
                    iconSize: L.point(iconSize, iconSize),
                })
            },
        })

        const markers = attractions.map((attraction) => {
            const address = attraction.address
            let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
            const icon = iconBuilder(attraction)
            const directions = getWalkingDirectionsURL(attraction.latitude, attraction.longitude)
            const position = [attraction.latitude, attraction.longitude]
            const leafletMarker = L.marker(position, { icon })
            leafletMarker.bindPopup(`
              <div style="text-align:center;">
                <div>
                  <h5><a className="link_styles">${attraction.title}</a></h5>
                  ${attraction.img === null? 
                    `</br>`
                    :
                    `<img class="popup--image" src="${urlReader(attraction.img)}" />`}
                  <div class="popup--address">
                    <h5>
                      <span onclick="window.open('${directions}')" title="Click for walking directions" className="attraction--popup--title">
                        ${formattedAddress}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            `)
            return leafletMarker
        })

        clusters.addLayers(markers)
        attractionRef.addLayer(clusters)
        return 
    } else {
        return 
    }
}