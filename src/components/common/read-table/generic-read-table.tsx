import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface GenericReadTableProps<T extends GridValidRowModel> {
  data: T[];
  columns: GridColDef<T>[];
}
const GenericReadTable = <T extends GridValidRowModel>({ data, columns }: GenericReadTableProps<T>) => {
  return (
    <DataGrid
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      hideFooter
      disableDensitySelector
      columns={columns}
      density="compact"
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgba(0, 38, 100, 1)',
          color: 'white',
          borderRadius: '0',
          pointerEvents: 'none',
        },
        borderRadius: '0',
        // height: '100%',
      }}
      rowSelection={false}
      rows={data}
    />
  );
};
export default GenericReadTable;
