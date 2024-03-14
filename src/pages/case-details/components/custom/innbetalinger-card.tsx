import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { CurrencyExchange } from 'react-bootstrap-icons';
import { Innbetalinger } from '../../types';
import DynamicCardHeader from './dynamic-card-header';
const InnbetalingerCard = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo<Innbetalinger[]>(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      dato: dayjs(faker.date.anytime()).format('DD.MM.YYYY'),
      saksbehandler: faker.word.words(),
      registrert: faker.word.words(),
      betalt: faker.word.words(),
      hovudstol: faker.word.words(),
      salær_omkostnader: faker.word.words(),
      renter: faker.word.words(),
      bokført: faker.word.words(),
      tekst: faker.word.words(),
    }));
  }, []);
  const columns = useMemo<GridColDef<Innbetalinger>[]>(() => {
    return [
      {
        headerName: 'Dato',
        field: 'dato',
        flex: 1,
      },
      {
        headerName: 'Saksbehandler',
        field: 'saksbehandler',
        flex: 1,
      },
      {
        headerName: 'Registrert',
        field: 'registrert',
        flex: 1,
      },
      {
        headerName: 'Betalt',
        field: 'betalt',
        flex: 1,
      },
      {
        headerName: 'Hovudstol',
        field: 'hovudstol',
        flex: 1,
      },
      {
        headerName: 'Salær/omkostnader',
        field: 'salær_omkostnader',
        flex: 1,
      },
      {
        headerName: 'Renter',
        field: 'renter',
        flex: 1,
      },
      {
        headerName: 'Bokført',
        field: 'bokført',
        flex: 1,
      },
      {
        headerName: 'Tekst',
        field: 'tekst',
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
      <DynamicCardHeader widgetId={widgetId} title={'Innbetalinger'} Icon={<CurrencyExchange size={25} />} />
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
export default InnbetalingerCard;
