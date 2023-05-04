import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet.markercluster'
import { getMurals } from '../managers/murals_manager'
import "./map.css"
import userPin from "../../assets/heart-icon.png"
import { getWalkingDirectionsURL } from '../../utils/UserDirections'
import { urlReader } from '../../utils/urlReader'
import cameraIcon from "../../assets/camera_icon.png"
import cameraPin from "../../assets/camera_pin.png"
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
    }, [mapRef, activeHood])

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

    return <>
        <MapContainer id="map" center={[36.1626638, -86.7816016]} zoom={14} ref={map => { mapRef.current = map }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={
                L.icon({
                    iconUrl: userPin,
                    iconSize: [40, 40],
                    iconAnchor: [12, 41]
                })
            }
                position={typeof userLocation == "string" ? [JSON.parse(userLocation)[0], JSON.parse(userLocation)[1]] : [36.1626638, -86.7816016]}>
            </Marker>
            {murals && <MarkerMaker mapRef={mapRef.current} murals={murals}/>}
            {restaurants && <RestaurantMarkerMaker mapRef={mapRef.current} restaurants={restaurants}/>}
            {attractions && <AttractionMarkerMaker mapRef={mapRef.current} attractions={attractions}/>}
        </MapContainer>
    </>
}