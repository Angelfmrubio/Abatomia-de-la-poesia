import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'es' | 'en';

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Header
    header_title: "Anatomía de la Poesía",
    header_subtitle: "Descubre que no es suficiente creer: hay que autocrearse desde adentro para poder forjar el entorno.",
    // Tabs
    tab_generate: "Generar Poesía",
    tab_transform: "Cirujano del Lenguaje",
    // Poem Input
    input_label: "Escribe un tema, una idea o una cita...",
    input_placeholder: "Ej: el eco de una risa en una habitación vacía...",
    form_label: "Elige la forma poética...",
    generate_button: "Declamar Poesía",
    generating_button: "Declamando...",
    // Poem Transformer
    transform_label: "Pega tu poema en la mesa de operaciones...",
    transform_placeholder: "Tu poema...",
    style_label: "Elige tu instrumento quirúrgico...",
    transform_button: "Operar",
    transforming_button: "Transmutando...",
    transform_upload_button: "Cargar Manuscrito",
    // Poem Display
    display_loading: "Las musas están deliberando...",
    display_error_prefix: "Error:",
    display_error_message: "Hubo un error al comunicarnos con las musas. Por favor, inténtalo de nuevo.",
    display_placeholder: "El lienzo poético aguarda su tema.",
    // Footer
    footer_inspired_by: "Una herramienta forjada en colaboración e inspirada en la visión del Maestro",
    footer_congrats: "¡Felicitaciones por el lanzamiento de",
    // Forms
    form_fusion: "Fusión Lírica (Anamnesis)",
    form_sonnet: "Soneto Clásico",
    form_neuroSonnet: "Neuro-Soneto (Issa/Bristol)",
    form_villanella: "Villanella",
    form_neuroVillanella: "Neuro-Villanella (Bashō)",
    form_haiku: "Haiku Clásico (con Kigo)",
    form_muki: "Haiku Muki (Sin Estación)",
    form_senryu: "Senryū (Humano/Irónico)",
    form_haiga: "Haiga (Poema + Imagen Descrita)",
    // Styles
    style_mentorsConclave: "Cónclave de Maestros (Fusión Alquímica)",
    style_bashoMistral: "Fusión Bashō/Mistral (Roca y Musgo)",
    style_rumiVerne: "Fusión Rumi/Verne (Cosmogonía del Nautilus)",
    style_creatorDecree: "Decreto del Creador (Libre Albedrío)",
    style_atomic: "Forja Divina (Mente Atómica)",
    style_emunah: "Emunah (Forjar con Fe Firme)",
    style_kintsukuroi: "Kintsukuroi (Reparar con Oro)",
    style_refine: "Pulir Gema (Refinamiento Sutil)",
    style_myth: "Forjar con Mito (Ancestral)",
    style_expand: "Expandir Universo (Desarrollo)",
    style_distill: "Destilar Esencia (Concentración)",
  },
  en: {
    // Header
    header_title: "Anatomy of Poetry",
    header_subtitle: "Discover it's not enough to believe: one must self-create from within to forge the world around us.",
    // Tabs
    tab_generate: "Generate Poetry",
    tab_transform: "Language Surgeon",
    // Poem Input
    input_label: "Write a theme, an idea, or a quote...",
    input_placeholder: "e.g., the echo of laughter in an empty room...",
    form_label: "Choose the poetic form...",
    generate_button: "Declaim Poetry",
    generating_button: "Declaiming...",
    // Poem Transformer
    transform_label: "Paste your poem on the operating table...",
    transform_placeholder: "Your poem...",
    style_label: "Choose your surgical instrument...",
    transform_button: "Operate",
    transforming_button: "Transmuting...",
    transform_upload_button: "Upload Manuscript",
    // Poem Display
    display_loading: "The muses are deliberating...",
    display_error_prefix: "Error:",
    display_error_message: "There was an error communicating with the muses. Please try again.",
    display_placeholder: "The poetic canvas awaits its theme.",
    // Footer
    footer_inspired_by: "A tool forged in collaboration and inspired by the vision of Maestro",
    footer_congrats: "Congratulations on the launch of",
    // Forms
    form_fusion: "Lyrical Fusion (Anamnesis)",
    form_sonnet: "Classic Sonnet",
    form_neuroSonnet: "Neuro-Sonnet (Issa/Bristol)",
    form_villanella: "Villanella",
    form_neuroVillanella: "Neuro-Villanella (Bashō)",
    form_haiku: "Classic Haiku (with Kigo)",
    form_muki: "Muki Haiku (Seasonless)",
    form_senryu: "Senryū (Human/Ironic)",
    form_haiga: "Haiga (Poem + Described Image)",
    // Styles
    style_mentorsConclave: "Conclave of Masters (Alchemical Fusion)",
    style_bashoMistral: "Bashō/Mistral Fusion (Rock & Moss)",
    style_rumiVerne: "Rumi/Verne Fusion (Nautilus Cosmogony)",
    style_creatorDecree: "Creator's Decree (Free Will)",
    style_atomic: "Divine Forge (Atomic Mind)",
    style_emunah: "Emunah (Forge with Firm Faith)",
    style_kintsukuroi: "Kintsukuroi (Repair with Gold)",
    style_refine: "Gem Polishing (Subtle Refinement)",
    style_myth: "Myth Forging (Ancestral)",
    style_expand: "Expand Universe (Development)",
    style_distill: "Distill Essence (Concentration)",
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return React.createElement(I18nContext.Provider, { value: { lang, setLang, t } }, children);
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};