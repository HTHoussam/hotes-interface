import { useGetDepartments } from '@/apis/departments/queries';
import { useCreateSaksReport } from '@/apis/reports/mutation';
import { ControlledFormInput, FormInputDropdownBootstrap } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { SaksReportSchema, SaksReportSchemaType } from '@/libs/validationSchemas';
import { Box, Button, Checkbox, IconButton, Stack, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useCallback, useMemo } from 'react';
import { InfoCircle, XCircleFill } from 'react-bootstrap-icons';
import { Controller } from 'react-hook-form';

interface SaksReportProps {
  handleCloseModal: (val: boolean) => void;
}
const SaksReport = ({ handleCloseModal }: SaksReportProps) => {
  const { mutate: createSaksReport } = useCreateSaksReport();
  const { data: fetchedDepartments } = useGetDepartments();
  const { control, setValue, handleSubmit } = useEnhancedForm({
    schema: SaksReportSchema,
    defaultValues: {
      openCases: false,
      amountFrom: '',
      amountTo: '',
      caseManager: '',
      debtorNo: '',
      department: '',
      terminatedUntil: '',
      inSummary: false,
      terminatedFrom: '',
      sorting: '',
    },
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
      label: dep,
      value: dep,
    }));
  }, [fetchedDepartments]);
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
            <Typography>
              Her kan du søke på beløpsgrenser og/eller spesifikke avdelinger (oppdragsgivere).Noen av disse rapportene
              kan inneholde mye data og kan ta litt tid å få generert og lastet inn i din nettleser.Disse rapportene er
              et snap-shot av hvilke saker som ligger i KK2, så disse rapportene kan derfor endre seg fra dag til dag.
            </Typography>
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
                <InputLabel variant="body2">Belop fra:</InputLabel>
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
                <InputLabel variant="body2">Belop til:</InputLabel>
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
                <InputLabel variant="body2">Saksbenhandler:</InputLabel>
                <Box flex={1.5}>
                  <FormInputDropdownBootstrap
                    options={departmentsOptions}
                    control={control}
                    name="sorting"
                    title="Terabyte-test:"
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">Avdeling:</InputLabel>
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
                <InputLabel variant="body2">Debitor nr:</InputLabel>
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
                <InputLabel variant="body2">Avsluttet fra:</InputLabel>
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
                          label={'Avsluttet fra'}
                          format="YYYY-MM-DD"
                          name={name}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">Avsluttet til:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    control={control}
                    name={'terminatedUntil'}
                    render={({ field: { onChange, name } }) => {
                      return (
                        <DatePicker
                          sx={{
                            width: '100%',
                          }}
                          label={'Avsluttet til'}
                          format="YYYY-MM-DD"
                          name={name}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">Sortering:</InputLabel>
                <Box flex={1.5}>
                  <FormInputDropdownBootstrap
                    options={[
                      { label: 'first', value: 'first' },
                      { label: 'second', value: 'second' },
                      { label: 'third', value: 'third' },
                    ]}
                    control={control}
                    name="sorting"
                    title="dmeodme"
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">Summert:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    name={'inSummary'}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return <Checkbox checked={value} onChange={onChange} />;
                    }}
                  />
                </Box>
              </InputStack>
              <InputStack>
                <InputLabel variant="body2">Apne sake i nye vinduer:</InputLabel>
                <Box flex={1.5}>
                  <Controller
                    name={'openCases'}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return <Checkbox checked={value} onChange={onChange} />;
                    }}
                  />
                </Box>
              </InputStack>
            </StyledInputStack>
          </GridContainer>
        </form>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: 2,
            marginLeft: 'auto',
            maringTop: '2rem',
          }}
        >
          <Button onClick={() => handleCloseModal(false)} color="secondary">
            Cancel
          </Button>
          <Button type="submit" form="report-form">
            Submit
          </Button>
        </Stack>
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
