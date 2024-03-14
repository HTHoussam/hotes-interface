import { ControlledFormInput, FormInputDropdown, ModalWrapper } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { InferType } from 'yup';
interface NotatModalProps {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const NotatValidationSchema = yup.object({
  notat: yup.string().required(),
  utsettDato: yup.date().required(),
  customer: yup.string().optional(),
});
type NotatValidationType = InferType<typeof NotatValidationSchema>;
const NotatModal = ({ openModal, handleOpenState }: NotatModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useEnhancedForm({
    schema: NotatValidationSchema,
    defaultValues: {
      customer: '',
      notat: '',
      utsettDato: new Date(),
    },
  });
  const onSubmitHandler = (formValues: NotatValidationType) => {
    console.log('formValues', formValues);
    handleOpenState(false);
  };

  return (
    <ModalWrapper
      open={openModal}
      handleOpenState={handleOpenState}
      modalWidth={'870px'}
      title={'Notat modal'}
      actionStack={undefined}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction={'column'} gap={4}>
          <Stack direction={'row'}>
            <Typography flex={1 / 4}>Notat:</Typography>
            <ControlledFormInput
              controllerProps={{
                name: 'notat',
                control: control,
              }}
              textFieldProps={{
                multiline: true,
                variant: 'filled',
                label: 'Notat',
                rows: 6,
                sx: {
                  flex: 1,
                },
              }}
            />
          </Stack>
          <Stack direction={'row'} gap={2}>
            <Typography
              sx={{
                flex: 1 / 3,
              }}
            >
              Notat:
            </Typography>
            <Controller
              name="utsettDato"
              control={control}
              render={({ field }) => {
                return (
                  <DatePicker
                    sx={{
                      flex: 1,
                    }}
                    label="Avsulttet Dato"
                    onChange={field.onChange}
                  />
                );
              }}
            />
            <FormInputDropdown
              control={control}
              name="customer"
              options={[
                { label: 'customer1', value: 'customer1' },
                { label: 'customer2', value: 'customer2' },
                { label: 'customer1', value: 'customer3' },
              ]}
              defaultValue={'customer1'}
              selectProps={{
                sx: {
                  flex: 1,
                },
              }}
            />
          </Stack>
          <Stack direction={'row'} gap={1} marginLeft={'auto'}>
            <Button
              color="secondary"
              type="button"
              onClick={() => {
                handleOpenState(false);
              }}
            >
              {t('common.button.discard')}
            </Button>
            <Button type="submit">{t('common.button.submit')}</Button>
          </Stack>
        </Stack>
      </form>
    </ModalWrapper>
  );
};
export default NotatModal;
