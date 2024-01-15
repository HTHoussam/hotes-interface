import { axiosInstance } from '@/configs/axios';
import { useQuery } from '@tanstack/react-query';

const CustomersKeys = {
  fetchCustomers: () => ['fetchCustomers'],
};
interface Customer {
  name: string;
  id: string;
  role: string;
}
const getCustomers = async () => {
  return await axiosInstance.get<Customer[]>('/customers').then((res) => res.data);
};
export const useGetCustomers = () => {
  return useQuery({
    queryKey: CustomersKeys.fetchCustomers(),
    queryFn: () => getCustomers(),
  });
};
