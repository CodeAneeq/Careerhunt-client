
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./sliders.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BorderText from "../text/border-text";
import { useNavigate } from "react-router-dom";

export default function CategorySlider() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [jobs, setJobs] = useState([]);

  const navigated = (title) => {
    navigate(`/jobs-category/${title}`)
  }

  let category = [
    "MERN Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Data Scienctist",
    "Data Engineer"
  ]

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };




  return (
    <>
      <div className={`${styles.swiper_button_container} mb-3`}>
        <div className={`${styles.nav_btn}`} onClick={goPrev}>
          <FaArrowLeft />
        </div>
        <div className={`${styles.nav_btn}`} onClick={goNext}>
          <FaArrowRight />
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 5 },
          560: { slidesPerView: 2, spaceBetween: 5 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 30 },
          1200: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {category.map((item, key) => (
          <SwiperSlide key={key} className="d-flex justify-content-between">
            <div onClick={() => navigated(item)} className={`${styles.items}`}>
            <BorderText txt={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}