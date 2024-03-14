import { EllipseShape } from '@/components/common';
import { CaseStyledHeaderStack, StyledTooltip } from '@/components/common/styled-components';
import { IconButton, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { ArrowsMove, Gear, X } from 'react-bootstrap-icons';
import { useWidgetsMode } from '../..';

const DynamicCardHeader = ({
  title,
  Icon,
  CurrentCardActions,
  widgetId,
}: {
  title: string;
  Icon: JSX.Element;
  CurrentCardActions?: JSX.Element;
  widgetId: string;
}) => {
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
      return CurrentCardActions ?? <></>;
    }
  }, [CurrentCardActions, setDeletedWidgetIds, widgetId, widgetsMode]);
  return (
    <CaseStyledHeaderStack>
      <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
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
          {Icon}
        </EllipseShape>
        <Typography variant="subtitle2">{title}</Typography>
      </Stack>

      {renderActionsButtons()}
    </CaseStyledHeaderStack>
  );
};

export default DynamicCardHeader;
