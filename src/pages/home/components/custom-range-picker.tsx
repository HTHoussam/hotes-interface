import { useOverviewFilterStore } from '@/stores/overview-filters-store';
import { Stack, SxProps, Theme } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
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

  return (
    <Stack direction={'row'} gap={4} paddingX={2}>
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
  );
};
export default CustomDatePicker;
