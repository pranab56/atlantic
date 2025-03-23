"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BrandPartner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const t = useTranslations("homePage");

  const brandLogos = [
    { id: 1, name: "Company 1", src: "/icons/machine1.png" },
    { id: 2, name: "Company 2", src: "/icons/machine2.png" },
    { id: 3, name: "Hoffman's", src: "/icons/machine1.png" },
    { id: 4, name: "Company 4", src: "/icons/machine2.png" },
    { id: 5, name: "Company 5", src: "/icons/machine1.png" },
    { id: 6, name: "Company 6", src: "/icons/machine2.png" },
    { id: 7, name: "Company 7", src: "/icons/machine1.png" },
    { id: 8, name: "Company 8", src: "/icons/machine2.png" },
    { id: 9, name: "Hoffman's 2", src: "/icons/machine1.png" },
    { id: 10, name: "Company 10", src: "/icons/machine2.png" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brandLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [brandLogos.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * 150, // Adjust based on image size
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.clientX;
    const move = (x - startX) * 2; // Adjust the speed here

    // Update the scroll position smoothly without jumping
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - move;
    }
  };

  // Bind mouse events directly to the carousel container
  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (carouselElement) {
      carouselElement.addEventListener("mousedown", handleMouseDown);
      carouselElement.addEventListener("mouseleave", handleMouseLeave);
      carouselElement.addEventListener("mouseup", handleMouseUp);
      carouselElement.addEventListener("mousemove", handleMouseMove);

      return () => {
        carouselElement.removeEventListener("mousedown", handleMouseDown);
        carouselElement.removeEventListener("mouseleave", handleMouseLeave);
        carouselElement.removeEventListener("mouseup", handleMouseUp);
        carouselElement.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <div className="w-full pb-8 bg-[#292929]">
      <div className="container px-2 mx-auto">
        <h2 className="mb-12 text-4xl flex gap-2 justify-center font-bold text-center">
          <span className="text-white">{t("brandSection.title1")}</span>
          <span className="text-amber-500">{t("brandSection.title2")}</span>
          <span className="text-white">{t("brandSection.title3")}</span>
        </h2>

        <div
          ref={carouselRef}
          className="relative flex overflow-hidden  select-none"
        >
          <div className="flex w-full">
            {[...brandLogos, ...brandLogos].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="min-w-[145px] mx-4 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <div className="p-2">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={500}
                      height={500}
                      className="object-contain cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPartner;
