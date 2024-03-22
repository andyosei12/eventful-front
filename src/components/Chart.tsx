import { PieChart } from 'react-minimal-pie-chart';

type ChartProps = {
  eventees: number;
  attendees: number;
};

const Chart = ({ eventees, attendees }: ChartProps) => {
  const difference = eventees - attendees;

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
      <section className="flex flex-wrap gap-2">
        <div className="flex gap-1 mb-2">
          <div className="bg-[#E38627] h-6 w-6"></div>
          <h1>Total Eventees</h1>
        </div>
        <div className="flex gap-1 mb-2">
          <div className="bg-[#C13C37] h-6 w-6"></div>
          <h1>Total Attendees</h1>
        </div>
        <div className="flex gap-1 mb-2">
          <div className="bg-[#6A2135] h-6 w-6"></div>
          <h1>Total Absentees</h1>
        </div>
      </section>
    </>
  );
};
export default Chart;
