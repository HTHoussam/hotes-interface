import { useGetDepartments } from '@/apis/departments/queries';
import { useCreateSaksReport } from '@/apis/reports/mutation';
import { ActionsButton, ControlledFormInput, FormInputDropdown } from '@/components/common';
import { SaksReportSchema, SaksReportSchemaType } from '@/libs/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, IconButton, Stack, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useCallback, useEffect, useMemo } from 'react';
import { InfoCircle, XCircleFill } from 'react-bootstrap-icons';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface SaksReportProps {
  handleCloseModal: (val: boolean) => void;
}
const SaksReport = ({ handleCloseModal }: SaksReportProps) => {
  const { t } = useTranslation();
  const { mutate: createSaksReport } = useCreateSaksReport();
  const { data: fetchedDepartments } = useGetDepartments();
  const {
    control,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      openCases: false,
      amountFrom: '',
      amountTo: '',
      caseManager: '',
      debtorNo: '',
      department: fetchedDepartments?.[0].name,
      terminatedUntil: new Date(),
      inSummary: false,
      terminatedFrom: new Date(),
      sorting: 'third',
    },
    resolver: yupResolver(SaksReportSchema),
  });

  const onSubmit = useCallback(
    (formValues: SaksReportSchemaType) => {
      createSaksReport({
        ...formValues,
      });
    },
    [createSaksReport],
  );
  const departmentsOptions: { label: string; value: string }[] = useMemo(() => {
    if (!fetchedDepartments) return [];
    return fetchedDepartments.map((dep) => ({
      label: dep.name,
      value: dep.name,
    }));
  }, [fetchedDepartments]);

  useEffect(() => {
    if (!fetchedDepartments || fetchedDepartments.length <= 0) return;
    resetField('department', {
      defaultValue: fetchedDepartments[0].name,
    });
  }, [fetchedDepartments, resetField]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stack gap={4}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={'1rem'}>
          <InfoCircle size={40} />
          <Box
            sx={{
              maxWidth: '40rem',
              textWrap: 'wrap',
            }}
          >
            <Typography>{t('home.report.modal.form.saks.report.description')}</Typography>
          </Box>
        </Stack>
        <form
          id="report-form"
          onSubmit={handleSubmit(onSubmit, (error) => {
            console.log('errr', error);
          })}
        >
          <GridContainer>
            <StyledInputStack>
              <InputStack direction={'row'}>
                <InputLabel variant="body2">{t('home.report.modal.form.label.belopFra')}:</InputLabel>
                <Box flex={1.5}>
                  <ControlledFormInput
                    controllerProps={{ name: 'amountFrom', control }}
                    textFieldProps={{
                      InputProps: {
                        endAdornment: (
                          <IconButton
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              setValue('amountFrom', '');
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
                </Box>
              </InputStack>
              <InputStack direction={'row'}>
                <InputLabel variant="body2">{t('home.report.modal.form.label.belopTil')}:</InputLabel>
                <Box flex={1.5}>
                  <ControlledFormInput
                    controllerProps={{ name: 'amountTo', control }}
                    textFieldProps={{
                      InputProps: {
                        endAdornment: (
                          <IconButton
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              setValue('amountTo', '');
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
                </Box>
              </InputStack>

              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.saksbenhandler')}:</InputLabel>
                <Box flex={1.5}>
                  <FormInputDropdown
                    options={departmentsOptions}
                    control={control}
                    selectProps={{
                      fullWidth: true,
                      size: 'small',
                      MenuProps: {
                        sx: {
                          width: 'fit-content',
                          '.MuiPaper-root': {
                            overflow: 'auto',
                            maxHeight: '10rem',
                            scrollBehavior: 'smooth',
                          },
                        },
                      },
                    }}
                    name="department"
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.avdeling')}:</InputLabel>
                <Box flex={1.5}>
                  <ControlledFormInput
                    controllerProps={{ name: 'department', control }}
                    textFieldProps={{
                      InputProps: {
                        endAdornment: (
                          <IconButton
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              setValue('department', '');
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
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.debitornr')}:</InputLabel>
                <Box flex={1.5}>
                  <ControlledFormInput
                    controllerProps={{ name: 'debtorNo', control }}
                    textFieldProps={{
                      InputProps: {
                        endAdornment: (
                          <IconButton
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              setValue('debtorNo', '');
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
                </Box>
              </InputStack>
            </StyledInputStack>
            <StyledInputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.avsluttetFra')}:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    control={control}
                    name={'terminatedFrom'}
                    render={({ field: { onChange, name } }) => {
                      return (
                        <DatePicker
                          sx={{
                            width: '100%',
                          }}
                          label={t('home.report.modal.form.label.avsluttetFra')}
                          format="DD.MM.YYYY"
                          name={name}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.avsluttetTil')}:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    control={control}
                    name={'terminatedUntil'}
                    render={({ field: { onChange, name } }) => {
                      return (
                        <>
                          <DatePicker
                            sx={{
                              width: '100%',
                            }}
                            label={t('home.report.modal.form.label.avsluttetTil')}
                            format="DD.MM.YYYY"
                            name={name}
                            onChange={onChange}
                          />
                          {errors?.terminatedUntil?.message && (
                            <Typography color={'#d32f2f'} p={1}>
                              {errors?.terminatedUntil?.message}
                            </Typography>
                          )}
                        </>
                      );
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.sortering')}:</InputLabel>
                <Box flex={1.5}>
                  <FormInputDropdown
                    options={[
                      { label: 'first', value: 'first' },
                      { label: 'second', value: 'second' },
                      { label: 'third', value: 'third' },
                    ]}
                    control={control}
                    selectProps={{
                      fullWidth: true,
                      size: 'small',
                      MenuProps: {
                        sx: {
                          width: 'fit-content',
                          '.MuiPaper-root': {
                            overflow: 'auto',
                            maxHeight: '10rem',
                            scrollBehavior: 'smooth',
                          },
                        },
                      },
                    }}
                    name="sorting"
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.summert')}:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    name={'inSummary'}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          sx={{
                            '&.MuiButtonBase-root': {
                              p: 0,
                            },
                          }}
                          checked={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">{t('home.report.modal.form.label.apneSake')}:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    name={'openCases'}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          sx={{
                            '&.MuiButtonBase-root': {
                              p: 0,
                            },
                          }}
                          checked={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              </InputStack>
            </StyledInputStack>
          </GridContainer>
        </form>

        <ActionsButton
          discardTitle={t('home.report.modal.form.discard.button.title')}
          formId="report-form"
          handleDiscard={() => handleCloseModal(false)}
          submitTitle={t('home.report.modal.form.submit.button.title')}
        />
      </Stack>
    </LocalizationProvider>
  );
};
export default SaksReport;
const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto',
  fontWeight: '500',
}));
const StyledInputStack = styled(Stack)(() => ({
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-start',
}));
const InputLabel = styled(Typography)(() => ({
  flex: 0.75,
}));
const InputStack = styled(Stack)(() => ({
  width: '85%',
  alignItems: 'center',
  gap: 8,
  justifyContent: 'space-between',
  flexDirection: 'row',
}));
