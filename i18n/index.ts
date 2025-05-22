import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh/common.json';
import zhTWCommon from './locales/zh-TW/common.json';
import jaCommon from './locales/ja/common.json';
import esCommon from './locales/es/common.json';
import viCommon from './locales/vi/common.json';

// Resources object with all translations
const resources = {
  en: {
    common: enCommon
  },
  zh: {
    common: zhCommon
  },
  'zh-TW': {
    common: zhTWCommon
  },
  ja: {
    common: jaCommon
  },
  es: {
    common: esCommon
  },
  vi: {
    common: viCommon
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    supportedLngs: ['en', 'zh', 'zh-TW', 'ja', 'es', 'vi'],
    
    // default namespace used if not specified
    defaultNS: 'common',
    
    react: {
      useSuspense: false, // prevents issues with SSR
    },
  });

export default i18n;
