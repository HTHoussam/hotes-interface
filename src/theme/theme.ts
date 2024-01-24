import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: { main: '#011043' },
    whitey: {
      main: 'rgba(255, 255, 255, 0.85)',
      light: 'rgba(255, 255, 255, 0.55)',
      dark: '#A29415',
      contrastText: '#242105',
    },
    text: {
      primary: '#011043',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    subtitle1: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '1.35rem',
      textTransform: 'capitalize',
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    body1: {
      fontSize: '12px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          margin: '0 auto',
          backgroundColor: 'rgba(0, 0, 0, 0.14)',
          verticalAlign: 'baseline',
          overflow: 'hidden',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '*::-webkit-scrollbar': {
          '--thumb-thickness': '0.75rem',
          backgroundColor: 'transparent',
          width: '0.75rem',
          height: '0.75rem',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#00000044',
          borderRadius: ' 1rem',
          transition: ' box-shadow 300ms ease',
          boxShadow: '0 0 0 0.275rem white inset',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#00000077',
        },
        '*:hover::-webkit-scrollbar-thumb': {
          boxShadow: '0 0 0 2px white inset',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#011043',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: '1px 1rem ',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            textTransform: 'capitalize',
          },
          fontWeight: 300,
        },
      },
      defaultProps: {
        size: 'small',
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    /** overriding position of textfield label to match small size input */
    MuiInputLabel: {
      styleOverrides: {
        sizeSmall: {
          root: {
            transform: 'translate(14px, 8px) scale(1)',
          },
          shrink: {
            transform: 'translate(14px, -10px) scale(0.75)',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '15px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 'auto',
          maxWidth: '15rem',
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          maxWidth: '115px',
          maxHeight: '48px',
          padding: '8px 16px',
          borderRadius: '5px',
        },
        containedPrimary: {
          '&:hover, &:focus ,&:focus-visible': {
            backgroundColor: 'rgba(1, 16, 67, 0.7)',
          },
        },
        containedSecondary: {
          backgroundColor: '#6C757D',
          '&:hover, &:focus ,&:focus-visible': {
            backgroundColor: 'rgba(108, 117, 125, 0.7)',
          },
        },
        outlinedError: {
          ':hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.2)',
          },
        },
      },
    },
  },
});
