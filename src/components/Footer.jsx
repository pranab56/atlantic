import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t =  useTranslations("footerSection");
  return (
    <div className="bg-yellow-400">
      <div className="container pt-10 mx-auto">
        <Head>
          <title>Machinery & Equipment</title>
          <meta name="description" content="Gateway to industrial excellence" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-[500px]">
          <div className="container px-4 py-8 mx-auto">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Company Description */}
              <div className="col-span-1">
                <p className="text-sm font-normal text-gray-800 md:text-base">
                 {t("description")}
                </p>
              </div>

              {/* Equipment Column */}
              <div className="col-span-1">
                <h2 className="mb-4 text-lg font-bold text-gray-800 md:text-xl">
                {t("equipment")}
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("equipmentCategories.construction")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("equipmentCategories.utility")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("equipmentCategories.marine")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("equipmentCategories.handling")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("equipmentCategories.aggregate")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div className="col-span-1">
                <h2 className="mb-4 text-lg font-bold text-gray-800 md:text-xl">
                {t("legal.title")}
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/Privacy_policy" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("legal.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms_services" className="text-sm text-gray-800 hover:underline md:text-base">
                    {t("legal.terms")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div className="col-span-1">
                <h2 className="mb-4 text-lg font-bold text-gray-800 md:text-xl">
                {t("contact.title")}
                </h2>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-800 md:text-base">
                  {t("contact.email")}
                  </li>
                  <li className="text-sm text-gray-800 md:text-base">
                  {t("contact.phone")}
                  </li>
                  <div className="flex mt-4 space-x-3">
                    <Link
                      href="#"
                      className="text-gray-800 hover:text-gray-600"
                    >
                      <Image
                        src={"/icons/linkedin.png"}
                        height={30}
                        width={30}
                        alt="LinkedIn"
                        className="w-8 h-8 md:w-10 md:h-10"
                      />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-800 hover:text-gray-600"
                    >
                      <Image
                        src={"/icons/facebook.png"}
                        height={30}
                        width={30}
                        alt="Facebook"
                        className="w-8 h-8 md:w-10 md:h-10"
                      />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-800 hover:text-gray-600"
                    >
                      <Image
                        src={"/icons/instagram.png"}
                        height={30}
                        width={30}
                        alt="Instagram"
                        className="w-8 h-8 md:w-10 md:h-10"
                      />
                    </Link>
                  </div>
                </ul>
              </div>
            </div>

            {/* Footer Logo Section */}
            <div className="flex items-center justify-center mt-8 md:justify-end">
              <Image
                src={"/images/footer.png"}
                width={500}
                height={100}
                alt="Footer"
                className="w-full max-w-[400px] md:max-w-[500px]"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}