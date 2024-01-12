import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        gap={6}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" fontWeight={'700'}>
          Page not found
        </Typography>
        <Typography variant="subtitle1">Error 404</Typography>
        <Link to="/">
          <Button
            sx={{
              width: '10rem',
            }}
          >
            home
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};
export default NotFound;
