import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import LM from 'leaflet.markercluster'
import { getMurals } from '../managers/murals_manager'
import "./map.css"
import { getWalkingDirectionsURL } from '../../utils/UserDirections';
import { urlReader } from '../../utils/urlReader';

export const Map = ({ activeHood }) => {
    const [murals, setMurals] = useState([])
    const [userLocation, setUserLocation] = useState("[36.1626638,-86.7816016]")
    const mapRef = useRef(null)

    useEffect(
        () => {
            if (murals.length === 0) {
                getMurals()
                    .then((muralsArray) => {
                        setMurals(muralsArray)
                    })
            }

            const location = localStorage.getItem('userLocation')
            setUserLocation(location)

        }, []
    )

    useEffect(() => {
        markerMaker() //make markers and markerClusters

        if (mapRef.current && activeHood) {
            const map = mapRef.current
            const center = [activeHood.center_latitude, activeHood.center_longitude]
            map.flyTo(center, 13)
        }
    }, [mapRef, activeHood])

    const iconBuilder = (mural) => {
        const thisUrl = urlReader(mural.img)
        const marker = L.icon({
            iconUrl: thisUrl ? thisUrl : "https://purepng.com/public/uploads/large/heart-icon-y1k.png",
            iconSize: [60, 60],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
        return marker
    }

    const markerMaker = () => {
        if (murals.length > 0) {
            const clusters = L.markerClusterGroup({
                iconCreateFunction: function (cluster) {
                    const childMarkers = cluster.getAllChildMarkers()
                    const iconUrls = childMarkers.map(marker => marker.options.icon.options.iconUrl)
                    const iconSize = 30
                    const icons = iconUrls.map(iconUrl => `<img src="${iconUrl}" style="width:${iconSize}px; height:${iconSize}px; min-height:${iconSize}px;"/>`)
                    return L.divIcon({
                        html: icons.join(''),
                        className: 'cluster-icon',
                        iconSize: L.point((Math.sqrt(childMarkers.length)*iconSize+15), (Math.sqrt(childMarkers.length)*iconSize)),
                    }) 
                },
            })
            
            const markers = murals.map((mural) => {
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
                            ${mural.address}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                `)
                return leafletMarker
              })
 
            clusters.addLayers(markers);
            mapRef.current.addLayer(clusters);
        } else {
            return <div>Waiting for Mural data</div>;
        }
    }

    return <>
        <MapContainer id="map" center={[36.1626638, -86.7816016]} zoom={13} ref={map => { mapRef.current = map }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={
                L.icon({
                    iconUrl: "https://purepng.com/public/uploads/large/heart-icon-y1k.png",
                    iconSize: [40, 40],
                    iconAnchor: [12, 41]
                })
            }
                position={typeof userLocation == "string" ? [JSON.parse(userLocation)[0], JSON.parse(userLocation)[1]] : [36.1626638, -86.7816016]}>
            </Marker>
            {
                markerMaker()
            }
        </MapContainer>
    </>
}