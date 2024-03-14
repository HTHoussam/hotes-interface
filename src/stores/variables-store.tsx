import { Layout } from 'react-grid-layout';
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

interface WidgetsStore {
  currentWidgetsLayout: Layout[] | undefined;
  setCurrentWidgetsLayout: (layout: Layout[]) => void;
  deletedWidgets: string[];
  setDeletedWidgets: (deletedWidgets: string[]) => void;
}

export const useWidgetsStore = create<WidgetsStore>()(
  persist(
    (set) => ({
      deletedWidgets: [],
      setDeletedWidgets(deletedWidgets: string[]) {
        set((state) => ({ ...state, deletedWidgets }));
      },
      currentWidgetsLayout: undefined,
      setCurrentWidgetsLayout(layout: Layout[]) {
        return set((state) => ({ ...state, currentWidgetsLayout: layout }));
      },
    }),
    {
      name: 'case-widgets',
    },
  ),
);
