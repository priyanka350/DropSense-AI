import {
    LayoutDashboard,
    Brain,
    BarChart3,
    Upload,
    Settings,
    ChevronLeft
} from "lucide-react";

import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="w-64 bg-[#0B2A5B] text-white h-screen p-5 shadow-2xl flex flex-col fixed left-0 top-0 z-50">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">

                <img
                    src={logo}
                    alt="logo"
                    className="w-14 h-14 object-contain"
                />

                <div>
                    <h1 className="text-[25px] font-bold leading-tight">
                        DropSense AI
                    </h1>

                    <p className="text-[14px] text-cyan-300 mt-0.5">
                        Student Intelligence
                    </p>
                </div>
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-3">

                <button onClick={() => navigate("/dashboard")} className="flex items-center gap-3 hover:bg-white/10 transition p-4 rounded-2xl">

                    <Brain size={22} />

                    Dashboard
                </button>

                <button onClick={() => navigate("/prediction")} className="flex items-center gap-3 hover:bg-white/10 transition p-4 rounded-2xl">

                    <Brain size={22} />

                    Prediction
                </button>

                <button onClick={() => navigate("/analytics")} className="flex items-center gap-3 hover:bg-white/10 transition p-4 rounded-2xl">

                    <BarChart3 size={22} />

                    Analytics
                </button>

                <button onClick={() => navigate("/bulkupload")} className="flex items-center gap-3 hover:bg-white/10 transition p-4 rounded-2xl">

                    <Upload size={22} />

                    Bulk Upload
                </button>

                <button className="flex items-center gap-3 hover:bg-white/10 transition p-4 rounded-2xl">

                    <Settings size={22} />

                    Settings
                </button>
            </div>

            <div className="mt-auto flex items-center justify-between bg-white/10 rounded-2xl p-4">

                <div>
                    <p className="font-semibold">
                        HOD Access
                    </p>

                    <p className="text-xs text-gray-300">
                        Admin Role
                    </p>
                </div>

                <ChevronLeft />
            </div>

        </div>
    );
}

export default Sidebar;