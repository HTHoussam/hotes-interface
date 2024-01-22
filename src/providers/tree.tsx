import router from '@/configs/router';
import { theme } from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

export const ProviderTree = () => (
  <ThemeProvider theme={theme}>
    <Toaster duration={1500} richColors position="bottom-left" />
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
