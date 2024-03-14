import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useWidgetsMode } from '..';
import { WidgetsMapType } from '../types';
import CustomDrawer from './custom/custom-drawer';
import './widgets.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
const CaseWidgets = ({
  setLayout,
  layout: oldLayout,
  openDrawer,
  setOpenDrawer,
  mainWidgetsList,
}: {
  setLayout: Dispatch<SetStateAction<Layouts>>;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  layout: Layouts;
  openDrawer: boolean;
  mainWidgetsList: WidgetsMapType[];
}) => {
  const { widgetsMode, setDeletedWidgetIds } = useWidgetsMode();

  const handleLayoutChange = useCallback(
    (_layout: Layout[], allLayouts: Layouts) => {
      setLayout(allLayouts);
    },
    [setLayout],
  );
  const handleOnDrop = useCallback(
    (_layout: Layout[], item: Layout, event: DragEvent) => {
      if (!event.dataTransfer) return;
      const widgetTitle = JSON.parse(event.dataTransfer.getData('application/json'));
      const droppedWidget = mainWidgetsList.find((r) => r.widgetId === widgetTitle);
      if (droppedWidget) {
        setDeletedWidgetIds && setDeletedWidgetIds((prev) => prev.filter((r) => r !== droppedWidget.widgetId));
        const idxOfWidget = mainWidgetsList.findIndex((r) => r.widgetId === widgetTitle);
        mainWidgetsList[idxOfWidget].isInLayout = true;
        setLayout((prev) => {
          const r = [
            ...prev['lg'],
            {
              ...item,
              h: 5,
              w: 5,
              minH: 6,
              i: droppedWidget.widgetId,
            },
          ];
          return {
            lg: r,
            md: r,
          };
        });
      }
    },
    [mainWidgetsList, setDeletedWidgetIds, setLayout],
  );
  return (
    <Box
      sx={{
        '.react-grid-item': {
          overflow: 'hidden',
          paddingBlock: '0.5rem',
          backgroundColor: 'rgba(243, 244, 247, 1)',
          ...(widgetsMode
            ? {
                '-webkit-user-select': 'none',
                '-ms-user-select': 'none',
                userSelect: 'none',
              }
            : {}),
        },
        '.react-grid-item.react-grid-placeholder': {
          backgroundColor: 'purple',
        },
      }}
    >
      {openDrawer && (
        <Box
          sx={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
          }}
          onClick={() => {
            setOpenDrawer(false);
          }}
        ></Box>
      )}
      <CustomDrawer mainWidgetsList={mainWidgetsList} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <ResponsiveGridLayout
        onDrop={handleOnDrop}
        useCSSTransforms
        className="layout"
        layouts={{
          lg: oldLayout['lg'],
          md: oldLayout['md'],
        }}
        draggableHandle=".drag-handle"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        containerPadding={[15, 25]}
        margin={[10, 25]}
        isBounded={false}
        isResizable={widgetsMode}
        isDraggable={widgetsMode}
        isDroppable={true}
        onLayoutChange={handleLayoutChange}
      >
        {mainWidgetsList.map(
          ({ component, widgetId, isInLayout }) => isInLayout && <Box key={`${widgetId}`}>{component}</Box>,
        )}
      </ResponsiveGridLayout>
    </Box>
  );
};

export default CaseWidgets;
