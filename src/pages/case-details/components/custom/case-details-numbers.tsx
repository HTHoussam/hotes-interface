import { Stack, Typography } from '@mui/material';

const CaseDetailsNumbers = ({ data }: { data: { title: string; value: number }[] }) => {
  return (
    <Stack direction={'column'} gap={'10px'} flex={1}>
      {data.map(({ title, value }) => {
        const isResult = title.includes('Saldo');
        return (
          <Stack
            key={title}
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...(isResult
                ? {
                    backgroundColor: (theme) => `${theme.palette.primary.main}`,
                    color: 'white',
                    padding: '0.35rem 1rem',
                    borderRadius: '4px',
                  }
                : {}),
            }}
          >
            <Typography fontWeight={600} fontSize={'12px'}>
              {title}
            </Typography>
            <Typography fontWeight={600} fontSize={'16px'}>
              {value}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CaseDetailsNumbers;
