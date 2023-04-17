import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import { getMurals } from '../managers/murals_manager'
import "./map.css"

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

    const iconBuilder = (mural) => {
        let [, thisUrl] = mural.img.split("/media/")
        thisUrl = decodeURIComponent(thisUrl)
        const marker = L.icon({
            iconUrl: thisUrl,
            iconSize: [40, 40],
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
                                            <Link to={`/murals/${mural.id}`} className="link_styles">
                                                <h5>{mural.name}</h5>
                                            </Link>
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