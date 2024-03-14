import { Box, StackProps, Typography } from '@mui/material';
import { InvertColorCard } from '..';

const GenericCard = ({
  title,
  value,
  cardProps,
  invertedColor,
}: {
  title: string;
  value: number | string;
  cardProps: StackProps;
  invertedColor: boolean;
}) => {
  return (
    <InvertColorCard {...cardProps} invertedcolor={invertedColor}>
      <Box fontWeight={'400'}>
        <Typography fontSize={'12px'} fontWeight={600} textTransform={'uppercase'} variant="overline">
          {title}
        </Typography>
        <Typography fontSize={'16px'} fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </InvertColorCard>
  );
};
export default GenericCard;
