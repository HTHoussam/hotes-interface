import { axiosInstance } from '@/configs/axios';
import { KK2Module } from '@/types';
import { useQuery } from '@tanstack/react-query';

const DashboardQueryKeys = {
  fetchModules: () => ['fetchModules'],
};
const getModules = async () => {
  return await axiosInstance.get<KK2Module[]>('/modules').then((res) => res.data);
};
export const useGetModules = () => {
  return useQuery({
    queryFn: () => getModules(),
    queryKey: DashboardQueryKeys.fetchModules(),
  });
};
