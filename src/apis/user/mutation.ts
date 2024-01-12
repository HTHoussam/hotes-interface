import { axiosInstance } from '@/configs/axios';
import { User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const updateUser = (data: User) => {
  return axiosInstance.put(`/users/${data.id}`, {
    ...data,
  });
};
export const useUpdateUser = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: User) => updateUser(data),
    onError() {
      toast.error("couldn't update");
    },
    onSuccess() {
      toast.success(t('settings.feedback.user.updated'));
    },
  });
};

type UserCreate = Omit<User, 'id'>;

const createUser = (data: UserCreate) => {
  return axiosInstance.post(`/users`, data);
};
export const useCreateUser = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: UserCreate) => createUser(data),
    onError() {
      toast.error("couldn't update");
    },
    onSuccess() {
      toast.success(t('settings.feedback.user.updated'));
    },
  });
};
