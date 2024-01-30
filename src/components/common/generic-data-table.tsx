// import {
//   Box,
//   Checkbox,
//   IconButton,
//   ListItemText,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { DataGrid, GridColDef, GridColumnMenuItemProps, useGridApiRef } from '@mui/x-data-grid';
// import { GridApiCommunity } from '@mui/x-data-grid/internals';
// import { ChangeEvent, MutableRefObject, useCallback, useMemo, useState } from 'react';
// import { ArrowDownShort, ArrowUpShort, Filter } from 'react-bootstrap-icons';

// export default function GenericDataTable() {
//   const data = useMemo(() => {
//     return [
//       { id: 1, name: 'React' },
//       { id: 2, name: 'MUI' },
//       { id: 3, name: 'Bootstrap' },
//       { id: 4, name: 'React, MUI, Bootstrap' },
//     ];
//   }, []);
//   const columns = useMemo<GridColDef<{ id: number; name: string }>[]>(() => {
//     return [
//       { headerName: 'name', field: 'name' },
//       { headerName: 'Id', field: 'id' },
//     ];
//   }, []);
//   const apiRef = useGridApiRef();

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         apiRef={apiRef}
//         slots={{
//           columnMenu: (props) => <CustomColumnMenu data={data} {...props} apiRef={apiRef} />,
//           columnMenuIcon: () => <Filter size={20} />,
//         }}
//         slotProps={{
//           basePopper: {
//             placement: 'top',
//           },
//         }}
//         rows={data}
//         columns={columns}
//         density="compact"
//       />
//     </div>
//   );
// }

// const CustomColumnMenu: React.FC<
//   GridColumnMenuItemProps & { apiRef: MutableRefObject<GridApiCommunity>; data: any[] }
// > = ({ apiRef, ...restProps }) => {
//   const allValues = useMemo(() => {
//     const valuesOfEachRow: string[] = [];
//     apiRef.current.getRowModels().forEach((r) => {
//       valuesOfEachRow.push(apiRef.current.getRowValue(r, restProps.colDef));
//     });
//     return valuesOfEachRow;
//   }, [apiRef, restProps.colDef]);
//   const handleChangeInput = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       apiRef.current.setQuickFilterValues([event.target.value]);
//     },
//     [apiRef],
//   );
//   return (
//     <Box gap={1} p={2}>
//       <Stack direction={'column'} gap={1}>
//         <IconButton
//           sx={{ maxHeight: '1rem' }}
//           onClick={() => {
//             if (apiRef.current) {
//               apiRef.current.sortColumn(restProps.colDef, 'asc');
//             }
//           }}
//         >
//           <>
//             <Typography>ASC</Typography>
//             <ArrowUpShort size={15} />
//           </>
//         </IconButton>
//         <IconButton
//           sx={{ maxHeight: '1rem' }}
//           onClick={() => {
//             if (apiRef.current) {
//               apiRef.current.sortColumn(restProps.colDef, 'desc');
//             }
//           }}
//         >
//           <>
//             <Typography>DESC</Typography>
//             <ArrowDownShort size={15} />
//           </>
//         </IconButton>
//       </Stack>
//       <Stack gap={2} direction={'column'}>
//         <TextField onChange={handleChangeInput} variant="outlined" sx={{ maxHeight: '1.5rem' }} />
//         <FilterSelect colDef={restProps.colDef} apiRef={apiRef} values={allValues} />
//       </Stack>
//     </Box>
//   );
// };

// // use rows array instead /
// let allValuesGlobal: any[] = [];
// const FilterSelect = ({
//   values,
//   apiRef,
//   colDef,
// }: {
//   values: string[];
//   apiRef: MutableRefObject<GridApiCommunity>;
//   colDef: GridColDef;
// }) => {
//   const [checkedValues, setCheckedValues] = useState<string[]>([]);
//   // const filterItems = useMemo(() => {
//   //   return checkedValues.map((t) => ({
//   //     field: colDef.field,
//   //     operator: 'contains',
//   //     value: t,
//   //   }));
//   // }, [checkedValues, colDef.field]);

//   // const t = useMemo(() => {
//   //   if (allValuesGlobal.length <= 0) {
//   //     const allRowModels: any[] = [];
//   //     apiRef.current.getAllRowIds().forEach((id) => {
//   //       allRowModels.push(apiRef.current.getRowParams(id).row);
//   //     });
//   //     allValuesGlobal = allRowModels;
//   //     return allRowModels;
//   //   }
//   //   return;
//   // }, [apiRef]);
//   const handleSelectChange = useCallback(
//     (event: SelectChangeEvent<typeof checkedValues>) => {
//       const value = event.target.value;

//       setCheckedValues(Array.isArray(value) ? value : []);

//       const filteredData = allValuesGlobal.filter((row) => value.includes(row.name));
//       apiRef.current.setRows(filteredData);
//     },
//     [apiRef],
//   );

//   return (
//     <Select
//       multiple
//       MenuProps={{
//         sx: {
//           maxWidth: '5rem',
//         },
//       }}
//       value={checkedValues}
//       renderValue={(selected) => selected.join(', ')}
//       onChange={handleSelectChange}
//     >
//       {values.map((val) => (
//         <MenuItem value={val} key={val}>
//           <Checkbox checked={checkedValues.findIndex((r) => r === val) > -1} />
//           <ListItemText primary={val} />
//         </MenuItem>
//       ))}
//     </Select>
//   );
// };
