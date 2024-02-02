import { useGetOverview } from '@/apis/dashboard/queries';
import { StackedDataRows } from '@/components/common';
import { Box } from '@mui/material';
import { useMemo } from 'react';

const OverviewCard = () => {
  const { data: fetchedOverviews } = useGetOverview();
  const overviews = useMemo(() => {
    if (!fetchedOverviews) return [];
    return fetchedOverviews;
  }, [fetchedOverviews]);
  return (
    <Box>
      <StackedDataRows
        data={overviews}
        contentStackProps={{
          sx: {
            cursor: 'pointer',
            ':hover': {
              color: (theme) => theme.palette.primary.light,
            },
            minHeight: '1rem',
            fontSize: '12px',
            padding: '0.25rem',
          },
        }}
      ></StackedDataRows>
    </Box>
  );
};
export default OverviewCard;
