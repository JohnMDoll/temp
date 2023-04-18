import { useEffect, useState } from "react"
import { HomeCarousel } from "./hood_carousel"
import { Map } from "./map"
import { youarehere } from "../../utils/UserLocation"


export const Home = () => {
    const location = JSON.parse(localStorage.getItem('userLocation'))
    const [activeHood, setActiveHood] = useState({})
    const [hoods, setHoods] = useState([])

    const closestHood = () => {
        const hoodsArr = [...hoods]
        const closestHood = hoodsArr.reduce((closest, current) => {
            const distance = Math.sqrt(
                (current.center_latitude - location[0]) ** 2 +
                (current.center_longitude - location[1]) ** 2
            );
            return distance < closest.distance ? { hood: current, distance } : closest;
        }, { hood: null, distance: Infinity });
        //TODO: need to modify the data structure/type returned by the reducer to match map needs for initial map center and to tell the carousel which slide should be initially active
        if (closestHood.hood) {
            setActiveHood(closestHood.hood);
        }
    }

    useEffect(() => {
        youarehere()
        if (location) {
            closestHood()
        }
    }, [hoods]
    )

    return (<>
        <HomeCarousel hoods={hoods} setHoods={setHoods} activeHood={activeHood} viewedHood={setActiveHood} />
        <Map activeHood={activeHood} />
    </>)
}