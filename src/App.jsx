import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ResultLogin from "./pages/ResultLogin";
import StudentResult from "./pages/StudentResult";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Subjects from "./pages/Subjects";
import ResultsPage from "./pages/Resultspage";
import Performance from"./pages/Performance";
import Marksheet from "./pages/Marksheet";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="/student-dashboard" element={<StudentDashboard />}/>

        {/* RESULT LOGIN PAGE */}
        <Route path="/result-login" element={<ResultLogin />}/>

        {/* NEW RESULT PAGE */}
        <Route path="/student-result" element={<StudentResult />}/>

        {/* REGISTER PAGE */}
        <Route path="/register" element={<Register />} />

        {/* FORGOT PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />} />

        {/* SUBJECTS */}
        <Route path="/subjects" element={<Subjects />}/>

        {/* PREVIOUS RESULTS PAGE */}
        <Route path="/results-page" element={<ResultsPage/>}/>

        {/* PERFORMANCE PAGE */}
        <Route path="/performance" element={<Performance />}/>

        {/* MARKSHEET PAGE */}
        <Route path="/marksheet" element={<Marksheet />}/>

        <Route path="/verify-otp" element={<VerifyOtp />} />
      
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    
  );
}

export default App;