import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"
import { getHoods } from "../managers/hoods_manager";
import Collapsible from 'react-collapsible';
import "./Hoods.css"
import { HoodMurals } from "./HoodMurals";
import { HoodAttractions } from "./HoodAttractions";
import { HoodRestaurants } from "./HoodRestaurants";


export const HoodsList = (props) => {
    const navigate = useNavigate()
    const [hoods, setHoods] = useState([
        {
            id: 0,
            hood_attractions: [],
            hood_restaurants: []
        }
    ])
    let offsetDistance = (document.getElementsByClassName('navbar-dark')[0]?.offsetHeight + 5)

    useEffect(() => {
        getHoods().then(data => setHoods(data))
    }, [])

    const displayAttractions = (hood) => {
        if (hood.hood_attractions.length > 0) {
            return <HoodAttractions hood_id={hood.id} hood_name={hood.name} />
        } else {
            return ""
        }
    }
    const displayRestaurants = (hood) => {
        if (hood.hood_restaurants.length > 0) {
            return <HoodRestaurants hood_id={hood.id} hood_name={hood.name} />
        } else {
            return ""
        }
    }

    return (
        <div className="hoods_body">
            <article className="hoods"
            style={{'marginTop': offsetDistance+'px'}}>
                {
                    hoods.map(hood => {

                        const [,thisHood] = window.location.search.split('id=')

                        return <section key={`hood--${hood.id}`} >
                            <Collapsible className="hood_collapse" open={ thisHood == hood.id} triggerOpenedClassName="hood_collapse" trigger={hood.name} >
                                <HoodMurals hood_id={hood.id} hood_name={hood.name} defaultOpen={thisHood == hood.id} />
                                {
                                    displayAttractions(hood)
                                }
                                {
                                    displayRestaurants(hood)
                                }
                            </Collapsible>
                        </section>
                    })
                }
            </article>
        </div>
    )
}
