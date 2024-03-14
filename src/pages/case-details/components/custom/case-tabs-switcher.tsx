import { StyledTooltip } from '@/components/common/styled-components';
import { useWidgetsStore } from '@/stores/variables-store';
import { Box, Button, IconButton, MenuItem, Popover, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import {
  ArrowsMove,
  Bandaid,
  Book,
  Briefcase,
  CashCoin,
  ChatSquareText,
  Eye,
  HouseDoor,
  JournalBookmark,
  Pen,
  PencilSquare,
  Plus,
  Speedometer2,
  Stack as StackIcon,
  TextCenter,
  Unlock,
} from 'react-bootstrap-icons';
import { Layout, Layouts } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { useWidgetsMode } from '../..';
import { useFilterModal } from '../../hooks/use-filter-modals';
import ProsesstrinnModal from '../filter-modals/foreldelse-modal';
import InnbetalingModal2 from '../filter-modals/innbetaling-modal';
import NotatModal from '../filter-modals/notat-modal';
import NytNotatModal from '../filter-modals/nytt-notat';
import SaksvalgModal from '../filter-modals/saksvalg-modal';
import InnbetalingModal from '../filter-modals/titlak-modal';
interface CaseTabsSwitcherProps {
  setSelectedTab: Dispatch<SetStateAction<'Opprett' | 'Annet'>>;
  selectedTab: string;
  layout: Layouts;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setLayout: Dispatch<SetStateAction<Layouts>>;
  defaultLayout: Layout[];
}
const CaseTabsSwitcher = ({
  setSelectedTab,
  selectedTab,
  layout,
  setOpenDrawer,
  setLayout,
  defaultLayout,
}: CaseTabsSwitcherProps) => {
  const { t } = useTranslation();
  const { widgetsMode, setWidgetsMode, deletedWidgetIds, setDeletedWidgetIds } = useWidgetsMode();
  const { setCurrentWidgetsLayout, setDeletedWidgets, deletedWidgets, currentWidgetsLayout } = useWidgetsStore();

  const {
    depitorNotat,
    foreldelseModal,
    innbetaling,
    notat,
    tiltak,
    fordring,
    avdragsavtale,
    ettergivelse,
    gjeldsordning,
    kumulasjon,
    skyggesak,
  } = useFilterModal();
  const tabsFilters: { [key: string]: { title: string; icon: JSX.Element; onClick?: (val: boolean) => void }[] } =
    useMemo(() => {
      return {
        Opprett: [
          {
            icon: <CashCoin size={16} />,
            title: 'Innbetaling',
            onClick: innbetaling.handleOpenInnbetalingState,
          },
          {
            icon: <Speedometer2 size={16} />,
            title: 'Tiltak',
            onClick: tiltak.handleTiltakModal,
          },
          {
            icon: <JournalBookmark size={16} />,
            title: 'Notat',
            onClick: notat.handleNotatModal,
          },
          {
            icon: <HouseDoor size={16} />,
            title: 'Foreldelse av pant',
            onClick: foreldelseModal.handleForeldelseModal,
          },
          {
            icon: <Bandaid size={16} />,
            title: 'Fordring',
            onClick: fordring.handleFordringModal,
          },
          {
            icon: <ChatSquareText size={16} />,
            title: 'Debitornotat',
            onClick: depitorNotat.handleDepitorNotatModal,
          },
          {
            icon: <Eye size={16} />,
            title: 'Skyggesak',
            onClick: skyggesak.handleSkyggesakModal,
          },
          {
            icon: <Unlock size={16} />,
            title: 'Ettergivelse',
            onClick: ettergivelse.handleEttergivelseModal,
          },
          {
            icon: <Pen size={16} />,
            title: 'Avdragsavtale	',
            onClick: avdragsavtale.handleAvdragsavtaleModal,
          },
          {
            icon: <TextCenter size={16} />,
            title: 'Gjeldsordning',
            onClick: gjeldsordning.handleGjeldsordningModal,
          },
          {
            icon: <StackIcon size={16} />,
            title: 'Kumulasjon',
            onClick: kumulasjon.handleKumulasjonModal,
          },
        ],
        Annet: [
          {
            icon: <Briefcase size={16} />,
            title: 'Saksvalg',
            onClick: () => {},
          },
          {
            icon: <Book size={16} />,
            title: 'test2',
            onClick: () => {},
          },
        ],
      };
    }, [
      avdragsavtale.handleAvdragsavtaleModal,
      depitorNotat.handleDepitorNotatModal,
      ettergivelse.handleEttergivelseModal,
      fordring.handleFordringModal,
      foreldelseModal.handleForeldelseModal,
      gjeldsordning.handleGjeldsordningModal,
      innbetaling.handleOpenInnbetalingState,
      kumulasjon.handleKumulasjonModal,
      notat.handleNotatModal,
      skyggesak.handleSkyggesakModal,
      tiltak.handleTiltakModal,
    ]);

  const handleSaveLayout = useCallback(() => {
    setCurrentWidgetsLayout(layout['lg']);
    setDeletedWidgets(deletedWidgetIds);
    setWidgetsMode && setWidgetsMode(false);
  }, [deletedWidgetIds, layout, setCurrentWidgetsLayout, setDeletedWidgets, setWidgetsMode]);

  const handleCancelEditMode = useCallback(() => {
    if (currentWidgetsLayout && currentWidgetsLayout?.length > 0) {
      setLayout({
        lg: currentWidgetsLayout,
        md: currentWidgetsLayout,
      });
    } else {
      setLayout({
        lg: defaultLayout,
        md: defaultLayout,
      });
    }

    setDeletedWidgetIds && setDeletedWidgetIds(deletedWidgets);
    setWidgetsMode && setWidgetsMode(false);
  }, [currentWidgetsLayout, defaultLayout, deletedWidgets, setDeletedWidgetIds, setLayout, setWidgetsMode]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleAddWidgetClick = () => {
    setWidgetsMode && setWidgetsMode(true);
    setOpenDrawer(true);
    handleClose();
  };
  const handleToggleEditMode = () => {
    setWidgetsMode && setWidgetsMode(!widgetsMode);
    handleClose();
  };

  return (
    <StyledTabsContainer
      sx={{
        position: 'sticky',
        right: 0,
        width: `100%`,
        zIndex: 1,
        top: 0,
      }}
    >
      <InnbetalingModal
        openModal={innbetaling.openInnbetalingModal}
        handleOpenState={innbetaling.handleOpenInnbetalingState}
      />
      <ProsesstrinnModal openModal={tiltak.tiltakModal} handleOpenState={tiltak.handleTiltakModal} />
      <NotatModal openModal={notat.notatModal} handleOpenState={notat.handleNotatModal} />
      <InnbetalingModal2
        openModal={depitorNotat.debitornotatModal}
        handleOpenState={depitorNotat.handleDepitorNotatModal}
      />
      <NytNotatModal openModal={notat.notatModal} handleOpenState={notat.handleNotatModal} />
      <SaksvalgModal openModal={fordring.fordringModal} handleOpenState={fordring.handleFordringModal} />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => {
            setSelectedTab(value);
          }}
          sx={{
            '& .MuiTab-root': {
              p: 0,
              minWidth: 69,
              fontSize: '13px',
            },
          }}
          aria-label="basic tabs example"
        >
          <Tab label={t('case.detail.first.tab.title')} value="Opprett" />
          <Tab label={t('case.detail.second.tab.title')} value="Annet" />
        </Tabs>
        <Stack direction={'row'} gap={1}>
          {widgetsMode && (
            <>
              <Button size="small" onClick={handleCancelEditMode} variant="outlined" color="error">
                {t('common.title.cancel')}
              </Button>
              <Button size="small" onClick={handleSaveLayout}>
                {t('common.title.save')}
              </Button>
            </>
          )}
          <IconButton onClick={handleClick}>
            <StyledTooltip title="Customize your view">
              <PencilSquare size={20} />
            </StyledTooltip>
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPaper-root': {
                paddingInline: '0.5rem',
                paddingBlock: '0.5rem',
                width: 'fit-content',
              },
            }}
          >
            <StyledMenuItem onClick={handleAddWidgetClick}>
              <Box
                sx={{
                  width: '20px',
                }}
              >
                <Plus size={22} />
              </Box>
              <Typography flex={1} textTransform={'capitalize'}>
                add widget
              </Typography>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleToggleEditMode}>
              <Box
                sx={{
                  width: '20px',
                }}
              >
                <Pen size={15} />
              </Box>
              <Typography flex={1} textTransform={'capitalize'}>
                Edit Mode
              </Typography>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleToggleEditMode}>
              <Box
                sx={{
                  width: '20px',
                }}
              >
                <ArrowsMove size={15} />
              </Box>
              <Typography flex={1} textTransform={'capitalize'}>
                Move Widgets
              </Typography>
            </StyledMenuItem>
          </Popover>
        </Stack>
      </Stack>

      <Stack direction={'row'} overflow={'auto'} gap={4} mb={1}>
        {tabsFilters[selectedTab].map(({ title, icon, onClick }) => (
          <Stack
            sx={{
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
              cursor: 'pointer',
            }}
            key={title}
            onClick={() => {
              onClick && onClick(true);
            }}
          >
            {icon}
            <Box>{title}</Box>
          </Stack>
        ))}
      </Stack>
    </StyledTabsContainer>
  );
};
export default CaseTabsSwitcher;

const StyledTabsContainer = styled(Stack)(() => ({
  boxShadow: '-2px 20px 20px 0px rgba(220,217,217,0.35)',
  backgroundColor: 'white',
  paddingBlock: 2,
  gap: '1rem',
  paddingInline: '1.5rem',
}));
const StyledMenuItem = styled(MenuItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  paddingInline: '12px',
  gap: 2,
}));
