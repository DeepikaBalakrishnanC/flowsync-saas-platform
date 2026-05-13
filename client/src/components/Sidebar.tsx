import {

  FaHome,

  FaProjectDiagram,

  FaTasks,

  FaCreditCard,

  FaUsers,

  FaCog

} from "react-icons/fa";


const Sidebar = () => {

  return (

    <div
      className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6"
    >

      <h1
        className="text-3xl font-bold text-indigo-500"
      >

        FlowSync

      </h1>


      <nav className="mt-10">

        <ul className="space-y-6">

          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaHome />

            Dashboard

          </li>


          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaProjectDiagram />

            Projects

          </li>


          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaTasks />

            Tasks

          </li>


          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaCreditCard />

            Billing

          </li>


          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaUsers />

            Team

          </li>


          <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer">

            <FaCog />

            Settings

          </li>

        </ul>

      </nav>

    </div>

  );

};

export default Sidebar;