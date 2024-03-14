import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BookmarkCheck } from 'react-bootstrap-icons';
import { NotaterType } from '../../types';
import DynamicCardHeader from '../custom/dynamic-card-header';
const Notater = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo<NotaterType[]>(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      dato: dayjs(faker.date.anytime()).format('DD.MM.YYYY'),
      notat: faker.word.words(),
      forfall: faker.word.words(),
    }));
  }, []);
  const columns = useMemo<GridColDef<NotaterType>[]>(() => {
    return [
      {
        headerName: 'Dato',
        field: 'dato',
        flex: 1,
      },
      {
        headerName: 'Notat',
        field: 'notat',
        flex: 1,
      },
      {
        headerName: 'Forfall',
        field: 'forfall',
        flex: 1,
      },
    ];
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        paddingBottom: '6rem',
      }}
    >
      <DynamicCardHeader widgetId={widgetId} title={'Notater'} Icon={<BookmarkCheck size={25} />} />
      <Box
        sx={{
          width: '100%',
          height: 'fill-available',
        }}
      >
        <GenericReadTable data={data} columns={columns} />
      </Box>
    </Box>
  );
};
export default Notater;
