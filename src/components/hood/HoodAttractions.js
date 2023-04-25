import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { attractionsByHood } from "../managers/attractions_manager"
import { LazyLoadImage } from "react-lazy-load-image-component";


export const HoodAttractions = ({ hood_id, hood_name }) => {
    const [attractions, setAttractions] = useState([])

    useEffect(() => {
        attractionsByHood(hood_id).then(data => {
            data.map(each => {
                return each.img = urlReader(each.img)
            })
            setAttractions(data)
        }
        )
    }, [])

    return <>
        <Collapsible className="attractions_collapse" trigger={`${hood_name} Attractions`}>
            <section className="hood__cards">
                {
                    attractions.map(attraction =>
                        <div className="hood_card">
                            <Link to={`/attractions/${attraction.id}?name=${attraction.title}`}> <LazyLoadImage className="hood__image" src={attraction.img} /> </Link>
                            <p>{attraction.title}</p>
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}