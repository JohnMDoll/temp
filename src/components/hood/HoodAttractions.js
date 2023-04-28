import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { attractionsByHood } from "../managers/attractions_manager"
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceHolderImage from "../../assets/ATTRACTIONS.png"


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

    const imageDisplay = (attractionObject) => {
        const image = attractionObject.img
        if (image !== false) {
            return <>
                <Link to={`/attractions/${attractionObject.id}?name=${attractionObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={image} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p>{attractionObject.title}</p>
            </>            
        } else {
            return <>
                <Link to={`/attractions/${attractionObject.id}?name=${attractionObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={PlaceHolderImage} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p>{attractionObject.title}</p>
            </>
        }
    }

    return <>
        <Collapsible className="attractions_collapse" triggerOpenedClassName="attractions_collapse" trigger={`${hood_name} Attractions`}>
            <section className="hood__cards">
                {
                    attractions.map(attraction =>
                        <div className="hood_card">
                            {
                                imageDisplay(attraction)
                            }
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}