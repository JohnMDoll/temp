import React, { useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { getMurals } from "../managers/murals_manager";
import { API } from "../managers/ApiAddresses";
import "./murals.css"
import { urlReader } from "../../utils/urlReader";
import { getSingleMural } from "../managers/murals_manager";

export const MuralPage = (props) => {
    const navigate = useNavigate()
    const { muralId } = useParams()

    const [ murals, setMural ] = useState({})
        
    useEffect(() => {
        getSingleMural(muralId).then(data => setMural(data))
    }, [muralId])

    return (
        <body className="murals_body">
        <article className="murals">
 <section key={`mural--${murals.id}`} className="event">
                        <div >
                        {murals.title}
                            
                        </div>
                    </section>
                
            
        </article>
        </body>
    )
}
