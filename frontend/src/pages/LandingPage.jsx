import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

function LandingPage() {

  const navigate = useNavigate();
  const scrollToHowItWorks = () => {

    const section = document.getElementById(
      "how-it-works"
    );

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      });

    }

  };
  const scrollToAbout = () => {

    document
      .getElementById("about")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  };
  return (
    <div className="bg-[#F5F9FF] min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-20 py-5 bg-white/95 backdrop-blur-md shadow-sm">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold text-[#0B2A5B]">
              DropSense AI
            </h1>

            <p className="text-sm text-cyan-600">
              Predicting Risk. Enabling Success.
            </p>
          </div>
        </div>

        <div className="flex gap-10 text-[#0B2A5B] text-[17px] font-medium">

          <button
            onClick={scrollToAbout}
          >
            About
          </button>

          <button
            onClick={scrollToHowItWorks}
          >
            How It Works
          </button>

        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#0B2A5B] text-white px-6 py-3 rounded-2xl hover:bg-[#134E8E] hover:scale-105 transition duration-300"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-[calc(100vh-88px)] flex items-center justify-between px-20 mt-3 mb-6"
      >

        <div className="max-w-2xl relative">

          <div className="absolute w-[500px] h-[500px] bg-cyan-300/10 blur-[120px] rounded-full -top-32 -left-28 -z-10"></div>

          <h1 className="text-6xl font-bold text-[#0B2A5B] leading-tight">

            Predict Student
            <br />
            Dropout Risk Using AI
            <br />
            Before it Happens
          </h1>

          <p className="text-xl text-gray-600 mt-8 leading-relaxed">

            AI-powered student retention platform
            helping universities identify at-risk
            students early and improve academic
            success outcomes.

          </p>

          <div className="flex gap-5 mt-10">

            <button
              onClick={() => navigate("/login")}
              className="bg-[#0B2A5B] text-white px-8 py-4 rounded-2xl hover:bg-[#134E8E] transition"
            >
              Get Started
            </button>

          </div>
        </div>

        {/* AI Workflow Card */}

        {/* Hero Stats Card */}

        <div className="bg-white rounded-[40px] shadow-2xl p-10 w-[520px]">

          <h2 className="text-3xl font-bold text-[#0B2A5B]">

            Trusted AI Platform

          </h2>

          <p className="text-gray-500 mt-2">

            Helping institutions identify at-risk students
            through explainable Machine Learning.

          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="bg-[#F5F9FF] rounded-3xl p-6">

              <p className="text-gray-500">

                Students Analysed

              </p>

              <h3 className="text-4xl font-bold text-[#0B2A5B] mt-3">

                4,424+

              </h3>

            </div>

            <div className="bg-[#F5F9FF] rounded-3xl p-6">

              <p className="text-gray-500">

                AI Accuracy

              </p>

              <h3 className="text-4xl font-bold text-green-500 mt-3">

                88%

              </h3>

            </div>

            <div className="bg-[#F5F9FF] rounded-3xl p-6">

              <p className="text-gray-500">

                AI Model

              </p>

              <h3 className="text-2xl font-bold text-[#0B2A5B] mt-3">

                CatBoost

              </h3>

            </div>

            <div className="bg-[#F5F9FF] rounded-3xl p-6">

              <p className="text-gray-500">

                Explainability

              </p>

              <h3 className="text-2xl font-bold text-cyan-500 mt-3">

                SHAP

              </h3>

            </div>

          </div>

          <div className="bg-cyan-50 rounded-3xl mt-8 p-6">

            <h3 className="font-bold text-[#0B2A5B]">

              Platform Highlights

            </h3>

            <ul className="mt-4 space-y-3 text-gray-700">

              <li>✅ Single Student Prediction</li>

              <li>✅ Batch CSV Analysis</li>

              <li>✅ Explainable AI Insights</li>

              <li>✅ Institutional Analytics Dashboard</li>

            </ul>

          </div>

        </div>

      </section>
      {/* WHY DROPSENSE AI */}

      <section className="px-20 py-24 bg-white">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#0B2A5B]">

            Why DropSense AI?

          </h2>

          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">

            An intelligent student retention platform that combines
            Machine Learning, Explainable AI and institutional
            analytics to support timely academic intervention.

          </p>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-16">

          {/* Card 1 */}

          <div className="bg-[#F8FBFF] rounded-[30px] p-8 shadow hover:shadow-xl transition">

            <div className="text-5xl">

              🤖

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#0B2A5B]">

              AI Risk Prediction

            </h3>

            <p className="mt-4 text-gray-600 leading-8">

              Predicts student dropout probability using a
              CatBoost Machine Learning model trained on
              academic and behavioural indicators.

            </p>

          </div>

          {/* Card 2 */}

          <div className="bg-[#F8FBFF] rounded-[30px] p-8 shadow hover:shadow-xl transition">

            <div className="text-5xl">

              📂

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#0B2A5B]">

              Bulk Student Analysis

            </h3>

            <p className="mt-4 text-gray-600 leading-8">

              Upload an entire student dataset and instantly
              identify high, moderate and low-risk students
              using batch AI prediction.

            </p>

          </div>

          {/* Card 3 */}

          <div className="bg-[#F8FBFF] rounded-[30px] p-8 shadow hover:shadow-xl transition">

            <div className="text-5xl">

              📊

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#0B2A5B]">

              Institutional Analytics

            </h3>

            <p className="mt-4 text-gray-600 leading-8">

              Interactive dashboards and visual analytics
              provide insights into student retention,
              academic trends and intervention priorities.

            </p>

          </div>

          {/* Card 4 */}

          <div className="bg-[#F8FBFF] rounded-[30px] p-8 shadow hover:shadow-xl transition">

            <div className="text-5xl">

              🎯

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#0B2A5B]">

              Explainable AI

            </h3>

            <p className="mt-4 text-gray-600 leading-8">

              SHAP-based explanations highlight the
              factors influencing each prediction,
              helping educators make informed decisions.

            </p>

          </div>

        </div>

      </section>
      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="px-20 py-24 bg-[#F5F9FF]"
      >

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#0B2A5B]">

            How DropSense AI Works

          </h2>

          <p className="mt-5 text-xl text-gray-600 max-w-4xl mx-auto">

            DropSense AI transforms student information into
            actionable insights through Machine Learning and
            Explainable AI, enabling institutions to identify
            at-risk students before academic disengagement occurs.

          </p>

        </div>

        <div className="mt-20 flex flex-col items-center">

          {/* STEP 1 */}

          <div className="bg-white shadow-lg rounded-[30px] w-[800px] p-8 flex items-center gap-8">

            <div className="text-5xl">
              👨‍🎓
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B2A5B]">

                Student Information

              </h3>

              <p className="text-gray-600 mt-2">

                Academic, demographic, attendance,
                engagement and financial information
                is collected from the student.

              </p>

            </div>

          </div>

          <div className="h-16 border-l-4 border-cyan-400"></div>

          {/* STEP 2 */}

          <div className="bg-white shadow-lg rounded-[30px] w-[800px] p-8 flex items-center gap-8">

            <div className="text-5xl">
              ⚙️
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B2A5B]">

                Feature Engineering

              </h3>

              <p className="text-gray-600 mt-2">

                More than twenty user inputs are transformed
                into the twelve optimized features required
                by the CatBoost prediction model.

              </p>

            </div>

          </div>

          <div className="h-16 border-l-4 border-cyan-400"></div>

          {/* STEP 3 */}

          <div className="bg-white shadow-lg rounded-[30px] w-[800px] p-8 flex items-center gap-8">

            <div className="text-5xl">
              🧠
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B2A5B]">

                CatBoost AI Prediction

              </h3>

              <p className="text-gray-600 mt-2">

                The trained CatBoost model predicts
                the probability of student dropout
                and classifies the overall risk level.

              </p>

            </div>

          </div>

          <div className="h-16 border-l-4 border-cyan-400"></div>

          {/* STEP 4 */}

          <div className="bg-white shadow-lg rounded-[30px] w-[800px] p-8 flex items-center gap-8">

            <div className="text-5xl">
              🔍
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B2A5B]">

                Explainable AI (SHAP)

              </h3>

              <p className="text-gray-600 mt-2">

                SHAP identifies the most influential
                factors behind every prediction,
                making the AI transparent and trustworthy.

              </p>

            </div>

          </div>

          <div className="h-16 border-l-4 border-cyan-400"></div>

          {/* STEP 5 */}

          <div className="bg-white shadow-lg rounded-[30px] w-[800px] p-8 flex items-center gap-8">

            <div className="text-5xl">
              🎯
            </div>

            <div>

              <h3 className="text-2xl font-bold text-[#0B2A5B]">

                Early Intervention

              </h3>

              <p className="text-gray-600 mt-2">

                Faculty members receive risk scores,
                explanations and recommendations
                to support timely academic intervention.

              </p>

            </div>

          </div>

        </div>

      </section>
      {/* ABOUT */}

      <section
        id="about"
        className="px-20 py-24 bg-white"
      >

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold text-[#0B2A5B]">

            About DropSense AI

          </h2>

          <p className="mt-10 text-xl leading-9 text-gray-600">

            Student dropout remains one of the major challenges faced
            by educational institutions. Delayed identification of
            at-risk students often results in reduced academic
            performance, lower retention rates and missed opportunities
            for timely intervention.

          </p>

          <p className="mt-8 text-xl leading-9 text-gray-600">

            DropSense AI is an AI-powered student retention platform
            developed as a B.Tech Final Year Project at
            Techno Main Salt Lake under MAKAUT. The platform uses
            Machine Learning with CatBoost and Explainable AI (SHAP)
            to predict student dropout risk, explain every prediction
            and support educators with meaningful intervention
            recommendations.

          </p>

        </div>

      </section>
      {/* FOOTER */}

      <footer className="bg-[#0B2A5B] text-white">

        <div className="px-20 py-16">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">

                DropSense AI

              </h2>

              <p className="mt-3 text-cyan-200">

                Predicting Risk. Enabling Success.

              </p>

            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-2xl transition"
            >

              Login

            </button>

          </div>

          <hr className="my-10 border-cyan-800" />

          <div className="flex justify-between text-sm text-cyan-200">

            <p>

              © 2026 DropSense AI. All Rights Reserved.

            </p>

            <p>

              MAKAUT B.Tech Final Year Project

            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;