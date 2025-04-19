"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAllBrandQuery } from "../../features/Products/productsApi";
import { BaseURL } from "../../utils/BaseURL";

const BrandPartner = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const t = useTranslations("homePage");

  const { data, isLoading } = useAllBrandQuery();
  const brands = data?.data || [];

  // Auto-scroll logic
  const autoScroll = useCallback(() => {
    if (!carouselRef.current || isDragging || brands.length === 0) return;

    const carousel = carouselRef.current;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (carousel.scrollLeft >= maxScroll - 1) {
      carousel.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      const scrollAmount = 1;
      carousel.scrollBy({ left: scrollAmount, behavior: 'auto' });
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isDragging, brands.length]);

  // Handle drag events
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
    cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    autoScroll();
  }, [autoScroll]);

  // Initialize and clean up
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || brands.length === 0) return;

    // Clone first few items for seamless infinite scroll
    const items = carousel.querySelectorAll('.brand-item');
    if (items.length > 0) {
      const cloneCount = Math.min(5, items.length);
      for (let i = 0; i < cloneCount; i++) {
        const clone = items[i].cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        carousel.appendChild(clone);
      }
    }

    autoScroll();

    // Add event listeners
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationRef.current);
      carousel.removeEventListener('mousedown', handleMouseDown);
      carousel.removeEventListener('mousemove', handleMouseMove);
      carousel.removeEventListener('mouseup', handleMouseUp);
      carousel.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, autoScroll, brands]);

  if (isLoading) {
    return (
      <div className="w-full pb-8 bg-[#292929]">
        <div className="container px-2 mx-auto">
          <h2 className="mb-12 text-4xl flex gap-2 justify-center font-bold text-center">
            <span className="text-white">{t("brandSection.title1")}</span>
            <span className="text-amber-500">{t("brandSection.title2")}</span>
            <span className="text-white">{t("brandSection.title3")}</span>
          </h2>
          <div className="flex justify-center">
            <p className="text-white">Loading brands...</p>
          </div>
        </div>
      </div>
    );
  }

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
          className="relative flex overflow-hidden select-none scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="brand-item min-w-[145px] mx-4 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <a 
                  href={brand.brandUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center"
                >
                  <div className="p-2 rounded-full">
                    <Image
                      src={`${BaseURL}${brand.image}`}
                      alt={`${brand._id} logo`}
                      width={120}
                      height={80}
                      className="object-contain cursor-pointer h-20 w-auto"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPartner;