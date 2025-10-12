import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Check if we're still on hero section (assume hero is roughly first viewport)
      setIsOnHero(scrollPosition < window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "普通话", href: "#chinese", onClick: () => onLanguageChange && onLanguageChange('CH') },
    { name: "Русский", href: "#russian", onClick: () => onLanguageChange && onLanguageChange('RU') },
    { name: "AI", href: "#hero" },
    { name: "Robotics", href: "#robotics" },
    { name: "Academy", href: "#academy" },
    { name: "AR/VR", href: "#arvr" },
    { name: "Automation", href: "#automation" },
    { name: "CrowdF", href: "#crowdf" },
    { name: "Startups", href: "#startup" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "RealEstate", href: "#realestate" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition
        ${isOnHero ? "bg-transparent border-b-0" : "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"}
      `}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img
                src="/Headerlogo.png"
                alt="InvestPro Logo"
                className="h-10 w-auto"
                style={{ maxHeight: '40px' }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex flex-1 justify-end items-center gap-3 mr-4 ${isOnHero ? "text-white" : "text-foreground"}`}>
            {navigation.map((item) => (
              item.onClick ? (
                <button
                  key={item.name}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${isOnHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium smooth-transition ${isOnHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isOnHero ? "text-white" : "text-foreground"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 border-t border-border ${isOnHero ? "bg-black/80" : "bg-white"}`}>
              {navigation.map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium smooth-transition ${isOnHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}
                    onClick={() => { item.onClick(); setIsMenuOpen(false); }}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium smooth-transition ${isOnHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;