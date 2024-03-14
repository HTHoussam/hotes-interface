import { Box, styled } from '@mui/material';

export default function FallBackLogoAnimated() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        flexGrow: 1,
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <img
          src={'/imgs/kk2_main_logo.png'}
          alt="Kapital kontrol"
          loading="lazy"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledDotBox sx={{ animationDelay: '0s' }} />
        <StyledDotBox sx={{ animationDelay: '0.3s' }} />
        <StyledDotBox sx={{ animationDelay: '0.5s' }} />
        <StyledDotBox sx={{ animationDelay: '0.7s' }} />
        <StyledDotBox sx={{ animationDelay: '0.9s' }} />
        <StyledDotBox sx={{ animationDelay: '1.1s' }} />
        <StyledDotBox sx={{ animationDelay: '1.3s' }} />
        <StyledDotBox sx={{ animationDelay: '1.5s' }} />
      </Box>
    </Box>
  );
}
const StyledDotBox = styled(Box)(() => ({
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  backgroundColor: '#63B768',
  margin: '0 5px',
  animation: 'loadingAnimation 1s infinite',
  '@keyframes loadingAnimation': {
    '0%': {
      opacity: 0.2,
      transform: 'scale(0.8)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
    '100%': {
      opacity: 0.2,
      transform: 'scale(0.8)',
    },
  },
}));
