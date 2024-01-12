import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalSearchStore {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
export const useGlobalSearchStore = create<GlobalSearchStore>((set) => ({
  searchTerm: '',
  setSearchTerm(modules) {
    return set((state) => ({ ...state, searchTerm: modules }));
  },
}));

interface LocaleLanguageStore {
  languageCode: string;
  setLanguageCode: (langCode: string) => void;
}

export const useLocaleLanguageStore = create<LocaleLanguageStore>()(
  persist(
    (set) => ({
      languageCode: '',
      setLanguageCode(langCode: string) {
        return set((state) => ({ ...state, languageCode: langCode }));
      },
    }),
    {
      name: 'locale-lang',
    },
  ),
);
