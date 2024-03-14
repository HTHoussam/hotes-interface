import { StyledTooltip } from '@/components/common';
import { faker } from '@faker-js/faker';
import { Box, IconButton, Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { ArrowsMove, Gear, X } from 'react-bootstrap-icons';
import { useWidgetsMode } from '../..';
import HeaderFolderCard from '../custom/header-folder-card';

const CaseDetailsHeader = ({ widgetId }: { widgetId: string }) => {
  const { widgetsMode, setDeletedWidgetIds } = useWidgetsMode();

  const data: { title: string; value: number }[] = [
    {
      title: 'Hovedstol',
      value: faker.number.int({
        max: 9999,
      }),
    },
    {
      title: 'Renter per 4/1/24 ',
      value: faker.number.int({
        max: 9999,
      }),
    },
    {
      title: 'Omkostninger',
      value: faker.number.int({
        max: 9999,
      }),
    },
    {
      title: 'Salær',
      value: faker.number.int({
        max: 9999,
      }),
    },
    {
      title: 'innbetalt',
      value: faker.number.int({
        max: 9999,
      }),
    },
    {
      title: 'Saldo per',
      value: faker.number.int({
        max: 9999,
      }),
    },
  ];
  const idsData: {
    title: string;
    value: number;
  }[] = useMemo(() => {
    return [
      {
        title: 'Kontonummber',
        value: faker.number.int({
          max: 9999,
        }),
      },
      {
        title: 'KID',
        value: faker.number.int({
          min: 0,
          max: 999,
        }),
      },
    ];
  }, []);
  const renderActionsButtons: () => JSX.Element = useCallback(() => {
    if (widgetsMode) {
      return (
        <Stack sx={{ p: 0.5, gap: 0.5, flexDirection: 'row', marginLeft: 'auto', width: 'fit-content' }}>
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
      return <></>;
    }
  }, [setDeletedWidgetIds, widgetId, widgetsMode]);

  return (
    <Box>
      {renderActionsButtons()}
      <Box>
        <HeaderFolderCard data={data} idsData={idsData} />
      </Box>
    </Box>
  );
};
export default CaseDetailsHeader;
