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

export function HomeCarousel() {
    const [hoods, setHoods] = useState([])
    const [slides, setSlides] = useState(<SwiperSlide></SwiperSlide>)



    const getAllHoods = () => {
        getHoods().then(data => setHoods(data))
    }

    useEffect(() => {
        getAllHoods()
    }, [])

    useEffect(() => {
        if (hoods.length > 0){
        const hoodSlides = hoods.map(hood => {
            return <SwiperSlide> <img key={`event--${hood.id}`} src={"https://jenaroundtheworld.com/wp-content/uploads/2018/11/IMG_1063.jpg"} /> </SwiperSlide>
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
