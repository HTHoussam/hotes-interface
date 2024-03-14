import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { formatNumberToNor } from '@/libs/helpers';
import { faker } from '@faker-js/faker';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { CashCoin, FiletypePdf } from 'react-bootstrap-icons';
import { FordringerType } from '../../types';
import DynamicCardHeader from '../custom/dynamic-card-header';

const Fordringer = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo<FordringerType[]>(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      date: dayjs(faker.date.anytime()).format('DD.MM.YYYY'),
      forfall: dayjs(faker.date.anytime()).format('DD.MM.YYYY'),
      foreldes: dayjs(faker.date.anytime()).format('DD.MM.YYYY'),
      belop: formatNumberToNor(Number(faker.number.bigInt())),
      kravet: faker.word.noun(),
      number: faker.database.mongodbObjectId(),
      pdf: faker.datatype.boolean(),
    }));
  }, []);
  const columns = useMemo<GridColDef<FordringerType>[]>(() => {
    return [
      {
        headerName: 'Nr',
        field: 'number',
        flex: 1,
      },
      {
        headerName: 'Pdf',
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
        headerName: 'Dato',
        field: 'date',
        flex: 1,
      },
      {
        headerName: 'Forfall',
        field: 'forfall',
        flex: 1,
      },
      {
        headerName: 'Foreldes',
        field: 'foreldes',
        flex: 1,
      },
      {
        headerName: 'Beløp',
        field: 'belop',
        flex: 1,
      },
      {
        headerName: 'Kravet gjelder',
        field: 'kravet',
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
      <DynamicCardHeader widgetId={widgetId} title={'Fordringer'} Icon={<CashCoin size={25} />} />
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
export default Fordringer;
