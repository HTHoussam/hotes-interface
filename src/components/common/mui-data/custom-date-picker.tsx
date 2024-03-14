import { FilterDateRanges, useOverviewFilterStore } from '@/stores/overview-filters-store';
import { Button, Stack, SxProps, Theme, styled } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
interface CustomDatePickerProps {
  handleCustomChanges?: (firstDate: Dayjs, endDate: Dayjs) => void;
  firstDate: Dayjs;
  secondDate: Dayjs;
  setSecondDate: Dispatch<SetStateAction<Dayjs>>;
  setFirstDate: Dispatch<SetStateAction<Dayjs>>;
}
const clickedButtonStyle = {
  backgroundColor: '#011043',
  color: 'white',
};
const desktopPropSX: SxProps<Theme> = {
  '& .MuiPickersDay-root': {
    height: '24px',
    width: '24px',
  },
  '& .MuiPickersLayout-contentWrapper': {
    maxWidth: '19rem',
    maxHeight: '16rem',
  },
  '& .MuiPickersCalendarHeader-root': {
    maxWidth: '15rem',
  },
  '& .MuiPickersFadeTransitionGroup-root': {
    maxWidth: '16rem',
  },
  '& .MuiPickersLayout-actionBar': {
    width: 'fit-content',
  },
  '& .MuiDataGrid-virtualScrollerContent': {
    width: '1606px !important',
  },

  '& .MuiYearCalendar-root': {
    width: '246px',
    maxHeight: '200px',
    paddingLeft: '14px',
  },
};

