import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { isBrowser } from '../utils/environment';

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

// Complete configuration
let i18nConfig = {
  resources,
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  supportedLngs: ['en', 'zh', 'zh-TW', 'ja', 'es', 'vi'],
  react: {
    useSuspense: false, // Important for SSR
  },
  // default namespace used if not specified
  defaultNS: 'common',
};

// Client-side detection options
const clientConfig = {
  ...i18nConfig,
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage', 'cookie'],
  }
};

// Initialize i18n differently for client and server
if (isBrowser) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(clientConfig);
} else {
  i18n
    .use(initReactI18next)
    .init(i18nConfig);
}

export default i18n;
