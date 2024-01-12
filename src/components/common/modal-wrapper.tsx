import { Box, IconButton, Modal, Paper, PaperProps, Stack, Typography } from '@mui/material';
import { ReactNode, memo } from 'react';
import { XLg } from 'react-bootstrap-icons';
interface ModalWrapperProps {
  children: JSX.Element;
  open: boolean;
  handleOpenState: (val: boolean) => void;
  modalWidth: string;
  modalHeight: string;
  title: string;
  actionStack: ReactNode;
  paperProps?: PaperProps;
}
const ModalWrapper = memo(
  ({
    children,
    open,
    handleOpenState,
    paperProps = {},
    modalWidth,
    modalHeight,
    title,
    actionStack,
  }: ModalWrapperProps) => {
    return (
      <Modal open={open} onClose={() => handleOpenState(false)}>
        <Paper
          {...paperProps}
          sx={{
            overflow: 'auto',
            width: '100%',
            height: '100%',
            maxWidth: modalWidth,
            maxHeight: modalHeight,
          }}
        >
          <Stack
            direction={'row'}
            flexWrap={'wrap-reverse'}
            justifyContent={'space-between'}
            paddingX={'2rem'}
            paddingTop={'1rem'}
            alignItems={'center'}
          >
            <Typography fontWeight={600} fontSize={'18px'}>
              {title}
            </Typography>
            <IconButton onClick={() => handleOpenState(false)}>
              <XLg size={20} />
            </IconButton>
          </Stack>
          <Box
            sx={{
              padding: '2rem',
            }}
          >
            {children}
          </Box>
          <Box mr={4}>{actionStack}</Box>
        </Paper>
      </Modal>
    );
  },
);
export default ModalWrapper;
