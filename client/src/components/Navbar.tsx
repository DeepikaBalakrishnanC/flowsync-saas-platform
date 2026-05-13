const Navbar = () => {

  return (

    <div
      className="flex justify-between items-center bg-slate-900 border-b border-slate-800 p-5"
    >

      <div>

        <h2 className="text-2xl font-bold">

          Dashboard

        </h2>

        <p className="text-gray-400">

          Welcome back, Deepika 👋

        </p>

      </div>


      <div className="flex items-center gap-4">

        <button
          className="bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-500"
        >

          Upgrade Plan

        </button>


        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full"
        />

      </div>

    </div>

  );

};

export default Navbar;