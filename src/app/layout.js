import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getLocale, getMessages } from "next-intl/server";
import ClientProviders from "./ClientProviders";

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
  
  return (
    <html lang={locale}>
      <body>
        <ClientProviders messages={messages} locale={locale}>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}