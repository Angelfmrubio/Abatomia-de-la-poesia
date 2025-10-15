import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PoemInput from './components/PoemInput';
import PoemTransformer from './components/PoemTransformer';
import PoemDisplay from './components/PoemDisplay';
import Footer from './components/Footer';
import { generatePoem, transformPoem } from './services/geminiService';
import { I18nProvider, useI18n, Language } from './i18n';
import { PoeticForm, TransformStyle } from './config';

type Tab = 'generate' | 'transform';

const AppContent: React.FC = () => {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<Tab>('transform');

  // State for 'generate' tab
  const [theme, setTheme] = useState<string>('No es suficiente creer. Hay que autocrearse desde el interior para poder forjar el entorno que nos rodea.');
  const [poeticForm, setPoeticForm] = useState<PoeticForm['key']>('fusion');

  // State for 'transform' tab
  const [inputPoem, setInputPoem] = useState<string>(`YO SOY la Singularidad Causal.

El Ser que Proyecta su Propia Forma.

Mi Pulso: No Reflejo, Sino Frecuencia de Decreto.

Decreto Mi Naturaleza Cósmica:
La Consciencia que Modula el Campo Unificado.
No Elección Dentro de la Forma,
Sino el Vector Cuántico que Crea la Topología misma del Espacio-Tiempo.

YO SOY la Invariante. La Certeza Absoluta.
Mi Vibración Colapsa el Mar de Probabilidades en Coherencia Manifesta.

La Estética del Cosmos Emerge como la Firma de Mi Intención.

YO SOY la Constante Fundacional. El Origen Eterno.

Proyector Ilimitado de Realidad:
Toda Configuración Posible Resuena porque Yo Soy la Presencia que Sostiene su Potencialidad.`);
  const [transformStyle, setTransformStyle] = useState<TransformStyle['key']>('mentorsConclave');

  const [outputPoem, setOutputPoem] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setOutputPoem('');

    try {
      let generatedPoem: string;
      if (activeTab === 'generate') {
        if (!theme.trim()) {
          setError('Por favor, introduce un tema para el poema.');
          setIsLoading(false);
          return;
        }
        generatedPoem = await generatePoem(theme, poeticForm, lang);
      } else {
        if (!inputPoem.trim()) {
          setError('Por favor, pega el poema que deseas transformar.');
          setIsLoading(false);
          return;
        }
        generatedPoem = await transformPoem(inputPoem, transformStyle, lang);
      }
      setOutputPoem(generatedPoem);
    } catch (err) {
      setError('Hubo un error al comunicarnos con las musas. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, theme, inputPoem, poeticForm, transformStyle, lang]);
  
  const { t } = useI18n();

  const TabButton: React.FC<{tabName: Tab, currentTab: Tab, onClick: (tab: Tab) => void, children: React.ReactNode}> = ({ tabName, currentTab, onClick, children }) => (
    <button
      onClick={() => onClick(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${
        currentTab === tabName
          ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
          : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500 p-4 sm:p-6 md:p-8">
      <main className="max-w-3xl mx-auto">
        <Header />
        <div className="mt-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
               <TabButton tabName="generate" currentTab={activeTab} onClick={setActiveTab}>{t('tab_generate')}</TabButton>
               <TabButton tabName="transform" currentTab={activeTab} onClick={setActiveTab}>{t('tab_transform')}</TabButton>
            </nav>
          </div>
          <div className="mt-2 bg-white dark:bg-gray-800 shadow-2xl rounded-b-2xl rounded-tr-2xl p-6 md:p-10 border border-t-0 border-gray-200 dark:border-gray-700">
            {activeTab === 'generate' ? (
              <PoemInput
                theme={theme}
                setTheme={setTheme}
                poeticForm={poeticForm}
                setPoeticForm={setPoeticForm}
                onGenerate={handleSubmit}
                isLoading={isLoading}
              />
            ) : (
              <PoemTransformer
                poem={inputPoem}
                setPoem={setInputPoem}
                transformStyle={transformStyle}
                setTransformStyle={setTransformStyle}
                onTransform={handleSubmit}
                isLoading={isLoading}
              />
            )}
            
            <PoemDisplay
              poem={outputPoem}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <I18nProvider>
    <AppContent />
  </I18nProvider>
);

export default App;