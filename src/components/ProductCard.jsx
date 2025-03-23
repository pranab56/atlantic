import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BaseURL } from "../utils/BaseURL";

const ProductCard = ({
  toggleModal,
  handleProductDetails,
  handleInquiredProductId,
  productId,
  product
}) => {
  // Check if product and images exist before accessing
  const imageUrl = product && product.images && product.images.length > 0 
    ? `${BaseURL}${product.images[0]}` 
    : "/placeholder-image.jpg"; // Provide a fallback image

  return (
    <div 
      className="w-full bg-gray-800 overflow-hidden rounded-lg shadow-lg relative cursor-pointer"
      onClick={() => handleProductDetails(productId)}
    >
      {/* Diagonal Yellow Section */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden z-0">
        <div className="w-full h-full bg-yellow-400 transform -rotate-45 origin-top-left scale-125"></div>
      </div>

      {/* Product Image */}
      <div className="relative z-10 h-64 px-4 pt-4 flex items-center justify-center">
        {product ? (
          <Image
            src={product.images.length === 0 
              ? "https://i.ibb.co.com/gZgXVvtQ/image-82-1-removebg-preview-1.png" 
              : `${BaseURL}${product?.images[0]}`
            }
            alt={product?.title || "Product image"}
            width={220}
            height={220}
            className="max-h-full max-w-full object-contain"
            unoptimized={imageUrl.startsWith("http")} // Add this for external images
          />
        ) : (
          <div className="w-220 h-220 flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="relative z-10 p-4 text-white">
        <h2 className="text-3xl font-medium">{product?.name || "Product Title"}</h2>
        <p className="text-3xl font-bold mt-1">${product?.price || "0.00"}</p>

        {/* Product Specs */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span>{product?.model || "N/A"}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span>{product?.capacity || "N/A"}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
            <span>{product?.power || "N/A"}</span>
          </div>
        </div>

        {/* Call to Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event from firing
            toggleModal();
            handleInquiredProductId(productId);
          }}
          className="w-full cursor-pointer bg-gray-800 border border-yellow-400 text-yellow-400 font-bold py-3 mt-4 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;