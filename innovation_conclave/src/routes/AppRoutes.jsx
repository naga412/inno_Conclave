// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../templates/PublicLayout";
import HomePage from "../pages/HomePage";
import AgendaPage from "../pages/AgendaPage";
import SpeakersPage from "../pages/SpeakersPage";
import ExhibitorsPage from "../pages/ExhibitorsPage";
import WorkshopsPage from "../pages/WorkshopsPage";
import LoginPage from "../pages/LoginPage";
import ExhibitorRegisterPage from "../pages/ExhibitorRegisterPage";
import ExhibitorDashboard from "../pages/ExhibitorDashboard";
import ParticipantRegisterPage from "../pages/ParticipantRegisterPage";
import ParticipantDashboard from "../pages/ParticipantDashboard";
import AdminPortal from "../pages/AdminPortal";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/agenda" element={<PublicLayout><AgendaPage /></PublicLayout>} />
            <Route path="/speakers" element={<PublicLayout><SpeakersPage /></PublicLayout>} />
            <Route path="/exhibitors" element={<PublicLayout><ExhibitorsPage /></PublicLayout>} />
            <Route path="/workshops" element={<PublicLayout><WorkshopsPage /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            {/* Exhibitor-specific pages */}
            <Route path="/exhibitor-register" element={<PublicLayout><ExhibitorRegisterPage /></PublicLayout>} />
            <Route path="/exhibitor-dashboard" element={<ExhibitorDashboard />} />
            {/* Participant-specific pages */}
            <Route path="/participant-register" element={<PublicLayout><ParticipantRegisterPage /></PublicLayout>} />
            <Route path="/participant-dashboard" element={<ParticipantDashboard />} />
            {/* Admin */}
            <Route path="/admin-portal" element={<AdminPortal />} />
        </Routes>
    );
}
