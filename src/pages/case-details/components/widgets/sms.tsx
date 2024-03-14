import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { faker } from '@faker-js/faker';
import { Box, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ChatDots } from 'react-bootstrap-icons';
import DynamicCardHeader from '../custom/dynamic-card-header';

const Sms = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      dato: dayjs(
        faker.date.between({
          from: new Date(2023, 1, 12),
          to: new Date(2024, 4, 12),
        }),
      ).format('DD.MM.YYYY'),

      melding: faker.number.int({
        min: 200,
        max: 23000000,
      }),
    }));
  }, []);
  const columns = useMemo<GridColDef<(typeof data)[0]>[]>(() => {
    return [
      {
        headerName: 'Dato',
        field: 'dato',
        flex: 1,
      },
      {
        headerName: 'Melding',
        field: 'melding',
        flex: 1,
      },
    ];
  }, []);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        paddingBottom: '6rem',
      }}
    >
      <DynamicCardHeader widgetId={widgetId} title={'SMS'} Icon={<ChatDots size={22} />} />
      <Box
        sx={{
          width: '100%',
          height: 'fill-available',
        }}
      >
        <GenericReadTable data={data} columns={columns} />
      </Box>
    </Stack>
  );
};

export default Sms;
