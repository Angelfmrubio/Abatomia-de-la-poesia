import React from 'react';
import { useI18n } from '../i18n';

const Header: React.FC = () => {
  const { t } = useI18n();
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-serif">
        {t('header_title')}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-serif italic">
        {t('header_subtitle')}
      </p>
    </header>
  )
};

export default Header;