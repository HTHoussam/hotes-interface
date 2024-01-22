import { axiosInstance } from '@/configs/axios';
import { SaksReportSchemaType } from '@/libs/validationSchemas';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const createSaksReport = (data: SaksReportSchemaType) => {
  return axiosInstance.post('/saksreport', data);
};
export const useCreateSaksReport = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: (data: SaksReportSchemaType) => createSaksReport(data),
    onError() {
      toast.error("couldn't update");
    },
    onSuccess() {
      toast.success(t('settings.feedback.user.updated'));
    },
  });
};
