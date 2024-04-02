import { ErrorBoundary } from '@/components/common';
import { MainLayout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
  {
    ErrorBoundary: ErrorBoundary,
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]);
