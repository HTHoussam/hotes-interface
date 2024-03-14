import { ControlledFormInput, ModalWrapper } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { XCircleFill } from 'react-bootstrap-icons';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
interface ForeldelseModalProps {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const ProsesstrinnSchema = yup.object({
  prosesstrinn: yup.string().required(),
  dokumentvariant: yup.string().required(),
  dato: yup.date(),
  forfall: yup.date(),
  gjelder: yup.string(),
});
type ProsesstrinnValidationType = yup.InferType<typeof ProsesstrinnSchema>;
const ProsesstrinnModal = ({ openModal, handleOpenState }: ForeldelseModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useEnhancedForm({
    schema: ProsesstrinnSchema,
    defaultValues: {
      prosesstrinn: '',
      dato: new Date(),
      dokumentvariant: '',
      forfall: new Date(),
      gjelder: '',
    },
  });
  const onSubmitHandler = (formValues: ProsesstrinnValidationType) => {
    console.log('formValues', formValues);
    handleOpenState(false);
  };

  return (
    <ModalWrapper
      open={openModal}
      handleOpenState={handleOpenState}
      modalWidth={'870px'}
      title={'Velg Prosesstrinn'}
      actionStack={undefined}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack direction={'column'} gap={2}>
          <Stack direction={'row'} gap={4}>
            <Stack direction={'column'} flex={1} gap={1}>
              <Typography flex={1 / 2}>Prosesstrin:</Typography>
              <ControlledFormInput
                controllerProps={{
                  name: 'prosesstrinn',
                  control: control,
                }}
                textFieldProps={{
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
                          setValue('prosesstrinn', '');
                        }}
                      >
                        <XCircleFill size={15} />
                      </IconButton>
                    ),
                  },
                }}
              />
            </Stack>
            <Stack direction={'column'} flex={1} gap={1}>
              <Typography flex={1 / 2}>Dokumentvariant:</Typography>

              <ControlledFormInput
                controllerProps={{
                  name: 'dokumentvariant',
                  control: control,
                }}
                textFieldProps={{
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
                          setValue('dokumentvariant', '');
                        }}
                      >
                        <XCircleFill size={15} />
                      </IconButton>
                    ),
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={4}>
            <Stack flex={1}>
              <Typography>Dato:</Typography>
              <Controller
                name="dato"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      sx={{
                        flex: 1,
                      }}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Stack>
            <Stack flex={1}>
              <Typography>Forfall:</Typography>
              <Controller
                name="forfall"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      sx={{
                        flex: 1,
                      }}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={'column'}>
            <Typography>Gjelder:</Typography>
            <ControlledFormInput
              controllerProps={{
                name: 'gjelder',
                control: control,
              }}
              textFieldProps={{
                multiline: true,
                variant: 'filled',
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
export default ProsesstrinnModal;
