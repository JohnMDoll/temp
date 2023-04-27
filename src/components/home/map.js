import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import LM from 'leaflet.markercluster'
import { getMurals } from '../managers/murals_manager'
import "./map.css"
import { getWalkingDirectionsURL } from '../../utils/UserDirections';
import { urlReader } from '../../utils/urlReader';
import { map } from 'leaflet';

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
                    const iconSize = 40
                    const icons = iconUrls.map(iconUrl => `<img src="${iconUrl}" width="${iconSize}" height="${iconSize}"/>`)
                    return L.divIcon({
                        html: icons.join(''),
                        className: 'cluster-icon',
                        iconSize: L.point(iconSize, iconSize),
                    })
                },
            })
            const markers = murals.map((mural) => {
                const icon = iconBuilder(mural);
                const position = [mural.latitude, mural.longitude];
                const leafletMarker = L.marker(position, { icon });
                leafletMarker.bindPopup(`<div style="text-align:center;">
                <div>
                  <Link to="/murals/${mural.id}" title="Click for mural detail page" className="link_styles"><h5>${mural.title}</h5></Link>
                  <img class="popup--image" src="${urlReader(mural.img)}" />
                  <div class="popup--address"><h5><div onClick="getWalkingDirectionsURL(${mural.latitude}, ${mural.longitude})" title="Click for walking directions" className="link_styles">${mural.address}</div></h5></div>
                </div>
              </div>`);
                return leafletMarker;
            });
            // const clusterIcon = L.divIcon({
            //     className: 'cluster-icon',
            //     html: '<div><span>{clusterCount}</span></div>',
            //     iconSize: [40, 40]
            //   });

            //   const clusters = L.markerClusterGroup({
            //     iconCreateFunction: function(cluster) {
            //       return clusterIcon;
            //     }
            //   });
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