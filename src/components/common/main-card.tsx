import { Box, Card, CardContent, CardContentProps, CardProps, Typography, styled } from '@mui/material';

interface MainCardProps {
  title: string;
  children: JSX.Element;
  maxWidth?: string;
  cardProps?: CardProps;
  cardContentProps?: CardContentProps;
  cardActions?: JSX.Element;
}
const MainCard = ({ maxWidth, cardProps, cardContentProps, cardActions, title, children }: MainCardProps) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        textWrap: 'wrap',
        overflowX: 'hidden',
        borderRadius: 0,
        ...cardProps?.sx,
        ...(maxWidth
          ? {
              maxWidth: maxWidth,
            }
          : {}),
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'hidden',
        }}
        {...cardContentProps}
      >
        <BlueBoxHeader>
          <Typography variant="subtitle2" textTransform={'capitalize'}>
            {title}
          </Typography>
        </BlueBoxHeader>
        <Box>{children}</Box>
      </CardContent>
      {cardActions}
    </Card>
  );
};
export default MainCard;
const BlueBoxHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  textTransform: 'full-size-kana',
  padding: '0.5rem',
  fontWeight: 300,
  fontSize: 16,
}));
