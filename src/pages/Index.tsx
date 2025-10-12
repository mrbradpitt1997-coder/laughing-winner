import Header from "@/components/Header";
import CH_Header from "@/components/CH_Header";
import { useState } from "react";
import Footer from "@/components/Footer";
import CH_Footer from "@/components/CH_Footer";
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
import CH_ManifestoSection from "@/components/sections/CH_ManifestoSection";
import CH_RoboticsSection from "@/components/sections/CH_RoboticsSection";
import CH_AcademySection from "@/components/sections/CH_AcademySection";
import CH_ARVRSection from "@/components/sections/CH_ARVRSection";
import CH_SoftwareSection from "@/components/sections/CH_SoftwareSection";
import CH_CrowdFSection from "@/components/sections/CH_CrowdFSection";
import CH_StartupSection from "@/components/sections/CH_StartupSection";
import CH_TokenomicsSection from "@/components/sections/CH_TokenomicsSection";
import CH_RealEstateSection from "@/components/sections/CH_RealEstateSection";
import CH_NewsletterSection from "@/components/sections/CH_NewsletterSection";
import RU_HeroSection from "@/components/sections/HeroSection";
import RU_Header from "@/components/RU_Header";
import RU_Footer from "@/components/RU_Footer";
import RU_CookieBanner from "@/components/RU_CookieBanner";
import RU_ManifestoSection from "@/components/sections/RU_ManifestoSection";
import RU_RoboticsSection from "@/components/sections/RU_RoboticsSection";
import RU_AcademySection from "@/components/sections/RU_AcademySection";
import RU_ARVRSection from "@/components/sections/RU_ARVRSection";
import RU_SoftwareSection from "@/components/sections/RU_SoftwareSection";
import RU_CrowdFSection from "@/components/sections/RU_CrowdFSection";
import RU_StartupSection from "@/components/sections/RU_StartupSection";
import RU_TokenomicsSection from "@/components/sections/RU_TokenomicsSection";
import RU_RealEstateSection from "@/components/sections/RU_RealEstateSection";
import RU_NewsletterSection from "@/components/sections/RU_NewsletterSection";

const Index = () => {
  const [language, setLanguage] = useState("EN");

  // Section mapping by language (simplified for this patch)

  // Select section components based on language
  const CurrentSections = language === "RU"
    ? {
        HeroSection: RU_HeroSection,
        ManifestoSection: RU_ManifestoSection,
        RoboticsSection: RU_RoboticsSection,
        AcademySection: RU_AcademySection,
        ARVRSection: RU_ARVRSection,
        SoftwareSection: RU_SoftwareSection,
        CrowdFSection: RU_CrowdFSection,
        StartupSection: RU_StartupSection,
        TokenomicsSection: RU_TokenomicsSection,
        RealEstateSection: RU_RealEstateSection,
        NewsletterSection: RU_NewsletterSection,
      }
    : language === "CH"
    ? {
        HeroSection,
        ManifestoSection: CH_ManifestoSection,
        RoboticsSection: CH_RoboticsSection,
        AcademySection: CH_AcademySection,
        ARVRSection: CH_ARVRSection,
        SoftwareSection: CH_SoftwareSection,
        CrowdFSection: CH_CrowdFSection,
        StartupSection: CH_StartupSection,
        TokenomicsSection: CH_TokenomicsSection,
        RealEstateSection: CH_RealEstateSection,
        NewsletterSection: CH_NewsletterSection,
      }
    : {
        HeroSection,
        ManifestoSection,
        RoboticsSection,
        AcademySection,
        ARVRSection,
        SoftwareSection,
        CrowdFSection,
        StartupSection,
        TokenomicsSection,
        RealEstateSection,
        NewsletterSection,
      };

  return (
    <div className="min-h-screen bg-background">
      {language === "CH" ? (
        <CH_Header onLanguageChange={setLanguage} />
      ) : language === "RU" ? (
        <RU_Header onLanguageChange={setLanguage} />
      ) : (
        <Header onLanguageChange={setLanguage} />
      )}
      <main>
        <CurrentSections.HeroSection />
        <CurrentSections.ManifestoSection />
        <CurrentSections.RoboticsSection />
        <CurrentSections.AcademySection />
        <CurrentSections.ARVRSection />
        <CurrentSections.SoftwareSection />
        <CurrentSections.CrowdFSection />
        <CurrentSections.StartupSection />
        <CurrentSections.TokenomicsSection />
        <CurrentSections.RealEstateSection />
        <CurrentSections.NewsletterSection />
      </main>
      {language === "CH" ? <CH_Footer /> : language === "RU" ? <RU_Footer /> : <Footer />}
      {language === "RU" ? <RU_CookieBanner /> : <CookieBanner />}
    </div>
  );
};

export default Index;
