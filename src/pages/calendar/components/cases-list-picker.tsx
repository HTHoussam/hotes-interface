import { EllipseShape } from '@/components/common';
import { BlueScrollBarOverride, StatusColorMapper, calendarCategories } from '@/libs/constants';
import { IsWeekend } from '@/libs/helpers';
import { List, ListItem, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Case } from '../types';
interface CasesListPickerProps {
  cases: Case[];
  extendedCasesKey: {
    date: string;
    category: string;
  };
  handleExtendedCasesKey: (val: { date: string; category: string }) => void;
  dateRange: {
    minDate: string;
    maxDate: string;
  };
}

const CasesListPicker = ({ cases, extendedCasesKey, handleExtendedCasesKey, dateRange }: CasesListPickerProps) => {
  const navigate = useNavigate();
  const dateValue = useMemo(() => dayjs(extendedCasesKey.date, 'DD/MM'), [extendedCasesKey.date]);
  const [selectedCategory, setSelectedCategory] = useState(extendedCasesKey.category);
  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedCategory(value);
    handleExtendedCasesKey({
      date: extendedCasesKey.date,
      category: value,
    });
  };
  cases.sort((a, b) => a.caseNumber - b.caseNumber);

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        backgroundColor: 'rgba(238, 239, 240, 1)',
        padding: '8px',
        gap: 2,
        minWidth: '200px',
        marginTop: '2.575rem',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="no">
        <DatePicker
          minDate={dayjs(dateRange.minDate, 'DD/MM')}
          maxDate={dayjs(dateRange.maxDate, 'DD/MM')}
          disableHighlightToday
          onChange={(newDate) => {
            if (IsWeekend(newDate?.format('DD.MM.YYYY') ?? '')) {
              return;
            }
            handleExtendedCasesKey({
              ...extendedCasesKey,
              date: newDate?.format('DD/MM') ?? '',
            });
          }}
          defaultValue={dateValue}
          format="DD.MM.YYYY"
        />
        <Stack
          sx={{
            width: '100%',
            gap: 1,
            height: '34px',
          }}
          direction={'row'}
        >
          <Select
            sx={{
              flex: '1 1 auto',
              width: '50%',
            }}
            MenuProps={{
              sx: {
                maxWidth: 'fit-content',
                '.MuiPaper-root': {
                  overflow: 'auto',
                  maxHeight: '11rem',
                  scrollBehavior: 'smooth',
                },
              },
            }}
            size="small"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            {calendarCategories.map((cate) => (
              <MenuItem value={cate} key={cate}>
                {cate}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <List
          sx={{
            overflow: 'auto',
            maxHeight: '25rem',
            ...BlueScrollBarOverride,
          }}
        >
          {cases.map((r) => (
            <ListItem
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`/cases/${r.caseNumber}`);
              }}
              key={`${r.caseNumber}-${r.status}`}
            >
              <EllipseShape
                height={'11px'}
                width={'11px'}
                sx={{
                  backgroundColor: StatusColorMapper[r.status],
                }}
              />
              <Typography>Case {r.caseNumber}</Typography>
            </ListItem>
          ))}
        </List>
      </LocalizationProvider>
    </Stack>
  );
};
export default CasesListPicker;
