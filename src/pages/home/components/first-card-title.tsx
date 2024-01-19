import { Box, Stack, Typography, styled } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { BarChartLine, FileEarmarkMedical } from 'react-bootstrap-icons';

const FirstCardTitle = ({
  title,
  setOpenReportModal,
}: {
  title: string;
  setOpenReportModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" p={0.5}>
        {title}
      </Typography>
      <Stack direction="row" gap={'0.5rem'}>
        <BluedIconBox onClick={() => setOpenReportModal(true)}>
          <FileEarmarkMedical size={20} />
        </BluedIconBox>
        <BluedIconBox>
          <BarChartLine size={20} />
        </BluedIconBox>
      </Stack>
    </Stack>
  );
};
export default FirstCardTitle;

const BluedIconBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '4px',
  padding: '0.5rem 0.75rem 0.375rem 0.75rem',
  minWidth: '2.5rem',
  minHeight: '2.5rem',
  cursor: 'pointer',
}));
