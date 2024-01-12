import { Box, Stack, styled } from '@mui/material';
import { GlobalSearch, NotificationTab, UserDropDown } from '.';

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
        <Stack alignItems={'flex-end'} gap={'4rem'} flexDirection={'row'}>
          <GlobalSearch />
          <NotificationTab />
          <UserDropDown />
        </Stack>
        <Box>here customers</Box>
      </Stack>
    </FlexedStickyHeader>
  );
};

export default Header;
const FlexedStickyHeader = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  flexDirection: 'row',
  padding: '0.5rem 4.5rem',
  top: 0,
  position: 'sticky',
  justifyContent: 'flex-end',
  alignItems: 'center',
  maxHeight: '5.755rem',
  flex: 0.25,
  boxShadow: '0px 4px 34px 0px rgba(0, 0, 0, 0.15)',
}));
