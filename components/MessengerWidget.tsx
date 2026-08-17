'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessengerWidgetProps {
  lang: 'ua' | 'ru';
}

export default function MessengerWidget({ lang }: MessengerWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  // You can replace these with actual links later
  const links = {
    telegram: 'https://t.me/RomanMatviy',
    whatsapp: 'https://wa.me/380938800822',
    viber: 'viber://chat?number=+380938800822',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-4"
          >
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0088cc] text-white shadow-lg hover:scale-110 transition-transform"
              title="Telegram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
              title="WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href={links.viber}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#7360f2] text-white shadow-lg hover:scale-110 transition-transform"
              title="Viber"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.94 13.91c.07-.15.22-.38.35-.55.15-.17.38-.45.45-.63.07-.17.07-.4.07-.63 0-.25-.07-.48-.15-.7-.07-.25-.33-.53-.5-.73l-1.92-2c-.15-.18-.38-.3-.6-.4-.25-.07-.5-.07-.75-.07-.23 0-.48.07-.7.15-.22.1-.48.25-.65.43l-1.38 1.45c-.23.23-.55.33-.88.33-.23 0-.48-.05-.7-.15-1.92-1.02-3.48-2.6-4.48-4.55-.1-.23-.15-.45-.15-.7 0-.3.1-.63.3-.85L11.59 2.5c.18-.18.33-.45.43-.65.1-.23.15-.48.15-.73 0-.23-.05-.48-.15-.73-.1-.2-.25-.48-.4-.68L9.67.24C9.52.06 9.24 0 9.02 0c-.23 0-.48.08-.68.2L6.19 1.77C5.9 2.05 5.7 2.37 5.54 2.7c-.15.35-.2.75-.2 1.13 0 1.23.23 2.45.68 3.58 1 2.58 2.65 4.86 4.76 6.8 2.1 1.93 4.56 3.42 7.29 4.3 1.25.43 2.58.65 3.93.65.38 0 .8-.05 1.18-.18.33-.12.65-.3 1-.58l2.08-1.95c.22-.18.33-.45.33-.7 0-.23-.08-.48-.2-.73z"/>
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-gray-800 text-white rotate-45' : 'bg-primary-600 text-white hover:scale-105 hover:bg-primary-700'
        }`}
        title={lang === 'ua' ? "Швидкий зв'язок" : "Быстрая связь"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          )}
        </svg>
      </button>
    </div>
  );
}
