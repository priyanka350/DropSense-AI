import { useState } from "react";
import { predictStudent } from "../services/predictionService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Prediction() {

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [predictionMade, setPredictionMade] = useState(false);
  const [riskLevel, setRiskLevel] = useState("");
  const [riskScore, setRiskScore] = useState(0);
  const [riskFactors, setRiskFactors] = useState([]);
  const [recommendedActions, setRecommendedActions] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    age: "",
    gender: "",
    program: "",
    semester: "",

    class10: "",
    class12: "",
    admissionPath: "",

    cgpa: "",
    internalMarks: "",
    academicSupportSessions: "",
    subjectsEnrolled: "",
    subjectsPassed: "",

    attendance: 50,
    assignmentCompletion: 50,

    tuitionPaid: "",
    scholarship: "",
    incomeLevel: "",

    motherEducation: "",
    fatherEducation: "",
    motherOccupation: "",
    fatherOccupation: "",
    hostelType: "",

    academicEngagement: "",
    mentoringSupport: "",
    classParticipation: "",
  });
  const backlogs = Math.max(
    Number(formData.subjectsEnrolled || 0) -
    Number(formData.subjectsPassed || 0),
    0
  );
  const educationMap = {
    "Primary School": 1,
    "Secondary School": 2,
    "Higher Secondary": 3,
    "Graduate": 4,
    "Postgraduate": 5,
  };

  const engagementMap = {
    "Low": 0.3,
    "Medium": 0.6,
    "High": 0.9,
  };
  const buildModelFeatures = () => {
    const admissionScore =
      (
        Number(formData.class10 || 0) * 0.4 +
        Number(formData.class12 || 0) * 0.6
      );
    const modelFeatures = {
      Age: Number(formData.age),
      Gender:
        formData.gender === "Male"
          ? 1
          : formData.gender === "Female"
            ? 0
            : 2,
      Admission_Score: admissionScore,
      Subjects_Enrolled:
        Number(formData.subjectsEnrolled),
      Subjects_Passed:
        Number(formData.subjectsPassed),
      Backlogs: backlogs,
      Semester_GPA:
        Number(formData.cgpa),
      Fees_Paid:
        formData.tuitionPaid === "Yes" ? 1 : 0,
      Scholarship:
        formData.scholarship === "Yes" ? 1 : 0,
      Mother_Education:
        educationMap[formData.motherEducation] || 0,
      Father_Education:
        educationMap[formData.fatherEducation] || 0,
      Academic_Engagement:
        engagementMap[formData.academicEngagement] || 0,
    };
    return modelFeatures;
  };
  const factorLabels = {
    Fees_Paid:
      "Fee Payment Status",
    Semester_GPA:
      "Academic Performance",
    Subjects_Passed:
      "Subject Pass Rate",
    Subjects_Enrolled:
      "Course Load",
    Scholarship:
      "Scholarship Status",
    Academic_Engagement:
      "Academic Engagement",
    Backlogs:
      "Backlogs",
    Admission_Score:
      "Admission Score",
    Mother_Education:
      "Mother's Education",
    Father_Education:
      "Father's Education",
    Age:
      "Student Age",
    Gender:
      "Gender"
  };
  const factorExplanations = {

    "Academic Performance":
      "Student's academic performance is below the expected level.",

    "Subject Pass Rate":
      "The student has passed fewer subjects than expected.",

    "Backlogs":
      "Multiple pending subjects may increase dropout risk.",

    "Course Load":
      "Current semester workload may be affecting performance.",

    "Fee Payment Status":
      "Fee payment status indicates possible financial challenges.",

    "Scholarship Status":
      "Lack of scholarship support may increase financial pressure.",

    "Academic Engagement":
      "Low academic engagement may reduce learning outcomes.",

    "Admission Score":
      "Previous academic record indicates possible risk.",

    "Mother's Education":
      "Family educational background may influence academic support.",

    "Father's Education":
      "Family educational background may influence academic support."

  };
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && step === 4) {

      handlePrediction();

    }

  };
  const handlePrediction = async () => {
    setLoading(true);
    const modelFeatures = buildModelFeatures();
    console.log("Sending:", modelFeatures);
    try {
      setPredictionMade(true);
      setLoading(false);
      const result =
        await predictStudent(modelFeatures);
      console.log(
        "API Result:",
        result
      );
      setRiskScore(
        Math.round(result.risk_score)
      );
      setRiskLevel(
        result.risk_level.toUpperCase()
      );
      let insights = [];

      if (result.risk_score < 40) {

        if (Number(formData.cgpa) >= 8)
          insights.push("Excellent academic performance");

        if (backlogs === 0)
          insights.push("No active backlogs");

        if (Number(formData.attendance) >= 80)
          insights.push("Good attendance record");

        if (formData.scholarship === "Yes")
          insights.push("Scholarship support available");
      }

      else {

        result.top_factors.forEach((factor) => {

          insights.push(
            factorLabels[factor] || factor
          );

        });

      }

      setRiskFactors(insights);
      let actions = [];

      if (result.risk_level === "High Risk") {

        actions = [
          "Immediate Academic Counselling",
          "Parent/Guardian Meeting",
          "Weekly Attendance Monitoring",
          "Financial Support Review"
        ];

      }

      else if (result.risk_level === "Moderate Risk") {

        actions = [
          "Faculty Mentoring",
          "Monthly Progress Review",
          "Attendance Tracking",
          "Academic Support Sessions"
        ];

      }

      else {

        actions = [
          "Maintain Current Performance",
          "Encourage Academic Participation",
          "Regular Faculty Guidance",
          "Keep participating in academic activities"
        ];

      }

      setRecommendedActions(actions);
      setPredictionMade(true);
    }
    catch (error) {
      console.error(
        "Prediction Error:",
        error
      );
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#EDF4FF] to-[#DCEBFF]"
      onKeyDown={handleKeyDown}
    >

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">

        <Navbar />

        {/* Heading */}
        <div className="mt-8">

          <h1 className="text-5xl font-bold text-[#0B2A5B]">
            Student Dropout Prediction
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            AI-powered student risk assessment
          </p>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-12 gap-8 mt-10">

          {/* LEFT SIDE */}
          <div className="col-span-7 bg-white rounded-[35px] shadow-lg p-8">

            {/* Stepper */}
            <div className="flex items-center justify-between mb-10">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="flex flex-col items-center"
                >

                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition
                    ${step >= item
                        ? "bg-cyan-500 text-white"
                        : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {item}
                  </div>

                  <p className="text-sm mt-2 text-gray-600">

                    {item === 1 && "Profile"}
                    {item === 2 && "Academic"}
                    {item === 3 && "Context"}
                    {item === 4 && "Predict"}

                  </p>

                </div>
              ))}
            </div>

            {/* Dynamic Step Content */}
            <div className="min-h-[450px]">

              {step === 1 && (
                <div>

                  <h2 className="text-3xl font-bold text-[#0B2A5B]">
                    Student Profile
                  </h2>

                  <p className="text-gray-500 mt-2 mb-8">
                    Enter student details and academic history
                  </p>

                  {/* Student Information */}
                  <div>

                    <h3 className="text-xl font-semibold text-[#0B2A5B] mb-5">
                      Student Information
                    </h3>

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Student Name
                        </label>

                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="Enter Student Name"
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Age
                        </label>

                        <input
                          type="number"
                          min="16"
                          max="50"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Enter Age"
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Gender
                        </label>

                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>

                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Program
                        </label>

                        <select
                          name="program"
                          value={formData.program}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Program
                          </option>

                          <option>B.Tech</option>
                          <option>BCA</option>
                          <option>BBA</option>
                          <option>B.Com</option>
                          <option>BSc</option>
                          <option>MBA</option>
                          <option>MCA</option>
                          <option>M.Tech</option>
                          <option>MSc</option>
                          <option>BA</option>
                          <option>MA</option>
                          <option>M.Com</option>
                          <option>LLB</option>
                          <option>PhD</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Semester
                        </label>

                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Semester
                          </option>

                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Academic History */}
                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-[#0B2A5B] mb-5">
                      Academic History
                    </h3>

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Class 10 Percentage
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          name="class10"
                          value={formData.class10}
                          onChange={handleChange}
                          placeholder="Enter Class 10 Percentage"
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Class 12 / Diploma Percentage
                        </label>

                        <input
                          type="number"
                          min="0"
                          max="100"
                          name="class12"
                          value={formData.class12}
                          onChange={handleChange}
                          placeholder="Enter Class 12 / Diploma %"
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Admission Path
                        </label>

                        <select
                          name="admissionPath"
                          value={formData.admissionPath}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Admission Path
                          </option>

                          <option>Class 12</option>
                          <option>Diploma Lateral Entry</option>
                          <option>Transfer Student</option>
                        </select>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {step === 2 && (
                <div>

                  <h2 className="text-3xl font-bold text-[#0B2A5B]">
                    Academic Performance
                  </h2>

                  <p className="text-gray-500 mt-2 mb-8">
                    Enter academic performance indicators
                  </p>

                  <div className="grid grid-cols-2 gap-5">

                    {/* GPA */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Current GPA / CGPA
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        placeholder="Enter GPA"
                        className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Internal Marks */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Internal Marks Average
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="internalMarks"
                        value={formData.internalMarks}
                        onChange={handleChange}
                        placeholder="Enter Marks"
                        className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Academic Support Sessions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Academic Support Sessions
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="50"
                        name="academicSupportSessions"
                        value={formData.academicSupportSessions}
                        onChange={handleChange}
                        placeholder="Number of Sessions"
                        className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Subjects Enrolled */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Subjects Enrolled
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="30"
                        name="subjectsEnrolled"
                        value={formData.subjectsEnrolled}
                        onChange={handleChange}
                        placeholder="Enter Count"
                        className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                      />
                    </div>
                    {/* Subjects Passed */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Subjects Passed
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="30"
                        placeholder="Enter Count"
                        name="subjectsPassed"
                        value={formData.subjectsPassed}
                        onChange={(e) => {

                          const value = Number(e.target.value);
                          const enrolled = Number(formData.subjectsEnrolled);

                          if (
                            value <= enrolled ||
                            formData.subjectsEnrolled === ""
                          ) {
                            setFormData({
                              ...formData,
                              subjectsPassed: e.target.value
                            });
                          }

                        }}
                        className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:border-cyan-500"
                      />
                    </div>

                  </div>


                  {/* Attendance Slider */}
                  <div className="mt-8">

                    <div className="flex justify-between items-center">

                      <label className="font-semibold text-[#0B2A5B]">
                        Attendance %
                      </label>

                      <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full font-semibold">
                        {formData.attendance}%
                      </span>

                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      name="attendance"
                      value={formData.attendance}
                      onChange={handleChange}
                      className="w-full mt-4 accent-cyan-500"
                    />

                  </div>

                  {/* Assignment Completion Slider */}
                  <div className="mt-8">

                    <div className="flex justify-between items-center">

                      <label className="font-semibold text-[#0B2A5B]">
                        Assignment Completion %
                      </label>

                      <span className="bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full font-semibold">
                        {formData.assignmentCompletion}%
                      </span>

                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      name="assignmentCompletion"
                      value={formData.assignmentCompletion}
                      onChange={handleChange}
                      className="w-full mt-4 accent-cyan-500"
                    />

                  </div>

                  {/* Backlog Preview */}
                  <div className="mt-8 bg-[#EDF4FF] rounded-3xl p-5">

                    <h3 className="font-semibold text-[#0B2A5B]">
                      Backlogs
                    </h3>

                    <p className="text-3xl font-bold text-cyan-600 mt-2">
                      {backlogs}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Based on enrolled and passed subjects
                    </p>

                  </div>

                </div>
              )}

              {step === 3 && (
                <div>

                  <h2 className="text-3xl font-bold text-[#0B2A5B]">
                    Contextual Factors
                  </h2>

                  <p className="text-gray-500 mt-2 mb-8">
                    Financial, family and engagement indicators
                  </p>

                  {/* Financial Factors */}
                  <div>

                    <h3 className="text-xl font-semibold text-[#0B2A5B] mb-5">
                      Financial Factors
                    </h3>

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Tuition Fees Paid?
                        </label>

                        <select
                          name="tuitionPaid"
                          value={formData.tuitionPaid}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Option
                          </option>

                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Scholarship Holder?
                        </label>

                        <select
                          name="scholarship"
                          value={formData.scholarship}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Option
                          </option>

                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>

                    </div>

                  </div>

                  {/* Family Background */}
                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-[#0B2A5B] mb-5">
                      Family Background
                    </h3>

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Mother Education
                        </label>

                        <select
                          name="motherEducation"
                          value={formData.motherEducation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Education Level
                          </option>

                          <option>Primary School</option>
                          <option>Secondary School</option>
                          <option>Higher Secondary</option>
                          <option>Graduate</option>
                          <option>Postgraduate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Father Education
                        </label>

                        <select
                          name="fatherEducation"
                          value={formData.fatherEducation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Education Level
                          </option>

                          <option>Primary School</option>
                          <option>Secondary School</option>
                          <option>Higher Secondary</option>
                          <option>Graduate</option>
                          <option>Postgraduate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Mother Occupation
                        </label>

                        <select
                          name="motherOccupation"
                          value={formData.motherOccupation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Occupation
                          </option>

                          <option>Homemaker</option>
                          <option>Government Employee</option>
                          <option>Private Employee</option>
                          <option>Business</option>
                          <option>Farmer</option>
                          <option>Self Employed</option>
                          <option>Other</option>
                        </select>
                      </div>


                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Father Occupation
                        </label>

                        <select
                          name="fatherOccupation"
                          value={formData.fatherOccupation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Occupation
                          </option>

                          <option>Government Employee</option>
                          <option>Private Employee</option>
                          <option>Business</option>
                          <option>Farmer</option>
                          <option>Self Employed</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Family Income Level
                        </label>

                        <select
                          name="incomeLevel"
                          value={formData.incomeLevel}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Income Level
                          </option>

                          <option>Below ₹3 LPA</option>
                          <option>₹3–10 LPA</option>
                          <option>Above ₹10 LPA</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Hostel / Day Scholar
                        </label>

                        <select
                          name="hostelType"
                          value={formData.hostelType}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>

                          <option>Hosteller</option>
                          <option>Day Scholar</option>
                        </select>
                      </div>

                    </div>

                  </div>

                  {/* Student Engagement */}
                  <div className="mt-10">

                    <h3 className="text-xl font-semibold text-[#0B2A5B] mb-5">
                      Student Engagement
                    </h3>

                    <div className="grid grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Academic Engagement
                        </label>

                        <select
                          name="academicEngagement"
                          value={formData.academicEngagement}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Level
                          </option>

                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Academic Support Received
                        </label>

                        <select
                          name="mentoringSupport"
                          value={formData.mentoringSupport}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Level
                          </option>

                          <option>None</option>
                          <option>Occasional</option>
                          <option>Regular</option>
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Class Participation
                        </label>

                        <select
                          name="classParticipation"
                          value={formData.classParticipation}
                          onChange={handleChange}
                          className="w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        >
                          <option value="" disabled>
                            Select Level
                          </option>

                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>

                    </div>

                  </div>

                </div>
              )}
              {step === 4 && (
                <div>

                  <h2 className="text-3xl font-bold text-[#0B2A5B]">
                    Review & Predict
                  </h2>

                  <p className="text-gray-500 mt-2 mb-8">
                    Review information before prediction
                  </p>

                  <h3 className="font-semibold text-[#0B2A5B] text-xl mb-6">
                    Student Summary
                  </h3>

                  {/* Student Profile */}
                  <div>

                    <h4 className="font-semibold text-[#0B2A5B] mb-4">
                      Student Profile
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Student Name</span>
                        <span>{formData.studentName || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Age</span>
                        <span>{formData.age || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Gender</span>
                        <span>{formData.gender || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Program</span>
                        <span>{formData.program || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Semester</span>
                        <span>{formData.semester || "-"}</span>
                      </div>

                    </div>

                  </div>

                  <hr className="my-6" />

                  {/* Academic History */}
                  <div>

                    <h4 className="font-semibold text-[#0B2A5B] mb-4">
                      Academic History
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Class 10 Percentage</span>
                        <span>{formData.class10 || "-"}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Class 12 / Diploma</span>
                        <span>{formData.class12 || "-"}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Admission Path</span>
                        <span>{formData.admissionPath || "-"}</span>
                      </div>

                    </div>

                  </div>

                  <hr className="my-6" />

                  {/* Academic Performance */}
                  <div>

                    <h4 className="font-semibold text-[#0B2A5B] mb-4">
                      Academic Performance
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>CGPA</span>
                        <span>{formData.cgpa || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Internal Marks</span>
                        <span>{formData.internalMarks || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Academic Support Sessions</span>
                        <span>{formData.academicSupportSessions}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Current Semester Subjects Enrolled</span>
                        <span>{formData.subjectsEnrolled || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Current Semester Subjects Passed</span>
                        <span>{formData.subjectsPassed || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Backlogs</span>
                        <span>{backlogs}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Attendance</span>
                        <span>{formData.attendance}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Assignment Completion</span>
                        <span>{formData.assignmentCompletion}%</span>
                      </div>

                    </div>

                  </div>

                  <hr className="my-6" />

                  {/* Family & Financial */}
                  <div>

                    <h4 className="font-semibold text-[#0B2A5B] mb-4">
                      Family & Financial
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Tuition Fees Paid</span>
                        <span>{formData.tuitionPaid || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Scholarship</span>
                        <span>{formData.scholarship || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Family Income</span>
                        <span>{formData.incomeLevel || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Mother Education</span>
                        <span>{formData.motherEducation || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Father Education</span>
                        <span>{formData.fatherEducation || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Mother Occupation</span>
                        <span>{formData.motherOccupation || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Father Occupation</span>
                        <span>{formData.fatherOccupation || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Hostel Type</span>
                        <span>{formData.hostelType || "-"}</span>
                      </div>

                    </div>

                  </div>

                  <hr className="my-6" />

                  {/* Engagement */}
                  <div>

                    <h4 className="font-semibold text-[#0B2A5B] mb-4">
                      Student Engagement
                    </h4>

                    <div className="space-y-3">

                      <div className="flex justify-between">
                        <span>Academic Engagement</span>
                        <span>{formData.academicEngagement || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Academic Support Received</span>
                        <span>{formData.mentoringSupport || "-"}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Class Participation</span>
                        <span>{formData.classParticipation || "-"}</span>
                      </div>

                    </div>

                  </div>

                  <button
                    onClick={handlePrediction}
                    disabled={loading}
                    className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition

  ${loading
                        ? "bg-cyan-300 cursor-not-allowed"
                        : "bg-cyan-500 hover:bg-cyan-600 text-white"
                      }`}
                  >

                    {loading ? (

                      <div className="flex items-center justify-center gap-3">

                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                        Predicting...

                      </div>

                    ) : (

                      "Predict Dropout Risk"

                    )}
                  </button>

                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">

              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className={`px-8 py-4 rounded-2xl font-semibold transition
                ${step === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                Previous
              </button>

              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 4}
                className={`px-8 py-4 rounded-2xl font-semibold transition
                ${step === 4
                    ? "bg-cyan-200 text-white cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                  }`}
              >
                Next
              </button>

            </div>

          </div>

          {/* RIGHT SIDE AI PANEL */}
          <div className="col-span-5 bg-white rounded-[35px] shadow-lg p-8 sticky top-8 h-fit">

            <h2 className="text-3xl font-bold text-[#0B2A5B]">
              AI Prediction Panel
            </h2>

            {!predictionMade ? (

              <div className="flex flex-col items-center justify-center mt-16 text-center">

                <div className="w-28 h-28 rounded-full bg-cyan-100 flex items-center justify-center text-5xl">
                  🧠
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#0B2A5B]">
                  AI Waiting for Input
                </h3>

              </div>

            ) : (

              <div className="mt-10">

                <div
                  className={`text-center p-6 rounded-3xl
      ${riskLevel === "HIGH RISK"
                      ? "bg-red-100"
                      : riskLevel === "MODERATE RISK"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                >

                  <h2 className="text-3xl font-bold">
                    {riskLevel}
                  </h2>

                  <p className="text-5xl font-bold mt-4">
                    {riskScore}%
                  </p>

                  <div className="mt-8">

                    <h3 className="font-semibold text-[#0B2A5B]">
                      {riskScore < 40
                        ? "Key Strengths"
                        : "Key Risk Factors"}

                    </h3>

                    <ul className="mt-4 space-y-3 text-left">

                      {riskFactors.map((factor, index) => (

                        <li
                          key={index}
                          className="text-gray-600 flex items-start"
                        >
                          • {factorExplanations[factor] || factor}
                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

                <div className="mt-8">

                  <h3 className="font-semibold text-[#0B2A5B]">
                    Recommended Actions
                  </h3>

                  <ul className="mt-4 space-y-3 text-gray-600">

                    {recommendedActions.map(
                      (action, index) => (

                        <li key={index}>
                          ✓ {action}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div >
  );
}

export default Prediction;