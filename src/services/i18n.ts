import { initReactI18next } from 'react-i18next';
import uz from '@/assets/locales/uz/translation.json';
import ru from '@/assets/locales/ru/translation.json';
import en from '@/assets/locales/en/translation.json';
import { DEFAULT_LANGUAGE } from '../utils/constants';
import i18n from 'i18next';

const initialLanguage = localStorage.getItem('i18nextLng') ?? DEFAULT_LANGUAGE;

enum backendLanguageEnum {
  nameRu = 'nameRu',
  nameEn = 'nameEn',
  nameUz = 'nameUz',
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
    uz: {
      translation: uz,
    },
  },
  lng: initialLanguage,
  fallbackLng: initialLanguage,

  interpolation: {
    escapeValue: false,
  },
});

export const getLocaleName = () => {
  switch (i18n.language) {
    case 'en': {
      return backendLanguageEnum.nameEn;
    }
    case 'ru': {
      return backendLanguageEnum.nameRu;
    }
    default: {
      return backendLanguageEnum.nameUz;
    }
  }
};

export const getLocaleLanguage = (name: string) => {
  switch (i18n.language) {
    case 'en': {
      return name + 'En';
    }
    case 'ru': {
      return name + 'Ru';
    }
    default: {
      return name + 'Uz';
    }
  }
};
