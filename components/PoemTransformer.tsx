import React from 'react';
import { TransformStyle, transformStyles } from '../config';
import { useI18n } from '../i18n';

interface PoemTransformerProps {
  poem: string;
  setPoem: (poem: string) => void;
  transformStyle: TransformStyle['key'];
  setTransformStyle: (style: TransformStyle['key']) => void;
  onTransform: () => void;
  isLoading: boolean;
}

const PoemTransformer: React.FC<PoemTransformerProps> = ({ poem, setPoem, transformStyle, setTransformStyle, onTransform, isLoading }) => {
  const { t } = useI18n();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setPoem(text);
    };
    reader.onerror = (e) => {
        console.error("Error al leer el archivo:", e);
    }
    // Specify encoding to prevent issues with files saved in non-UTF8 formats
    reader.readAsText(file, 'windows-1252');
    // Reset file input value to allow re-uploading the same file
    event.target.value = '';
  };


  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
            <label htmlFor="poem-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-serif">
              {t('transform_label')}
            </label>

            <label htmlFor="manuscript-upload" className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t('transform_upload_button')}
            </label>
            <input
                id="manuscript-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
            />
        </div>
        <textarea
          id="poem-input"
          rows={12}
          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out font-serif text-sm leading-relaxed"
          placeholder={t('transform_placeholder')}
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          disabled={isLoading}
        />
      </div>
       <div>
         <label htmlFor="transform-style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-serif">
          {t('style_label')}
        </label>
        <select
            id="transform-style"
            value={transformStyle}
            onChange={(e) => setTransformStyle(e.target.value as TransformStyle['key'])}
            disabled={isLoading}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out font-serif text-base"
        >
          {transformStyles.map(style => (
            <option key={style.key} value={style.key}>{t(style.labelKey)}</option>
          ))}
        </select>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onTransform}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('transforming_button')}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 -ml-1 mr-2">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              {t('transform_button')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PoemTransformer;