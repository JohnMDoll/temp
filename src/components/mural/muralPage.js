import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { getMurals } from "../managers/murals_manager";
import { API } from "../managers/ApiAddresses";
import { getWalkingDirectionsURL } from '../../utils/UserDirections';
import { urlReader } from "../../utils/urlReader";
import { getSingleMural } from "../managers/murals_manager";
import "./muralPage.css"


export const MuralPage = (props) => {
    const navigate = useNavigate()
    const { muralId } = useParams()
    const [ murals, setMural ] = useState({img:""})
    const directions = getWalkingDirectionsURL(murals.latitude, murals.longitude)
    let offsetDistance = (document.getElementsByClassName('navbar-dark')[0]?.offsetHeight + 5)
        
    useEffect(() => {
        getSingleMural(muralId).then(data => setMural(data))
    }, [muralId])


    

    return (
        <div className="mural__container">
        <article className="mural"
        style={{'marginTop': offsetDistance+'px'}}>
            <section key={`mural--${murals.id}`} className="event">
                        <img className="murals__img" src={urlReader(murals.img)}/>
                        <h4 className="mural__address">
                        <span onClick={() => window.open(directions)} title="Click for walking directions" className="link_styles">
                            {murals.address}
                        </span>
                        </h4>

                        
            </section>
                
            
        </article>
        </div>
    )
}
