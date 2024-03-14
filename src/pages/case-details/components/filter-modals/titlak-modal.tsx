import { ControlledFormInput, ModalWrapper } from '@/components/common';
import { FormCheckboxControlled } from '@/components/common/controlled-inputs';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { XCircleFill } from 'react-bootstrap-icons';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
interface InnbetalingModalProps {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const AvsulttValidationSchema = yup.object({
  belop: yup.string(),
  tekst: yup.string(),
  avsulttetDato: yup.date().required(),
  skal: yup.boolean().default(false),
});

type AvsulttValidationType = yup.InferType<typeof AvsulttValidationSchema>;

const InnbetalingModal = ({ openModal, handleOpenState }: InnbetalingModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue } = useEnhancedForm({
    schema: AvsulttValidationSchema,
    defaultValues: {
      avsulttetDato: new Date(),
      belop: '',
      tekst: '',
      skal: false,
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
      modalWidth={'870px'}
      title={'Registrer Innbetaling'}
      actionStack={undefined}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container rowSpacing={4} columnSpacing={4}>
          <Grid item xs={6}>
            <Stack direction={'row'}>
              <Typography flex={1 / 2}>Beløp må fylles ut:</Typography>

              <ControlledFormInput
                controllerProps={{
                  name: 'belop',
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
                          setValue('belop', '');
                        }}
                      >
                        <XCircleFill size={15} />
                      </IconButton>
                    ),
                  },
                  fullWidth: true,
                  size: 'small',
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction={'row'}>
              <Typography flex={1 / 2}>Tekst:</Typography>
              <ControlledFormInput
                controllerProps={{
                  name: 'tekst',
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
                          setValue('belop', '');
                        }}
                      >
                        <XCircleFill size={15} />
                      </IconButton>
                    ),
                  },
                  fullWidth: true,
                  size: 'small',
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6} container>
            <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
              <Typography flex={1 / 2}>Avslutter dato:</Typography>
              <Controller
                name="avsulttetDato"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      sx={{
                        flex: 1,
                        width: '100%',
                      }}
                      label="Avsulttet Dato"
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
              <FormCheckboxControlled
                controllerProps={{
                  name: 'skal',
                  control: control,
                }}
                checkBoxProps={{
                  size: 'small',
                }}
              />
              <Typography flex={1 / 2}>Skal ikke bokfores</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction={'row'} mt={'2rem'} gap={1} marginLeft={'auto'}>
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
      </form>
    </ModalWrapper>
  );
};
export default InnbetalingModal;
