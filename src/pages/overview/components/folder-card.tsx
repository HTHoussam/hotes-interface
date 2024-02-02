import { InvertColorCard, SelectorChip } from '@/components/common';
import { Box, Stack, styled } from '@mui/material';
import { Folder2Open } from 'react-bootstrap-icons';
import { FolderSelect } from '.';

const FolderCard = () => {
  return (
    <InvertColorCard invertedcolor={false}>
      <Box fontWeight={'400'}>
        <Stack direction={'row'} gap={4}>
          <Stack direction={'row'} alignItems={'center'} flex={0.75}>
            <CicleIcon>
              <Folder2Open size={34} color="white" />
            </CicleIcon>
          </Stack>
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 2,
            }}
            flex={2}
          >
            <FolderSelect />
            <SelectorChip />
          </Stack>
        </Stack>
      </Box>
    </InvertColorCard>
  );
};
export default FolderCard;

const CicleIcon = styled(Box)(() => ({
  backgroundColor: '#011043',
  height: '54px',
  width: '54px',
  borderRadius: '50%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
