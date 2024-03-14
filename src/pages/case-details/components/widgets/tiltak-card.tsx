import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { faker } from '@faker-js/faker';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { Activity, FiletypePdf, Trash } from 'react-bootstrap-icons';
import DynamicCardHeader from '../custom/dynamic-card-header';

const TiltakCardActions = memo(() => {
  return (
    <Stack gap={2} direction={'row'}>
      <Button size="small">PUR</Button>
      <Button size="small">418</Button>
      <Button size="small">Dok.Pakke</Button>
      <Button size="small">Festesalg</Button>
    </Stack>
  );
});
const TiltakCard = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      tiltak: faker.word.words(),
      PDF: faker.word.words(),
      betegnelse: faker.helpers.arrayElement(['active', 'inactive', 'pending', 'closed']).toString(),
      saksbehandlar: faker.word.words(),
      dato: dayjs(
        faker.date.between({
          from: new Date(2023, 1, 12),
          to: new Date(2024, 4, 12),
        }),
      ).format('DD.MM.YYYY'),

      forfall: faker.number.int({
        min: 200,
        max: 23000000,
      }),
      forkynnt: faker.number.int({
        max: 100000,
      }),
      halde: faker.number.int({
        min: 0,
        max: 20,
      }),
      forsending: faker.number.int({
        max: 2000,
      }),
      slett: faker.number.int({
        max: 1000,
      }),
    }));
  }, []);
  const columns = useMemo<GridColDef<(typeof data)[0]>[]>(() => {
    return [
      {
        headerName: 'Tiltak',
        field: 'tiltak',
        flex: 1,
      },
      {
        headerName: 'PDF',
        field: 'pdf',
        flex: 1,
        renderCell() {
          return (
            <IconButton>
              <FiletypePdf size={15} />
            </IconButton>
          );
        },
      },
      {
        headerName: 'Betegnelse',
        field: 'betegnelse',
        flex: 1,
      },
      {
        headerName: 'Saksbehandlar',
        field: 'saksbehandlar',
        flex: 1,
      },
      {
        headerName: 'Dato',
        field: 'dato',
        flex: 1,
      },
      {
        headerName: 'Forfall',
        field: 'forfall',
        flex: 1,
      },
      {
        headerName: 'Forkynnt',
        field: 'forkynnt',
        flex: 1,
      },
      {
        headerName: 'Halde',
        field: 'halde',
        flex: 1,
      },
      {
        headerName: 'Forsending',
        field: 'forsending',
        flex: 1,
      },
      {
        headerName: 'Slett',
        field: 'slett',
        flex: 1,
        renderCell() {
          return (
            <IconButton>
              <Trash size={15} color="rgba(225, 0, 0, 1)" />
            </IconButton>
          );
        },
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
      <DynamicCardHeader
        widgetId={widgetId}
        title={'Tiltak'}
        Icon={<Activity size={22} />}
        CurrentCardActions={<TiltakCardActions />}
      />
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

export default TiltakCard;
