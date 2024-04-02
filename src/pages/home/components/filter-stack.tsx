import { Hotel } from '@/types';
import { Box, Button, MenuItem, Select, Stack, styled, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useHotelsFilter } from '../context/filterContext';
import CustomDatePicker from './custom-range-picker';
export const generateSingleOptions = (options: { label: string | number; value: string | number }[]) => {
  return options.map((option) => {
    return (
      <MenuItem key={option.value} value={String(option.value)}>
        {String(option.label)}
      </MenuItem>
    );
  });
};
type FilterStackProps = {
  fetchedHotels: Hotel[];
};

const FilterStack = ({ fetchedHotels }: FilterStackProps) => {
  const [selectedHotel, setSeletectedHotel] = useState('');
  const { hotelsFilter, setHotelsFilter } = useHotelsFilter();
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const selectorOptions = useMemo(() => {
    if (!fetchedHotels || fetchedHotels.length < 0) return [];
    return fetchedHotels.map(({ name, id }) => ({
      label: name,
      value: String(id),
    }));
  }, [fetchedHotels]);
  const roomsOptions = useMemo(() => {
    return Array.from({
      length: 100,
    }).map((_, idx) => ({
      label: idx,
      value: idx,
    }));
  }, []);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'M'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Stack direction={'column'} gap={4}>
        <Stack direction={'row'} gap={2} flexWrap={'wrap'} justifyContent={'center'}>
          <FlexItemStack
            sx={{
              minWidth: 250,
            }}
          >
            <LabelText>Pick your dates:</LabelText>
            <CustomDatePicker
              firstDate={startDate}
              secondDate={endDate}
              setSecondDate={setEndDate}
              setFirstDate={setStartDate}
            />
          </FlexItemStack>
          <FlexItemStack
            sx={{
              minWidth: 250,
            }}
          >
            <LabelText>Hotels & Resorts</LabelText>
            <Select
              onChange={(event) => {
                setSeletectedHotel(event.target.value);
              }}
              value={selectedHotel}
              size="small"
              MenuProps={{
                sx: {
                  '.MuiPaper-root': {
                    width: 'fit-content',
                  },
                },
              }}
              fullWidth
            >
              {generateSingleOptions(selectorOptions)}
            </Select>
          </FlexItemStack>
          <FlexItemStack
            sx={{
              minWidth: 250,
            }}
          >
            <LabelText>Hotels & Resorts</LabelText>
            <Select
              onChange={(event) => {
                setNumberOfRooms(+event.target.value);
                setHotelsFilter &&
                  setHotelsFilter({
                    ...hotelsFilter,
                    roomsAvailable: +event.target.value,
                  });
              }}
              value={numberOfRooms}
              size="small"
              MenuProps={{
                sx: {
                  '.MuiPaper-root': {
                    width: 'fit-content',
                    maxHeight: 200,
                  },
                },
              }}
              fullWidth
            >
              {generateSingleOptions(roomsOptions)}
            </Select>
          </FlexItemStack>
          <FlexItemStack
            sx={{
              flex: 0.5,
              alignSelf: 'flex-end',
            }}
          >
            <FilterStyledButton size="small">Find Prices</FilterStyledButton>
          </FlexItemStack>
        </Stack>
        <Box>
          <Typography>Looking for ideal time to come compare prices</Typography>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};
export default FilterStack;

const FilterStyledButton = styled(Button)(() => ({
  height: 40,
}));
const LabelText = styled(Typography)(() => ({
  textTransform: 'capitalize',
  fontWeight: 700,
  fontSize: 14,
}));
const FlexItemStack = styled(Stack)(() => ({
  flex: 1,
  gap: '1rem',
}));
