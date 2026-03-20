import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// Initialize i18next for server-side rendering
const initI18Next = (lng = 'en') => {
  // Always create a new instance for SSR to avoid shared state
  const i18nInstance = i18n.createInstance();
  
  i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng, // Use provided language
      fallbackLng: 'en',
      
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      
      supportedLngs: ['en', 'zh', 'zh-TW', 'ja', 'es', 'vi'],
      defaultNS: 'common',
      react: {
        useSuspense: false,
      }
    });

  return i18nInstance;
};

export default initI18Next;
