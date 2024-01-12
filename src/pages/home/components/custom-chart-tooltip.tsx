import { Box, Paper, Typography, styled } from '@mui/material';
import { useMemo } from 'react';
type ItemsData = {
  type: string;
  seriesId: string;
  dataIndex: number;
};
type SeriesData = {
  id: string;
  type: string;
  data: {
    color: string;
    label: string;
    value: number;
    id: string;
    data: number;
    index: number;
    startAngle: number;
    endAngle: number;
    padAngle: number;
    formattedValue: string;
  }[];
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
};

const CustomChartTooltip = ({ itemData, series }: { itemData: ItemsData; series: SeriesData }) => {
  console.log('vseries', series);

  const sumOfAll = useMemo(() => {
    return series.data.reduce((prevValue, next) => prevValue + next.data, 0);
  }, [series.data]);
  return (
    <StyledTooltipPaper>
      <FlexItem>
        <Typography>
          {(Math.abs(series.data[itemData.dataIndex].data / sumOfAll) * 100).toFixed(2)}{' '}
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

const StyledTooltipPaper = styled(Paper)(() => ({
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
