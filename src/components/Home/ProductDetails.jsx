// pages/index.js
"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const [selectedProduct, setSelectedProduct] = useState("forklift");

  const products = [
    {
      id: "forklift",
      name: "Forklift",
      price: "$488.56",
      image: "/forklift.png",
      thumbnailImage: "/forklift-thumb.png",
      description:
        "A forklift is a powerful industrial vehicle used for lifting, moving, and stacking heavy loads in warehouses, factories, and construction sites. It features a hydraulic lifting mechanism with two metal forks that slide under pallets or materials for easy transport.",
      additionalInfo:
        "Forklifts come in various types, including electric, diesel, and propane-powered models, each suited for different environments. Essential for logistics and supply chain operations, forklifts improve efficiency and safety when handling heavy goods, making them indispensable in modern material handling industries.",
    },
    {
      id: "power-utility",
      name: "POWER & UTILITY",
      price: "$348.56",
      image: "/power-utility.png",
    },
    {
      id: "road-roller",
      name: "Road Roller",
      price: "$448.56",
      image: "/road-roller.png",
    },
    {
      id: "demolition",
      name: "Demolition & Recycling",
      price: "$818.56",
      image: "/demolition.png",
    },
    {
      id: "drill",
      name: "Drill machine",
      price: "$348.56",
      image: "/drill.png",
    },
  ];

  const mainProduct = products.find((p) => p.id === selectedProduct);
  const relatedProducts = products.filter((p) => p.id !== selectedProduct);

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <Head>
        <title>Industrial Equipment - {mainProduct.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {/* Product Thumbnails */}
          <div className="flex flex-col space-y-4">
            {products.slice(0, 3).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border rounded-lg p-2 cursor-pointer ${
                  selectedProduct === product.id
                    ? "border-yellow-500"
                    : "border-gray-700"
                }`}
                onClick={() => setSelectedProduct(product.id)}
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={product.thumbnailImage || product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Product Image */}
          <motion.div
            className="relative h-64 col-span-2 p-4 border border-gray-700 rounded-lg md:h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={mainProduct.image}
                alt={mainProduct.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="absolute flex items-center justify-between bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold">{mainProduct.name}</h2>
              <span className="font-bold text-green-400">
                {mainProduct.price}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-2 text-xl font-bold">Product details:</h3>
          <p className="mb-4 text-gray-300">{mainProduct.description}</p>
          <p className="text-gray-300">{mainProduct.additionalInfo}</p>
        </motion.div>

        {/* Related Products */}
        <div>
          <h3 className="mb-4 text-xl font-bold">Related Product:</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="overflow-hidden bg-gray-800 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold">{product.name}</h4>
                  <p className="font-bold text-gray-300">{product.price}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <span className="mr-2">PC-048</span>
                    <span className="flex items-center mr-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      2.0 period
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                      200kW+
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 mt-4 text-sm font-bold text-white bg-yellow-600 rounded-md"
                  >
                    Inquire Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
