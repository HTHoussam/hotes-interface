import { Box, Card, CardContent, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { BellFill } from 'react-bootstrap-icons';

const NotificationTab = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? '' : undefined;

  return (
    <>
      <Box aria-describedby={id} onClick={handleClick}>
        <BellFill
          size={20}
          style={{
            color: 'white',
            cursor: 'pointer',
          }}
        />
      </Box>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        id={id}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '.MuiPaper-root': {
            maxWidth: '20rem',
            width: '100%',
          },
        }}
        open={open}
      >
        <Card sx={{ backgroundColor: 'white', gap: 1 }}>
          <CardContent>
            <Typography>title</Typography>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};
export default NotificationTab;
