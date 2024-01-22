import { FooterStatus } from '@/pages/home/page';
import { Box, Stack, Typography, styled } from '@mui/material';
import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import { ArrowDownShort } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
const Footer = memo(
  ({
    setFooterStatus,
    footerStatus,
    newsList,
  }: {
    setFooterStatus: Dispatch<SetStateAction<FooterStatus>>;
    footerStatus: FooterStatus;
    newsList: any[];
  }) => {
    const { t } = useTranslation();

    const toggleFooter = useCallback(() => {
      setFooterStatus((prev) => (prev === 'collapsed' ? 'expanded' : 'collapsed'));
    }, [setFooterStatus]);

    return (
      <Box
        sx={{
          height: '100%',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        <StyledFooter>
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
                {[...(footerStatus === 'collapsed' && newsList.length >= 7 ? newsList.slice(0, 7) : newsList)].map(
                  ({ date, news }) => (
                    <NewsSpan key={`${date}-${news.slice(0, 5)}`} date={date} news={news} />
                  ),
                )}
              </>
            </Stack>

            <Circle
              sx={
                footerStatus === 'expanded'
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
  },
);
export default Footer;

const StyledFooter = styled(Box)(({ theme }) => ({
  borderTop: `4px solid ${theme.palette.primary.main} !important`,
  border: `1px solid ${theme.palette.divider}`,
  padding: 8,
  width: '100%',
  backgroundColor: 'white',
  zIndex: 10,
  left: 0,
  pointerEvents: 'auto',
  overflow: 'hidden',
  height: '100%',
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
  transition: 'transform ease-in-out',
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
