import { axiosInstance } from '@/configs/axios';
import { Widget } from '@/types';
import { useQuery } from '@tanstack/react-query';
const WidgetKeys = {
  fetchWidgets: () => ['fetchWidgets'],
};
const getWidgets = async () => {
  return await axiosInstance<Widget[]>('/widgets').then((res) => res.data);
};
export const useGetWidgets = () => {
  return useQuery({
    queryKey: WidgetKeys.fetchWidgets(),
    queryFn: () => getWidgets(),
  });
};
