import React from 'react';
import { useI18n } from '../i18n';

const Footer: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const bookUrl = "https://www.amazon.com/dp/B0FGNJ3R9V";

  const LangButton: React.FC<{targetLang: 'es' | 'en', children: React.ReactNode}> = ({ targetLang, children }) => {
    const isActive = lang === targetLang;
    return (
      <button
        onClick={() => setLang(targetLang)}
        disabled={isActive}
        className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white cursor-default'
            : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        aria-pressed={isActive}
      >
        {children}
      </button>
    )
  }

  return (
    <footer className="text-center mt-12 mb-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t('footer_inspired_by')}{' '}
          <span className="font-semibold">José Alirio Angel Corredor</span>.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {t('footer_congrats')}{' '}
          <a 
            href={bookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            "MENTE ATÓMICA: EL ADN de Tu Novena Sinfonía"
          </a>!
        </p>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <LangButton targetLang="es">Español</LangButton>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
        <LangButton targetLang="en">English</LangButton>
      </div>
    </footer>
  );
};

export default Footer;
