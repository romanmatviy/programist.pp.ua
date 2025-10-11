import { Language, translations } from '@/data/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  const lang = params.lang || 'ua';
  const t = translations[lang];

  return (
    <>
      <Header lang={lang} translations={t} />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer lang={lang} translations={t} />
    </>
  );
}