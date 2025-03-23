// pages/return-policy.js
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export default function ReturnPolicy() {
  const t =  useTranslations("Policy");
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Return Policy page" />
      </Head>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
        
        <div className="border-t border-zinc-700 mt-2 pt-4"></div>
        
        <div className="mt-6 bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <p className="text-zinc-300 mb-4">
          {t("one")}
          </p>
          <p className="text-zinc-300 mb-4">
          {t("two")}
          </p>
          <p className="text-zinc-300 mb-4">
          {t("three")}
          </p>
          <p className="text-zinc-300 mb-4">
          {t("four")}
          </p>
          <p className="text-zinc-300">
          {t("five")}
          </p>
        </div>
      </div>
    </div>
  );
}