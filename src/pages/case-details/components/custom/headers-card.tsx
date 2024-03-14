import { InvertColorCard } from '@/components/common';
import { formatNumber } from '@/libs/helpers';
import { Stack, Typography } from '@mui/material';

const HeadersCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <InvertColorCard
      sx={{
        padding: '0.5rem 1rem',
      }}
    >
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography fontSize={'14px'} variant="subtitle2">
          {title}
        </Typography>
        <Typography variant="subtitle2" fontWeight={'600'}>
          {formatNumber(value)}
        </Typography>
      </Stack>
    </InvertColorCard>
  );
};
export default HeadersCard;
