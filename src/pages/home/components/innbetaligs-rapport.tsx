import { ActionsButton, FormInputDropdown } from '@/components/common';
import { InnbetaligsSchema } from '@/libs/validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
const InnbetaligsRapport = ({ handleCloseModal }: { handleCloseModal: (val: boolean) => void }) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      periodeFrom: new Date(),
      periodeUntil: new Date(),
      avdeling: 'test2',
    },
    resolver: yupResolver(InnbetaligsSchema),
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stack paddingInline={2} paddingBlock={4}>
        <form id="InnbetaligsRapport-form">
          <Stack direction={'column'} gap={4} alignItems={'flex-start'}>
            <Stack direction={'row'} gap={'3rem'}>
              <RowFlex>
                <Typography
                  sx={{
                    minWidth: '6rem',
                  }}
                  variant="body2"
                >
                  Periode fra:
                </Typography>
                <Controller
                  control={control}
                  name={'periodeFrom'}
                  render={({ field: { onChange, name } }) => {
                    return (
                      <DatePicker
                        sx={{
                          width: '100%',
                        }}
                        label={'Periode fra'}
                        format="DD.MM.YYYY"
                        name={name}
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </RowFlex>
              <RowFlex>
                <Typography
                  sx={{
                    minWidth: '6rem',
                  }}
                  variant="body2"
                >
                  {t('home.report.modal.form.innbetaligs.label.periodeTil')}:
                </Typography>
                <Controller
                  control={control}
                  name={'periodeUntil'}
                  render={({ field: { onChange, name } }) => {
                    return (
                      <>
                        <DatePicker
                          sx={{
                            width: '100%',
                          }}
                          label={'Periode fra'}
                          format="DD.MM.YYYY"
                          name={name}
                          onChange={onChange}
                        />
                        {errors?.periodeUntil?.message && (
                          <Typography color={'#d32f2f'} p={1}>
                            {errors?.periodeUntil?.message}
                          </Typography>
                        )}
                      </>
                    );
                  }}
                />
              </RowFlex>
            </Stack>
            <RowFlex
              sx={{
                width: '34%',
              }}
            >
              <Typography
                sx={{
                  minWidth: '6rem',
                }}
                variant="body2"
              >
                {t('home.report.modal.form.label.avdeling')}:
              </Typography>
              <FormInputDropdown
                options={[
                  {
                    label: 'test1',
                    value: 'test1',
                  },
                  {
                    label: 'test2',
                    value: 'test2',
                  },
                  {
                    label: 'test3',
                    value: 'test3',
                  },
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
                name="avdeling"
              />
            </RowFlex>
          </Stack>
        </form>
        <ActionsButton
          discardTitle={t('home.report.modal.form.discard.button.title')}
          formId="InnbetaligsRapport-form"
          handleDiscard={() => {
            handleCloseModal(false);
          }}
          submitTitle={t('home.report.modal.form.submit.button.title')}
        />
      </Stack>
    </LocalizationProvider>
  );
};
export default InnbetaligsRapport;

const RowFlex = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
}));
