import { Button, Menu, MenuItem } from '@mui/material';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { MutableRefObject, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const ExportMenu = ({ apiRef }: { apiRef: MutableRefObject<GridApiCommunity> }) => {
  const { t } = useTranslation();
  const urlParams = useParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCSVExport = () => {
    apiRef.current.exportDataAsCsv({
      fileName: 'overview',
      utf8WithBom: true,
      delimiter: ';',
    });
  };
  const handleExcelExport = useCallback(() => {
    const dataAsCSV = apiRef.current.getDataAsCsv();
    const dataArray = dataAsCSV.split('\n').map((row) => row.split(','));

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet(dataArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${urlParams.element}-export.xls`);
  }, [apiRef, urlParams.element]);
  return (
    <>
      <Button
        id="basic-button"
        sx={{
          fontWeight: '300',
        }}
        size="small"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('home.data.common.generic.table.exportTable.title')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        slotProps={{
          paper: {
            sx: {
              maxWidth: '7.8rem',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleExcelExport();
            handleClose();
          }}
        >
          excel
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCSVExport();
            handleClose();
          }}
        >
          csv
        </MenuItem>
      </Menu>
    </>
  );
};
export default ExportMenu;
