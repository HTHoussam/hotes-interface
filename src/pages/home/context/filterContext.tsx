import { Dayjs } from 'dayjs';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

export interface HotelsFilter {
  roomsAvailable: number;
  startDate: Dayjs | Date;
  endDate: Dayjs | Date;
  hotelName: string;
}
interface HotelsFilterContextType {
  hotelsFilter: HotelsFilter | null; // Replace 'any' with the type of your hotels filter state
  setHotelsFilter: Dispatch<SetStateAction<HotelsFilter | null>> | null; // Replace 'any' with the type of your hotels filter state
}

export const HotelsFilterContext = createContext<HotelsFilterContextType>({
  hotelsFilter: null,
  setHotelsFilter: null,
});

export const useHotelsFilter = () => {
  const { hotelsFilter, setHotelsFilter } = useContext(HotelsFilterContext);
  return {
    hotelsFilter: hotelsFilter ?? ({} as HotelsFilter),
    setHotelsFilter,
  };
};
