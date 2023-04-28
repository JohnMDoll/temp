import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { urlReader } from "../../utils/urlReader"
import Collapsible from "react-collapsible"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { restaurantsByHood } from "../managers/restaurants_manager"
import PlaceHolderImage from "../../assets/RESTAURANTS.png"



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

    const imageDisplay = (restaurantObject) => {
        const image = restaurantObject.img
        if (image !== false) {
            return <>
                <Link to={`/restaurants/${restaurantObject.id}?name=${restaurantObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={image} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p>{restaurantObject.title}</p>
            </>            
        } else {
            return <>
                <Link to={`/restaurants/${restaurantObject.id}?name=${restaurantObject.title}`}>
                    <LazyLoadImage width={600} height={400} className="hood__image" src={PlaceHolderImage} PlaceholderSrc={PlaceHolderImage} />
                </Link>
                <p>{restaurantObject.title}</p>
            </>
        }
    }

    return <>
        <Collapsible className="restaurants_collapse" triggerOpenedClassName="restaurants_collapse" trigger={`${hood_name} Restaurants`}>
            <section className="hood__cards">

                {
                    restaurants.map(restaurant =>
                        <div key={`hoodRaunt--${restaurant.id}`} className="hood_card">
                            {
                                imageDisplay(restaurant)
                            }
                        </div>
                    )
                }
            </section>
        </Collapsible>
    </>
}