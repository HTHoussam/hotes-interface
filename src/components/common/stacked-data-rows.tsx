import { isEven } from '@/libs/helpers';
import { Stack, StackProps, Typography, styled } from '@mui/material';

interface StackedDataProps {
  data: { title: string; value: string | number; href?: string }[];
  contentStackProps?: StackProps;
}
const StackedDataRows = ({ data, contentStackProps }: StackedDataProps) => {
  return (
    <Stack mt={2}>
      {data.map(({ title, value }, idx: number) => (
        <ContentStack
          key={idx}
          sx={{
            backgroundColor: (theme) => (!isEven(idx) ? 'white' : `${theme.palette.divider}`),
            ...contentStackProps?.sx,
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
