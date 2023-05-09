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
    const mapRef = useRef(null)
    const attractionRef = useRef(new L.markerClusterGroup())
    const muralRef = useRef(new L.markerClusterGroup())
    const restaurantRef = useRef(new L.markerClusterGroup())

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

    return <>
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

                    <LayersControl.Overlay checked name="Murals">
                        <LayerGroup ref={mural => { muralRef.current = mural }}>
                            {murals &&
                                <MarkerMaker muralRef={muralRef.current} murals={murals} />}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Restaurants">
                        <LayerGroup ref={restaurant => { restaurantRef.current = restaurant }}>
                            {restaurants &&
                                <RestaurantMarkerMaker restaurantRef={restaurantRef.current} restaurants={restaurants} />}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name="Attractions">
                        <LayerGroup ref={attraction => { attractionRef.current = attraction }}>
                            {attractions &&
                                <AttractionMarkerMaker attractionRef={attractionRef.current} attractions={attractions} />}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    
            </LayersControl>
        </MapContainer >
    </>
}