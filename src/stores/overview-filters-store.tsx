import { GridFilterModel } from '@mui/x-data-grid';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
export type FilterDateRanges = '7days' | 'lastMonth' | 'last3Months' | 'last6Months' | 'lastYear' | '' | null;
interface OverviewFilterStore {
  filterValues: string[];
  setfilterValues: (value: string[]) => void;

  filterModel: GridFilterModel | undefined;
  setFilterModel: (filterModel: GridFilterModel) => void;
  activeDateFilterRange: FilterDateRanges;
  setActiveDateFilterRange: (val: FilterDateRanges) => void;
  tableDateFilter: {
    [key: string]: Dayjs[];
  };
  setTableDateFilter: (val: { [key: string]: Dayjs[] }) => void;
}
export const useOverviewFilterStore = create<OverviewFilterStore>((set, get) => ({
  filterValues: [],
  filterModel: undefined,
  activeDateFilterRange: null,
  tableDateFilter: {},
  setActiveDateFilterRange(activeDateFilterRange: FilterDateRanges) {
    return set((state) => ({ ...state, activeDateFilterRange }));
  },
  setFilterModel(filterModel: GridFilterModel | undefined) {
    return set((state) => ({ ...state, filterModel }));
  },
  setfilterValues(value: string[]) {
    return set((state) => ({ ...state, filterValues: value }));
  },

  setTableDateFilter(val: { [key: string]: Dayjs[] }) {
    return set((state) => ({
      ...state,
      tableDateFilter: {
        ...get().tableDateFilter,
        ...val,
      },
    }));
  },
}));
