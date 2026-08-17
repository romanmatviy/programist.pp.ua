import { Language, translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import MessengerWidget from '@/components/MessengerWidget';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { notFound } from 'next/navigation';

const validLanguages: string[] = ['ua', 'ru'];

export async function generateStaticParams() {
  return [
    { lang: 'ua' },
    { lang: 'ru' },
  ];
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  if (!validLanguages.includes(params.lang)) {
    notFound();
  }

  const lang = params.lang;
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} translations={t} />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer lang={lang} translations={t} />
      <CookieBanner lang={lang} />
      <MessengerWidget lang={lang} />
      <ExitIntentPopup lang={lang} />
    </>
  );
}