import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * This is reexport for @testing-library properties to include providers
 * Add Necessary providers for testing here
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
