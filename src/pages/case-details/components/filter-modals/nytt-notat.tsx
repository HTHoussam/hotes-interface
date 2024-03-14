import { ControlledFormInput, FormInputDropdown, ModalWrapper } from '@/components/common';
import PdfDropzone from '@/components/common/pdf-dropzone';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useCallback } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
interface NytNotatModal {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const NyNotatSchema = yup.object({
  notat: yup.string(),
  utsuttDato: yup.date(),
  customer: yup.string(),
});
type NyNotatValidationType = yup.InferType<typeof NyNotatSchema>;
const NytNotatModal = ({ openModal, handleOpenState }: NytNotatModal) => {
  const { t } = useTranslation();
  const { handleSubmit, control, setValue } = useEnhancedForm({
    schema: NyNotatSchema,
    defaultValues: {
      notat: '',
      utsuttDato: new Date(),
      customer: '',
    },
  });
  const onSubmitHandler = useCallback((formValues: NyNotatValidationType) => {
    console.log('formValues', formValues);
  }, []);
  const renderActionStack = useCallback(() => {
    return (
      <Stack direction={'row'} gap={1} marginLeft={'auto'} width={'fit-content'}>
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
    );
  }, [handleOpenState, t]);
  return (
    <ModalWrapper open={openModal} handleOpenState={handleOpenState} modalWidth={'870px'} title={'Nytt Notat'}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction={'column'} gap={2}>
          <Stack direction={'row'} gap={4}>
            <Typography width={'10%'}>Notat:</Typography>
            <ControlledFormInput
              controllerProps={{
                name: 'notat',
                control: control,
              }}
              textFieldProps={{
                multiline: true,
                variant: 'filled',
                rows: 10,
                sx: {
                  flex: 1,
                },
                InputProps: {
                  endAdornment: (
                    <IconButton
                      sx={{
                        p: 0,
                      }}
                      onClick={() => {
                        setValue('notat', '');
                      }}
                    >
                      <XCircleFill size={15} />
                    </IconButton>
                  ),
                },
              }}
            />
          </Stack>
          <Stack direction={'row'} gap={4}>
            <Typography width={'10%'}>PDF:</Typography>
            <PdfDropzone setValue={setValue} />
          </Stack>
          <Stack direction={'row'} alignItems={'center'} gap={4}>
            <Typography>Utsett til dato:</Typography>
            <Controller
              name="utsuttDato"
              control={control}
              render={({ field }) => {
                return <DatePicker onChange={field.onChange} />;
              }}
            />
            <FormInputDropdown
              name="customer"
              options={[
                {
                  label: 'customer1',
                  value: 'customer1',
                },
                {
                  label: 'customer2',
                  value: 'customer2',
                },
                {
                  label: 'customer3',
                  value: 'customer3',
                },
              ]}
              control={control}
              selectProps={{
                size: 'small',
                MenuProps: {
                  sx: {
                    '.MuiPaper-root': {
                      width: 'fit-content',
                    },
                  },
                },
              }}
            />
          </Stack>
        </Stack>
        {renderActionStack()}
      </form>
    </ModalWrapper>
  );
};
export default NytNotatModal;
