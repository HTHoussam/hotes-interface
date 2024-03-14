import { deepArrayCompare, formatNumberToNor, intersectionOfArrays, reverseFormatNumber } from '@/libs/helpers';
import { useOverviewFilterStore } from '@/stores/overview-filters-store';
import {
  Box,
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  debounce,
} from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColType,
  GridColumnMenuItemProps,
  useGridApiRef,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import dayjs, { Dayjs } from 'dayjs';
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Filter, Search } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { JSX } from 'react/jsx-runtime';
import { ExportMenu } from '.';
import CustomDatePicker from './custom-date-picker';

interface GenericDataTableProps {
  height?: number | string;
  dataGridProps: DataGridProps;
}
const DataGridStyle: SxProps<Theme> = {
  backgroundColor: 'rgba(243, 244, 247, 1);',
  fontSize: '12px',
  fontWeight: 400,
  '& .MuiTablePagination-selectLabel': {
    margin: 0,
  },
  '& .MuiTablePagination-displayedRows': {
    margin: 0,
    minWidth: '7rem',
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
  '& .MuiDataGrid-footerContainer': {
    height: '30px',
    minHeight: 'auto',
  },
  '& .MuiTablePagination-input': {
    minWidth: '4rem',
  },
};
const GenericDataTable = memo(({ height, dataGridProps }: Readonly<GenericDataTableProps>) => {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const { filterModel, tableDateFilter, activeDateFilterRange } = useOverviewFilterStore();

  const [searchValue, setSearchValue] = useState(apiRef.current.state?.filter.filterModel.quickFilterValues ?? '');

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeInput = debounce((value: string) => {
    apiRef.current.setQuickFilterValues([value]);
  }, 300);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      handleChangeInput(value);
    }, 300);
  };

  const filteredData = useMemo(() => {
    if (!filterModel) return dataGridProps.rows;
    const filterColTitleSet = new Set(filterModel.items.map((r) => r.field));
    const filterColTitle = Array.from(filterColTitleSet);

    const r = filterColTitle.map((colTitle) => {
      if (colTitle.includes('date') && activeDateFilterRange !== null) {
        const filtered = dataGridProps.rows.filter((l) => {
          return (
            l[colTitle].isAfter(tableDateFilter[colTitle].at(0)) &&
            l[colTitle].isBefore(tableDateFilter[colTitle].at(1))
          );
        });

        return filtered;
      }

      const filterByArr = filterModel.items.find((item) => item.field === colTitle)?.value;

      if (!filterByArr || filterByArr.length <= 0) return [];
      return dataGridProps.rows.filter((l) => filterByArr.includes(String(l[colTitle]).toLowerCase()));
    });

    if (r.length === 0 || (r.length === 1 && r[0].length <= 0)) return dataGridProps.rows;

    return intersectionOfArrays(r);
  }, [activeDateFilterRange, dataGridProps.rows, filterModel, tableDateFilter]);

  const [colSearchValue, setColSearchValue] = useState('');
  const renderCustomColumn = useCallback(
    (
      props: JSX.IntrinsicAttributes &
        GridColumnMenuItemProps & {
          apiRef: MutableRefObject<GridApiCommunity>;
          rows: readonly any[];
          setColSearchValue: Dispatch<SetStateAction<string>>;
          colSearchValue: string;
        },
    ) => (
      <CustomColumnMenu
        {...props}
        colSearchValue={colSearchValue}
        setColSearchValue={setColSearchValue}
        rows={dataGridProps.rows}
        apiRef={apiRef}
      />
    ),
    [],
  );

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
      <Stack
        sx={{
          paddingBlock: '1rem',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          onChange={handleTextFieldChange}
          onBlur={() => {
            apiRef.current.setQuickFilterValues([searchValue]);
          }}
          InputProps={{
            endAdornment: <Search size={15} />,
          }}
          placeholder={t('common.title.search')}
          value={searchValue}
          variant="outlined"
          type="search"
          sx={{ maxHeight: '1.5rem', width: '26rem' }}
        />
        <ExportMenu apiRef={apiRef ?? {}} />
      </Stack>
      <DataGrid
        {...dataGridProps}
        apiRef={apiRef}
        rows={filteredData}
        slots={{
          columnMenu: renderCustomColumn,
          columnMenuIcon: () => <Filter size={20} />,
          columnHeaderFilterIconButton: () => <></>,
        }}
        slotProps={{
          basePopper: {
            placement: 'bottom-end',
            sx: {
              '& .MuiPaper-root ': {
                border: (theme) => `1px solid ${theme.palette.primary.main} `,
              },
            },
          },
          pagination: {
            slotProps: {
              select: {
                MenuProps: {
                  sx: {
                    '& .MuiPaper-root': {
                      maxWidth: '50px ',
                    },
                  },
                },
              },
            },
          },
        }}
        sx={DataGridStyle}
      />
    </Box>
  );
});
export default GenericDataTable;

