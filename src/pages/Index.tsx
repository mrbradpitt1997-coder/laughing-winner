import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import RoboticsSection from "@/components/sections/RoboticsSection";
import AcademySection from "@/components/sections/AcademySection";
import ARVRSection from "@/components/sections/ARVRSection";
import SoftwareSection from "@/components/sections/SoftwareSection";
import CrowdFSection from "@/components/sections/CrowdFSection";
import StartupSection from "@/components/sections/StartupSection";
import TokenomicsSection from "@/components/sections/TokenomicsSection";
import RealEstateSection from "@/components/sections/RealEstateSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <RoboticsSection />
        <AcademySection />
        <ARVRSection />
        <SoftwareSection />
        <CrowdFSection />
        <StartupSection />
        <TokenomicsSection />
        <RealEstateSection />
        <NewsletterSection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
