import { axiosInstance } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';
const DepartmentsQueryKeys = {
  fetchDepartments: () => ['fetchtDepartments'],
};
const getDepartments = async () => {
  return await axiosInstance.get('/departments').then((res) => res.data);
};
export const useGetDepartments = () => {
  return useQuery<string[]>({
    queryKey: DepartmentsQueryKeys.fetchDepartments(),
    queryFn: () => getDepartments(),
  });
};
