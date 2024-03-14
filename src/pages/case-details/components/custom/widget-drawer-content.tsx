import { Widget } from '@/types';
import { Box, Stack } from '@mui/material';

const WidgetDrawerContent = ({ widgetsList }: { widgetsList: Widget[] }) => {
  return (
    <Stack direction={'column'} gap={2} padding={2}>
      {widgetsList.map(({ id, description, title }) => (
        <div key={id} draggable={true}>
          <Stack gap={1} direction={'row'}>
            <Box>{title}</Box>
            <Box>{description}</Box>
          </Stack>
        </div>
      ))}
    </Stack>
  );
};
export default WidgetDrawerContent;
