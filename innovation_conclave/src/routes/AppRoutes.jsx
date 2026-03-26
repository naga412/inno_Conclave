// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../templates/PublicLayout";
import HomePage from "../pages/HomePage";
import AgendaPage from "../pages/AgendaPage";
import SpeakersPage from "../pages/SpeakersPage";
import ExhibitorsPage from "../pages/ExhibitorsPage";
import WorkshopsPage from "../pages/WorkshopsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicLayout>
                        <HomePage />
                    </PublicLayout>
                }
            />
            <Route 
                path="/agenda" 
                element={
                    <PublicLayout>
                        <AgendaPage />
                    </PublicLayout>
                } 
            />
            <Route 
                path="/speakers" 
                element={
                    <PublicLayout>
                        <SpeakersPage />
                    </PublicLayout>
                } 
            />
            <Route 
                path="/exhibitors" 
                element={
                    <PublicLayout>
                        <ExhibitorsPage />
                    </PublicLayout>
                } 
            />
            <Route 
                path="/workshops" 
                element={
                    <PublicLayout>
                        <WorkshopsPage />
                    </PublicLayout>
                } 
            />
        </Routes>
    );
}
