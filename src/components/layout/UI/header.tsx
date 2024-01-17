import { Stack, Typography, styled } from '@mui/material';
import { GlobalSearch, SelectCustomers, UserDropDown } from '.';

const Header = () => {
  return (
    <FlexedStickyHeader id="main-header" direction={'row'}>
      <Stack
        direction={'row'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 8,
          flexDirection: 'row-reverse',
        }}
      >
        <Stack justifyContent={'flex-end'} alignItems={'flex-end'} gap={'5rem'} flexDirection={'row'} flex={1}>
          <GlobalSearch />
          <UserDropDown />
        </Stack>
        <Stack direction={'row'} color={'white'} alignItems={'center'} gap={8} flex={1}>
          <Typography
            sx={{
              textWrap: 'wrap',
            }}
            maxWidth={'7rem'}
          >
            Municipality : 0219 Engstelig Tiger AS
          </Typography>
          <SelectCustomers />
        </Stack>
      </Stack>
    </FlexedStickyHeader>
  );
};

export default Header;
const FlexedStickyHeader = styled(Stack)(({ theme }) => ({
  gridRow: '1 / span 1',
  gridColumn: '1 / span 1',
  backgroundColor: theme.palette.primary.main,
  flexDirection: 'row',
  padding: '0.5rem',
  top: 0,
  position: 'sticky',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minHeight: '5.755rem',
  flex: 0.25,
  boxShadow: '0px 4px 34px 0px rgba(0, 0, 0, 0.15)',
  flexShrink: 0,
  overflow: 'auto',
}));