const CustomColumnMenu: React.FC<
  GridColumnMenuItemProps & {
    apiRef: MutableRefObject<GridApiCommunity>;
    rows: readonly any[];
    setColSearchValue: Dispatch<SetStateAction<string>>;
    colSearchValue: string;
  }
> = ({ apiRef, ...restProps }) => {
  const { t } = useTranslation();
  const { rows, colDef, colSearchValue } = restProps;
  const [searchValue, setSearchValue] = useState(colSearchValue);
  /**
   * Get all column values and make sure they are unique with 'all' value at the beginning of all filter select for columns
   */

  const allValues: string[] = useMemo(() => {
    const uniqueValues = new Set<string>();
    rows.forEach((row) => {
      const value = colDef.type === 'number' ? formatNumberToNor(Number(row[colDef.field])) : String(row[colDef.field]);
      uniqueValues.add(value);
    });

    const sortedValues = Array.from(uniqueValues).sort((a: string, b: string) => {
      if (colDef.type === 'number') {
        return Number(reverseFormatNumber(a)) - Number(reverseFormatNumber(b));
      }
      return a.localeCompare(b);
    });

    sortedValues.unshift('all');

    return sortedValues;
  }, [colDef.field, colDef.type]);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeInput = debounce((value: string) => {
    const fileteredRows = restProps.rows.filter((r) =>
      r[restProps.colDef.field].toString().toLowerCase().includes(value.toLowerCase()),
    );
    apiRef.current.setRows(fileteredRows);
  }, 300);

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setSearchValue(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      handleChangeInput(value);
    }, 300);
  };

  if (colDef.type === 'date') {
    return <RangePickerSelector colDef={colDef} />;
  }
  return (
    <Box gap={1} p={'8px'} height={'auto'}>
      <Typography>{t('home.data.common.generic.table.filter.title')}</Typography>
      <Stack gap={2} direction={'column'}>
        <TextField
          size="small"
          onChange={handleTextFieldChange}
          placeholder={t('common.title.search')}
          variant="outlined"
          value={searchValue}
          sx={{ maxHeight: '1.5rem' }}
          inputProps={{
            style: {
              padding: 4,
            },
          }}
        />
        <FilterSelect colDef={restProps.colDef} apiRef={apiRef} values={allValues} />
      </Stack>
    </Box>
  );
};
const RangePickerSelector = ({ colDef }: { colDef: GridColDef }) => {
  const { filterModel, setFilterModel, setTableDateFilter, tableDateFilter } = useOverviewFilterStore();

  const [firstDate, setFirstDate] = useState<Dayjs>(tableDateFilter[colDef.field]?.at(0) ?? dayjs(new Date()));
  const [secondDate, setSecondDate] = useState<Dayjs>(
    tableDateFilter[colDef.field]?.at(1) ??
      dayjs(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDay())),
  );
  const setFilterFunction = useCallback(
    (firstDate: Dayjs, endDate: Dayjs) => {
      setTableDateFilter({
        [colDef.field]: [firstDate, endDate],
      });
      if (!filterModel) {
        setFilterModel({
          items: [
            {
              field: colDef.field,
              operator: 'isAnyOf',
            },
          ],
        });
        return;
      }
      setFilterModel({
        ...filterModel,
        items: [
          ...(filterModel?.items ?? []),
          {
            field: colDef.field,
            operator: 'isAnyOf',
          },
        ],
      });
    },
    [colDef.field, filterModel, setFilterModel, setTableDateFilter],
  );

  const handleRangePick = (firstDate: Dayjs, endDate: Dayjs) => {
    setFilterFunction(firstDate, endDate);
  };

  return (
    <Box>
      <CustomDatePicker
        setFirstDate={setFirstDate}
        setSecondDate={setSecondDate}
        firstDate={firstDate}
        secondDate={secondDate}
        handleCustomChanges={handleRangePick}
      />
    </Box>
  );
};
interface ListItemRenderedProps {
  value: string;
  handleCheckboxChange: (value: string) => void;
  checkedValues: string[];
  itemsCount: number;
  isBorder: boolean;
  type: GridColType;
}

