import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { getHoods } from "../managers/hoods_manager";
import { getMurals } from "../managers/murals_manager";
import Collapsible from 'react-collapsible';

export const HoodsList = (props) => {
    const navigate = useNavigate()
    const [ murals, setMurals] = useState([])
    const [ hoods, setHoods ] = useState([])
        
    useEffect(() => {
        getHoods().then(data => setHoods(data))
    }, [])

    useEffect(() => {
        getMurals().then(data => setMurals(data))
    }, [])

    return (
        <body>
        <h1>Neighborhoods</h1>

        <Collapsible trigger="suh dude">

        <article className="hoods">
            {
                hoods.map(hood => {
                    return <section key={`hood--${hood.id}`} className="event">
                        <header className="hood__name"> {hood.name}</header>
                        {/* <div className="mural__location"> Location: {.address} </div> */}
                        {/* <div className="mural__img">{mural.img}</div> */}
                        {/* <div className="event__type">Event Type:{event?.eventType?.eventType} </div> */}
                    </section>
                })
            }
        </article>
        </Collapsible>
        </body>
    )
}
// go to an individual Hood, 
// share its descirption and murals 
// murals have links to mural info