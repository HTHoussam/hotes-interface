import { useGetOverviewById } from '@/apis/overview/queries';
import { GenericCard, GenericDataTable } from '@/components/common/mui-data';
import { Box, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { element } = useParams();
  console.log('element', element);
  const { data: fetchedData } = useGetOverviewById(String(element));
  console.log('fetchedData', fetchedData);
  const sectorsDetails = useMemo(() => {
    return [
      {
        title: 'sum principal',
        value: 3456,
      },
      {
        title: 'total cost',
        value: 127446,
        id: 'utleggstrekk',
      },
      {
        title: 'sum fee',
        value: 8123,
      },
      {
        title: 'sum interest',
        value: 56,
      },
      {
        title: 'sum paid',
        value: 346,
      },
      {
        title: 'sum total balance',
        value: 6486,
      },
    ];
  }, []);
  return (
    <Box>
      <Stack p={4} gap={3} direction={'row'}>
        {sectorsDetails.map(({ title, value }) => (
          <GenericCard
            cardProps={{
              sx: {
                flex: 1,
              },
            }}
            title={title}
            key={title}
            value={value}
          />
        ))}
      </Stack>
      <Box p={4}>
        <GenericDataTable />
      </Box>
    </Box>
  );
};
