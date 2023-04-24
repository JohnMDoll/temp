import { useEffect, useState } from "react"
import { muralsByHood } from "../managers/murals_manager"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"

export const HoodMurals = ({ hood_id, hood_name }) => {
    const [murals, setMurals] = useState([])

    useEffect(() => {
        muralsByHood(hood_id).then(data => setMurals(data))
    }, [])

    return <>
        <Collapsible className="hood_collapse" trigger={`${hood_name} Murals`}>

            {
                murals.map(mural => <Link to={`/murals/${mural.id}?name=${mural.title}`}> <img className="hood__image" src={urlReader(mural.img)} /> </Link>)
            }
        </Collapsible>
    </>
}