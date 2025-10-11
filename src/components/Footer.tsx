import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/goldenbrics" },
    { name: "X", icon: null, href: "https://x.com/gold_brics", svg: "/Xtwitter.svg" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/gold-brics" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/goldenbrics" },
  ];

  const services = [
    "Business Development Tokenization",
    "Real Estate Investment",
    "Hard Automation",
    "Market Analysis",
    "Assets Management",
    "AI Solutions",
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-80 z-0">
        <img
          src={"/official.svg"}
          alt="Background SVG"
          className="w-full h-full object-cover"
          style={{ opacity: 0.67 }}
        />
      </div>
      <div className="relative z-10 container-wide py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              InvestPro
            </h3>
            <p className="text-white leading-relaxed">
              Leading business development and investment consultancy firm, 
              empowering enterprises with innovative solutions and strategic insights.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                if (social.svg) {
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-white hover:text-white smooth-transition p-2 rounded-lg hover:bg-white/10"
                      aria-label={social.name}
                    >
                      <img src={social.svg} alt={social.name} className="w-5 h-5" />
                    </a>
                  );
                }
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-white hover:text-white smooth-transition p-2 rounded-lg hover:bg-white/10"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-white hover:text-white smooth-transition"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-white hover:text-white/80 smooth-transition">Super AI</a></li>
              <li><a href="#robotics" className="text-white hover:text-white/80 smooth-transition">Robotics</a></li>
              <li><a href="#academy" className="text-white hover:text-white/80 smooth-transition">Academy</a></li>
              <li><a href="#arvr" className="text-white hover:text-white/80 smooth-transition">AR/VR Solutions</a></li>
              <li><a href="#software" className="text-white hover:text-white/80 smooth-transition">Software Solutions</a></li>
              <li><a href="#tokenomics" className="text-white hover:text-white/80 smooth-transition">Tokenomics</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white">
                <Mail size={16} />
                <span>contact@goldbrics.pro</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Phone size={16} />
                <span>+7 (928) 765 4354</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <MapPin size={16} />
                <span>Akademika Sakharova Prospekt, 9 Moscow, Russia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
  <div className="mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white text-sm">
              © 2025 GoldBlocks.Pro All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white hover:text-white/80 smooth-transition">Privacy Policy</a>
              <a href="#" className="text-white hover:text-white/80 smooth-transition">Terms of Service</a>
              <a href="#" className="text-white hover:text-white/80 smooth-transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;