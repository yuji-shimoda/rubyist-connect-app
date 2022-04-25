import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import JA from './locales/japanese.json';

const resources = {
  ja: {
    translation: JA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ja',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['navigator'],
  },
});

export default i18n;
