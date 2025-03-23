// pages/index.js
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const t =  useTranslations("homePage");

  return (
    <div className="relative min-h-screen">
      <Head>
        <title> Atlantic Machinery & Equipment</title>
        <meta
          name="description"
          content="Premium Machinery, Engineered for Performance"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <div className="relative h-screen">
          {/* Yellow Background */}
          <div
            style={{
              background:
                "linear-gradient(0deg, rgba(218, 158, 31, 0.92) 0%, rgba(248, 210, 68, 0.92) 100%)",
            }}
            className="absolute inset-0 h-3/4"
          ></div>

          {/* Dark Bottom Section */}
          <div className="absolute bottom-0 w-full bg-[#292929] h-1/4"></div>

          {/* Content Container */}
          <div className="container relative z-10 flex flex-col h-full px-6 pt-20 mx-auto">
            {/* Watermark Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-yellow-300 opacity-20 text-[12rem] sm:text-[20rem] font-bold tracking-tighter">
                AME
              </h1>
            </div>

            {/* Text Content */}
            <div className="relative z-20 max-w-md mt-28">
              <h3 className="mb-2 text-xl sm:text-2xl font-medium text-[#292929] leading-[26px]">
              {t("heroSection.titlePrimary")}
              </h3>
              <h2 className="mb-2 text-3xl sm:text-4xl font-bold text-[#292929]">
              {t("heroSection.titleSecondary")}
              </h2>
              <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-[#292929]">
              {t("heroSection.titleThird")}
              </h2>
              <p className="mb-6 text-lg text-gray-700 sm:text-xl">
              {t("heroSection.description")}
              </p>
            </div>

            {/* Machinery Image */}
            <div className="hidden lg:block absolute right-0 w-[1091px] bottom-[130px] h-4/5">
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero.png"
                  alt="Volvo Excavator"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
