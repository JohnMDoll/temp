import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
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

    return <>
        <div className='map--container'>
            <MapContainer center={[36.151326, -86.8535674]} zoom={3} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    murals.map(mural => {
                        return <Marker icon={mural.img} position={[mural.latitude, mural.longitude]} key={mural.id}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    <div><Link to={`/murals/${mural.id}`} className="link_styles"><h5>{mural.name}</h5></Link></div>
                                    {/* <div style={{fontStyle: 'italic'}}>{mural.city}, {mural.state}</div> */}
                                </div>
                            </Popup>
                        </Marker>
                    })
                }
            </MapContainer>
        </div>
    </>
}