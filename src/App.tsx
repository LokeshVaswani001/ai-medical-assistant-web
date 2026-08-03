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

// Profile Sub-Pages Imports
import PersonalInformation from "@/pages/profile/PersonalInformation";
import MedicalHistory from "@/pages/profile/MedicalHistory";
import NotificationSettings from "@/pages/profile/NotificationSettings";
import PrivacySecurity from "@/pages/profile/PrivacySecurity";
import HelpSupport from "@/pages/profile/HelpSupport";

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
              
              {/* Profile Sub-Pages Routes */}
              <Route path="/profile/personal" element={<PersonalInformation />} />
              <Route path="/profile/medical-history" element={<MedicalHistory />} />
              <Route path="/profile/notifications" element={<NotificationSettings />} />
              <Route path="/profile/privacy" element={<PrivacySecurity />} />
              <Route path="/support" element={<HelpSupport />} />

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