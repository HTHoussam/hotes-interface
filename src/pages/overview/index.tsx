import { useGetOverviewById } from '@/apis/overview/queries';
import { InvertColorCard, SelectorChip } from '@/components/common';
import { GenericCard, GenericDataTable } from '@/components/common/mui-data';
import { formatNumber } from '@/libs/helpers';
import { faker } from '@faker-js/faker';
import { Box, IconButton, Stack, Typography, styled } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BoxArrowUpRight, Folder2Open } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import FolderSelect from './components/folder-select';

export default () => {
  const { element } = useParams();
  const { data: fetchedData } = useGetOverviewById(String(element));
  const sectorsDetails = useMemo(() => {
    return [
      {
        title: 'sum principal',
        value: 3456,
      },
      {
        title: 'total cost',
        value: 127446,
        id: 'utleggstrekk',
      },
      {
        title: 'sum fee',
        value: 8123,
      },
      {
        title: 'sum interest',
        value: 56,
      },
      {
        title: 'sum paid',
        value: 346,
      },
      {
        title: 'sum total balance',
        value: 6486,
      },
    ];
  }, []);
  const data = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: faker.word.words(),
      case: faker.number.int({
        min: 1000,
        max: 9999,
      }),
      status: faker.number.int({
        min: 0,
        max: 1,
      }),
      lastAction: faker.word.sample({
        length: 4,
      }),
      dateForAction: dayjs(new Date(faker.date.anytime())).format('DD.MM.YYYY'),
      principalAmount: faker.number.int({
        min: 200,
        max: 23000000,
      }),
      cost: faker.number.int({
        max: 100000,
      }),
      fee: faker.number.int({
        max: 99,
      }),
      interest: faker.number.int({
        max: 2000,
      }),
      paid: faker.number.int({
        max: 1000,
      }),
      balance: faker.number.int(),
      caseManager: faker.person.fullName(),
    }));
  }, []);
  const columns = useMemo<GridColDef<(typeof data)[0]>[]>(() => {
    return [
      {
        headerName: 'case',
        field: 'case',
        flex: 1,
        renderCell({ value }) {
          return (
            <Stack direction={'row'} gap={2} alignItems={'baseline'}>
              <IconButton
                sx={{
                  fontWeight: '800',
                }}
              >
                <BoxArrowUpRight size={18} />
              </IconButton>
              <Typography fontSize={'15px'} fontWeight={'500'} color={'rgba(13, 110, 253, 1)'}>
                {value}
              </Typography>
            </Stack>
          );
        },
      },
      {
        headerName: 'status',
        field: 'status',
        flex: 1,
        renderCell({ value }) {
          return (
            <Stack direction={'row'} gap={1} alignItems={'baseline'}>
              <EllipseShape
                height={'9px'}
                width={'9px'}
                sx={{
                  backgroundColor: value === 'active' ? 'green' : 'red',
                }}
              />
              <Typography>{value}</Typography>
            </Stack>
          );
        },
        valueGetter: ({ value }) => {
          return value === 1 ? 'active' : 'inactive';
        },
      },
      {
        headerName: 'last Action',
        field: 'lastAction',
        flex: 1,
      },
      {
        headerName: 'date For Action',
        field: 'dateForAction',
        flex: 1,
      },
      {
        headerName: 'principal Amount',
        field: 'principalAmount',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'cost',
        field: 'cost',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'fee',
        field: 'fee',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'interest',
        field: 'interest',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'paid',
        field: 'paid',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'balance',
        field: 'balance',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
      },
      {
        headerName: 'case Manager',
        field: 'caseManager',
        flex: 1,
      },
    ];
  }, []);
  return (
    <Box>
      <Stack p={2} gap={3} direction={'row'}>
        <InvertColorCard invertedcolor={false}>
          <Box fontWeight={'400'}>
            <Stack direction={'row'} gap={4}>
              <Stack direction={'row'} alignItems={'center'} flex={0.75}>
                <CicleIcon>
                  <Folder2Open size={34} color="white" />
                </CicleIcon>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'column',
                  gap: 2,
                }}
                flex={2}
              >
                <FolderSelect />
                <SelectorChip />
              </Stack>
            </Stack>
          </Box>
        </InvertColorCard>
        {sectorsDetails.map(({ title, value }) => (
          <GenericCard
            cardProps={{
              sx: {
                flex: 1,
              },
            }}
            title={title}
            key={title}
            value={value}
          />
        ))}
      </Stack>
      <Box p={2}>
        <GenericDataTable
          dataGridProps={{
            density: 'compact',
            rows: data,
            columns: columns,
            rowHeight: 45,
          }}
          height={600}
        />
      </Box>
    </Box>
  );
};
const EllipseShape = styled(Box)(() => ({
  borderRadius: '50%',
}));

const CicleIcon = styled(Box)(() => ({
  backgroundColor: '#011043',
  height: '54px',
  width: '54px',
  borderRadius: '50%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
