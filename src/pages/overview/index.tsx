import { EllipseShape } from '@/components/common';
import { GenericCard, GenericDataTable } from '@/components/common/mui-data';
import { StatusColorMapper } from '@/libs/constants';
import { formatNumber, reverseFormatNumber } from '@/libs/helpers';
import { OverviewDetail } from '@/types';
import { faker } from '@faker-js/faker';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { FolderCard } from './components';

export default () => {
  const urlParams = useParams();
  const navigate = useNavigate();
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
  const data: OverviewDetail[] = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      name: faker.word.words(),
      case: faker.number.int({
        min: 1000,
        max: 9999,
      }),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending', 'closed']).toString(),
      lastAction: faker.word.sample({
        length: 4,
      }),
      dateForAction: dayjs(
        faker.date.between({
          from: new Date(2023, 1, 12),
          to: new Date(2024, 4, 12),
        }),
      ),

      principalAmount: faker.number.int({
        min: 200,
        max: 23000000,
      }),
      cost: faker.number.int({
        max: 100000,
      }),
      fee: faker.number.int({
        min: 0,
        max: 20,
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
  }, [urlParams.element]);
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
                onClick={() => {
                  navigate(`/cases/${value}`);
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
                  backgroundColor: StatusColorMapper[value],
                }}
              />
              <Typography>{value}</Typography>
            </Stack>
          );
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
        type: 'date',
        valueFormatter({ value }) {
          return dayjs(value).format('DD.MM.YYYY');
        },
      },
      {
        headerName: 'principal Amount',
        field: 'principalAmount',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        type: 'number',
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
        headerAlign: 'left',
        align: 'left',
      },
      {
        headerName: 'cost',
        field: 'cost',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
        type: 'number',
        headerAlign: 'left',
        align: 'left',
      },
      {
        headerName: 'fee',
        field: 'fee',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
      },
      {
        headerName: 'interest',
        field: 'interest',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
      },
      {
        headerName: 'paid',
        field: 'paid',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
      },
      {
        headerName: 'balance',
        field: 'balance',
        flex: 1,
        valueGetter({ value }) {
          return formatNumber(value);
        },
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        getApplyQuickFilterFn(value) {
          return (params: GridCellParams) => {
            return String(params.value).includes(formatNumber(Number(reverseFormatNumber(value))));
          };
        },
      },
      {
        headerName: 'case Manager',
        field: 'caseManager',
        flex: 1,
      },
    ];
  }, []);
  const [statuses, statusesCounts] = useMemo(() => {
    const statusesSet = new Set(data.map((r) => r.status.toString().trim()));
    const uniqueStatuses = Array.from(statusesSet);
    const counts: { [key: string]: number } = {};
    for (const val of uniqueStatuses) {
      counts[val] = data.filter((r) => r.status === val).length;
    }
    return [uniqueStatuses, counts];
  }, [data]);

  return (
    <Box>
      <Stack p={2} gap={2} direction={'row'} flexWrap={'wrap'}>
        <FolderCard statusesCounts={statusesCounts} statuses={statuses} />
        {sectorsDetails.map(({ title, value }, index) => (
          <GenericCard
            cardProps={{
              sx: {
                flex: index === sectorsDetails.length - 1 ? 1 : 0.5,
                minWidth: index === sectorsDetails.length - 1 ? '210px' : '150px',
              },
            }}
            invertedColor={index === sectorsDetails.length - 1}
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
            rowSelection: true,
          }}
          height={600}
        />
      </Box>
    </Box>
  );
};
