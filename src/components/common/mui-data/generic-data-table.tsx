import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, DataGridProps, GridColDef, GridColumnMenuItemProps, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { t } from 'i18next';
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Filter } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

interface GenericDataTableProps {
  height?: number | string;
  dataGridProps: DataGridProps;
}

export default function GenericDataTable({ height, dataGridProps }: Readonly<GenericDataTableProps>) {
  const apiRef = useGridApiRef();
  const [defaultCheckedValues, setDefaultCheckedValues] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string[]>([]);
  useEffect(() => {
    if (apiRef.current) apiRef.current.setQuickFilterValues(searchFilter);
  }, []);
  return (
    <Box
      style={{
        width: '100%',
        ...(height
          ? {
              height,
            }
          : {}),
      }}
    >
      <DataGrid
        {...dataGridProps}
        apiRef={apiRef}
        slots={{
          columnMenu: (props) => (
            <CustomColumnMenu
              defaultCheckedValues={defaultCheckedValues}
              setDefaultCheckedValues={setDefaultCheckedValues}
              setSearchFilter={setSearchFilter}
              searchFilter={searchFilter}
              {...props}
              apiRef={apiRef}
            />
          ),
          columnMenuIcon: () => <Filter size={20} />,
          columnHeaderFilterIconButton: () => <></>,
        }}
        slotProps={{
          basePopper: {
            placement: 'top',
          },
        }}
        sx={{
          backgroundColor: 'rgba(243, 244, 247, 1);',
          fontSize: '12px',
          fontWeight: 400,
          '& .MuiTablePagination-selectLabel': {
            margin: 0,
          },
          '& .MuiTablePagination-displayedRows': {
            margin: 0,
          },
          '& .MuiDataGrid-virtualScroller': {
            scrollbarGutter: 'stable',
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            backgroundColor: 'transparent !important',
          },
          '& .MuiDataGrid-cell': {
            backgroundColor: 'white',
            borderRight: '1px solid rgba(243, 244, 247, 1)',
          },
          '& .MuiPaper-root': {
            maxWidth: '2rem',
          },
        }}
      />
    </Box>
  );
}

const CustomColumnMenu: React.FC<
  GridColumnMenuItemProps & {
    apiRef: MutableRefObject<GridApiCommunity>;
    defaultCheckedValues: string[];
    setDefaultCheckedValues: Dispatch<SetStateAction<string[]>>;
    setSearchFilter: Dispatch<SetStateAction<string[]>>;
  }
> = ({ apiRef, ...restProps }) => {
  const { t } = useTranslation();

  const allValues = useMemo(() => {
    const valuesOfEachRow: string[] = [];
    apiRef.current.getRowModels().forEach((r) => {
      if (restProps.colDef.type === 'boolean') {
        valuesOfEachRow.push(apiRef.current.getRowValue(r, restProps.colDef) === 1 ? String(true) : String(false));
        return;
      }
      valuesOfEachRow.push(String(apiRef.current.getRowValue(r, restProps.colDef)));
    });
    return valuesOfEachRow;
  }, [apiRef, restProps.colDef]);

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      apiRef.current.setQuickFilterValues([event.target.value]);
    },
    [apiRef],
  );

  return (
    <Box gap={1} p={2}>
      <Typography>{t('home.data.common.generic.table.filter.title')}</Typography>
      <Stack gap={2} direction={'column'}>
        <TextField
          size="small"
          onChange={handleChangeInput}
          placeholder={t('common.title.search')}
          value={apiRef.current.state.filter.filterModel.quickFilterValues}
          variant="outlined"
          sx={{ maxHeight: '1.5rem' }}
        />
        <FilterSelect colDef={restProps.colDef} apiRef={apiRef} values={allValues} />
      </Stack>
    </Box>
  );
};

const FilterSelect = memo(
  ({
    values,
    apiRef,
    colDef,
  }: {
    values: string[];
    apiRef: MutableRefObject<GridApiCommunity>;
    colDef: GridColDef;
  }) => {
    const [checkedValues, setCheckedValues] = useState<string[]>(
      apiRef.current.state.filter.filterModel.items[0]?.value ?? [],
    );
    const allChecked = checkedValues.length === values.length;

    const handleSelectChange = useCallback(
      (event: SelectChangeEvent<typeof checkedValues>) => {
        const value = event.target.value;
        if (value.includes('all')) {
          setCheckedValues(allChecked ? [] : values);
          apiRef.current.setFilterModel(
            {
              items: [{ operator: 'isAnyOf', field: colDef.field, value: allChecked ? [] : values }],
            },
            'upsertFilterItems',
          );
          return;
        }
        setCheckedValues(Array.isArray(value) ? value.filter((val) => val !== 'all') : []);
        apiRef.current.setFilterModel(
          {
            items: [{ operator: 'isAnyOf', field: colDef.field, value: value }],
          },
          'upsertFilterItems',
        );
      },
      [allChecked, apiRef, colDef.field, values],
    );

    return (
      <Select
        multiple
        size="small"
        maxRows={2}
        sx={{
          maxWidth: '189px',
        }}
        MenuProps={{
          autoFocus: false,
          sx: {
            maxWidth: 'fit-content',
            '.MuiPaper-root': {
              overflow: 'auto',
              maxHeight: '10rem',
              scrollBehavior: 'smooth',
            },
          },
        }}
        value={checkedValues}
        renderValue={(selected) => selected.join(', ')}
        onChange={handleSelectChange}
      >
        <MenuItem
          sx={{
            p: 0,
          }}
          value={'all'}
          key={'all'}
        >
          <Checkbox
            size="small"
            sx={{
              p: 0.25,
            }}
            checked={allChecked}
          />
          <ListItemText primary={t('home.data.common.generic.table.selectAll.title')} />
        </MenuItem>

        {values.map((val) => (
          <MenuItem
            sx={{
              p: 0,
            }}
            value={val}
            key={val}
          >
            <Checkbox
              size="small"
              sx={{
                p: 0.25,
              }}
              checked={checkedValues.findIndex((r) => r === val) > -1}
            />
            <ListItemText primary={val} />
          </MenuItem>
        ))}
      </Select>
    );
  },
);
