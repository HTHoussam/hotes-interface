import { Box, Stack, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, SideMenu } from './UI';
import Header from './UI/header';

export const MainLayout = () => {
  return (
    <Stack sx={{ height: '100vh', flexDirection: 'row' }}>
      <SideMenu />
      <Stack direction="column" flexGrow={1} width={'100%'}>
        <Header />
        <StackContainer>
          <Box sx={{ p: 2 }}>
            <Outlet />
          </Box>
          <Footer />
        </StackContainer>
      </Stack>
    </Stack>
  );
};
const StackContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  overflowX: 'hidden',
  flex: 3,
  position: 'relative',
  paddingY: 2,
  backgroundColor: theme.palette.divider,
}));
