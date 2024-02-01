import { MainCard, StackedDataRows } from '@/components/common';
import { Footer } from '@/components/layout/UI';
import { faker } from '@faker-js/faker';

import { Box, Stack, styled } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import OverviewCard from './components/overview-card';
import TodaysReports from './components/todays-reports';
export type FooterStatus = 'expanded' | 'collapsed';

const generateRandomNews = () => {
  const randomDate = faker.date.anytime();
  const formattedDate = dayjs(randomDate).format('DD.MM.YYYY');

  const randomNews = faker.lorem.sentence();

  return {
    date: formattedDate,
    news: randomNews,
  };
};
const newsList = Array.from({ length: 13 }, generateRandomNews);

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
      title: 'Balance on active cases',
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

  const [newsSliced, setNewsSliced] = useState<
    {
      date: string;
      news: string;
    }[]
  >(newsList.slice(0, 5));

  return (
    <GridContainer
      onTransitionEnd={() => {
        footerStatus === 'collapsed' ? setNewsSliced(newsList.slice(0, 7)) : setNewsSliced(newsList);
      }}
      footerStatus={footerStatus}
    >
      <Box
        sx={{
          ...(footerStatus === 'collapsed' && { padding: '0.5rem', margin: '-0.5rem' }),
          scrollbarGutter: 'stable',
          overflow: 'auto',
        }}
      >
        <Stack
          sx={{
            justifyContent: 'space-between',
            gap: 2,
            flexDirection: 'row',
            flexWrap: 'wrap',
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
            <TodaysReports data={data} />
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
              <StackedDataRows<{
                value: number;
                title: string;
              }>
                data={[
                  { value: 0, title: 'Saker til vurdering' },
                  { value: 0, title: 'Saker vurdert restpurring' },
                  { value: 0, title: 'Tiltak klare til utsending' },
                ]}
                contentStackProps={{
                  sx: {
                    minHeight: '1rem',
                    fontSize: '12px',
                    padding: '0.25rem',
                  },
                }}
              ></StackedDataRows>
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
      </Box>
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
  gap: footerStatus === 'collapsed' ? '2rem' : '',
}));
