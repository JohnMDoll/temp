import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import L, { MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster'
import { getMurals } from '../managers/murals_manager'
import "./map.css"
import userPin from "../../assets/heart-icon.png"
import { getWalkingDirectionsURL } from '../../utils/UserDirections'
import { urlReader } from '../../utils/urlReader'
import cameraIcon from "../../assets/camera_icon.png"
import cameraPin from "../../assets/camera_pin.png"
import attractionIcon from "../../assets/attractions_icon.png"
import attractionPin from "../../assets/attractions_pin.png"
import { getRestaurants } from '../managers/restaurants_manager';
import { getAttractions } from '../managers/attractions_manager';
import { RestaurantMarkerMaker } from '../../utils/map/RestaurantMarkerMakers';
import { MarkerMaker } from '../../utils/map/markerMakers';
import { AttractionMarkerMaker } from '../../utils/map/AttractionMarkerMakers';

export const Map = ({ activeHood }) => {
    const [murals, setMurals] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [attractions, setAttractions] = useState([])
    const [userLocation, setUserLocation] = useState("[36.1626638,-86.7816016]")
    const [iconToggles, setIconToggles] = useState([true, true, false])
    const mapRef = useRef(null)

    useEffect(
        () => {
            if (murals.length === 0) {
                getMurals()
                    .then((muralsArray) => {
                        setMurals(muralsArray)
                    })
            }
            if (restaurants.length === 0) {
                getRestaurants()
                    .then((restaurantsArray) => {
                        setRestaurants(restaurantsArray)
                    })
            }
            if (attractions.length === 0) {
                getAttractions()
                    .then((attractionsArray) => {
                        setAttractions(attractionsArray)
                    })
            }

            const location = localStorage.getItem('userLocation')
            setUserLocation(location)
        }, []
    )

    useEffect(() => {
        if (mapRef.current && activeHood) {
            const map = mapRef.current
            const center = [activeHood.center_latitude, activeHood.center_longitude]
            map.flyTo(center, 14)
        }
    }, [mapRef, activeHood]
    )

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

    // useEffect(() => {
    //     if (mapRef.current) {

    //         const attractionMarkers = AttractionMarkerMaker({ mapRef: mapRef.current, attractions: attractions })
    //         mapRef.current.addLayer(attractionMarkers)

    //         if (!mapRef.current.control) {
    //             console.log("no control")
    //         }
    //     }
    // }, [iconToggles]
    // )

    return <>
        {/* <button type="button" onClick={() => setIconToggles([iconToggles[0], iconToggles[1], !iconToggles[2]])}>toggle attractions</button> */}

        <MapContainer
            id="map"
            center={[36.1626638, -86.7816016]}
            zoom={14}
            ref={map => { mapRef.current = map }}
            maxZoom={24}>
            <Marker
                icon={
                    L.icon({
                        iconUrl: userPin,
                        iconSize: [40, 40],
                        iconAnchor: [12, 41]
                    })
                }
                position={typeof userLocation == "string" ?
                    [JSON.parse(userLocation)[0], JSON.parse(userLocation)[1]]
                    :
                    [36.1626638, -86.7816016]}>
            </Marker>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                {(activeHood && attractions.length > 0) ?
                    <LayersControl.Overlay checked name="Attractions">
                        <LayerGroup>
                            {/* {L.markerClusterGroup( 
                        iconCreateFunction={ attractions.map((attraction) => {
                                const address = attraction.address
                                let formattedAddress = address.replace(/(.*)\s(Nashville)/, "$1</br>$2")
                                const icon = iconBuilder(attraction)
                                const directions = getWalkingDirectionsURL(attraction.latitude, attraction.longitude)
                                const position = [attraction.latitude, attraction.longitude]
                                // const leafletMarker = L.marker(position, { icon })
                                // return leafletMarker
                                return <Marker position={position} icon={icon}/>
                                
                            })}
                        })} */}
                            {/* {AttractionMarkerMaker({ mapRef: mapRef.current, attractions: attractions })} */}
                            <AttractionMarkerMaker mapRef={mapRef.current} attractions={attractions} />
                            {/* {murals &&
                        <MarkerMaker
                        mapRef={mapRef.current}
                        murals={murals}
                        visible={iconToggles[0]}
                    />} */}
                        </LayerGroup>
                    </LayersControl.Overlay> : <></>}
            </LayersControl>
            {/* {restaurants &&
                <RestaurantMarkerMaker
                    mapRef={mapRef.current}
                    restaurants={restaurants}
                    visible={iconToggles[1]}
                />} */}
            {/* <LayersControl.Overlay checked name="Attractions">
                {attractions &&
                    <AttractionMarkerMaker
                    mapRef={mapRef.current}
                    attractions={attractions}
                    />}
                </LayersControl.Overlay> */}
        </MapContainer >
    </>
}