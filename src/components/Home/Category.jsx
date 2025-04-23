"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../ProductCard";
import InquiryModal from "../InquiryModal";
import { useRouter } from "next/navigation";
import {
  useGetAllProductsQuery,
  useCategoryQuery,
  useSubCategoryQuery,
} from "../../features/Products/productsApi";
import Loading from "../Loading";
import { useTranslations } from "next-intl";

const Category = () => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const t = useTranslations("homePage");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const [productId, setProductId] = useState("");
  
  const { data: category, isLoading: categoryLoading, error: categoryError } = useCategoryQuery();
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const { data: subCategory, isLoading: subCategoryLoading } = useSubCategoryQuery(selectedCategoryId);

  const { 
    data: products, 
    isLoading: productsLoading,
    isFetching: productsFetching
  } = useGetAllProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
    categoryId: selectedCategoryId || undefined,
    subCategoryId: selectedSubCategoryId || undefined
  });

  // Category dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(t("categorySection.categoryDropdownName"));
  const categoryDropdownRef = useRef(null);

  // Subcategory dropdown states
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(t("categorySection.subcategory"));
  const subcategoryDropdownRef = useRef(null);

  // Loading state
  const isLoading = productsLoading || productsFetching || categoryLoading || (selectedCategoryId && subCategoryLoading);

  // Update total items when products data changes
  useEffect(() => {
    if (products?.data) {
      if (typeof products.data.total === 'number') {
        setTotalItems(products.data.total);
      } else if (Array.isArray(products.data.result)) {
        setTotalItems(products.data.result.length);
      } else {
        setTotalItems(0);
      }
    }
  }, [products]);

  // Toggle functions
  const toggleCategoryDropdown = () => setIsCategoryOpen((prev) => !prev);
  const toggleSubcategoryDropdown = () => {
    if (selectedCategory !== t("categorySection.categoryDropdownName")) {
      setIsSubcategoryOpen((prev) => !prev);
    }
  };

  const handleProductDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const handleCategorySelect = (category) => {
    if (category === "All") {
      setSelectedCategory(t("categorySection.categoryDropdownName"));
      setSelectedCategoryId(null);
      setSelectedSubcategory(t("categorySection.subcategory"));
      setSelectedSubCategoryId(null);
    } else {
      setSelectedCategory(category.name);
      setSelectedCategoryId(category._id);
      setSelectedSubcategory(t("categorySection.subcategory"));
      setSelectedSubCategoryId(null);
    }
    setCurrentPage(1);
    setIsCategoryOpen(false);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory.name);
    setSelectedSubCategoryId(subcategory._id);
    setCurrentPage(1);
    setIsSubcategoryOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (subcategoryDropdownRef.current && !subcategoryDropdownRef.current.contains(event.target)) {
        setIsSubcategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const productsGrid = document.getElementById("products-grid");
    if (productsGrid) {
      window.scrollTo({
        top: productsGrid.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const getPageNumbers = () => {
    const totalPageNumbers = 5;
    const maxPagesBeforeCurrentPage = Math.floor(totalPageNumbers / 2);

    let startPage = Math.max(1, currentPage - maxPagesBeforeCurrentPage);
    let endPage = startPage + totalPageNumbers - 1;

    if (endPage > products?.data?.meta?.totalPage) {
      endPage = products?.data?.meta?.totalPage;
      startPage = Math.max(1, endPage - totalPageNumbers + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const isSubcategoryDisabled = !selectedCategoryId;
  const currentProducts = Array.isArray(products?.data?.result) ? products.data.result : [];
  const categories = Array.isArray(category?.data?.result) ? category.data.result : [];
  const subCategories = Array.isArray(subCategory?.data?.result) ? subCategory.data.result : [];

  const handleInquiredProductId = (id) => {
    setProductId(id);
  };

  return (
    <div className="w-full py-12 bg-[#292929]">
      {isOpenModal && (
        <InquiryModal productId={productId} isOpenModal={isOpenModal} toggleModal={toggleModal} />
      )}
      <div className="container flex flex-col gap-5 px-4 mx-auto">
        <div className="w-full py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-2 text-amber-500 font-medium mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-500"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              <span>{t("categorySection.titlePrimary")}</span>
            </div>
            <h1 className="text-white text-2xl font-bold">
              {t("categorySection.titleSecondary1")}{" "}
              <span className="text-amber-500">{t("categorySection.titleSecondary2")}</span> {t("categorySection.titleSecondary3")}
            </h1>
          </div>

          {/* Dropdowns Container */}
          <div className="w-full md:w-[500px] flex flex-col sm:flex-row gap-3">
            {/* Category Dropdown */}
            <div className="relative w-full" ref={categoryDropdownRef}>
              <button
                onClick={toggleCategoryDropdown}
                disabled={categoryLoading}
                className={`flex items-center justify-between w-full px-4 py-3 cursor-pointer text-sm text-white bg-[#181818] rounded focus:outline-none ${categoryLoading ? 'opacity-70' : ''}`}
              >
                {categoryLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-white rounded-full mr-2"></span>
                    Loading...
                  </span>
                ) : (
                  <span>{selectedCategory}</span>
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1 bg-[#393939] border border-gray-800 rounded shadow-lg max-h-60 overflow-y-auto"
                  >
                    <div className="py-1">
                      <motion.button
                        onClick={() => handleCategorySelect("All")}
                        className="block w-full px-4 py-3 text-left text-sm text-white focus:outline-none"
                        whileHover={{
                          backgroundColor: "rgba(75, 85, 99, 0.5)",
                        }}
                        transition={{ duration: 0.1 }}
                      >
                        {t("categorySection.categoryDropdownValue")}
                      </motion.button>
                      {categories.map((cat) => (
                        <motion.button
                          key={cat._id}
                          onClick={() => handleCategorySelect(cat)}
                          className="block w-full px-4 py-3 text-left text-sm text-white focus:outline-none"
                          whileHover={{
                            backgroundColor: "rgba(75, 85, 99, 0.5)",
                          }}
                          transition={{ duration: 0.1 }}
                        >
                          {cat.name}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subcategory Dropdown */}
            <div className="relative w-full" ref={subcategoryDropdownRef}>
              <button
                onClick={toggleSubcategoryDropdown}
                disabled={isSubcategoryDisabled || subCategoryLoading}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm text-white rounded focus:outline-none ${
                  isSubcategoryDisabled
                    ? "bg-gray-700 cursor-not-allowed opacity-60"
                    : subCategoryLoading
                    ? "bg-[#181818] cursor-wait opacity-70"
                    : "bg-[#181818] cursor-pointer"
                }`}
              >
                {selectedCategoryId && subCategoryLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-white rounded-full mr-2"></span>
                    Loading...
                  </span>
                ) : (
                  <span>{selectedSubcategory}</span>
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSubcategoryOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isSubcategoryOpen && !isSubcategoryDisabled && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full mt-1 bg-[#393939] border border-gray-800 rounded shadow-lg max-h-60 overflow-y-auto"
                  >
                    <div className="py-1">
                      {subCategories.length > 0 ? (
                        subCategories.map((subcategory) => (
                          <motion.button
                            key={subcategory._id}
                            onClick={() => handleSubcategorySelect(subcategory)}
                            className="block w-full px-4 py-3 text-left text-sm text-white focus:outline-none"
                            whileHover={{
                              backgroundColor: "rgba(75, 85, 99, 0.5)",
                            }}
                            transition={{ duration: 0.1 }}
                          >
                            {subcategory.name}
                          </motion.button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-400">
                          No subcategories available
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Filter status */}
        <div className="text-white">
          {isLoading ? (
            <div className="flex items-center">
              <span className="animate-spin inline-block h-4 w-4 border-t-2 border-amber-500 rounded-full mr-2"></span>
              Loading products...
            </div>
          ) : (
            <>
              {t("categorySection.showing")} {currentProducts.length} {t("categorySection.of")} {totalItems}{" "}
              {t("categorySection.products")}
              {selectedCategory !== t("categorySection.categoryDropdownName") && (
                <span>
                  {" "}
                  in <span className="text-amber-500">{selectedCategory}</span>
                </span>
              )}
              {selectedSubcategory !== t("categorySection.subcategory") && (
                <span>
                  {" "}
                  / <span className="text-amber-500">{selectedSubcategory}</span>
                </span>
              )}
            </>
          )}
        </div>

        {/* Products grid */}
        <div
          id="products-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {isLoading ? (
            <div className="col-span-full">
              <Loading />
            </div>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                handleInquiredProductId={handleInquiredProductId}
                productId={product._id}
                key={product._id}
                product={product}
                toggleModal={toggleModal}
                handleProductDetails={handleProductDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-white bg-[#181818] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-500"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-400">
                Try changing your filter criteria
              </p>
            </div>
          )}
        </div>

        {!isLoading && products?.data?.meta?.totalPage && (
          <div className="flex justify-end items-center mt-8">
            <div className="flex items-center gap-2">
              {/* First page button */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${
                    currentPage === 1
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-white hover:bg-gray-800"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="11 17 6 12 11 7"></polyline>
                  <polyline points="18 17 13 12 18 7"></polyline>
                </svg>
              </button>

              {/* Previous page button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${
                    currentPage === 1
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-white hover:bg-gray-800"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? "bg-amber-500 text-black font-medium"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next page button */}
              <button
                onClick={() =>
                  handlePageChange(Math.min(products?.data?.meta?.totalPage, currentPage + 1))
                }
                disabled={currentPage === products?.data?.meta?.totalPage}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${
                    currentPage === products?.data?.meta?.totalPage
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-white hover:bg-gray-800"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

              {/* Last page button */}
              <button
                onClick={() => handlePageChange(products?.data?.meta?.totalPage)}
                disabled={currentPage === products?.data?.meta?.totalPage}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
                  ${
                    currentPage === products?.data?.meta?.totalPage
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-white hover:bg-gray-800"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="13 17 18 12 13 7"></polyline>
                  <polyline points="6 17 11 12 6 7"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;