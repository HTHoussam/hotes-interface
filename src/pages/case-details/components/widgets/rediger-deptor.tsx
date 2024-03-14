import { EllipseShape } from '@/components/common';
import GenericReadTable from '@/components/common/read-table/generic-read-table';
import { StyledTooltip } from '@/components/common/styled-components';
import { faker } from '@faker-js/faker';
import { Box, IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { ArrowsMove, Gear, PersonFill, ThreeDotsVertical, X } from 'react-bootstrap-icons';
import { Layouts } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { useWidgetsMode } from '../..';
import { RedigerDeptorType } from '../../types';

const RedigerDeptor = ({ setLayout, widgetId }: { setLayout: Dispatch<SetStateAction<Layouts>>; widgetId: string }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const data = useMemo<RedigerDeptorType[]>(() => {
    return Array.from({ length: 80 }, (_, index) => ({
      id: index + 1,
      debitornr: faker.word.words(),
      epost: `${faker.person.firstName()}@email.com`,
      mobileTelefon: faker.phone.number(),
      navn: faker.person.firstName(),
      note: faker.person.fullName(),
      personOrg: faker.database.mongodbObjectId(),
      postAdresse: faker.location.countryCode(),
      postNumber: faker.location.zipCode(),
    }));
  }, []);
  const columns = useMemo<GridColDef<RedigerDeptorType>[]>(() => {
    return [
      {
        headerName: 'Debitornr',
        field: 'debitornr',
        flex: 1,
      },
      {
        headerName: 'Epost',
        field: 'epost',
        flex: 1,
      },
      {
        headerName: 'MobileTelefon',
        field: 'mobileTelefon',
        flex: 1,
      },
      {
        headerName: 'Navn',
        field: 'navn',
        flex: 1,
      },
      {
        headerName: 'Note',
        field: 'note',
        flex: 1,
      },
      {
        headerName: 'Person/Orgnr',
        field: 'personOrg',
        flex: 1,
      },
      {
        headerName: 'Postadresse',
        field: 'postAdresse',
        flex: 1,
      },
      {
        headerName: 'Postnummer',
        field: 'postNumber',
        flex: 1,
      },
    ];
  }, []);
  const { widgetsMode, setDeletedWidgetIds } = useWidgetsMode();

  const renderActionsButtons: () => JSX.Element = useCallback(() => {
    if (widgetsMode) {
      return (
        <Stack sx={{ p: 0.5, gap: 0.5, flexDirection: 'row' }}>
          <StyledTooltip title={'Customize widget'}>
            <IconButton>
              <Gear size={20} />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title={'Move'}>
            <IconButton className="drag-handle">
              <ArrowsMove size={20} />
            </IconButton>
          </StyledTooltip>
          <StyledTooltip title={'Hide'}>
            <IconButton
              onClick={() => {
                setDeletedWidgetIds && setDeletedWidgetIds((prev) => [...prev, widgetId]);
              }}
              sx={{
                ':hover': {
                  color: (theme) => `${theme.palette.error.main}`,
                },
              }}
            >
              <X size={25} />
            </IconButton>
          </StyledTooltip>
        </Stack>
      );
    } else {
      return (
        <>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <IconButton aria-describedby={id} onClick={handleClick}>
              <ThreeDotsVertical size={20} />
            </IconButton>
          </Box>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {
                paddingInline: '1rem',
                paddingBlock: '0.5rem',
                width: 'fit-content',
              },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem>Rediger Debitor</MenuItem>
            <MenuItem
              onClick={() => {
                setShowTable(!showTable);
                setLayout((prev) => {
                  const newLayout = prev['lg'].map((item) => {
                    if (item.i === widgetId) {
                      return { ...item, h: !showTable ? 8 : 4 };
                    }
                    return item;
                  });
                  return {
                    lg: newLayout,
                    md: newLayout,
                  };
                });
              }}
            >
              {t('common.text.see.details')}
            </MenuItem>
          </Popover>
        </>
      );
    }
  }, [anchorEl, id, open, setDeletedWidgetIds, setLayout, showTable, t, widgetId, widgetsMode]);

  return (
    <Box sx={{ height: '100%' }}>
      <Stack
        sx={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0.5rem',
          gap: 1,
        }}
      >
        <Stack direction={'row'} flex={1} gap={2}>
          <EllipseShape
            height={'54px'}
            width={'54px'}
            sx={{
              backgroundColor: ({ palette }) => `${palette.primary.main}`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonFill size={31} />
          </EllipseShape>
          <Box>
            <Typography variant="subtitle1">Debitornr: ADAM ELJAAFARI</Typography>
            <Typography variant="subtitle2">Postadresse: Rabat - Morocco</Typography>
          </Box>
        </Stack>
        {renderActionsButtons()}
      </Stack>
      {showTable && (
        <Box
          sx={{
            width: '100%',
            height: 'fill-available',
            paddingBottom: '6rem',
          }}
        >
          <GenericReadTable data={data} columns={columns} />
        </Box>
      )}
    </Box>
  );
};
export default RedigerDeptor;
