import { axiosInstance } from '@/configs/axios';
import { User } from '@/types';
import type {} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
const UsersQueryKeys = {
  fetchUsers: () => ['fetchUsers'],
};
const getUserById = async (id: string) => {
  return await axiosInstance<User[]>('/users').then((res) => res.data.find((r) => r.id === id));
};
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: UsersQueryKeys.fetchUsers(),
    queryFn: () => getUserById(id),
    enabled: id.length > 0,
  });
};
