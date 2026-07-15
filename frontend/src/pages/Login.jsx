import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo2.png";
import studentImage from "../assets/student-login.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin"
    ) {

      setError("");

      navigate("/dashboard");

    }

    else {

      setError(
        "Invalid username or password."
      );

    }

  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-[#071B44] via-[#0B2A5B] to-[#123F78] flex items-center justify-center p-16">

        <div className="max-w-lg text-white">

          <h1 className="text-5xl font-bold leading-tight">
            Empower Student
            <br />
            Success With AI
          </h1>

          <p className="text-cyan-200 mt-6 text-xl leading-relaxed">
            Identify at-risk students and improve
            retention outcomes using predictive
            intelligence.
          </p>

          <img
            src={studentImage}
            alt="student"
            className="mt-10 rounded-[30px] shadow-2xl"
          />

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#F5F9FF] flex items-center justify-center">

        <div className="bg-white rounded-[40px] shadow-2xl p-12 w-[520px]">

          <div className="flex flex-col items-center">

            <img
              src={logo}
              alt="logo"
              className="w-28"
            />

            <h1 className="text-4xl font-bold text-[#0B2A5B] mt-4">
              DropSense AI
            </h1>

            <p className="text-cyan-600 mt-2">
              Predicting Risk. Enabling Success.
            </p>
          </div>

          <div className="mt-10">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-4 rounded-2xl border border-gray-300 outline-none mb-5 focus:border-cyan-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }

              className="w-full p-4 rounded-2xl border border-gray-300 outline-none"
            />
            {error && (

              <p className="text-red-500 text-sm mt-3">

                {error}

              </p>

            )}


            <div className="flex justify-between mt-4 text-sm">

              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <button className="text-cyan-600">
                Forgot password?
              </button>

            </div>

            <button
              onClick={handleLogin}
              className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
            >
              Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;