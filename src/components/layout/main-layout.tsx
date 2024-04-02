import { Box, Paper, Stack, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Stack direction="row" height="100vh">
      <Box sx={{ width: '100%' }}>
        <GridContainer>
          <Paper
            sx={{
              position: 'relative',
              gridColumn: '1 / span 1',
              gridRow: '2 / span 1',
              overflow: 'auto',
              scrollbarGutter: 'stable',
            }}
            id="main-layout__paper"
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
