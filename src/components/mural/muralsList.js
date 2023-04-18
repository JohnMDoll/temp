import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { getMurals } from "../managers/murals_manager";

export const MuralsList = (props) => {
    const navigate = useNavigate()

    const [ murals, setMurals ] = useState([])
        
    useEffect(() => {
        getMurals().then(data => setMurals(data))
    }, [])

    return (
        <body>
        <h1>Murals</h1>
        <article className="murals">
            {
                murals.map(mural => {
                    return <section key={`mural--${mural.id}`} className="event">
                        <div className="mural__name"> {mural.title}</div>
                        <div className="mural__location"> Location: {mural.address} </div>
                        {/* <div className="mural__img">{mural.img}</div> */}
                        {/* <div className="event__type">Event Type:{event?.eventType?.eventType} </div> */}
                    </section>
                })
            }
        </article>
        </body>
    )
}