const ListItemRendered = ({
  value,
  handleCheckboxChange,
  checkedValues,
  itemsCount,
  isBorder,
  type,
}: ListItemRenderedProps) => {
  const labelId = `checkbox-list-label-${value}`;
  const { t } = useTranslation();

  return (
    <ListItem
      sx={{
        height: '16px',
        fontSize: '12px',
        '&::before': {
          content: isBorder ? '"┃-"' : '"┏ "',
          color: 'black',
        },
        marginBottom: '4px',
      }}
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => {
          handleCheckboxChange(value);
        }}
        dense
        sx={{
          gap: 1,
        }}
        disableRipple
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            width: 'fit-content',
          }}
        >
          <Checkbox
            edge="start"
            checked={
              value === 'all'
                ? checkedValues.length === itemsCount
                : type === 'number'
                  ? checkedValues.includes(String(reverseFormatNumber(value)))
                  : checkedValues.includes(value)
            }
            tabIndex={-1}
            size="small"
            disableRipple
            sx={{
              padding: 0,
            }}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={value === 'all' ? t('home.data.common.generic.table.selectAll.title') : value}
        />
      </ListItemButton>
    </ListItem>
  );
};

export const FilterSelect = memo(
  ({ values, apiRef, colDef }: { values: string[]; apiRef: any; colDef: GridColDef }) => {
    const { filterModel, setFilterModel } = useOverviewFilterStore();

    const [checkedValues, setCheckedValues] = useState<string[]>(
      filterModel?.items.find((r: any) => r.field === colDef.field)?.value ?? [],
    );

    const allChecked = checkedValues.length === values.length;
    useEffect(() => {
      if (!filterModel) {
        setFilterModel(apiRef.current.state.filter.filterModel);
      }
    }, [filterModel, setFilterModel]);

    const handleCheckboxChange = useCallback(
      (value: string) => {
        if (!filterModel) return;
        const unformattedValue =
          colDef.type === 'number' && value !== 'all' ? String(reverseFormatNumber(value)) : value;

        let updatedValues = [...checkedValues];
        if (unformattedValue === 'all') {
          updatedValues = allChecked ? [] : [...values];
          updatedValues =
            colDef.type === 'number' ? updatedValues.map((r) => String(reverseFormatNumber(r))) : updatedValues;
        } else {
          const index = checkedValues.indexOf(unformattedValue);
          if (index === -1) {
            updatedValues.push(unformattedValue);
          } else {
            updatedValues.splice(index, 1);
          }
        }

        const existItemIdx = filterModel.items.findIndex((item: any) => item.field === colDef.field);
        const newFilterModel = { ...filterModel };
        if (existItemIdx === -1) {
          newFilterModel.items.push({
            operator: 'isAnyOf',
            field: colDef.field,
            value: updatedValues,
          });
        } else {
          if (updatedValues.length <= 0) {
            newFilterModel.items.splice(existItemIdx, 1);
          } else {
            newFilterModel.items[existItemIdx] = {
              operator: 'isAnyOf',
              field: colDef.field,
              value: updatedValues,
            };
          }
        }

        setCheckedValues(updatedValues);
        setFilterModel(newFilterModel);
      },
      [allChecked, checkedValues, colDef.field, colDef.type, filterModel, setFilterModel, values],
    );

    return (
      <Box
        sx={{
          maxHeight: '300px',
          overflow: 'auto',
        }}
      >
        {values.map((value, index) => (
          <ListItemRendered
            key={index}
            type={colDef.type ?? 'string'}
            value={value}
            isBorder={index !== 0}
            handleCheckboxChange={handleCheckboxChange}
            checkedValues={checkedValues}
            itemsCount={values.length}
          />
        ))}
      </Box>
    );
  },
  (prevProps, currProps) => {
    return deepArrayCompare(prevProps.values, currProps.values);
  },
);
