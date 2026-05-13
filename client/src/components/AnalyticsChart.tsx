import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  LineChart,

  Line,

  CartesianGrid

} from "recharts";


const revenueData = [

  {
    month: "Jan",
    revenue: 4000,
  },

  {
    month: "Feb",
    revenue: 3000,
  },

  {
    month: "Mar",
    revenue: 5000,
  },

  {
    month: "Apr",
    revenue: 7000,
  },

  {
    month: "May",
    revenue: 6500,
  },

  {
    month: "Jun",
    revenue: 8500,
  },

];


const AnalyticsChart = () => {

  return (

    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10"
    >

      {/* Revenue Chart */}

      <div
        className="bg-slate-800 p-6 rounded-2xl"
      >

        <h2 className="text-2xl font-bold mb-6">

          Revenue Analytics

        </h2>


        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={revenueData}>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#6366f1"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* User Growth */}

      <div
        className="bg-slate-800 p-6 rounded-2xl"
      >

        <h2 className="text-2xl font-bold mb-6">

          User Growth

        </h2>


        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={revenueData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line

              type="monotone"

              dataKey="revenue"

              stroke="#8b5cf6"

              strokeWidth={3}

            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default AnalyticsChart;