const CustomDatePicker = ({
  handleCustomChanges,
  firstDate: startDateRange,
  secondDate: endDateRange,
  setFirstDate,
  setSecondDate,
}: CustomDatePickerProps) => {
  const [monthChanged, setMonthChanged] = useState<Dayjs | string>('');
  const { setActiveDateFilterRange, activeDateFilterRange } = useOverviewFilterStore();

  const handleFirstPickerChange = useCallback(
    (value: Dayjs | null) => {
      if (value === null) return;
      if (value.isAfter(endDateRange)) {
        setFirstDate(value);
        setSecondDate(value.add(1, 'day'));
        if (handleCustomChanges) {
          handleCustomChanges(value, value.add(1, 'day'));
        }
        return;
      }
      setFirstDate(value);

      if (handleCustomChanges) {
        handleCustomChanges(value, endDateRange);
      }
      setActiveDateFilterRange('');
    },
    [endDateRange, setFirstDate, handleCustomChanges, setActiveDateFilterRange, setSecondDate],
  );
  const handleSecondPickerChange = useCallback(
    (value: Dayjs | null) => {
      if (value === null) return;
      if (value.isBefore(startDateRange)) {
        setSecondDate(value);
        setFirstDate(value.subtract(1, 'day'));
        if (handleCustomChanges) {
          handleCustomChanges(value.subtract(1, 'day'), value);
        }
        return;
      }
      setSecondDate(value);
      if (handleCustomChanges) {
        handleCustomChanges(startDateRange, value);
      }
      setActiveDateFilterRange('');
    },
    [startDateRange, setSecondDate, handleCustomChanges, setActiveDateFilterRange, setFirstDate],
  );
  const generateTimestampsBetween = (startDate: Dayjs, endDate: Dayjs) => {
    const timestampsArray: number[] = [];
    let currentDate = startDate.startOf('day');
    const end = endDate.startOf('day');

    while (currentDate.isBefore(end, 'day')) {
      timestampsArray.push(currentDate.valueOf());
      currentDate = currentDate.add(1, 'day');
    }
    return timestampsArray;
  };

  const allTimestampsBetween = useMemo(() => {
    return generateTimestampsBetween(startDateRange, endDateRange);
  }, [startDateRange, endDateRange]);

  useEffect(() => {
    if (!monthChanged) {
      return;
    }
    const buttonsWithTimestamps = document.querySelectorAll<HTMLButtonElement>('button[data-timestamp]');

    const timestampsSet = new Set(allTimestampsBetween);

    buttonsWithTimestamps.forEach((button) => {
      const timestamp = parseInt(button.dataset.timestamp ?? '');
      if (timestampsSet.has(timestamp)) {
        button.style.backgroundColor = '#011043';
        button.style.color = 'white';
      } else {
        button.style.backgroundColor = 'transparent';
        button.style.color = '#011043';
      }
    });
  }, [allTimestampsBetween, monthChanged]);

  const handleToggleDateFilterRange = (val: FilterDateRanges) => {
    setActiveDateFilterRange(activeDateFilterRange === val ? null : val);
  };
  const setLastNDays = (days: number) => {
    const endDate = dayjs(new Date());
    const startDate = endDate.subtract(days, 'day');
    setFirstDate(startDate);
    setSecondDate(endDate);
    handleToggleDateFilterRange('7days');
    if (handleCustomChanges) {
      handleCustomChanges(startDate, endDate);
    }
  };

  const setLastMonth = () => {
    const currentDate = dayjs(new Date());
    const endDate = currentDate.endOf('day');
    const startDate = currentDate.subtract(1, 'month').startOf('day');
    setFirstDate(startDate);
    setSecondDate(endDate);
    handleToggleDateFilterRange('lastMonth');
    if (handleCustomChanges) {
      handleCustomChanges(startDate, endDate);
    }
  };

  const setLastNMonths = (months: number) => {
    const currentDate = dayjs(new Date());
    const endDate = currentDate.endOf('day');
    const startDate = currentDate.subtract(months, 'month').startOf('day');
    setFirstDate(startDate);
    setSecondDate(endDate);
    handleToggleDateFilterRange(months === 3 ? 'last3Months' : 'last6Months');

    if (handleCustomChanges) {
      handleCustomChanges(startDate, endDate);
    }
  };

  const setLastYear = () => {
    const currentDate = dayjs(new Date());
    const endDate = currentDate.endOf('day');
    const startDate = currentDate.subtract(1, 'year').startOf('year');
    setFirstDate(startDate);
    setSecondDate(endDate);
    handleToggleDateFilterRange('lastYear');

    if (handleCustomChanges) {
      handleCustomChanges(startDate, endDate);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="no">
      <Stack direction={'column'} gap={4} paddingY={2} paddingX={2}>
        <DateTimePicker
          value={startDateRange}
          label="from"
          onChange={handleFirstPickerChange}
          format="DD.MM.YYYY"
          views={['year', 'day']}
          onMonthChange={(month) => {
            setMonthChanged(month);
          }}
          slotProps={{
            desktopTransition: {
              style: {
                width: '250px',
              },
            },
            calendarHeader: {
              sx: {
                maxWidth: '15rem',
              },
            },
            desktopPaper: {
              sx: {
                ...desktopPropSX,
              },
            },
            popper: {
              keepMounted: true,

              placement: 'bottom-end',
            },
          }}
        />
        <DateTimePicker
          value={endDateRange}
          views={['year', 'day']}
          label="to"
          onChange={handleSecondPickerChange}
          onMonthChange={(month) => {
            setMonthChanged(month);
          }}
          slotProps={{
            desktopTransition: {
              style: {
                width: '250px',
              },
            },
            calendarHeader: {
              sx: {
                maxWidth: '15rem',
              },
            },
            desktopPaper: {
              sx: {
                ...desktopPropSX,
              },
            },
            popper: {
              keepMounted: true,
              placement: 'bottom-start',
            },
          }}
          defaultValue={dayjs(new Date(1, 1, 2027))}
          format="DD.MM.YYYY"
        />
      </Stack>
      <Stack gap={1} p={4} alignItems={'center'} paddingBottom={1} paddingTop={0}>
        <StyledButton
          sx={activeDateFilterRange === '7days' ? clickedButtonStyle : {}}
          size="small"
          variant="outlined"
          onClick={() => setLastNDays(7)}
        >
          last 7 days
        </StyledButton>
        <StyledButton
          sx={activeDateFilterRange === 'lastMonth' ? clickedButtonStyle : {}}
          size="small"
          variant="outlined"
          onClick={() => setLastMonth()}
        >
          last month
        </StyledButton>
        <StyledButton
          sx={activeDateFilterRange === 'last3Months' ? clickedButtonStyle : {}}
          size="small"
          variant="outlined"
          onClick={() => setLastNMonths(3)}
        >
          last 3 months
        </StyledButton>
        <StyledButton
          sx={activeDateFilterRange === 'last6Months' ? clickedButtonStyle : {}}
          size="small"
          variant="outlined"
          onClick={() => setLastNMonths(6)}
        >
          last 6 months
        </StyledButton>
        <StyledButton
          sx={activeDateFilterRange === 'lastYear' ? clickedButtonStyle : {}}
          size="small"
          variant="outlined"
          onClick={() => setLastYear()}
        >
          last year
        </StyledButton>
      </Stack>
    </LocalizationProvider>
  );
};
export default CustomDatePicker;

const StyledButton = styled(Button)(() => ({
  height: '30px',
  width: '145px',
  paddingX: 2,
}));
