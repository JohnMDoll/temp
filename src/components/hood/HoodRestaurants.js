import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { restaurantsByHood } from "../managers/restaurants_manager"


export const HoodRestaurants = ({ hood_id, hood_name }) => {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        restaurantsByHood(hood_id).then(data => {
            data.map(each => {
                return each.img = urlReader(each.img)
            })
            setRestaurants(data)
        }
        )
    }, [])

    return <>
        <Collapsible className="restaurants_collapse" triggerOpenedClassName="restaurants_collapse" trigger={`${hood_name} Restaurants`}>
            <section className="hood__cards">

                {
                    restaurants.map(restaurant =>
                        <div className="hood_card">
                            <Link to={`/restaurants/${restaurant.id}?name=${restaurant.title}`}> <LazyLoadImage className="hood__image" src={restaurant.img} />
                            </Link>
                            <p>{restaurant.title}</p>
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}