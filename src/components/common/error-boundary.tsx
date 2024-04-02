import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { useCallback } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const renderLogo = useCallback(() => {
    return (
      <Box sx={{ overflow: 'hidden', width: '270px' }}>
        <img
          src={'/imgs/404.jpg'}
          alt="Kapital kontrol"
          loading="lazy"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Box>
    );
  }, []);
  const renderGoBackBtn = useCallback(() => {
    return (
      <Link to="/">
        <Button
          sx={{
            width: '10rem',
          }}
        >
          home
        </Button>
      </Link>
    );
  }, []);
  if (isRouteErrorResponse(error)) {
    return (
      <StyledStack
        sx={{
          flexDirection: 'column',
          backgroundColor: '#FF7F7F ',
          gap: 2,
        }}
        id="error-page-1"
      >
        {renderLogo()}

        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        {renderGoBackBtn()}
      </StyledStack>
    );
  } else if (error instanceof Error) {
    return (
      <StyledStack id="error-page-2">
        {renderLogo()}
        <Typography variant="body1">Oops! Something went wrong.</Typography>
        <p></p>
        <p>
          <i>{error.message}</i>
        </p>
        {renderGoBackBtn()}
      </StyledStack>
    );
  } else {
    return (
      <StyledStack id="error-page-3">
        {renderLogo()}
        <Typography variant="body1">Oops! Something went wrong.</Typography>

        {renderGoBackBtn()}
      </StyledStack>
    );
  }
};

export default ErrorBoundary;

const StyledStack = styled(Stack)(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
}));
