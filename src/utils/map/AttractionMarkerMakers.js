import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import LM from 'leaflet.markercluster'
import attractionIcon from "../../assets/attractions_icon.png"
import attractionPin from "../../assets/attractions_pin.png"
import { getWalkingDirectionsURL } from '../UserDirections';
import { urlReader } from '../urlReader';

const iconBuilder = (attraction) => {
    const marker = L.icon({
        iconUrl: attractionPin,
        iconSize: [40, 40],
        className: "single-marker",
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
    return marker
}

export const AttractionMarkerMaker = (mapRef, attractions) => {
    if (mapRef.attractions.length > 0) {
        const clusters = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const iconUrls = childMarkers.map(marker => marker.options.icon.options.iconUrl)
                const iconSize = 80
                const icons = `<div class="cluster--container"><div class="cluster--count">${childMarkers.length}</div><img src="${attractionIcon}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/></div>`
                return L.divIcon({
                    html: icons,
                    className: 'cluster-icon',
                    iconSize: L.point(iconSize, iconSize),
                })
            },
        })

        const markers = mapRef.attractions.map((attraction) => {
            const address = attraction.address
            let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
            const icon = iconBuilder(attraction)
            const directions = getWalkingDirectionsURL(attraction.latitude, attraction.longitude)
            const position = [attraction.latitude, attraction.longitude]
            const leafletMarker = L.marker(position, { icon })
            leafletMarker.bindPopup(`
              <div style="text-align:center;">
                <div>
                  <h5><a href="/attractions/${attraction.id}?name=${attraction.title}" title="Click for detail page" className="link_styles">${attraction.title}</a></h5>
                  ${attraction.img === null? 
                    `</br>`
                    :
                    `<img class="popup--image" src="${urlReader(attraction.img)}" />`}
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