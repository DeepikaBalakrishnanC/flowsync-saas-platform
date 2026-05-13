import Sidebar
from "../../components/Sidebar";

import Navbar
from "../../components/Navbar";

import StatsCards
from "../../components/StatsCards";

import AnalyticsChart
from "../../components/AnalyticsChart";

const Dashboard = () => {

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <StatsCards />

          <AnalyticsChart />

        </div>

      </div>

    </div>

  );

};

export default Dashboard;
