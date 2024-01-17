import { Box, Paper, Typography, styled } from '@mui/material';
import { ChartsItemContentProps } from '@mui/x-charts/ChartsTooltip';
import { FunctionComponent, useMemo } from 'react';

const CustomChartTooltip: FunctionComponent<ChartsItemContentProps<'pie'>> = ({ itemData, series }) => {
  const sumOfAll = useMemo(() => {
    return series.data.reduce((prevValue, next) => prevValue + next.value, 0);
  }, [series.data]);
  return (
    <StyledTooltipPaper>
      <FlexItem>
        <Typography>
          {(Math.abs(series.data[itemData.dataIndex].value / sumOfAll) * 100).toFixed(2)}
          {'% '}
          {series.data[itemData.dataIndex].label}{' '}
        </Typography>
      </FlexItem>
      <FlexItem>
        <Typography fontSize={'12px'}>example of description</Typography>
      </FlexItem>
    </StyledTooltipPaper>
  );
};
export default CustomChartTooltip;

export const StyledTooltipPaper = styled(Paper)(() => ({
  padding: 8,
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '10px',
  maxWidth: '10rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
}));
const FlexItem = styled(Box)(() => ({
  flex: 1,
}));
