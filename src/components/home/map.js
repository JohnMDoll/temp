import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import { getMurals } from '../managers/murals_manager'
import "./map.css"
import { getWalkingDirectionsURL } from '../../utils/UserDirections';

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
        if (mapRef.current && activeHood) {
            const map = mapRef.current
            const center = [activeHood.center_latitude, activeHood.center_longitude]
            map.flyTo(center, 13)
        }
    }, [mapRef, activeHood])

    const urlReader = (url) => {
        let [, thisUrl] = url.split("/media/")
        thisUrl = decodeURIComponent(thisUrl)
        return thisUrl
    }

    const iconBuilder = (mural) => {
        const thisUrl = urlReader(mural.img)
        const marker = L.icon({
            iconUrl: thisUrl,
            iconSize: [60, 60],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
        return marker
    }

    return <>
        <MapContainer id="map" center={[36.1626638, -86.7816016]} zoom={13} ref={map => { mapRef.current = map }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                murals.map(mural => {
                    return (
                        <>
                            <Marker icon={iconBuilder(mural)} position={[mural.latitude, mural.longitude]} key={`marker--${mural.id}`}>
                                <Popup>
                                    <div style={{ textAlign: 'center' }}>
                                        <div>
                                            <Link
                                                to={`/murals/${mural.id}`}
                                                title='Click for mural detail page'
                                                className="link_styles">
                                                <h5>{mural.title}</h5>
                                            </Link>
                                            <img
                                                className='popup--image'
                                                src={urlReader(mural.img)} />
                                            <div className='popup--address'>
                                                <h5>
                                                    <div
                                                        onClick={() => getWalkingDirectionsURL(mural.latitude, mural.longitude)}
                                                        title='Click for walking directions'
                                                        className="link_styles" >
                                                        {mural.address}
                                                    </div>
                                                </h5>
                                            </div>

                                        </div>
                                        {/* <div style={{fontStyle: 'italic'}}>{mural.city}, {mural.state}</div> */}
                                    </div>
                                </Popup>
                            </Marker>
                        </>
                    )
                })
            }
        </MapContainer>
    </>
}