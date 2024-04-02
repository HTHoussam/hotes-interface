import { Box, Card, Stack, styled, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useGetAllHotels } from '@/pages/home/api/hotels/queries';
import { Suspense, useMemo, useState } from 'react';
import { HotelsFilter, HotelsFilterContext } from '../context/filterContext';
import HotelDetails from './card-details';
import FilterStack from './filter-stack';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const HotelView = () => {
  const [hotelsFilter, setHotelsFilter] = useState<HotelsFilter | null>(null);

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(Number(newValue));
  };
  const { data: fetchedHotels } = useGetAllHotels();

  const filteredHotels = useMemo(() => {
    if (!fetchedHotels) return [];
    if (!hotelsFilter || hotelsFilter.roomsAvailable === 0) return fetchedHotels;
    return fetchedHotels.filter((hotel) => hotel.availableRooms >= hotelsFilter.roomsAvailable);
  }, [fetchedHotels, hotelsFilter]);

  return (
    <Suspense fallback={<>Loading ...</>}>
      <HotelsFilterContext.Provider
        value={{
          hotelsFilter,
          setHotelsFilter,
        }}
      >
        <StyledHotelViewStack>
          <Box padding={8} paddingTop={4}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Hotel + Tickets" />
                <Tab label="Tickets" />
              </Tabs>
            </Box>
            <Card
              sx={{
                padding: '2rem 1rem',
              }}
            >
              <FilterStack fetchedHotels={filteredHotels} />
            </Card>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <Stack direction={'column'} gap={4}>
              <Typography component={'h4'} alignSelf={'center'} fontWeight={700} fontSize={'24px'}>
                let the magic shine at Disneyland
              </Typography>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 4,
                  flexWrap: 'wrap',
                }}
              >
                {filteredHotels.map(({ href, description, image, name, id }) => (
                  <HotelDetails
                    key={id}
                    hotelDetails={{
                      description,
                      href,
                      image,
                      name,
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            Item Two
          </CustomTabPanel>
        </StyledHotelViewStack>
      </HotelsFilterContext.Provider>
    </Suspense>
  );
};
export default HotelView;
const StyledHotelViewStack = styled(Stack)(() => ({
  marginRight: 'auto',
  marginLeft: 'auto',
  justifyContent: 'center',
  aligntems: 'center',
  flexDirection: 'column',
  gap: 4,
}));
