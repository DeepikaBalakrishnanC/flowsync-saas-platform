const stats = [

  {
    title: "Projects",
    value: 24
  },

  {
    title: "Tasks",
    value: 128
  },

  {
    title: "Team Members",
    value: 12
  },

  {
    title: "Revenue",
    value: "$8,540"
  },

];


const StatsCards = () => {

  return (

    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
    >

      {stats.map((item, index) => (

        <div

          key={index}

          className="bg-slate-800 p-6 rounded-2xl shadow-lg"

        >

          <h3 className="text-gray-400">

            {item.title}

          </h3>

          <h1 className="text-4xl font-bold mt-2">

            {item.value}

          </h1>

        </div>

      ))}

    </div>

  );

};

export default StatsCards;