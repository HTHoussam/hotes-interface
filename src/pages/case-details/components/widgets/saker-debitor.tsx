import { SelectorChip } from '@/components/common';
import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { formatNumberToNor } from '@/libs/helpers';
import { faker } from '@faker-js/faker';
import { Box, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { PeopleFill } from 'react-bootstrap-icons';
import { SakerDebitorType } from '../../types';
import DynamicCardHeader from '../custom/dynamic-card-header';

const SakerDebitor = ({ widgetId }: { widgetId: string }) => {
  const data = useMemo<SakerDebitorType[]>(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      status: faker.word.words(),
      avd: formatNumberToNor(faker.number.float()),
      sak: faker.database.mongodbObjectId(),
      avsluttet: faker.word.words(),
      saldo: formatNumberToNor(Number(faker.number.bigInt())),
    }));
  }, []);
  const columns = useMemo<GridColDef<SakerDebitorType>[]>(() => {
    return [
      {
        headerName: 'Sak',
        field: 'sak',
        flex: 1,
      },
      {
        headerName: 'Avd',
        field: 'avd',
        flex: 1,
      },
      {
        headerName: 'saldo',
        field: 'saldo',
        flex: 1,
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
      },
      {
        headerName: 'avsluttet',
        field: 'avsluttet',
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
      gap={2}
      direction={'column'}
    >
      <DynamicCardHeader widgetId={widgetId} title={'Saker tilhøyrande debitor'} Icon={<PeopleFill size={25} />} />
      <Box
        sx={{
          marginLeft: 'auto',
          padding: '0.5rem',
        }}
      >
        <SelectorChip
          options={[
            {
              title: 'Active',
              value: 'Active',
            },
            {
              title: 'Inactive',
              value: 'Inactive',
            },
          ]}
          onChange={() => {}}
          statusesCounts={{ Active: 2, Inactive: 4 }}
          extraSX={{
            minWidth: '19rem',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 'fill-available',
          paddingBottom: '6rem',
        }}
      >
        <GenericReadTable data={data} columns={columns} />
      </Box>
    </Stack>
  );
};
export default SakerDebitor;
