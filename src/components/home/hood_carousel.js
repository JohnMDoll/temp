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

export function HomeCarousel({viewedHood, hoods, setHoods}) {
    // const [hoods, setHoods] = useState([])
    const [slides, setSlides] = useState(<SwiperSlide></SwiperSlide>)
    const [activeSlide, setActiveSlide] = useState(0)
    // const [activeHood, setActiveHood] = useState({})

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
        const thisSlide = document.getElementsByClassName('swiper-slide-active')
        console.log(thisSlide[0].id)
        const thisHood = hoods.find(h => h.id == thisSlide[0].id)
        viewedHood(thisHood)
    },[activeSlide])

    useEffect(() => {
        if (hoods.length > 0) {
            const hoodSlides = hoods.map(hood => {
                return <SwiperSlide id={hood.id} key={`event--${hood.id}`}>
                    <img src={`./media/${hood.id}.jpg`} onClick={() => navigate(`/hoods/${hood.id}`)} />
                </SwiperSlide>
            })

            setSlides(hoodSlides)
        }
    }, [hoods])

    const navigate = useNavigate()
    return (
        <>
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
                className="mySwiper"
            >

                {
                    slides
                }

            </Swiper>
        </>
    );
}
