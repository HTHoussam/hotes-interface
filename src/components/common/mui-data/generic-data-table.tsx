import { faker } from '@faker-js/faker';
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
import { DataGrid, GridColDef, GridColumnMenuItemProps, useGridApiRef } from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
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

export default function GenericDataTable() {
  const data = useMemo(() => {
    return Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      name: faker.word.words(),
    }));
  }, []);
  const columns = useMemo<GridColDef<{ id: number; name: string }>[]>(() => {
    return [
      { headerName: 'Id', field: 'id', resizable: false },
      { headerName: 'name', field: 'name', resizable: true, minWidth: 140 },
    ];
  }, []);
  const apiRef = useGridApiRef();
  const [defaultCheckedValues, setDefaultCheckedValues] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string[]>([]);
  useEffect(() => {
    if (apiRef.current) apiRef.current.setQuickFilterValues(searchFilter);
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
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
        hideFooterPagination={true}
        rows={data}
        columns={columns}
        density="compact"
      />
    </div>
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
  const allValues = useMemo(() => {
    const valuesOfEachRow: string[] = [];
    apiRef.current.getRowModels().forEach((r) => {
      valuesOfEachRow.push(String(apiRef.current.getRowValue(r, restProps.colDef)));
    });
    return valuesOfEachRow;
  }, [apiRef, restProps.colDef]);
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log('event.target.value', event.target.value);
      apiRef.current.setQuickFilterValues([event.target.value]);
    },
    [apiRef],
  );
  const handleSort = useCallback(
    (val: 'asc' | 'desc') => {
      if (apiRef.current) {
        apiRef.current.sortColumn(restProps.colDef, val);
      }
    },
    [apiRef, restProps.colDef],
  );
  return (
    <Box gap={1} p={2}>
      {/* <Stack direction={'column'} gap={1}>
        <IconButton
          sx={{ maxHeight: '1rem' }}
          onClick={() => {
            handleSort('asc');
          }}
        >
          <>
            <Typography>ASC</Typography>
            <ArrowUpShort size={15} />
          </>
        </IconButton>
        <IconButton
          sx={{ maxHeight: '1rem' }}
          onClick={() => {
            handleSort('desc');
          }}
        >
          <>
            <Typography>DESC</Typography>
            <ArrowDownShort size={15} />
          </>
        </IconButton>
      </Stack> */}
      <Typography>filter</Typography>
      <Stack gap={2} direction={'column'}>
        <TextField
          size="small"
          onChange={handleChangeInput}
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
              items: [{ operator: 'isAnyOf', field: colDef.field, value: value }],
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
          maxWidth: '12rem',
        }}
        MenuProps={{
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
          <ListItemText primary={'All'} />
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
