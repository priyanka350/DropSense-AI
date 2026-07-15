import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getDashboardData
} from "../services/dashboardService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
function Dashboard() {
  const [dashboardData, setDashboardData] =
    useState({

      total_students: 0,

      high_risk: 0,

      moderate_risk: 0,

      low_risk: 0,

      retention_rate: 0

    });
  const navigate = useNavigate();

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data =
          await getDashboardData();

        console.log(data);

        setDashboardData(data);

      }

      catch (error) {

        console.error(error);

      }

    };

    loadDashboard();

  }, []);
  const pieData = [

    {
      name: "High Risk",
      value: dashboardData.high_risk
    },

    {
      name: "Moderate Risk",
      value: dashboardData.moderate_risk
    },

    {
      name: "Low Risk",
      value: dashboardData.low_risk
    }

  ];

  const COLORS = [

    "#EF4444",

    "#F59E0B",

    "#22C55E"

  ];
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#EDF4FF] to-[#DCEBFF]">

      <Sidebar />

      <div className="flex-1 ml-72 p-8">

        <Navbar />

        {/* Heading */}
        <div className="mt-8">

          <h1 className="text-5xl font-bold text-[#0B2A5B]">

            Welcome👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">

            AI-powered student retention insights

          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-6 mt-10">

          <StatCard
            title="Total Students"
            value={dashboardData.total_students}
            subtitle="Registered Students"
            color="text-[#0B2A5B]"
          />

          <StatCard
            title="High Risk"
            value={dashboardData.high_risk}
            subtitle="Needs Intervention"
            color="text-red-500"
          />

          <StatCard
            title="Moderate Risk"
            value={dashboardData.moderate_risk}
            subtitle="Monitor Closely"
            color="text-yellow-500"
          />

          <StatCard
            title="Low Risk"
            value={dashboardData.low_risk}
            subtitle="Healthy Progress"
            color="text-green-500"
          />

          <StatCard
            title="Retention Rate"
            value={`${dashboardData.retention_rate}%`}
            subtitle="University Average"
            color="text-cyan-500"
          />

        </div>
        <div className="grid grid-cols-12 gap-6 mt-10">

          <div className="col-span-7 bg-white rounded-[35px] shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#0B2A5B]">
              Risk Distribution
            </h2>

            <p className="text-gray-500 mt-2">
              Student risk overview
            </p>

            <div className="h-[350px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie

                    data={pieData}

                    dataKey="value"

                    nameKey="name"

                    outerRadius={120}

                    label

                  >

                    {

                      pieData.map(

                        (entry, index) => (

                          <Cell

                            key={index}

                            fill={COLORS[index]}

                          />

                        )

                      )

                    }

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="col-span-5 bg-white rounded-[35px] shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#0B2A5B]">

              University Insights

            </h2>

            <p className="text-gray-500 mt-2">

              AI-generated institutional summary

            </p>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between items-center bg-[#F8FBFF] rounded-2xl p-4">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Students
                  </p>

                  <h3 className="text-xl font-bold text-[#0B2A5B]">
                    {dashboardData.total_students}
                  </h3>

                </div>

                <div className="text-3xl">
                  🎓
                </div>

              </div>

              <div className="flex justify-between items-center bg-[#FFF5F5] rounded-2xl p-4">

                <div>

                  <p className="text-gray-500 text-sm">
                    Immediate Intervention
                  </p>

                  <h3 className="text-xl font-bold text-red-600">
                    {dashboardData.high_risk}
                  </h3>

                </div>

                <div className="text-3xl">
                  🚨
                </div>

              </div>

              <div className="flex justify-between items-center bg-[#F0FFF4] rounded-2xl p-4">

                <div>

                  <p className="text-gray-500 text-sm">
                    Retention Rate
                  </p>

                  <h3 className="text-xl font-bold text-green-600">
                    {dashboardData.retention_rate}%
                  </h3>

                </div>

                <div className="text-3xl">
                  📈
                </div>

              </div>

            </div>

          </div>



        </div>
        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-[35px] shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#0B2A5B]">

              Quick Actions

            </h2>

            <div className="mt-8 space-y-4">

              <button
                onClick={() => navigate("/prediction")}
                className="w-full bg-cyan-500 text-white py-4 rounded-2xl"
              >

                📊 Predict Single Student

              </button>

              <button
                onClick={() => navigate("/bulkupload")}
                className="w-full bg-[#0B2A5B] text-white py-4 rounded-2xl"
              >

                📂 Bulk Upload Dataset

              </button>

              <button
                onClick={() => navigate("/analytics")}
                className="w-full bg-green-600 text-white py-4 rounded-2xl"
              >

                📈 View Analytics

              </button>

            </div>

          </div>

          <div className="bg-white rounded-[35px] shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#0B2A5B]">

              AI Recommendations

            </h2>

            <div className="space-y-4 mt-8">

              <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4">

                <p className="font-semibold text-red-700">

                  🚨 Immediate Attention

                </p>

                <p className="text-gray-600 mt-1">

                  {dashboardData.high_risk} students require academic intervention.

                </p>

              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-4">

                <p className="font-semibold text-yellow-700">

                  📚 Monitoring

                </p>

                <p className="text-gray-600 mt-1">

                  Continue tracking moderate-risk students regularly.

                </p>

              </div>

              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-4">

                <p className="font-semibold text-green-700">

                  🎓 Positive Trend

                </p>

                <p className="text-gray-600 mt-1">

                  Current retention remains above {dashboardData.retention_rate}%.

                </p>

              </div>

            </div>
          </div>

        </div>
        <div className="text-center text-gray-400 text-sm mt-5 ml-800">

          DropSense AI • Version 1.0 • MAKAUT Final Year Project

        </div>

      </div>
    </div>
  );
}

export default Dashboard;