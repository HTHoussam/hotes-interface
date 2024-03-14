import router from '@/configs/router';
import { theme } from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

export const ProviderTree = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Toaster duration={1500} richColors position="bottom-left" />
      <CssBaseline />
      <RouterProvider router={router} />
    </LocalizationProvider>
  </ThemeProvider>
);
