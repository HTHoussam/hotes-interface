import { Box, StackProps, Typography } from '@mui/material';
import { InvertColorCard } from '..';

const GenericCard = ({ title, value, cardProps }: { title: string; value: number | string; cardProps: StackProps }) => {
  return (
    <InvertColorCard {...cardProps} invertedcolor={true}>
      <Box fontWeight={'400'}>
        <Typography variant="subtitle2" textTransform={'uppercase'}>
          {title}
        </Typography>
        <Typography variant="subtitle2">{value}</Typography>
      </Box>
    </InvertColorCard>
  );
};
export default GenericCard;
