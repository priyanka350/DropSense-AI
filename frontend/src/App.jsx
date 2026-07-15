import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import BulkUpload from "./pages/BulkUpload";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/prediction"
        element={<Prediction />}
      />

      <Route
        path="/analytics"
        element={<Analytics />}
      />

      <Route
        path="/bulkupload" 
        element={<BulkUpload />} />
      </Routes>
  );
}

export default App;