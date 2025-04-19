"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestion } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFaqQuery } from "../../features/Products/productsApi";




const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {

  return (
    <div className="mb-4 overflow-hidden text-white rounded-md cursor-pointer bg-gray-950">
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full p-4 text-left"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pt-0 text-gray-300">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(1); // Second item is open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };


  const t =  useTranslations("homePage");

  const {data} = useFaqQuery();


  const faqData = [
    {
      question: t("faqSection.questions1.question1"),
      answer: t("faqSection.questions1.answer1")
       
    },
    {
      question: t("faqSection.questions2.question2"),
      answer:t("faqSection.questions2.answer2")
       
    },
    {
      question: t("faqSection.questions3.question3"),
      answer: t("faqSection.questions3.question3")
    },
    {
      question:  t("faqSection.questions4.question4"),
      answer:  t("faqSection.questions4.question4")
    },
    {
      question:  t("faqSection.questions4.question4"),
      answer:  t("faqSection.questions4.question4")
    },
    {
      question: t("faqSection.questions4.question4"),
      answer:  t("faqSection.questions4.question4")
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 bg-[#292929] cursor-pointer sm:py-16">
      <div className="container px-4 mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-2">
            <span className="text-amber-500">
              <FaQuestion size={24} />
            </span>
            <span className="ml-2 font-bold text-amber-500">{t("faqSection.titlePrimary")}</span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("faqSection.titleSecondary1")} <span className="text-amber-500">{t("faqSection.titleSecondary2")}</span> {t("faqSection.titleSecondary3")}
          </h2>
          <p className="mt-2 text-gray-400">
          {t("faqSection.description")}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
          <div className="w-full md:w-1/2">
            <Image
              src="/images/faq2.jpg"
              alt="FAQ Image"
              width={700}
              height={250}
              className="object-cover w-full rounded-lg"
              priority
            />
          </div>
          <div className="w-full md:w-1/2">
            {data?.data?.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.title}
                answer={faq.description}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;