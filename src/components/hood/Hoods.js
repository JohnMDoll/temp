import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getHoods } from "../managers/hoods_manager";
import { getMurals, muralsByHood } from "../managers/murals_manager";
import { API } from "../managers/ApiAddresses";
import Collapsible from 'react-collapsible';
import "./Hoods.css"
import { urlReader } from "../../utils/urlReader";
import { HoodMurals } from "./HoodMurals";
import { HoodAttractions } from "./HoodAttractions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HoodRestaurants } from "./HoodRestaurants";


export const HoodsList = (props) => {
    const navigate = useNavigate()
    const [murals, setMurals] = useState([])
    const [hoods, setHoods] = useState([])

    useEffect(() => {
        getHoods().then(data => setHoods(data))
    }, [])

    return (
        <body className="hoods_body">
            <h1>Neighborhoods</h1>


            <article className="hoods">
                {
                    hoods.map(hood => {
                        return <section key={`hood--${hood.id}`} className="hood_map">
                            <Collapsible className="hood_collapse" trigger={hood.name}>
                                <HoodMurals hood_id={hood.id} hood_name={hood.name} />
                                <HoodAttractions hood_id={hood.id} hood_name={hood.name} />
                                <HoodRestaurants hood_id={hood.id} hood_name={hood.name} />
                            </Collapsible>
                        </section>
                    })
                }
            </article>
        </body>
    )
}
