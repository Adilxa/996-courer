import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

import en from './resources/en.json';
import kg from './resources/kg.json';
import ru from './resources/ru.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  kg: {
    translation: kg,
  },
};

const getLanguage = async () => {
  const savedLang = await AsyncStorage.getItem('language');
  return savedLang || 'ru';
};

const initializeI18n = async () => {
  const savedLang = await getLanguage();
  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLang,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    keySeparator: ':',
  });
};

initializeI18n();

export {i18n};
