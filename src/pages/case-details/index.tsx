import { useWidgetsStore } from '@/stores/variables-store';
import { Stack } from '@mui/material';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookmarkCheck,
  CashCoin,
  ChatDots,
  CurrencyExchange,
  Folder,
  PeopleFill,
  PersonFill,
} from 'react-bootstrap-icons';
import { Layout, Layouts } from 'react-grid-layout';
import CaseWidgets from './components/case-widgets';
import CaseTabsSwitcher from './components/custom/case-tabs-switcher';
import InnbetalingerCard from './components/custom/innbetalinger-card';
import CaseDetailsHeader from './components/widgets/case-details-header';
import Fordringer from './components/widgets/fordringer';
import Notater from './components/widgets/notater';
import RedigerDeptor from './components/widgets/rediger-deptor';
import SakerDebitor from './components/widgets/saker-debitor';
import Sms from './components/widgets/sms';
import TiltakCard from './components/widgets/tiltak-card';
import { WidgetsMapType } from './types';

export const WidgetsModeContext = createContext<{
  widgetsMode: boolean;
  setWidgetsMode: Dispatch<SetStateAction<boolean>> | null;
  deletedWidgetIds: string[];
  setDeletedWidgetIds: Dispatch<SetStateAction<string[]>> | null;
}>({
  setWidgetsMode: null,
  widgetsMode: false,
  deletedWidgetIds: [],
  setDeletedWidgetIds: null,
});
export const useWidgetsMode = () => {
  return useContext(WidgetsModeContext);
};

export default () => {
  const [selectedTab, setSelectedTab] = useState<'Opprett' | 'Annet'>('Opprett');
  const [widgetsMode, setWidgetsMode] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { currentWidgetsLayout, deletedWidgets } = useWidgetsStore();
  const [deletedWidgetIds, setDeletedWidgetIds] = useState<string[]>(deletedWidgets);
  const [layout, setLayout] = useState<Layouts>(
    currentWidgetsLayout && currentWidgetsLayout.length > 0
      ? {
          lg: currentWidgetsLayout,
          md: currentWidgetsLayout,
        }
      : {},
  );

  const mainWidgetsList: WidgetsMapType[] = useMemo(() => {
    return [
      {
        widgetId: 'main',
        component: <CaseDetailsHeader widgetId={'main'} />,
        isInLayout: !deletedWidgetIds.includes('main'),
        title: 'Details',
        icon: <Folder size={35} />,
      },
      {
        widgetId: 'widget0',
        component: <TiltakCard widgetId={'widget0'} />,
        isInLayout: !deletedWidgetIds.includes('widget0'),
        title: 'Tiltak',
        icon: <Activity size={35} />,
      },
      {
        widgetId: 'widget1',
        component: <RedigerDeptor widgetId={'widget1'} setLayout={setLayout} />,
        isInLayout: !deletedWidgetIds.includes('widget1'),
        title: 'RedigerDeptor',
        icon: <PersonFill size={35} />,
      },
      {
        widgetId: 'widget2',
        component: <Notater widgetId={'widget2'} />,
        isInLayout: !deletedWidgetIds.includes('widget2'),
        title: 'Notater',
        icon: <BookmarkCheck size={35} />,
      },
      {
        widgetId: 'widget3',
        component: <Fordringer widgetId={'widget3'} />,
        isInLayout: !deletedWidgetIds.includes('widget3'),
        title: 'Fordringer',
        icon: <CashCoin size={35} />,
      },
      {
        widgetId: 'widget4',
        component: <SakerDebitor widgetId={'widget4'} />,
        isInLayout: !deletedWidgetIds.includes('widget4'),
        title: 'SakerDebitor',
        icon: <PeopleFill size={35} />,
      },
      {
        widgetId: 'widget5',
        component: <InnbetalingerCard widgetId={'widget5'} />,
        isInLayout: !deletedWidgetIds.includes('widget5'),
        title: 'InnbetalingerCard',
        icon: <CurrencyExchange size={35} />,
      },
      {
        widgetId: 'widget6',
        component: <Sms widgetId={'widget6'} />,
        isInLayout: !deletedWidgetIds.includes('widget6'),
        title: 'SMS',
        icon: <ChatDots size={35} />,
      },
    ];
  }, [deletedWidgetIds]);
  const defaultLayout: Layout[] = useMemo(
    () => [
      {
        i: 'main',
        w: 5,
        h: 7,
        x: 0,
        y: 0,
        minH: 7,
        minW: 5,
      },
      {
        w: 7,
        h: 8,
        x: 5,
        y: 6,
        i: 'widget0',
        minH: 6,
      },
      {
        w: 5,
        h: 7,
        x: 0,
        y: 6,
        i: 'widget1',
        minH: 6,
      },
      {
        w: 7,
        h: 7,
        x: 5,
        y: 8,
        i: 'widget2',
        minH: 6,
      },
      {
        w: 7,
        h: 8,
        x: 5,
        y: 13,
        i: 'widget3',
        minH: 6,
      },
      {
        w: 5,
        h: 10,
        x: 0,
        y: 13,
        i: 'widget4',
        minH: 6,
      },
      {
        w: 7,
        h: 7,
        x: 5,
        y: 23,
        i: 'widget5',
        minH: 6,
      },
      {
        w: 5,
        h: 7,
        x: 0,
        y: 24,
        i: 'widget6',
        minH: 6,
      },
    ],
    [],
  );

  useEffect(() => {
    if (!mainWidgetsList || currentWidgetsLayout) return;
    const result = mainWidgetsList.map(({ widgetId }, idx) => {
      const defaultValue = defaultLayout.find((r) => r.i === widgetId);
      return {
        w: defaultValue ? defaultValue.w : 3,
        h: defaultValue ? defaultValue.h : 5,
        x: defaultValue ? defaultValue.x : idx,
        y: defaultValue ? defaultValue.y : 7,
        i: widgetId,
        minH: defaultValue ? defaultValue.minH : 3,
      };
    });
    setLayout({ lg: result, md: result });
  }, [currentWidgetsLayout, defaultLayout, mainWidgetsList]);

  return (
    <WidgetsModeContext.Provider
      value={{
        setDeletedWidgetIds,
        deletedWidgetIds,
        widgetsMode,
        setWidgetsMode,
      }}
    >
      <CaseTabsSwitcher
        defaultLayout={defaultLayout}
        setOpenDrawer={setOpenDrawer}
        layout={layout}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        setLayout={setLayout}
      />

      <Stack
        sx={{
          gap: 1,
          paddingBottom: '1rem',
        }}
      >
        <CaseWidgets
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setLayout={setLayout}
          mainWidgetsList={mainWidgetsList}
          layout={layout}
        />
      </Stack>
    </WidgetsModeContext.Provider>
  );
};
