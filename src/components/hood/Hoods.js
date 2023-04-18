import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { getHoods } from "../managers/hoods_manager";

export const HoodsList = (props) => {
    const navigate = useNavigate()

    const [ hoods, setHoods ] = useState([])
        
    useEffect(() => {
        getHoods().then(data => setHoods(data))
    }, [])

    return (
        <body>
        <h1>Neighborhoods</h1>
        <article className="hoods">
            {
                hoods.map(hood => {
                    return <section key={`mural--${hood.id}`} className="event">
                        <header className="mural__name"> {hood.name}</header>
                        {/* <div className="mural__location"> Location: {.address} </div> */}
                        {/* <div className="mural__img">{mural.img}</div> */}
                        {/* <div className="event__type">Event Type:{event?.eventType?.eventType} </div> */}
                    </section>
                })
            }
        </article>
        </body>
    )
}
// go to an individual Hood, 
// share its descirption and murals 
// murals have links to mural info