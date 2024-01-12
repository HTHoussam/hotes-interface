import { MainCard } from '@/components/common';
import StackedDataRows from '@/components/common/stacked-data-rows';
import { Box, Stack } from '@mui/material';
import { PrincipalChart } from './components';

export default () => {
  const data: { title: string; value: string; href: string }[] = [
    {
      href: '',
      title: 'Number of new cases today',
      value: '2',
    },
    {
      href: '',
      title: 'Number of active cases',
      value: '4',
    },
    {
      href: '',
      title: 'Balace on active cases',
      value: '480.849.866',
    },
    {
      href: '',
      title: 'Degree of solution',
      value: '0',
    },
    {
      href: '',
      title: 'Last cases was transferred to KK2',
      value: '24-11-2023',
    },
  ];
  return (
    <Stack gap={2} flexDirection={'row'}>
      <MainCard
        title="Todays Number statistics and reports"
        cardProps={{
          sx: {
            flex: 1,
          },
        }}
      >
        <>
          <Box>
            <p>hello</p>
          </Box>
          <Stack>
            <Box>
              <PrincipalChart />
            </Box>
            <StackedDataRows data={data} />
          </Stack>
        </>
      </MainCard>
      <MainCard
        title="To-Do List"
        cardProps={{
          sx: {
            flex: 0.5,
          },
        }}
      >
        <Box>
          <p>hello</p>
        </Box>
      </MainCard>
      <MainCard
        title="Overview"
        cardProps={{
          sx: {
            flex: 1,
          },
        }}
      >
        <Box>
          <p>hello</p>
        </Box>
      </MainCard>
    </Stack>
  );
};
