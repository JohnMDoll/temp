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
        
    useEffect(() => {
        getSingleMural(muralId).then(data => setMural(data))
    }, [muralId])


    

    return (
        <article className="mural">
            <section key={`mural--${murals.id}`} className="event">
            <fieldset className="mural__container">

                        <h1 className="mural__title" >
                        {murals.title}
                            
                        </h1>
                        <img className="murals__img" src={urlReader(murals.img)}/>
                        {/* <div>
                            {murals.address}
                        </div> */}
                        <h5>
                        <span onClick={() => window.open(directions)} title="Click for walking directions" className="link_styles">
                            {murals.address}
                        </span>
                        </h5>

                        
            </fieldset>
            </section>
                
            
        </article>
    )
}
