import { isEven } from '@/libs/helpers';
import { Stack, Typography, styled } from '@mui/material';

interface StackedDataProps {
  data: { title: string; value: string; href?: string }[];
}
const StackedDataRows = ({ data }: StackedDataProps) => {
  return (
    <Stack mt={2}>
      {data.map(({ title, value }, idx: number) => (
        <ContentStack
          key={idx}
          sx={{
            backgroundColor: (theme) => (isEven(idx) ? 'white' : `${theme.palette.divider}`),
          }}
        >
          <Typography fontSize={'14px'} fontWeight={'400'}>
            {title}
          </Typography>
          <Typography fontSize={'14px'} fontWeight={'400'}>
            {value}
          </Typography>
        </ContentStack>
      ))}
    </Stack>
  );
};
export default StackedDataRows;
const ContentStack = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '2rem',
  padding: 8,
}));
