import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { attractionsByHood } from "../managers/attractions_manager"

export const HoodAttractions = ({ hood_id, hood_name }) => {
    const [attractions, setAttractions] = useState([])

    useEffect(() => {
        attractionsByHood(hood_id).then(data => {
            data.map(each => {
                // if (each.img != null) {
                    return each.img = urlReader(each.img)
                // }
                })
                setAttractions(data)
        }
        )
    }, [])

    return <>
        <Collapsible className="hood_collapse" trigger={`${hood_name} Attractions`}>
            {
                attractions.map(attraction => <Link to={`/attractions/${attraction.id}?name=${attraction.title}`}> <img className="hood__image" src={attraction.img} /> </Link>)
            }
        </Collapsible>
    </>
}