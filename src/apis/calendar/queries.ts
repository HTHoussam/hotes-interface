import { axiosInstance } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const CalendarCasesQueryKeys = {
  fetchCalendarCases: () => ['fetchCalendarCases'],
};
const getCalendarCases: () => Promise<{
  [key: string]: {
    id: string;
    day: string;
    cases: string[];
  }[];
}> = async () => {
  return await axiosInstance.get('/calendarCases').then((res) => res.data);
};

export const useGetCalendarCases = () => {
  return useQuery({
    queryFn: () => getCalendarCases(),
    queryKey: CalendarCasesQueryKeys.fetchCalendarCases(),
  });
};
