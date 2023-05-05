import { useEffect, useState } from "react"
import { muralsByHood } from "../managers/murals_manager"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../assets/MURALS.png"


export const HoodMurals = ({ hood_id, hood_name, defaultOpen }) => {
    const [murals, setMurals] = useState([])

    useEffect(() => {
        muralsByHood(hood_id).then(data => setMurals(data))
    }, [])

    // urlReader(mural.img)

    const imageDisplay = (muralObject) => {
        const image = urlReader(muralObject.img)
        if (image !== false) {
            return <>
                <Link to={`/murals/${muralObject.id}?name=${muralObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={image} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p className="truncate">{muralObject.title}</p>
            </>            
        } else {
            return <>
                <Link to={`/murals/${muralObject.id}?name=${muralObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={PlaceHolderImage} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p className="truncate">{muralObject.title}</p>
            </>
        }
    }

    return <>
        <Collapsible className="murals_collapse" triggerOpenedClassName="murals_collapse" open={defaultOpen} trigger={`${hood_name} Murals`}>
            <section className="hood__cards">

                {
                    murals.map(mural =>
                        <div key={`hoodMural--${mural.id}`} className="hood_card">
                            {
                                imageDisplay(mural)
                            }
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}