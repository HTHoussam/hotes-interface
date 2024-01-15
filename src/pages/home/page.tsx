import { MainCard } from '@/components/common';
import StackedDataRows from '@/components/common/stacked-data-rows';
import { Footer } from '@/components/layout/UI';
import { Box, Stack, styled } from '@mui/material';
import OverviewCard from './components/overview-card';
import PrincipalChart from './components/principal-chart';

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
    <GridContainer>
      <Stack
        sx={{
          gridColumn: '1 / span 1',
          gridRow: '1 / span 1',
          justifyContent: 'space-between',
          gap: 6,
          flexDirection: 'row',
        }}
      >
        <MainCard
          title="Todays Number statistics and reports"
          cardProps={{
            sx: {
              flex: 1,
            },
          }}
        >
          <>
            <Stack>
              <Box marginTop={'2rem'}>
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
              flex: 1,
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
          <OverviewCard />
        </MainCard>
      </Stack>
      <Footer />
    </GridContainer>
  );
};
const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto auto',
  height: '100%',
}));
