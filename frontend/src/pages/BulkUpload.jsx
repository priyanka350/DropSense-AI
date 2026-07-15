import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { useState } from "react";
import {
    uploadDataset
} from "../services/bulkUploadService";

function BulkUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [results, setResults] =
        useState([]);

    const [summary, setSummary] =
        useState({
            total: 0,
            high: 0,
            moderate: 0,
            low: 0
        });
    const [loading, setLoading] =
        useState(false);
    const handleUpload = async () => {

        if (!selectedFile) {

            alert(
                "Please select a CSV file"
            );

            return;
        }

        try {

            setLoading(true);

            const result =
                await uploadDataset(
                    selectedFile
                );
            setResults(
                result.results
            );
            const high =
                result.results.filter(
                    r => r.risk_level === "High Risk"
                ).length;

            const moderate =
                result.results.filter(
                    r => r.risk_level === "Moderate Risk"
                ).length;

            const low =
                result.results.filter(
                    r => r.risk_level === "Low Risk"
                ).length;

            setSummary({

                total: result.rows,

                high,

                moderate,

                low

            });
            console.log(
                "Backend Response:",
                result
            );
            setLoading(false);

        }

        catch (error) {
            setLoading(false);

            console.error(
                error
            );

        }

    };
    const downloadCSV = () => {

        if (results.length === 0) return;

        const headers = [

            "Student Name",
            "Risk Score",
            "Risk Level"

        ];

        const rows = results.map(student => [

            student.student_name,

            student.risk_score,

            student.risk_level

        ]);

        const csvContent = [

            headers,

            ...rows

        ]

            .map(e => e.join(","))

            .join("\n");

        const blob = new Blob(

            [csvContent],

            {

                type: "text/csv;charset=utf-8;"

            }

        );

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "DropSense_AI_Report.csv";

        link.click();

    };
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#EDF4FF] to-[#DCEBFF]">

            <Sidebar />

            <div className="flex-1 ml-64 p-8">

                <Navbar />

                <div className="mt-8">

                    <h1 className="text-5xl font-bold text-[#0B2A5B]">
                        Bulk Student Analysis
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Upload student records for batch risk prediction
                    </p>

                </div>

                <div className="mt-10 bg-white rounded-[35px] shadow-lg p-10">

                    <h2 className="text-2xl font-bold text-[#0B2A5B]">
                        Upload Student Dataset
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Upload a CSV file for batch prediction
                    </p>

                    <div className="mt-8 border-2 border-dashed border-cyan-300 rounded-[30px] p-16 flex flex-col items-center justify-center">

                        <div className="text-6xl">
                            📄
                        </div>

                        <h3 className="mt-4 text-xl font-semibold text-[#0B2A5B]">
                            Drag & Drop CSV File
                        </h3>

                        <p className="text-gray-500 mt-2">
                            or click below to browse
                        </p>

                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) =>
                                setSelectedFile(e.target.files[0])
                            }
                            className="hidden"
                            id="csvUpload"
                        />

                        <label
                            htmlFor="csvUpload"
                            className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-2xl transition cursor-pointer"
                        >
                            Choose File
                        </label>

                        {selectedFile && (

                            <p className="mt-4 text-green-600">

                                Selected:
                                {" "}
                                {selectedFile.name}
                                <button
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                    className="mt-4 ml-4 bg-[#0B2A5B] text-white px-8 py-3 rounded-2xl"
                                >
                                    {loading ? "Analyzing..." : "Analyze Dataset"}
                                </button>

                            </p>

                        )}

                    </div>

                </div>

                <div className="grid grid-cols-4 gap-6 mt-10">

                    <StatCard
                        title="Total Students"
                        value={summary.total}
                        subtitle="Uploaded Records"
                        color="text-[#0B2A5B]"
                    />

                    <StatCard
                        title="High Risk"
                        value={summary.high}
                        subtitle="Needs Intervention"
                        color="text-red-500"
                    />

                    <StatCard
                        title="Moderate Risk"
                        value={summary.moderate}
                        subtitle="Monitor Closely"
                        color="text-yellow-500"
                    />

                    <StatCard
                        title="Low Risk"
                        value={summary.low}
                        subtitle="Healthy Progress"
                        color="text-green-500"
                    />

                </div>

                <div className="bg-white rounded-[35px] shadow-lg p-8 mt-10">

                    <h2 className="text-2xl font-bold text-[#0B2A5B]">
                        Prediction Results
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Batch prediction output - Showing first 20 students
                    </p>

                    <div className="overflow-x-auto mt-8">

                        {results.length > 0 && (

                            <div className="flex justify-end mb-5">

                                <button

                                    onClick={downloadCSV}

                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition"

                                >

                                    ⬇ Download Report

                                </button>

                            </div>

                        )}

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="text-left py-4">
                                        Student Name
                                    </th>

                                    <th className="text-left py-4">
                                        Risk Score
                                    </th>

                                    <th className="text-left py-4">
                                        Category
                                    </th>

                                    <th className="text-left py-4">
                                        Priority
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {results.slice(0, 20).map((student, index) => (

                                    <tr
                                        key={index}
                                        className="border-b"
                                    >

                                        <td className="py-4">
                                            {student.student_name}
                                        </td>

                                        <td>
                                            {student.risk_score}%
                                        </td>

                                        <td>

                                            <span
                                                className={`px-4 py-2 rounded-full

          ${student.risk_level === "High Risk"
                                                        ? "bg-red-100 text-red-600"

                                                        : student.risk_level === "Moderate Risk"
                                                            ? "bg-yellow-100 text-yellow-600"

                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                            >

                                                {student.risk_level}

                                            </span>

                                        </td>

                                        <td>

                                            {student.risk_level === "High Risk" ? (

                                                <span className="text-red-600 font-semibold">

                                                    🔴 Immediate Action

                                                </span>

                                            ) : student.risk_level === "Moderate Risk" ? (

                                                <span className="text-yellow-600 font-semibold">

                                                    🟡 Monitor

                                                </span>

                                            ) : (

                                                <span className="text-green-600 font-semibold">

                                                    🟢 Stable

                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BulkUpload;