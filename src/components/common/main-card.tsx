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
        paddingTop: '2rem',
        position: 'relative',
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
  padding: '0.55rem',
  fontWeight: 300,
  fontSize: 15,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
}));
