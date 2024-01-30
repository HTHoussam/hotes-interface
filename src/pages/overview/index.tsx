import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default () => {
  const { element } = useParams();
  console.log('element', element);
  return (
    <Box>
      <Typography variant="h5" textTransform={'capitalize'}>
        overview
      </Typography>
      <Box p={4}>{/* <GenericDataTable /> */}</Box>
    </Box>
  );
};
