import { axiosInstance } from '@/configs/axios';
import { KK2Module } from '@/types';
import { useQuery } from '@tanstack/react-query';

const DashboardQueryKeys = {
  fetchModules: () => ['fetchModules'],
  fetchOverview: () => ['fetchOverview'],
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

export interface Overview {
  title: string;
  value: number;
  url?: string;
}
const getOverview = async () => {
  return await axiosInstance.get<Overview[]>('/overview').then((res) => res.data);
};
export const useGetOverview = () => {
  return useQuery({
    queryFn: () => getOverview(),
    queryKey: DashboardQueryKeys.fetchOverview(),
  });
};
