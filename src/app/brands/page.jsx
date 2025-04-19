"use client";
import Loading from '../../components/Loading';
import { useAllBrandQuery } from '../../features/Products/productsApi';
import { BaseURL } from '../../utils/BaseURL';
import Image from 'next/image';
import React from 'react';

const Page = () => {
  const { data, isLoading } = useAllBrandQuery();

  console.log(data?.data)

  return (
    <div className="bg-[#292929]">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gray-950 h-[200px] sm:h-[340px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coverPhoto.png"
            alt="Industrial Machinery"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>
        <h3 className="relative z-10 text-3xl font-bold text-primary">
          All Brands Partners
        </h3>
      </div>

      {/* Brands Section */}
      <div className="container px-4 mx-auto py-10">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
            {
              data?.data.length === 0 ? (
                <div className="text-center text-white col-span-4">
                  No brands available
                </div>
              ) : (
                data?.data?.map((brand, index) => (
                  <div key={index} className="w-full p-4 rounded border border-primary flex items-center justify-center aspect-square"> {/* Changed to aspect-square for equal height and width */}
                    <div className="relative w-full h-40"> {/* Fixed height container */}
                      <Image
                        src={`${BaseURL}${brand?.image}`}
                        alt={`Brand ${index + 1}`}
                        fill
                        className="object-contain p-2" /* Changed to object-contain to maintain aspect ratio */
                      />
                    </div>
                  </div>
                ))
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;