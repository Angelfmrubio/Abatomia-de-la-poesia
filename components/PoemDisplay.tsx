import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useI18n } from '../i18n';

interface PoemDisplayProps {
  poem: string;
  isLoading: boolean;
  error: string | null;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, isLoading, error }) => {
  const { t, lang } = useI18n();

  if (isLoading) {
    return (
        <div className="mt-8 p-6 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-500 dark:text-gray-400 font-serif">{t('display_loading')}</p>
        </div>
    );
  }

  if (error) {
    const errorMessage = lang === 'es' 
        ? 'Hubo un error al comunicarnos con las musas. Por favor, inténtalo de nuevo.'
        : 'There was an error communicating with the muses. Please try again.';

    return (
      <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 rounded-r-lg">
        <p className="text-red-700 dark:text-red-300 font-medium">{errorMessage}</p>
      </div>
    );
  }

  if (!poem) {
    return (
        <div className="mt-8 p-10 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-gray-400 dark:text-gray-500 font-serif">{t('display_placeholder')}</p>
        </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in">
        <hr className="my-6 border-gray-200 dark:border-gray-700"/>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg prose prose-lg dark:prose-invert max-w-none font-serif">
            {poem.split('\n').map((line, index) => (
                <p key={index} className="mb-2 last:mb-0">
                    {line || <>&nbsp;</>}
                </p>
            ))}
        </div>
    </div>
  );
};

// Add a simple fade-in animation to tailwind config (or here in a style tag for simplicity)
// In a real project, this would be in tailwind.config.js
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out forwards;
  }
`;
document.head.appendChild(style);


export default PoemDisplay;
