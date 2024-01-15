import { useKeyShortcuts } from '@/hooks/use-key-shortcuts';
import { Box, Paper, Stack, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './UI/header';
import SideMenu from './UI/side-menu';

export const MainLayout = () => {
  useKeyShortcuts();
  return (
    <Stack direction="row" height="100vh">
      <SideMenu />
      <Box sx={{ width: '100%' }}>
        <GridContainer>
          <Header />
          <Paper
            sx={{
              position: 'relative',
              gridColumn: '1 / span 1',
              gridRow: '2 / span 1',
              overflow: 'auto',
              scrollbarGutter: 'stable',
              padding: '1rem',
            }}
          >
            <Outlet />
          </Paper>
        </GridContainer>
      </Box>
    </Stack>
  );
};

const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto 1fr',
  height: '100%',
  position: 'relative',
}));
