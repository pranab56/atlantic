// components/InquiryModal.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiryMutation } from "../features/Products/productsApi";

// Sample country data
const countries = [
  { code: "ZAF", dial: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "USA", dial: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GBR", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AUS", dial: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "CAN", dial: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "DEU", dial: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FRA", dial: "+33", name: "France", flag: "🇫🇷" },
  { code: "IND", dial: "+91", name: "India", flag: "🇮🇳" },
  { code: "CHN", dial: "+86", name: "China", flag: "🇨🇳" },
  { code: "JPN", dial: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "BGD", dial: "880", name: "Bangladesh", flag: "🇧🇩" }, // Added Bangladesh
];

const InquiryModal = ({ isOpenModal, toggleModal, productId }) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
    interests: {
      price: false,
      shipping: false,
      payment: false,
      purchase: false,
      status: false,
    },
  });

  const [Inquiry, {isLoading}] = useInquiryMutation()

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCountryDropdown = () => {
    setIsCountryDropdownOpen(!isCountryDropdownOpen);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData({
      ...formData,
      interests: {
        ...formData.interests,
        [id]: checked,
      },
    });
  };

  const handlePhoneChange = (e) => {
    // Only allow numbers and spaces
    const value = e.target.value.replace(/[^\d\s]/g, "");
    setPhoneNumber(value);
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      description: "",
      interests: {
        price: false,
        shipping: false,
        payment: false,
        purchase: false,
        status: false,
      },
    });
    setPhoneNumber("");
    setSelectedCountry(countries[0]);
  };

  // Map interest keys to their display labels
  const interestLabels = {
    price: "Price",
    shipping: "Shipping schedule",
    payment: "Payment process",
    purchase: "Purchase process",
    status: "Status of these cars"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Create selected options array matching the exact format in the sample
    const options = Object.keys(formData.interests)
      .filter(key => formData.interests[key])
      .map(key => interestLabels[key]);

    
    const finalFormData = {
      productId: productId, 
      fullName: formData.fullName,
      email: formData.email,
      options: options,
      countryCode: selectedCountry.dial.replace("+", ""), // Remove "+" to match format
      phone: phoneNumber.replace(/\s/g, ""), // Remove spaces to match format
      description: formData.description
    };


    

    try {
      // Replace with your actual API endpoint
      const response = await Inquiry(finalFormData).unwrap();
      setSubmitSuccess(true);
      resetForm();
      // Optionally close the modal after a short delay
      setTimeout(() => {
        toggleModal();
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error.response?.data?.message || 
        "An error occurred while submitting your inquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isOpenModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-200 rounded-lg w-full max-w-2xl relative overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={toggleModal}
                className="absolute right-4 top-4 text-3xl cursor-pointer"
                aria-label="Close"
              >
                ×
              </button>

              {/* Modal content */}
              <div className="p-6">
                <h2 className="text-4xl font-bold text-primary mb-6">
                  Inquiry
                </h2>

                {submitSuccess ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">Thank you!</p>
                    <p>Your inquiry has been submitted successfully. We'll contact you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {submitError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{submitError}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-gray-800 text-lg font-medium mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Samuel Jacob"
                          className="w-full px-3 py-2 bg-gray-300 rounded-md outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-800 text-lg font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="samuel@gmail.com"
                          className="w-full px-3 py-2 bg-gray-300 rounded-md outline-none"
                          required
                        />
                      </div>
                    </div>

                    <p className="text-gray-800 text-xl font-medium mb-2">
                      I want to know the
                    </p>

                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="grid grid-cols-1 w-full gap-2 mb-4">
                        {[
                          { id: "price", label: "Price" },
                          { id: "shipping", label: "Shipping schedule" },
                          { id: "payment", label: "Payment process" },
                          { id: "purchase", label: "Purchase process" },
                          { id: "status", label: "Status of these cars" },
                        ].map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center w-full"
                          >
                            <input
                              type="checkbox"
                              id={option.id}
                              checked={formData.interests[option.id]}
                              onChange={handleCheckboxChange}
                              className="w-5 h-5 mr-2"
                            />
                            <label htmlFor={option.id} className="text-gray-800">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="w-full">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Your Inquiry"
                          className="w-full h-52 px-3 py-2 bg-gray-300 rounded-md resize-none outline-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="w-full pb-3">
                      <label className="block text-gray-800 text-lg font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="flex">
                        {/* Country code selector button */}
                        <button
                          type="button"
                          onClick={toggleCountryDropdown}
                          className="bg-gray-800 flex items-center justify-between px-3 py-2 rounded-l-md cursor-pointer hover:bg-gray-700 w-[120px]"
                        >
                          <span className="text-white">
                            {selectedCountry.flag} {selectedCountry.dial}
                          </span>
                          <span className="text-white ml-1">▼</span>
                        </button>

                        {/* Phone input */}
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder="71 234 5678"
                          className="flex-1 px-3 py-2 bg-gray-300 rounded-r-md outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${
                        isSubmitting ? "bg-amber-400" : "bg-amber-500 hover:bg-amber-600"
                      } text-white font-bold py-3 px-4 rounded transition duration-200 flex justify-center items-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Country Selection Modal */}
      <AnimatePresence>
        {isCountryDropdownOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg w-full max-w-md overflow-hidden"
              ref={dropdownRef}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Select Country Code</h3>
                  <button
                    onClick={() => setIsCountryDropdownOpen(false)}
                    className="text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto p-2">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => selectCountry(country)}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center w-full border-b"
                  >
                    <span className="text-xl mr-3">{country.flag}</span>
                    <div className="flex-1">
                      <span className="font-medium">{country.name}</span>
                      <span className="block text-gray-500">{country.code}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {country.dial}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InquiryModal;