export type PoeticForm = {
    key: 'fusion' | 'sonnet' | 'villanella' | 'haiku' | 'muki' | 'senryu' | 'haiga' | 'neuroVillanella' | 'neuroSonnet';
    labelKey: string;
}

export type TransformStyle = {
    key: 'mentorsConclave' | 'bashoMistral' | 'rumiVerne' | 'creatorDecree' | 'atomic' | 'refine' | 'myth' | 'expand' | 'distill' | 'kintsukuroi' | 'emunah';
    labelKey: string;
};

export const poeticForms: PoeticForm[] = [
    { key: 'fusion', labelKey: 'form_fusion' },
    { key: 'sonnet', labelKey: 'form_sonnet' },
    { key: 'neuroSonnet', labelKey: 'form_neuroSonnet' },
    { key: 'villanella', labelKey: 'form_villanella' },
    { key: 'neuroVillanella', labelKey: 'form_neuroVillanella' },
    { key: 'haiku', labelKey: 'form_haiku' },
    { key: 'muki', labelKey: 'form_muki' },
    { key: 'senryu', labelKey: 'form_senryu' },
    { key: 'haiga', labelKey: 'form_haiga' },
];

export const transformStyles: TransformStyle[] = [
    { key: 'mentorsConclave', labelKey: 'style_mentorsConclave' },
    { key: 'bashoMistral', labelKey: 'style_bashoMistral' },
    { key: 'rumiVerne', labelKey: 'style_rumiVerne' },
    { key: 'creatorDecree', labelKey: 'style_creatorDecree' },
    { key: 'atomic', labelKey: 'style_atomic' },
    { key: 'emunah', labelKey: 'style_emunah' },
    { key: 'kintsukuroi', labelKey: 'style_kintsukuroi' },
    { key: 'refine', labelKey: 'style_refine' },
    { key: 'myth', labelKey: 'style_myth' },
    { key: 'expand', labelKey: 'style_expand' },
    { key: 'distill', labelKey: 'style_distill' },
];