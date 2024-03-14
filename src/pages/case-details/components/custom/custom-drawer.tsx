import { CustomDrawerContainer, EllipseShape, SquaredIconButton } from '@/components/common';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Gear, PlusSquare, X } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { WidgetsMapType } from '../../types';

const CustomDrawer = ({
  openDrawer,
  setOpenDrawer,
  mainWidgetsList,
}: {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  mainWidgetsList: WidgetsMapType[];
}) => {
  const { t } = useTranslation();
  return (
    <CustomDrawerContainer
      sx={{
        transition: 'all 500ms ease-in-out',
        maxWidth: openDrawer ? 400 : 0,
        display: openDrawer ? 'block' : 'none',
        overflow: 'auto',
      }}
    >
      <Stack direction={'column'} gap={2} padding={2}>
        <Stack direction={'column'} gap={1}>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="subtitle1">{t('case.detail.customize.mode.drawer.title')}</Typography>
            <IconButton
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <X />
            </IconButton>
          </Stack>
          <Typography variant="body1">{t('case.detail.customize.mode.drawer.description')}</Typography>
        </Stack>
        {mainWidgetsList.map(({ icon, title, isInLayout, widgetId }) => (
          <Paper
            key={title}
            draggable={!isInLayout}
            onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
              event.dataTransfer.setData('application/json', JSON.stringify(widgetId));
            }}
            sx={{
              borderRadius: '5px',
              cursor: isInLayout ? 'auto' : 'pointer',
              transition: 'all 500ms ease-in-out',

              ...(isInLayout
                ? {
                    backgroundColor: 'rgba(243, 244, 247, 1)',
                    boxShadow: 'none',
                  }
                : {
                    ':hover': {
                      transform: 'scale(1.04)',
                    },
                  }),
            }}
          >
            <Stack
              sx={{
                borderRadius: '5px',
                padding: 2,
              }}
              gap={1}
              direction={'row'}
            >
              <Box>
                <EllipseShape
                  height={'58px'}
                  width={'58px'}
                  sx={{
                    backgroundColor: ({ palette }) => `${palette.primary.main}`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </EllipseShape>
              </Box>
              <Stack direction={'column'} gap={1}>
                <Typography variant="subtitle2">{title}</Typography>
                <Typography
                  sx={{
                    fontSize: '8px',
                    flex: 1,
                  }}
                >
                  Anim cillum laborum incididunt eiusmod amet ut cupidatat reprehenderit.
                </Typography>
                <Stack direction="row" marginTop={-1} marginLeft={'auto'} gap={'5px'}>
                  <SquaredIconButton
                    sx={{
                      ':hover': {
                        backgroundColor: 'rgb(0 0 0 / 13%)',
                        color: (theme) => `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <Gear size={16} />
                  </SquaredIconButton>
                  <SquaredIconButton
                    sx={{
                      ':hover': {
                        backgroundColor: 'rgb(0 0 0 / 13%)',
                        color: (theme) => `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <PlusSquare size={16} />
                  </SquaredIconButton>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </CustomDrawerContainer>
  );
};
export default CustomDrawer;
