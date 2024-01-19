import { Box, Typography } from '@mui/material';
export type FooterStatus = 'expanded' | 'collapsed';
export default () => {
  return (
    <Box>
      {' '}
      <Typography variant="h5" textTransform={'capitalize'}>
        Attachments
      </Typography>
    </Box>
  );
};
