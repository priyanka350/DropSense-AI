import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white h-20 rounded-3xl shadow-sm flex items-center justify-between px-8">

      <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-3 w-[400px]">

        <Search
          size={20}
          className="text-gray-500"
        />

        <input
          type="text"
          placeholder="Search students..."
          className="bg-transparent outline-none ml-3 w-full"
        />
      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="text-gray-600"
        />

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">

            H
          </div>

          <div>
            <h2 className="font-semibold">
              HOD Admin
            </h2>

            <p className="text-sm text-gray-500">
              University Access
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Navbar;