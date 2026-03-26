// pages/HomePage.jsx
import Hero from "../components/Hero";
import Highlights from "../components/organisms/Highlights";
import SpeakersPreview from "../components/organisms/SpeakersPreview";
import AgendaPreview from "../components/organisms/AgendaPreview";
import CTASection from "../components/organisms/CTASection";

export default function HomePage() {
    return (
        <div className="font-sans">
            <Hero />
            <Highlights />
            <SpeakersPreview />
            <AgendaPreview />
            <CTASection />
        </div>
    );
}
