import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkBackground from "../components/NetworkBackground";

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen relative">
            <div className="absolute inset-0 z-0">
                <NetworkBackground />
            </div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
