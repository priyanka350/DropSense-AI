import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import {
  getAnalytics
} from "../services/analyticsService";

function Analytics() {
  const COLORS = [
    "#EF4444",
    "#FACC15",
    "#22C55E"
  ];
  const [analytics, setAnalytics] = useState(null);
  useEffect(() => {

    async function loadAnalytics() {

      const data = await getAnalytics();

      console.log(data);

      setAnalytics(data);

    }

    loadAnalytics();

  }, []);
  if (!analytics) {

    return (

      <div className="flex items-center justify-center h-screen">

        Loading Analytics...

      </div>

    );

  }
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#EDF4FF] to-[#DCEBFF]">

      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        <Navbar />

        <div className="mt-8">

          <h1 className="text-5xl font-bold text-[#0B2A5B]">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Student retention intelligence and dropout insights
          </p>

          <div className="grid grid-cols-5 gap-6 mt-10">

            <StatCard
              title="Total Students"
              value={analytics.summary.total_students}
              subtitle="Institution Records"
              color="text-[#0B2A5B]"
            />

            <StatCard
              title="Retention Rate"
              value={`${analytics.summary.retention_rate}%`}
              subtitle="Current Retention"
              color="text-green-500"
            />

            <StatCard
              title="Dropout Rate"
              value={`${analytics.summary.dropout_rate}%`}
              subtitle="Institution Average"
              color="text-red-500"
            />

            <StatCard
              title="Admission Score"
              value={analytics.summary.average_admission}
              subtitle="Average Admission"
              color="text-cyan-500"
            />

            <StatCard
              title="Scholarships"
              value={analytics.summary.scholarship}
              subtitle="Scholarship Holders"
              color="text-yellow-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-8 mt-10">

            {/* Risk Distribution */}

            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">
                Risk Distribution
              </h2>

              <p className="text-gray-500 mt-2">
                Student risk category breakdown
              </p>

              <div className="h-[300px] mt-6">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie
                      data={analytics.risk_distribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      dataKey="value"
                      label
                    >

                      {analytics.risk_distribution.map((entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">
                Student Status Distribution
              </h2>

              <p className="text-gray-500 mt-2">
                Distribution of Graduate, Enrolled and Dropout students
              </p>

              <div className="h-[300px] mt-6">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={analytics.status_distribution}
                  >

                    <XAxis dataKey="status" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#06B6D4"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">
                Gender Distribution
              </h2>

              <p className="text-gray-500 mt-2">
                Student population by gender
              </p>

              <div className="h-[300px] mt-6">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={analytics.gender_distribution}
                  >

                    <XAxis dataKey="gender" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="count"
                      fill="#8B5CF6"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* Feature Importance */}

            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">
                Feature Importance
              </h2>

              <p className="text-gray-500 mt-2">
                Most influential dropout indicators
              </p>

              <div className="mt-8 space-y-5">

                {analytics.feature_importance.slice(0, 6).map((feature) => (

                  <div key={feature.feature}>

                    <div className="flex justify-between mb-2">

                      <span>

                        {feature.feature.replaceAll("_", " ")}

                      </span>

                      <span>

                        {feature.importance.toFixed(2)}%

                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4">

                      <div
                        className="bg-cyan-500 h-4 rounded-full"
                        style={{
                          width: `${feature.importance * 5}%`
                        }}
                      ></div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
          <div className="grid grid-cols-2 gap-8 mt-10">

            {/* Scholarship */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">

                Scholarship Distribution

              </h2>

              <p className="text-gray-500 mt-2">

                Scholarship holders across the institution

              </p>

              <div className="h-[350px] mt-8">

                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>

                    <Pie

                      data={analytics.scholarship_distribution}

                      dataKey="count"

                      nameKey="name"

                      outerRadius={110}

                      label

                    >

                      <Cell fill="#10B981" />

                      <Cell fill="#CBD5E1" />

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>
            {/* AI Insights */}
            <div className="bg-white rounded-[35px] shadow-lg p-8">

              <h2 className="text-2xl font-bold text-[#0B2A5B]">

                AI Insights

              </h2>

              <div className="space-y-5 mt-8">

                <div className="bg-red-50 rounded-2xl p-5">

                  <h3 className="font-semibold text-red-600">

                    ⚠ High Priority

                  </h3>

                  <p className="mt-2 text-gray-600">

                    {analytics.summary.dropout_rate}% of students
                    are classified as dropouts and require
                    early academic intervention.

                  </p>

                </div>

                <div className="bg-cyan-50 rounded-2xl p-5">

                  <h3 className="font-semibold text-cyan-700">

                    🤖 Model Insight

                  </h3>

                  <p className="mt-2 text-gray-600">

                    The CatBoost model identified
                    <strong>
                      {" "}
                      {analytics.feature_importance[0].feature.replaceAll("_", " ")}
                    </strong>
                    {" "}as the most influential feature.

                  </p>

                </div>

                <div className="bg-green-50 rounded-2xl p-5">

                  <h3 className="font-semibold text-green-700">

                    🎓 Retention

                  </h3>

                  <p className="mt-2 text-gray-600">

                    The institution currently maintains a
                    retention rate of
                    <strong>
                      {" "}
                      {analytics.summary.retention_rate}%
                    </strong>.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;