import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet';
import { getMurals } from '../managers/murals_manager'
import "./map.css"

export const Map = () => {
    const [murals, setMurals] = useState([])

    useEffect(
        () => {
            if (murals.length === 0) {
                getMurals()
                    .then((muralsArray) => {
                        setMurals(muralsArray)
                    })
            }
        }, []
    )

    const iconBuilder = (mural) => {
        let [,thisUrl] = mural.img.split("/media/")
        thisUrl = decodeURIComponent(thisUrl)
        const marker = L.icon({
            iconUrl : thisUrl,
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        })
        return marker
    }

    return <>
            <MapContainer id="map" center={[36.151326, -86.8535674]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    murals.map(mural => {
                        return (
                        <><Marker icon={iconBuilder(mural)} position={[mural.latitude, mural.longitude]} key={`marker--${mural.id}`}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <div><Link to={`/murals/${mural.id}`} className="link_styles"><h5>{mural.name}</h5></Link></div>
                                    {/* <div style={{fontStyle: 'italic'}}>{mural.city}, {mural.state}</div> */}
                                </div>
                            </Popup>
                        </Marker></>
                        )
                    })
                }
            </MapContainer>
    </>
}