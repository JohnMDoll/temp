import { useEffect, useState } from "react"
import { muralsByHood } from "../managers/murals_manager"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../assets/NASHVILLE.png"


export const HoodMurals = ({ hood_id, hood_name }) => {
    const [murals, setMurals] = useState([])

    useEffect(() => {
        muralsByHood(hood_id).then(data => setMurals(data))
    }, [])

    return <>
        <Collapsible className="murals_collapse" triggerOpenedClassName="murals_collapse"  trigger={`${hood_name} Murals`}>
            <section className="hood__cards">

                {
                    murals.map(mural =>
                        <div className="hood_card">
                            <Link to={`/murals/${mural.id}?name=${mural.title}`}>
                                <LazyLoadImage width={600} height={400} className="hood__image" src={urlReader(mural.img)} PlaceholderSrc={PlaceHolderImage} />
                            </Link>
                            <p>{mural.title}</p>
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}