import { MainCard } from '@/components/common';
import StackedDataRows from '@/components/common/stacked-data-rows';
import { Footer } from '@/components/layout/UI';
import { faker } from '@faker-js/faker';

import { Box, Stack, styled } from '@mui/material';
import * as dayjs from 'dayjs';
import { useState } from 'react';
import { FirstCardTitle } from './components';
import OverviewCard from './components/overview-card';
import PrincipalChart from './components/principal-chart';
export type FooterStatus = 'expanded' | 'collapsed';
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

  const [footerStatus, setFooterStatus] = useState<FooterStatus>('collapsed');
  const generateRandomNews = () => {
    const randomDate = faker.date.anytime();
    const formattedDate = dayjs(randomDate).format('DD.MM.YYYY');

    const randomNews = faker.lorem.sentence();

    return {
      date: formattedDate,
      news: randomNews,
    };
  };

  const newsList = Array.from({ length: 11 }, generateRandomNews);
  const [newsSliced, setNewsSliced] = useState<
    {
      date: string;
      news: string;
    }[]
  >(newsList.slice(0, 7));
  return (
    <GridContainer
      onTransitionEnd={() =>
        footerStatus === 'collapsed' ? setNewsSliced(newsList.slice(0, 7)) : setNewsSliced(newsList)
      }
      footerStatus={footerStatus}
    >
      <Stack
        sx={{
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflow: 'auto',
          scrollbarGutter: 'stable',
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
              <FirstCardTitle title={'Paid Amount Last 12 Months'} />
              <Box
                marginTop={'2rem'}
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '20.5rem',
                }}
              >
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
          <Box></Box>
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

      <Footer newsList={newsSliced} setFooterStatus={setFooterStatus} footerStatus={footerStatus} />
    </GridContainer>
  );
};

const GridContainer = styled(Box)<{ footerStatus: FooterStatus }>(({ footerStatus }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: footerStatus === 'collapsed' ? `1fr 0fr` : '0fr 1fr',
  transition: 'grid-template-rows 1s ease',
  height: '100%',
  alignContent: 'space-between',
  position: 'relative',
}));
