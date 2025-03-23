"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "../../../components/ProductCard";
import InquiryModal from "../../../components/InquiryModal";
import { useGetAllProductsQuery, useProductDetailsQuery } from "../../../features/Products/productsApi";
import { useParams } from "next/navigation";
import { BaseURL } from "../../../utils/BaseURL";
import Loading from "../../../components/Loading";

const ProductDisplay = () => {
  const params = useParams();
  const { data , isLoading:productDetailsLoading } = useProductDetailsQuery(params?.id[0]);

  

  const { data:reletedProduct, error, isLoading:reletedProductLoading } = useGetAllProductsQuery({ categoryId:  data?.data?.categoryId?._id , subCategoryId: data?.data?.subCategoryId?._id});
  

  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Guard against undefined data
  const productImages = data?.data?.images || [];
  const productName = data?.data?.name || "Product Name";
  const productPrice = data?.data?.price || "0.00";
  const productDescription = data?.data?.description || "No description available.";

  // Ensure selectedImageIndex is valid
  useEffect(() => {
    if (productImages.length > 0 && selectedImageIndex >= productImages.length) {
      setSelectedImageIndex(0);
    }
  }, [productImages, selectedImageIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close dropdown when clicking outside
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  // Get the current image with safety check
  const getCurrentImage = () => {
    if (productImages.length === 0) return null;
    return `${BaseURL}${productImages[selectedImageIndex]}`;
  };

  return (
    <div className="bg-[#292929] py-10">
      {isOpenModal && (
        <InquiryModal isOpenModal={isOpenModal} toggleModal={toggleModal} />
      )}
      <div className="container mx-auto">
        {
          productDetailsLoading ? <Loading /> : (
            <div className="w-full flex items-center justify-center p-4">
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Thumbnail selection */}
            <div className="flex flex-row md:flex-col gap-2">
              {productImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                    selectedImageIndex === index
                      ? "border-yellow-500"
                      : "border-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={`${BaseURL}${image}`}
                    alt={`Product view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Main product display */}
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex flex-col md:flex-row items-end gap-6">
                {/* Main image */}
                <motion.div
                  className="border border-primary rounded-md overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {getCurrentImage() && (
                    <Image
                      src={getCurrentImage()}
                      alt="Product"
                      width={400}
                      height={400}
                      className="p-6"
                    />
                  )}
                </motion.div>

                {/* Product info */}
                <div className="flex flex-col justify-center">
                  <motion.h1
                    className="text-white text-3xl md:text-5xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {productName}
                  </motion.h1>
                  <motion.p
                    className="text-green-400 text-2xl md:text-3xl font-semibold mt-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    ${productPrice}
                  </motion.p>
                </div>
              </div>

              {/* Product details */}
              <div className="mt-8">
                <motion.h2
                  className="text-white text-xl md:text-2xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Product details:
                </motion.h2>
                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {productDescription}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
          )
        }
        <div className="flex flex-col gap-5 py-10">
          <h3 className="text-white text-xl md:text-2xl">Related Product:</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reletedProductLoading ? <Loading /> : (reletedProduct?.data?.result?.slice(0,4)?.map((data, index) => (
              <ProductCard
                key={index}
                product={data}
                toggleModal={toggleModal}
              />
            )))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;