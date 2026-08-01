import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import AppLayout from "@/layouts/AppLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import SymptomChecker from "@/pages/SymptomChecker";
import Hospitals from "@/pages/Hospitals";
import Reminders from "@/pages/Reminders";
import Profile from "@/pages/Profile";
import DiseaseResult from "@/pages/DiseaseResult";
import HealthReport from "@/pages/HealthReport";
import BmiCalculator from "@/pages/BmiCalculator";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/disease-result" element={<DiseaseResult />} />
              <Route path="/health-report" element={<HealthReport />} />
              <Route path="/bmi-calculator" element={<BmiCalculator />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}