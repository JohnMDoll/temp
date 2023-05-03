import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';
import { getMurals } from '../managers/murals_manager'
import "./map.css"

import { MarkerMaker } from '../../utils/map/markerMakers';
import { getRestaurants } from '../managers/restaurants_manager';
import { RestaurantMarkerMaker } from '../../utils/map/RestaurantMarkerMakers';
import { getAttractions } from '../managers/attractions_manager';
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
        // centers map on hood closest to user on load, or Nashville center if no location shared
        if (mapRef.current && activeHood) {
            const map = mapRef.current
            const center = [activeHood.center_latitude, activeHood.center_longitude]
            map.flyTo(center, 14)
        }
    }, [mapRef, activeHood])

    return <>
        <MapContainer id="map" center={[36.1626638, -86.7816016]} zoom={14} ref={map => { mapRef.current = map }}>
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
            <MarkerMaker mapRef={mapRef.current} murals={murals} />
            <RestaurantMarkerMaker mapRef={mapRef.current} restaurants={restaurants} />
            <AttractionMarkerMaker mapRef={mapRef.current} attractions={attractions} />
        </MapContainer>
    </>
}