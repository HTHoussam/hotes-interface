import { OutlinedSelect } from '@/components/common/styled-components';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { BoxArrowRight, Person, PersonCircle, Translate } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const UserDropDown = () => {
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 2,
      }}
    >
      <Person size={35} color="white" />
      <Box>
        <OutlinedSelect
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: '30rem',
                maxWidth: '12rem',
                top: '4rem !important',
                left: 'Calc(100vw - 7.5rem*2) !important',
              },
            },
          }}
          sx={{
            width: '100%',
            '&.MuiInputBase-root': {
              maxHeight: '20px',
              maxWidth: '80%',
              '.MuiStack-root > svg': {
                display: 'none',
              },
            },
          }}
          variant="standard"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={10}
          label="user"
        >
          <MenuItem
            sx={{
              display: 'none',
            }}
            value={10}
          >
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Typography variant="subtitle2" color={'white'}>
                Demo Bruker
              </Typography>
            </Stack>
          </MenuItem>
          <Link to={'/settings'} state={{ settingsTab: 'Profile' }}>
            <MenuItem value={15}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <PersonCircle size={15} />
                <Typography variant="subtitle2">{t('common.title.profile')}</Typography>
              </Stack>
            </MenuItem>
          </Link>
          <Link to={'/settings'} state={{ settingsTab: 'Language' }}>
            <MenuItem value={20}>
              <Stack direction={'row'} alignItems={'center'} gap={2}>
                <Translate size={15} />
                <Typography variant="subtitle2">{t('common.title.language')}</Typography>
              </Stack>
            </MenuItem>
          </Link>
          <MenuItem value={30}>
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <BoxArrowRight size={15} />
              <Typography variant="subtitle2">{t('common.title.Logout')}</Typography>
            </Stack>
          </MenuItem>
        </OutlinedSelect>
        <Typography variant="caption" sx={{ color: 'white' }}>
          Admin
        </Typography>
      </Box>
    </Stack>
  );
};
export default UserDropDown;
