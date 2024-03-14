import { ControlledFormInput, FormInputDropdown, ModalWrapper, StyledTooltip } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
interface NytNotatModal {
  openModal: boolean;
  handleOpenState: (val: boolean) => void;
}
const NyNotatSchema = yup.object({
  behandlingsterskel: yup.string(),
  avdeling: yup.string(),
  saksnummer: yup.string(),
  saksnummerHos: yup.string(),
  utregningsmetode: yup.string(),
  renter: yup.string().optional(),
  avtalt: yup.string().optional(),
});
type NyNotatValidationType = yup.InferType<typeof NyNotatSchema>;
const SaksvalgModal = ({ openModal, handleOpenState }: NytNotatModal) => {
  const { t } = useTranslation();
  const { handleSubmit, control, setValue } = useEnhancedForm({
    schema: NyNotatSchema,
    defaultValues: {
      behandlingsterskel: '',
      avdeling: '',
      saksnummer: '',
      saksnummerHos: '',
      utregningsmetode: '',
      renter: '',
      avtalt: '',
    },
  });
  const onSubmitHandler = useCallback((formValues: NyNotatValidationType) => {
    console.log('formValues', formValues);
  }, []);
  const renderActionStack = useCallback(() => {
    return (
      <Stack direction={'row'} marginTop={'2.5rem'} justifyContent={'space-between'}>
        <StyledTooltip title={'Overfor Sak Til Terabyte Test'}>
          <Button>
            <img
              alt="share"
              src="/imgs/vector.png"
              style={{
                marginRight: '0.5rem',
              }}
            />
            Terabyte Test
          </Button>
        </StyledTooltip>
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
      </Stack>
    );
  }, [handleOpenState, t]);
  return (
    <ModalWrapper open={openModal} handleOpenState={handleOpenState} modalWidth={'1000px'} title={'Opprett fordring'}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography>Behandlingsterskel:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <ControlledFormInput
                      controllerProps={{
                        name: 'behandlingsterskel',
                        control: control,
                      }}
                      textFieldProps={{
                        sx: {
                          '.MuiInputBase-root': {
                            maxWidth: '200px',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <IconButton
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                setValue('behandlingsterskel', '');
                              }}
                            >
                              <XCircleFill size={15} />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography>avdeling:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <ControlledFormInput
                      controllerProps={{
                        name: 'avdeling',
                        control: control,
                      }}
                      textFieldProps={{
                        sx: {
                          '.MuiInputBase-root': {
                            maxWidth: '200px',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <IconButton
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                setValue('avdeling', '');
                              }}
                            >
                              <XCircleFill size={15} />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography>Saksnummer i tingrett:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <ControlledFormInput
                      controllerProps={{
                        name: 'saksnummer',
                        control: control,
                      }}
                      textFieldProps={{
                        sx: {
                          '.MuiInputBase-root': {
                            maxWidth: '200px',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <IconButton
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                setValue('saksnummer', '');
                              }}
                            >
                              <XCircleFill size={15} />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography>Saksnummer hos namsmann:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <ControlledFormInput
                      controllerProps={{
                        name: 'saksnummerHos',
                        control: control,
                      }}
                      textFieldProps={{
                        sx: {
                          '.MuiInputBase-root': {
                            maxWidth: '200px',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <IconButton
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                setValue('saksnummerHos', '');
                              }}
                            >
                              <XCircleFill size={15} />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item xs={5}>
                    <Typography>Utregningsmetode:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <ControlledFormInput
                      controllerProps={{
                        name: 'utregningsmetode',
                        control: control,
                      }}
                      textFieldProps={{
                        sx: {
                          '.MuiInputBase-root': {
                            maxWidth: '200px',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <IconButton
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                setValue('utregningsmetode', '');
                              }}
                            >
                              <XCircleFill size={15} />
                            </IconButton>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Stack gap={2}>
              <FormInputDropdown
                name="renter"
                options={[
                  { label: 'customer1', value: 'customer1' },
                  { label: 'customer2', value: 'customer2' },
                  { label: 'customer3', value: 'customer3' },
                ]}
                control={control}
                selectProps={{
                  value: 'customer1',
                  size: 'small',
                  sx: {
                    width: 202,
                  },
                  MenuProps: {
                    sx: {
                      '.MuiPaper-root': {
                        width: 'fit-content',
                      },
                    },
                  },
                }}
              />
              <Box>
                <Typography>Avtalt rentesats:</Typography>
                <ControlledFormInput
                  controllerProps={{
                    name: 'avtalt',
                    control: control,
                  }}
                  textFieldProps={{
                    sx: {
                      '.MuiInputBase-root': {
                        maxWidth: '200px',
                      },
                    },
                    InputProps: {
                      endAdornment: (
                        <IconButton
                          sx={{
                            p: 0,
                          }}
                          onClick={() => {
                            setValue('avtalt', '');
                          }}
                        >
                          <XCircleFill size={15} />
                        </IconButton>
                      ),
                    },
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {renderActionStack()}
      </form>
    </ModalWrapper>
  );
};
export default SaksvalgModal;
