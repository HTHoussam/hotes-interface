import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type HotelDetails = {
  image: string;
  description: string;
  name: string;
  href: string;
};

const HotelDetails = ({ hotelDetails: { description, image, href, name } }: { hotelDetails: HotelDetails }) => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        flex: 1,
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: 'gray',
          // flex: 1,
          height: 400,
          overflow: 'hidden',
          p: 1,
        }}
      >
        <img
          loading="lazy"
          alt="logo"
          src={image ?? '/imgs/logo.png'}
          style={{
            objectFit: 'fill',
            aspectRatio: '2/1',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Stack gap={3} p={1} alignItems={'center'} pt={0}>
        <Typography variant="h5" textAlign={'center'}>
          {name}
        </Typography>
        <Typography>{description}</Typography>
        <Stack
          sx={{
            mt: 'auto',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Button
            onClick={() => {
              navigate(href);
            }}
            variant="outlined"
          >
            Discover hotel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default HotelDetails;
