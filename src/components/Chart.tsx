import { PieChart } from 'react-minimal-pie-chart';

type ChartProps = {
  eventees: number;
  attendees: number;
};

const Chart = ({ eventees, attendees }: ChartProps) => {
  const difference = eventees - attendees;
  console.log(difference, eventees, attendees);
  return (
    <>
      <PieChart
        data={[
          { title: 'Eventees', value: eventees, color: '#E38627' },
          { title: 'Attendees', value: attendees, color: '#C13C37' },
          { title: 'Difference', value: difference, color: '#6A2135' },
        ]}
        paddingAngle={5}
        label={({ dataEntry }) => dataEntry.value}
        totalValue={eventees + attendees + difference}
        // lineWidth={50}
        labelStyle={{
          fontSize: '13px',
          fontFamily: 'sans-serif',
          fill: '#121212',
        }}
      />
    </>
  );
};
export default Chart;
