import { ActionsButton, FormInputDropdownBootstrap } from '@/components/common';
import useEnhancedForm from '@/hooks/use-enhanced-form';
import { InnbetaligsSchema } from '@/libs/validationSchemas';
import { Stack, Typography, styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const InnbetaligsRapport = ({ handleCloseModal }: { handleCloseModal: (val: boolean) => void }) => {
  const { t } = useTranslation();
  const { control } = useEnhancedForm({
    schema: InnbetaligsSchema,
    defaultValues: {
      periodeFrom: new Date(),
      periodeUntil: new Date(),
      avdeling: '',
    },
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
                        format="YYYY-MM-DD"
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
                  name={'periodeFrom'}
                  render={({ field: { onChange, name } }) => {
                    return (
                      <DatePicker
                        sx={{
                          width: '100%',
                        }}
                        label={'Periode fra'}
                        format="YYYY-MM-DD"
                        name={name}
                        onChange={onChange}
                      />
                    );
                  }}
                />
              </RowFlex>
            </Stack>
            <RowFlex>
              <Typography
                sx={{
                  minWidth: '6rem',
                }}
                variant="body2"
              >
                {t('home.report.modal.form.label.avdeling')}:
              </Typography>
              <FormInputDropdownBootstrap
                options={[
                  {
                    label: 'dedee2',
                    value: 'dede5',
                  },
                  {
                    label: 'demd',
                    value: 'dede',
                  },
                ]}
                control={control}
                name="avdeling"
                title="Select"
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
