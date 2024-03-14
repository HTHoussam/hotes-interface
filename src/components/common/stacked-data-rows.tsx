import { isEven } from '@/libs/helpers';
import { Stack, StackProps, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface StackedDataProps {
  data: { title: string; value: string | number; url?: string }[];
  contentStackProps?: StackProps;
}
const StackedDataRows = ({ data, contentStackProps }: StackedDataProps) => {
  const navigate = useNavigate();
  return (
    <Stack mt={2}>
      {data.map(({ title, value, url }, idx: number) => (
        <ContentStack
          key={idx}
          onClick={() => {
            if (typeof url === 'string') navigate(`${url}`);
          }}
          sx={{
            backgroundColor: (theme) => (!isEven(idx) ? 'white' : `${theme.palette.divider}`),

            ...contentStackProps?.sx,
          }}
        >
          <Typography fontSize={'14px'} fontWeight={'400'}>
            {title}
          </Typography>
          <Typography fontSize={'14px'} fontWeight={'400'}>
            {value ?? ''}
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
