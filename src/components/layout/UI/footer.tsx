import { faker } from '@faker-js/faker';
import { Box, Stack, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { ArrowDownShort } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [isFooterOpen, setIsFooterOpen] = useState<boolean>(false);

  const toggleFooter = useCallback(() => {
    setIsFooterOpen(!isFooterOpen);
  }, [isFooterOpen]);

  const generateRandomNews = () => {
    const randomDate = faker.date.anytime();
    const formattedDate = dayjs(randomDate).format('DD.MM.YYYY');

    const randomNews = faker.lorem.sentence();

    return {
      date: formattedDate,
      news: randomNews,
    };
  };

  const newsList = Array.from({ length: 12 }, generateRandomNews);
  const firstHeight = useMemo(() => {
    if (!newsList) return '5rem';
    return newsList.length >= 7 ? '12rem' : newsList.length <= 7 ? '7rem' : '10rem';
  }, [newsList]);

  return (
    <Box
      sx={{
        height: '100%',
        gridColumn: '1 / span 1',
        gridRow: isFooterOpen ? '1/span 2' : '2 / span 1',
        pointerEvents: 'none',
        zIndex: 30,
        maxHeight: isFooterOpen ? '100%' : firstHeight,
      }}
    >
      <StyledFooter expanded={isFooterOpen}>
        <Stack
          direction={'row'}
          sx={{
            justifyContent: 'space-between',
            paddingX: 2,
            flex: 1,
          }}
        >
          <Stack direction={'column'} overflow={'auto'} width={'100%'}>
            <>
              <Typography variant="subtitle2" fontWeight={'600'}>
                {t('footer.title')}
              </Typography>
              {[...(!isFooterOpen && newsList.length >= 7 ? newsList.slice(0, 7) : newsList)].map(({ date, news }) => (
                <NewsSpan key={`${date}-${news.slice(0, 5)}`} date={date} news={news} />
              ))}
            </>
          </Stack>
          <Circle
            sx={
              isFooterOpen
                ? {
                    transform: '',
                  }
                : {
                    transform: 'rotate(180Deg)',
                    ':hover': {
                      transform: 'scale(1.05) rotate(180Deg)',
                    },
                  }
            }
            onClick={toggleFooter}
          >
            <ArrowDownShort size={35} />
          </Circle>
        </Stack>
      </StyledFooter>
    </Box>
  );
};
export default Footer;

const StyledFooter = styled(Box)<{ expanded: boolean }>(({ theme, expanded }) => ({
  borderTop: `4px solid ${theme.palette.primary.main} !important`,
  border: `1px solid ${theme.palette.divider}`,
  padding: 8,
  width: '100%',
  marginTop: '1rem',
  backgroundColor: 'white',
  zIndex: 10,
  transition: 'all .85s ease',
  height: '100%',

  position: expanded ? 'absolute' : 'sticky',
  bottom: expanded ? 0 : -10,
  left: 0,
  pointerEvents: 'auto',
}));

const Circle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'ease-in-out',
  ':hover': {
    transform: 'scale(1.05) ',
  },
}));

const NewsSpan = ({ date, news }: { date: string; news: string }) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        gap: 2,
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <Typography variant="caption" fontWeight={'600'} sx={{ width: '100%', maxWidth: '5rem' }}>
        {date}
      </Typography>
      <Typography variant="caption" fontWeight={'600'} color={'rgba(5, 141, 200, 1)'}>
        {news}
      </Typography>
    </Stack>
  );
};
