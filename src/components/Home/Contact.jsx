"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
   const t =  useTranslations("homePage");
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
          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.name.lebelName")}</label>
              <input
                type="text"
                placeholder={"Inter your full name"}
                className="w-full px-4 py-2 mt-1 border border-gray-700 rounded outline-none focus:outline-none focus:none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.email.lebelName")}</label>
              <input
                type="email"
                placeholder={"Inter your email address"}
                className="w-full px-4 py-2 mt-1 border border-gray-700 rounded focus:outline-none "
              />
            </div>
            <div>
              <label className="block text-sm font-medium">{t("contactSection.from.Address.lebelName")}s</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full px-4 py-2 mt-1 border border-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
              {t("contactSection.from.Contact_Number.lebelName")}
              </label>
              <input
                type="tel"
                placeholder="Enter your contact number"
                className="w-full px-4 py-2 mt-1 border border-gray-700 rounded focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">{t("contactSection.from.Contact_Number.lebelName")}</label>
              <textarea
                placeholder="Write here..."
                rows="4"
                className="w-full px-4 py-2 mt-1 border border-gray-700 rounded focus:outline-none"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="py-3 font-medium text-black transition bg-yellow-500 w-[200px] rounded-[10px] cursor-pointer hover:bg-yellow-600"
              >
               {t("contactSection.from.button")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
