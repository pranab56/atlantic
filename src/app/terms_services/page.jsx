// pages/terms-of-service.js
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export default function TermsOfService() {
  const t =  useTranslations("terms");
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Head>
        <title>Terms of Services</title>
        <meta name="description" content="Terms of Services page" />
      </Head>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("one.title")}</h2>
          <p className="text-sm text-zinc-300">{t("one.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("two.title")}</h2>
          <p className="text-sm text-zinc-300">{t("two.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("three.title")}</h2>
          <p className="text-sm text-zinc-300">{t("three.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("four.title")}</h2>
          <p className="text-sm text-zinc-300 mt-2">{t("four.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("five.title")}</h2>
          <p className="text-sm text-zinc-300 mt-2">{t("five.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("six.title")}</h2>
          <p className="text-sm text-zinc-300">{t("six.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("seven.title")}</h2>
          <p className="text-sm text-zinc-300 mt-2">{t("seven.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("eight.title")}</h2>
          <p className="text-sm text-zinc-300">{t("eight.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("nine.title")}</h2>
          <p className="text-sm text-zinc-300">{t("nine.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("ten.title")}</h2>
          <p className="text-sm text-zinc-300">{t("ten.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("elevent.title")}</h2>
          <p className="text-sm text-zinc-300">{t("elevent.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("twelve.title")}</h2>
          <p className="text-sm text-zinc-300">{t("twelve.des")}</p>
        </div>
        
        <div className="border-t border-zinc-700 pt-4 mb-6">
          <h2 className="text-lg font-medium mb-2">{t("Questions.title")}</h2>
          <p className="text-sm text-zinc-300">{t("Questions.des")}</p>
        </div>
      </div>
    </div>
  );
}