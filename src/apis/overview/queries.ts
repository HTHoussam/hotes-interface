import { axiosInstance } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

interface SectorsOverview {
  title: string;
  value: string;
}
const OverviewKeys = {
  fetchOverviewById: () => ['fetchOverviewById'],
  fetchOverviews: () => ['fetchOverviews'],
};
const getOverviewById = async () => {
  return await axiosInstance
    .get<{
      [key: string]: SectorsOverview[];
    }>(`/overviewstats`)
    .then((res) => {
      return res.data;
    });
};
export const useGetOverviewById = (id: string) => {
  return useQuery({
    queryKey: OverviewKeys.fetchOverviewById(),
    queryFn: () => getOverviewById(),
    select(data) {
      return data[id];
    },
  });
};

const getOverviews = async () => {
  return await axiosInstance.get<{ title: string }[]>(`/overviews`).then((res) => {
    return res.data;
  });
};
export const useGetOverviews = () => {
  return useQuery({
    queryKey: OverviewKeys.fetchOverviews(),
    queryFn: () => getOverviews(),
  });
};
