import { PieChart } from '@mui/x-charts/PieChart';
import { CustomChartTooltip } from '.';

const PrincipalChart = () => {
  const data2 = [
    { label: 'Principal Amount', value: 9400, color: 'rgba(1, 16, 67, 1)' },
    { label: 'Test 1', value: 4567, color: 'rgba(82, 106, 190, 1)' },
    { label: 'Test 2', value: 1398, color: 'rgba(64, 81, 140, 1)' },
  ];

  return (
    <PieChart
      tooltip={{
        trigger: 'item',
        slotProps: {
          popper: {
            placement: 'bottom-end',
          },
        },
        slots: {
          itemContent: CustomChartTooltip,
        },
      }}
      series={[
        {
          data: data2,
          cx: 160,
          cy: 100,
          innerRadius: 40,
          outerRadius: 100,
        },
      ]}
      height={300}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          itemGap: 22,
          markGap: 10,
          labelStyle: {
            fontSize: 14,
          },
          itemMarkHeight: 10,
          itemMarkWidth: 10,
        },
      }}
    />
  );
};
export default PrincipalChart;
