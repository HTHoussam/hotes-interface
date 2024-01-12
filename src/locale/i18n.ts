import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { enLang, noLang } from './languages';

/** retrieving language code from localStorage to keep language synced for user  */

const { state } = JSON.parse(localStorage.getItem('locale-lang')!) ?? {
  state: {
    languageCode: '',
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources: {
        en: {
          translation: {
            ...enLang,
          },
        },
        no: {
          translation: {
            ...noLang,
          },
        },
      },
      lng: state.languageCode,
      debug: false,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    },
    (err) => {
      if (err) return console.log('Something went wrong with i18next loading:', err);
    },
  );
export { i18n };
