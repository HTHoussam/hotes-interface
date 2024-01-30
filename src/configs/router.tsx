import { ErrorBoundary } from '@/components/common';
import { MainLayout } from '@/components/layout';
import NotFound from '@/pages/404';
import Administration from '@/pages/administration';
import Attachments from '@/pages/attachments';
import Cases from '@/pages/cases';
import Deptors from '@/pages/deptors';
import { HomePage } from '@/pages/home';
import ImportError from '@/pages/import-error';
import Loans from '@/pages/loans';
import Management from '@/pages/management';
import NewCases from '@/pages/new-cases';
import Overview from '@/pages/overview';
import Proceedings from '@/pages/proceedings';
import Proposals from '@/pages/proposals';
import PublicAdministration from '@/pages/public-administration';
import Recorded from '@/pages/recorded';
import UserManual from '@/pages/user-manual';
import UserSupport from '@/pages/user-support';
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
      {
        path: '/administration',
        element: <Administration />,
      },
      {
        path: '/cases',
        element: <Cases />,
      },
      {
        path: '/management',
        element: <Management />,
      },
      {
        path: '/public-360',
        element: <PublicAdministration />,
      },
      {
        path: '/import-error',
        element: <ImportError />,
      },
      {
        path: '/new-cases',
        element: <NewCases />,
      },
      {
        path: '/attachments',
        element: <Attachments />,
      },
      {
        path: '/accounting',
        element: <Proposals />,
      },
      {
        path: '/recorded',
        element: <Recorded />,
      },
      {
        path: '/proceedings',
        element: <Proceedings />,
      },
      {
        path: '/deptors',
        element: <Deptors />,
      },
      {
        path: '/user-support',
        element: <UserSupport />,
      },
      {
        path: '/user-manual',
        element: <UserManual />,
      },
      {
        path: '/loans',
        element: <Loans />,
      },
      {
        path: '/overview/:element',
        element: <Overview />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
