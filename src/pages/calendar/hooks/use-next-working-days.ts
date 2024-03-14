import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import { WorkingDay } from '../types';

dayjs.extend(customParseFormat);

const useNextWorkingDays: () => WorkingDay[] = () => {
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([]);

  useEffect(() => {
    const getNextWorkingDays = () => {
      const today = dayjs();
      const nextWorkingDays = [];

      let currentDate = today.add(1, 'day');

      while (nextWorkingDays.length <= 13) {
        if (currentDate.day() >= 1 && currentDate.day() <= 5) {
          nextWorkingDays.push({
            date: currentDate.format('DD/MM'),
            isWeekend: false,
          });
        } else {
          nextWorkingDays.push({
            date: currentDate.format('DD/MM'),
            isWeekend: true,
          });
        }

        currentDate = currentDate.add(1, 'day');
      }

      return nextWorkingDays;
    };

    setWorkingDays(getNextWorkingDays());
  }, []);

  return workingDays;
};

export default useNextWorkingDays;
