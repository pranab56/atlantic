'use client';

import { Provider } from "react-redux";
import { store } from "../../src/store/store";
import { NextIntlClientProvider } from "next-intl";

export default function ClientProviders({ children, messages, locale }) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </Provider>
  );
}