import { TextField, styled } from '@mui/material';

export const CustomSearchButton = styled(TextField)(({ theme }) => ({
  color: theme.palette.whitey?.main,
  borderColor: theme.palette.whitey?.main,
  '.MuiInput-root::after': {
    borderColor: theme.palette.whitey?.main,
    transform: 'scaleX(0.95)',
  },
  '.MuiInput-root:hover::after ,.MuiInput-root:focus-visible::after,.MuiInput-root:focus::after': {
    borderColor: theme.palette.whitey?.light,
    transform: 'scaleX(1)',
  },
  '.MuiInputBase-input': {
    color: theme.palette.whitey?.main,
  },
  '.MuiInputLabel-root': {
    display: 'none',
  },
  '.MuiInputBase-root .MuiSvgIcon-root': {
    color: theme.palette.whitey?.main,
  },
  '.MuiInputBase-root:hover .MuiSvgIcon-root,.MuiInputBase-root:focus-visible .MuiSvgIcon-root,MuiInputBase-root:focus.MuiSvgIcon-root ':
    {
      color: theme.palette.whitey?.light,
    },
}));
