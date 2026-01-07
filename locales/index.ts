import ptBR from './pt-BR';
import enUS from './en-US';
import esES from './es-ES';
import frFR from './fr-FR';
import deDE from './de-DE';
import itIT from './it-IT';
import jaJP from './ja-JP';
import zhCN from './zh-CN';

export type Translation = typeof ptBR;
export type SupportedLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'it-IT' | 'ja-JP' | 'zh-CN';

export const translations: Record<SupportedLanguage, Translation> = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
  'fr-FR': frFR,
  'de-DE': deDE,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'zh-CN': zhCN,
};

export const AVAILABLE_LANGUAGES: { code: SupportedLanguage; name: string; flag: string }[] = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'pt-BR';
