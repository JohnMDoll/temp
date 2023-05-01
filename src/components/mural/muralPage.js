import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { getMurals } from "../managers/murals_manager";
import { API } from "../managers/ApiAddresses";
import "./murals.css"
import { urlReader } from "../../utils/urlReader";
import { getSingleMural } from "../managers/murals_manager";
import "./murals.css"

export const MuralPage = (props) => {
    const navigate = useNavigate()
    const { muralId } = useParams()

    const [ murals, setMural ] = useState({img:""})
        
    useEffect(() => {
        getSingleMural(muralId).then(data => setMural(data))
    }, [muralId])


    

    return (
        <body className="murals_body">
        <article className="murals">
 <section key={`mural--${murals.id}`} className="event">
                        <div className="mural__title" >
                        {murals.title}
                            
                        </div>
        <fieldset className="murals__page">
                        <img className="mural__img" src={urlReader(murals.img)}/>
                        <div>
                            {murals.address}
                        </div>

                        
        </fieldset>
                    </section>
                
            
        </article>
        </body>
    )
}
