import { Box, Paper, Typography, styled } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
const data = [
  { label: 'Principal Amount', value: 9400, color: 'rgba(1, 16, 67, 1)' },
  { label: 'Test 1', value: 4567, color: 'rgba(82, 106, 190, 1)' },
  { label: 'Test 2', value: 1398, color: 'rgba(64, 81, 140, 1)' },
];
const renderColorfulLegendText = (_: string, entry: any) => {
  return <span style={{ color: '#596579', fontWeight: 500, padding: '10px' }}>{entry?.payload?.label}</span>;
};
const PrincipalChart = () => {
  const sumOfAllData = useMemo(() => {
    return data.reduce((prev, curr) => prev + Number(curr.value), 0);
  }, []);
  const renderCustomTooltip = useCallback(
    ({ active, payload }: TooltipProps<ValueType, NameType>) => {
      if (active && payload && payload[0]?.value) {
        return (
          <StyledTooltipPaper>
            <Box sx={{ flex: 1 }}>
              <Typography>
                {Math.abs((Number(payload[0].value) / sumOfAllData) * 100).toFixed(2)}
                {'% '}
                {payload[0].payload?.label}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textWrap: 'wrap' }}>This is an example of description 1 </Box>
          </StyledTooltipPaper>
        );
      }

      return null;
    },
    [sumOfAllData],
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={900}>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={20}
          formatter={renderColorfulLegendText}
        />

        <Pie dataKey="value" data={data} innerRadius={70} outerRadius={120} fill="#82ca9d">
          <Label value="Principal Amount" position="center" />
          {data.map((data, idx) => {
            console.log('data', data);
            return <Cell key={`${data.value}-${idx}`} fill={data.color}></Cell>;
          })}
        </Pie>
        <Tooltip content={renderCustomTooltip} />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PrincipalChart;

export const StyledTooltipPaper = styled(Paper)(() => ({
  padding: 8,
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxWidth: '9rem',
  flexWrap: 'wrap',
}));
