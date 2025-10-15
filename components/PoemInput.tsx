import React from 'react';
import { PoeticForm, poeticForms } from '../config';
import { useI18n } from '../i18n';


interface PoemInputProps {
  theme: string;
  setTheme: (theme: string) => void;
  poeticForm: PoeticForm['key'];
  setPoeticForm: (form: PoeticForm['key']) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PoemInput: React.FC<PoemInputProps> = ({ theme, setTheme, poeticForm, setPoeticForm, onGenerate, isLoading }) => {
  const { t } = useI18n();

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-serif">
          {t('input_label')}
        </label>
        <textarea
          id="theme"
          rows={3}
          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out font-serif text-base"
          placeholder={t('input_placeholder')}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
         <label htmlFor="poetic-form" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-serif">
          {t('form_label')}
        </label>
        <select
            id="poetic-form"
            value={poeticForm}
            onChange={(e) => setPoeticForm(e.target.value as PoeticForm['key'])}
            disabled={isLoading}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out font-serif text-base"
        >
            {poeticForms.map(form => (
              <option key={form.key} value={form.key}>{t(form.labelKey)}</option>
            ))}
        </select>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('generating_button')}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 -ml-1 mr-2">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              {t('generate_button')}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PoemInput;
