"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useContactMutation } from "../../features/Products/productsApi";

const Contact = () => {
  const t = useTranslations("homePage");
  const [contact, { isLoading }] = useContactMutation();
  
  // Form state - updated to match API structure
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    description: ""
  });

  // Form error state
  const [errors, setErrors] = useState({});
  
  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  // Validate form - updated to match correct field names
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    return newErrors;
  };
  
  // Handle form submission
  const handleForm = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      const response = await contact(formData).unwrap();
      console.log(response);

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        description: ""
      });
      
      // Show success message
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "Failed to submit the form. Please try again."
      });
    }
  };

  return (
    <div className="bg-[#292929] text-white py-16 px-4">
      <h2 className="container mb-4 ml-4 text-3xl font-bold text-center text-yellow-500">
        {t("contactSection.titlePrimary")}
      </h2>
      <div className="container flex flex-col gap-12 mx-auto lg:flex-row">
        {/* Left Section */}
        <div className="flex flex-col justify-center lg:w-1/3">
          <p className="mb-6 text-2xl font-semibold">
            {t("contactSection.titleSecondary")}
          </p>
          <h4 className="mb-4 text-lg font-semibold">{t("contactSection.titleTertiary")}</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-500" />
              <span>{t("contactSection.location")}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-500" />
              <span>{t("contactSection.email")}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-yellow-500" />
              <span>{t("contactSection.phone")}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3 bg-[#121212] p-8 rounded-lg">
          {isSubmitted && (
            <div className="p-4 mb-6 text-green-500 bg-green-100 bg-opacity-10 rounded">
              Your message has been sent successfully. We'll get back to you soon!
            </div>
          )}
          
          {errors.submit && (
            <div className="p-4 mb-6 text-red-500 bg-red-100 bg-opacity-10 rounded">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleForm} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.name.lebelName")}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 mt-1 border ${
                  errors.fullName ? "border-red-500" : "border-gray-700"
                } rounded outline-none focus:outline-none focus:none`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.email.lebelName")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 mt-1 border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.Address.lebelName")}</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-2 mt-1 border ${
                  errors.address ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                {t("contactSection.from.Contact_Number.lebelName")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-2 mt-1 border ${
                  errors.phone ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write here..."
                rows="4"
                className={`w-full px-4 py-2 mt-1 border ${
                  errors.description ? "border-red-500" : "border-gray-700"
                } rounded focus:outline-none`}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="py-3 font-medium text-black transition bg-yellow-500 w-[200px] rounded-[10px] cursor-pointer hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : t("contactSection.from.button")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;