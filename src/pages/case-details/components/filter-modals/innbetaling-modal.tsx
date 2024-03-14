import { ControlledFormInput, ModalWrapper } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
interface InnbetalingModalProps {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const AvsulttValidationSchema = yup.object({
  avsulttetDato: yup.date().required(),
  notat: yup.string(),
});
type AvsulttValidationType = yup.InferType<typeof AvsulttValidationSchema>;
const InnbetalingModal2 = ({ openModal, handleOpenState }: InnbetalingModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useEnhancedForm({
    schema: AvsulttValidationSchema,
    defaultValues: {
      avsulttetDato: new Date(),
      notat: '',
    },
  });
  const onSubmitHandler = (formValues: AvsulttValidationType) => {
    console.log('formValues', formValues);
    handleOpenState(false);
  };

  return (
    <ModalWrapper
      open={openModal}
      handleOpenState={handleOpenState}
      modalWidth={'800px'}
      title={'Innbetaling Modal'}
      actionStack={undefined}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction={'column'} gap={2}>
          <Stack direction={'row'}>
            <Typography flex={1 / 2}>Avslutter date:</Typography>
            <Controller
              name="avsulttetDato"
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
          </Stack>
          <Stack direction={'row'}>
            <Typography flex={1 / 2}>Notat:</Typography>

            <ControlledFormInput
              controllerProps={{
                name: 'notat',
                control: control,
              }}
              textFieldProps={{
                multiline: true,
                variant: 'filled',
                label: 'Notat',
                rows: 8,
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
export default InnbetalingModal2;
