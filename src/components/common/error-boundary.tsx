import { Stack } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Stack
        sx={{
          flexDirection: 'column',
          backgroundColor: '#FF7F7F ',
        }}
        id="error-page-1"
      >
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </Stack>
    );
  } else if (error instanceof Error) {
    return (
      <Stack id="error-page-2">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default ErrorBoundary;
