// templates/PublicLayout.jsx
import Navbar from "../components/Navbar";

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
