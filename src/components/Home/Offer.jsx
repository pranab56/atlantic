import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";

export default function Offer() {
  const t =  useTranslations("homePage");
  return (
    <div className="text-white bg-[#292929]">
      <Head>
        <title>Atlantic Machinery | Leaders in Machinery & Equipment</title>
        <meta
          name="description"
          content="Global leader in innovative, high-quality equipment solutions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-4 py-8 mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-8 mb-16 lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/offer.png"
              alt="Heavy machinery excavator"
              width={800}
              height={700}
              className="object-cover w-full rounded-lg"
              priority
            />
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <span className="flex items-center gap-2">
                <Image
                  src={"/icons/aboutLogo.png"}
                  width={33}
                  height={33}
                  alt="About logo"
                />
                <span className="text-xl md:text-2xl font-medium text-[#DA9E1F]">
                  {t("offerSection.titlePrimary")}
                </span>
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("offerSection.titleSecondary1")}{" "}
              <span className="text-yellow-500">{t("offerSection.titleSecondary2")}</span>{" "}
              {t("offerSection.titleSecondary3")}
            </h1>

            <p className="mb-8 text-lg text-gray-300">
            {t("offerSection.description")}
            </p>

            <div className="space-y-6">
              {[
                {
                  title:  t("offerSection.features.deliveryPickup.title"),
                  image: "/icons/1.png",
                  description:
                  t("offerSection.features.deliveryPickup.description")
                },
                {
                  title:t("offerSection.features.maintenanceRepair.title"),
                  image: "/icons/offer2.png",
                  description:
                  t("offerSection.features.maintenanceRepair.description")
                },
                {
                  title: t("offerSection.features.onSiteSupport.title"),
                  image: "/icons/offer3.png",
                  description:
                  t("offerSection.features.onSiteSupport.description")
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={44}
                      height={44}
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 text-xl md:text-2xl font-semibold text-[#F4E1BA]">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#FBF5E9]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}