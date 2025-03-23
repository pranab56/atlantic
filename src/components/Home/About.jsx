import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";

export default function About() {
  const t =  useTranslations("homePage");
  return (
    <div className="min-h-screen text-white bg-[#292929]">
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
              src="/images/about.png"
              alt="Heavy machinery excavator"
              width={660}
              height={712}
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
                  {t("aboutSection.titlePrimary")}
                </span>
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            {t("aboutSection.titleSecondary1")}{" "}
              <span className="text-yellow-500"> {t("aboutSection.titleSecondary2")}</span>
            </h1>

            <p className="mb-8 text-lg text-gray-300">
            {t("aboutSection.description")}
            </p>

            <div className="space-y-6">
              {[
                {
                  title: t("aboutSection.features.companyLegality.title"),
                  image: "/icons/abouticon1.png",
                  description:
                  t("aboutSection.features.companyLegality.description")
                },
                {
                  title: t("aboutSection.features.equipmentLegality.title"),
                  image: "/icons/abouticon2.png",
                  description:
                  t("aboutSection.features.equipmentLegality.description")
                },
                {
                  title:  t("aboutSection.features.operatorLegality.title"),
                  image: "/icons/abouticon3.png",
                  description:
                  t("aboutSection.features.operatorLegality.description")
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