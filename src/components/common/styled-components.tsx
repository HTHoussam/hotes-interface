import { Button, Select, Stack, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from '@mui/material';

export const PageTitle = styled(Typography)(() => ({
  marginTop: '2rem',
  marginBottom: '1.5rem',
  marginLeft: '1rem',
  marginRight: '1rem',
  fontWeight: '600',
}));
export const InvertedColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  fontWeight: '600',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
  },
}));

export const StyledTooltip = styled(({ className, color, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, color }) => ({
  [`& .${tooltipClasses.tooltipArrow}`]: {
    backgroundColor: color,
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&:before': {
      border: `1px solid ${color}`,
    },
    color,
  },
}));

export const ContentStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxHeight: '3rem',
  border: '1px solid rgba(0, 0, 0, 0.18)',
  boxShadow: '0px 4px 17px 0px rgba(0, 0, 0, 0.1)',
  padding: '1rem 1rem',
  borderRadius: '5px',
  '&:hover, &:focus': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    cursor: 'pointer',
  },
}));
export const OutlinedSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.whitey?.main,
  '::before': {
    display: 'none',
  },
  '.MuiSelect-icon': {
    color: theme.palette.whitey?.main,
  },
  border: '1px solid #011043',
  borderRadius: '3px',
  height: '40px',
  fontWeight: 600,
  fontSize: '13px',
  lineHeight: '18px',
  marginRight: '25px',
}));
