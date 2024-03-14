import { calendarCategories, calendarStatuses } from '@/libs/constants';
import { faker } from '@faker-js/faker';
import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { CasesListPicker, TableCalendar } from './components';
import useNextWorkingDays from './hooks/use-next-working-days';
import { CalendarDataRow, Case } from './types';
export type FooterStatus = 'expanded' | 'collapsed';

export default () => {
  const workingDays = useNextWorkingDays();
  const [extendedCasesKey, setExtendedCasesKey] = useState<{
    date: string;
    category: string;
  }>({
    date: dayjs().add(1, 'day').format('DD/MM'),
    category: '',
  });

  const rows: CalendarDataRow[] = useMemo(() => {
    return calendarCategories.map((name) => {
      const dataDict: {
        [key: string]: Case[];
      } = {};
      workingDays.forEach((r) => {
        if (!dataDict[r.date]) {
          dataDict[r.date] = !r.isWeekend
            ? Array.from({ length: Math.floor(Math.random() * 22) }).map(() => ({
                caseNumber: faker.number.int({
                  min: 1000,
                  max: 9999,
                }),
                status: calendarStatuses[Math.floor(Math.random() * calendarStatuses.length)],
              }))
            : [];
        }
      });
      return {
        categoryName: name,
        data: dataDict,
      };
    });
  }, [workingDays]);
  const handleExtendedCasesKey = useCallback((val: { date: string; category: string }) => {
    setExtendedCasesKey(val);
  }, []);
  const cases = useMemo(() => {
    if (!extendedCasesKey || extendedCasesKey.category.length <= 0) return [];
    const rowForCases = rows.find((row) => row.categoryName === extendedCasesKey.category);
    return rowForCases ? rowForCases?.data[extendedCasesKey.date] : [];
  }, [extendedCasesKey, rows]);
  return (
    <Box
      sx={{
        padding: '1rem',
      }}
    >
      <Typography variant="h5" textTransform={'capitalize'}>
        Forfallsliste dokumenter
      </Typography>
      <Stack
        direction={'row'}
        sx={{
          paddingBlock: 4,
          paddingLeft: 0,
          maxheight: '518px',
          flexWrap: 'wrap',
        }}
      >
        <TableCalendar handleExtendedCasesKey={handleExtendedCasesKey} workingDays={workingDays} rows={rows} />
        {extendedCasesKey && extendedCasesKey.category.length > 0 && (
          <CasesListPicker
            dateRange={{ minDate: workingDays.at(0)?.date ?? '', maxDate: workingDays.at(-1)?.date ?? '' }}
            handleExtendedCasesKey={handleExtendedCasesKey}
            key={extendedCasesKey?.date ?? ''}
            cases={cases}
            extendedCasesKey={extendedCasesKey}
          />
        )}
      </Stack>
    </Box>
  );
};
