import { axiosInstance } from '@/configs/axios';
import { Hotel } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
const HotelsQueriesKeyes = {
  fetchHotels: () => ['fetchHotels'],
};
const getAllHotels = async () => {
  return await axiosInstance<Hotel[]>('/hotels').then((res) => {
    console.log('res.data', res.data);
    return res.data;
  });
};
export const useGetAllHotels = () => {
  return useSuspenseQuery({
    queryKey: HotelsQueriesKeyes.fetchHotels(),
    queryFn: () => getAllHotels(),
  });
};
