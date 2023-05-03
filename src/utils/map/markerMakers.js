import L from 'leaflet';
import cameraIcon from "../../assets/camera_icon.png"
import cameraPin from "../../assets/camera_pin.png"
import { getWalkingDirectionsURL } from '../UserDirections';
import { urlReader } from '../urlReader';

const iconBuilder = (mural) => { //uncomment and remove iconSize: [40, 40] to restore mural img icons
    // const thisUrl = urlReader(mural.img)
    const marker = L.icon({
        // iconUrl: thisUrl ? thisUrl : "https://purepng.com/public/uploads/large/heart-icon-y1k.png",
        iconUrl: cameraPin,
        iconSize: [40, 40],
        className: "single-marker",
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
    return marker
}

export const MarkerMaker = ({mapRef, murals}) => {
    if (murals.length > 0) {
        const clusters = L.markerClusterGroup({
            iconCreateFunction: (cluster) => {
                const childMarkers = cluster.getAllChildMarkers()
                const iconUrls = childMarkers.map(marker => marker.options.icon.options.iconUrl)
                const iconSize = 80
                const icons = `<div class="cluster--container"><div class="cluster--count">${childMarkers.length}</div><img src="${cameraIcon}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/></div>`
                return L.divIcon({
                    html: icons,
                    className: 'cluster-icon',
                    iconSize: L.point(iconSize, iconSize),
                    // uncomment below and remove up to const icons above to restore mural img clusters
                    // const icons = iconUrls.map(iconUrl => `<img src="${iconUrl}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/>`)
                    // return L.divIcon({
                    //     html: icons.join(''),
                    //     className: 'cluster-icon',
                    //     iconSize: L.point((Math.sqrt(childMarkers.length)*iconSize+15), (Math.sqrt(childMarkers.length)*iconSize)),
                })
            },
        })

        const markers = murals.map((mural) => {
            const address = mural.address
            let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
            const icon = iconBuilder(mural)
            const directions = getWalkingDirectionsURL(mural.latitude, mural.longitude)
            const position = [mural.latitude, mural.longitude]
            const leafletMarker = L.marker(position, { icon })
            leafletMarker.bindPopup(`
              <div style="text-align:center;">
                <div>
                  <h5><a href="/murals/${mural.id}?name=${mural.title}" title="Click for mural detail page" className="link_styles">${mural.title}</a></h5>
                  <img class="popup--image" src="${urlReader(mural.img)}" />
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
        return <div>Waiting for Mural data</div>;
    }
    
}