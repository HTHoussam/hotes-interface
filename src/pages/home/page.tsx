import { Box, styled } from '@mui/material';
import HotelView from './components/hotel-view';
export type FooterStatus = 'expanded' | 'collapsed';

export default () => {
  return (
    <GridContainer>
      <Box
        sx={{
          margin: '-0.5rem',
        }}
      >
        <HotelView />
      </Box>
    </GridContainer>
  );
};

const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: `1fr 0fr`,
  transition: 'grid-template-rows 1s ease',
  height: '100%',
  alignContent: 'space-between',
  position: 'relative',
  gap: '2rem',
  padding: '1rem',
}));
