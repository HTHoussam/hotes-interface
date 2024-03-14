import { IconButton } from '@mui/material';
import { X } from 'react-bootstrap-icons';

const CloseButtonWrapper = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <IconButton onClick={onClickHandler}>
      <X size={35} />
    </IconButton>
  );
};

export default CloseButtonWrapper;
