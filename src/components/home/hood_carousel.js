import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { getHoods } from "../managers/hoods_manager";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./carousel.css";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

export function HomeCarousel({ activeHood, viewedHood, hoods, setHoods }) {
    const [slides, setSlides] = useState(<SwiperSlide></SwiperSlide>)
    const [activeSlide, setActiveSlide] = useState(0)

    const getAllHoods = () => {
        getHoods().then(data => setHoods(data))
    }

    useEffect(() => {
        getAllHoods()
    }, [])

    useEffect(() => {
        viewedHood(hoods[0])
    }, [hoods])

    useEffect(() => {
        //Actually, now that we've done this, since the hoods indexes and the slides indexes are the same, 
        //we could've just set thisHood = hoods[activeSlide] instead of doing the getElements thing
        //const thisHood = hoods[activeSlide]
        //or just:
        //viewedHood(hoods[activeSlide])
        const thisSlide = document.getElementsByClassName('swiper-slide-active')
        const thisHood = hoods.find(h => h.id == thisSlide[0].id)
        viewedHood(thisHood)
    }, [activeSlide])

    useEffect(() => {
        if (hoods.length > 0) {
            const hoodSlides = hoods.map(hood => {
                return (
                    <SwiperSlide id={hood.id} title={`${hood.name}`} key={`event--${hood.id}`}>
                        <img src={`./media/${hood.id}.png`} onClick={() => {
                            if (hood.id === activeHood.id) {
                                navigate(`/hood/?name=${hood.name}&id=${hood.id}`)
                            }
                        }} />
                    </SwiperSlide>
                )
            })
            setSlides(hoodSlides)
        }
    }, [hoods, activeHood])

    const navigate = useNavigate()

    return (
        <>  {activeHood &&
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                onTransitionEnd={(swiper) => setActiveSlide(swiper.realIndex)}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                initialSlide={hoods.findIndex(hood => hood.id === activeHood.id) !== -1 ? hoods.findIndex(hood => hood.id === activeHood.id) : 0}
                className="mySwiper"
            >

                {
                    slides
                }

            </Swiper>
        }</>
    );
}
