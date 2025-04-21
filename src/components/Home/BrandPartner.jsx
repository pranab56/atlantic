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
  const [isHoveringBrand, setIsHoveringBrand] = useState(false);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const t = useTranslations("homePage");

  const { data, isLoading } = useAllBrandQuery();
  const brands = data?.data || [];

  // Auto-scroll logic
  const autoScroll = useCallback(() => {
    if (!carouselRef.current || isDragging || isHoveringBrand || brands.length === 0) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const carousel = carouselRef.current;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (carousel.scrollLeft >= maxScroll - 1) {
      carousel.scrollTo({ left: 0, behavior: 'instant' });
    } else {
      const scrollAmount = 1;
      carousel.scrollBy({ left: scrollAmount, behavior: 'auto' });
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isDragging, isHoveringBrand, brands.length]);

  // Handle drag events
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
    cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    // Only resume auto-scroll when the mouse moves and we're not hovering over a brand
    // Don't restart auto-scroll if we're still hovering over a brand
    
    if (isDragging) {
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startX) * 2;
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (!isHoveringBrand) {
      autoScroll();
    }
  }, [autoScroll, isHoveringBrand]);

  // Function to handle brand mouse leave
  const handleBrandMouseLeave = useCallback(() => {
    setIsHoveringBrand(false);
    autoScroll(); // Restart auto-scroll when leaving a brand
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
            <div className="animate-pulse flex space-x-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 w-32 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-12 bg-[#292929]">
      <div className="container px-2 mx-auto">
        <h2 className="mb-12 text-4xl flex flex-wrap gap-2 justify-center font-bold text-center">
          <span className="text-white">{t("brandSection.title1")}</span>
          <span className="text-amber-500">{t("brandSection.title2")}</span>
          <span className="text-white">{t("brandSection.title3")}</span>
        </h2>

        <div
          ref={carouselRef}
          className="relative flex overflow-hidden select-none scroll-smooth py-4"
          style={{ scrollBehavior: 'smooth' }}
          onMouseMove={handleMouseMove}
        >
          <div className="flex items-center">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="brand-item flex-shrink-0 mx-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setIsHoveringBrand(true)}
                onMouseLeave={handleBrandMouseLeave}
              >
                <a 
                  href={brand.brandUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center"
                >
                  <div className="p-4 bg-gray-800 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300">
                    <div className="relative w-32 h-16">
                      <Image
                        src={`${BaseURL}${brand.image}`}
                        alt={`${brand.name || brand._id} logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain cursor-pointer"
                        style={{ filter: "grayscale(30%)" }}
                      />
                    </div>
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