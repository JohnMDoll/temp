import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { getMurals } from "../managers/murals_manager";
import { API } from "../managers/ApiAddresses";
import "./murals.css"
import { urlReader } from "../../utils/urlReader";

export const MuralsList = (props) => {
    const navigate = useNavigate()
    const [ murals, setMurals ] = useState([])
    let offsetDistance = (document.getElementsByClassName('navbar-dark')[0]?.offsetHeight + 5)
    
    useEffect(() => {
        getMurals().then(data => setMurals(data))
    }, [])
    
    
    return (
        // <div className="murals_list">
        <article className="murals"
            style={{'marginTop': offsetDistance+'px'}}>
            {
                murals.map(mural => {
                    return <section key={`mural--${mural.id}`} className="event">
                        {/* <div className="mural__name"> {mural.title}</div> */}
                        {/* <div className="mural__location"> Location: {mural.address} </div> */}
                        <Link
                            to={`/murals/${mural.id}?name=${mural.title}`}
                            title='Click for mural detail page'
                            className="link_styles">
                        <img className="mural__img" src={urlReader(mural.img)}/>
                        </Link>
                    </section>
                })
            }
        </article>
        // </div>
    )
}