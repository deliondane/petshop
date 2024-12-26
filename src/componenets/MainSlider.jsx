import React, { useState, useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { RiPauseMiniFill, RiPlayMiniFill } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import data from "../data/data";

const MainSlider = () => {
  const [swiperIndex, setSwiperIndex] = useState(0); //페이지네이션
  const [swiper, setSwiper] = useState(null); //슬라이드용
  const [textswiperIndex, setTextSwiperIndex] = useState(0); //텍스트 슬라이드용
  const [textswiper, setTextSwiper] = useState(null); //텍스트 슬라이드용 swiper
  const [bgColor, setBgColor] = useState(); //배경색
  const swiperRef = useRef(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false); //제어버튼
  const [isActive, setIsActive] = useState(false); //active button

  const prev = () => {
    swiper?.slidePrev();
    textswiper?.slidePrev();
    setIsAutoplayPaused(true);
  };
  const next = () => {
    swiper?.slideNext();
    textswiper?.slideNext();
    setIsAutoplayPaused(false);
  };

  const autoPlayToggle = () => {
    if (swiper && swiper.autoplay && textswiper && textswiper.autoplay) {
      if (swiper.autoplay.running && textswiper.autoplay.running) {
        textswiper.autoplay.stop();
        swiper.autoplay.stop();
      }
    } else {
      textswiper.autoplay.start();
      swiper.autoplay.start();
    }
    setIsActive(!isActive);
  };

  return (
    <div className={`mySwiper mainslider`} style={{ background: bgColor }}>
      <div className="cont">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          speed={1500}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          onSwiper={(swiper) => {
            setTextSwiper(swiper);
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          className="textSlide"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tit_wrap">
                <em>{item.textT}</em>
                <strong>{item.textbold}</strong>
                <a href={item.textLink}>자세히 보기</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="img_wrap">
        <Swiper
          className="mainSwiper"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={"auto"}
          speed={1500}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          onSwiper={(swiper) => {
            setSwiper(swiper);
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(e) => setSwiperIndex(e.realIndex)}
          onSlideChange={(e) => {
            const realIndex = e.realIndex;
            const bgColors = [
              "rgba(134, 167, 136,.4)",
              "rgb(255, 253, 236)",
              "rgb(255, 226, 226)",
            ];
            setBgColor(bgColors[realIndex]);
            const progressBar = document.querySelector(".fill");
            const progressWidth = ((realIndex + 1) / data.length) * 100;

            if (realIndex === 0 && e.activeIndex !== 0) {
              progressBar.style.transition = "none";
              progressBar.style.width = "0%";

              setTimeout(() => {
                progressBar.style.transition = "width .3s ease";
              }, 50);
              if (e.activeIndex !== 0) {
                progressBar.style.transition = "width .3s ease";
                progressBar.style.width = `${progressWidth}%`;
              }
            } else {
              progressBar.style.width = `${progressWidth}%`;
            }
            setSwiperIndex(realIndex);
          }}
          // onReachEnd={() => {
          //   document.querySelector('.fill').style.width = `0%`;
          //   setSwiperIndex(0);
          // }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={process.env.PUBLIC_URL + item.img} alt={item.textT} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="page_box">
        <div className="page">
          <div className="swiper_progress_bar">
            <div className="slider-bar">
              <div className="fill"></div>
            </div>
          </div>
          <div className="swiper_pagination">
            <span>0{swiperIndex + 1}</span>
            <span> / </span>
            <span> 0{data.length}</span>
          </div>
          <div className="swiper_btn">
            <div className="swiperPrevBtn" onClick={prev}>
              <GrFormPreviousLink />
            </div>
            <div className="btn_auto">
              <div
                className="btn_pause"
                onClick={() => {
                  autoPlayToggle();
                }}
              >
                {isActive ? <RiPlayMiniFill /> : <RiPauseMiniFill />}
              </div>
            </div>
            <div className="swiperNextBtn" onClick={next}>
              <GrFormNextLink />
            </div>
          </div>
        </div>
      </div>
      {/* <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={
          {
            delay: 2500,
            disableOnInteraction: false,
          }
        }
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/img/slider01.jpg'} alt="mainImg1" /></SwiperSlide>
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/img/slider02.png'} alt="mainImg2" /></SwiperSlide>
        <SwiperSlide><img src={process.env.PUBLIC_URL + '/img/slider03.jpg'} alt="mainImg3" /></SwiperSlide>
      </Swiper> */}
    </div>
  );
};

export default MainSlider;
