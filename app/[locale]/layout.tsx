import type { Metadata } from 'next';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import './globals.css';
import { TheHeader } from '@/components/TheHeader';
import { TheFooter } from '@/components/TheFooter';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Bipolar Diary',
  description: 'Produced in love for one foolish girl',
};

// const locales = ['ua', 'ru', 'en'];

// export function generateStaticParams() {
//   return locales.map(locale => ({ locale }));
// }

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = useLocale();
  let messages;
  try {
    messages = (await import(`/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  // console.log(locale);

  if (params.locale !== locale) notFound();

  // const isValidLocale = locales.some(cur => cur === locale);
  // if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TheHeader />

            <main className="container">{children}</main>

            <TheFooter />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
