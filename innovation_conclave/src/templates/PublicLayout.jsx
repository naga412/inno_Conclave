import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkBackground from "../components/NetworkBackground";

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NetworkBackground />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
