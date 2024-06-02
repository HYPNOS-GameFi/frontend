"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRef } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

export function Carousel({ children }: CarouselProps) {
  const swiperRef = useRef<any>(null);

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -bottom-20 left-0 right-0 z-50 flex justify-center mb-4">
        {children.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full focus:outline-none ${
              index === swiperRef.current?.activeIndex
                ? "bg-yellow-500"
                : "bg-gray-300"
            }`}
            onClick={() => handleBulletClick(index)}
          />
        ))}
      </div>
      <Swiper
        grabCursor={true}
        slidesPerView={2}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        centeredSlidesBounds
        centeredSlides
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
