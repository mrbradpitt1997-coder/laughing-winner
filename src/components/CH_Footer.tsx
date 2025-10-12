import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const CH_Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/goldenbrics" },
    { name: "X", icon: null, href: "https://x.com/gold_brics", svg: "/Xtwitter.svg" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/gold-brics" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/goldenbrics" },
  ];

  const services = [
    "业务发展代币化",
    "房地产投资",
    "硬自动化",
    "市场分析",
    "资产管理",
    "AI解决方案",
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* SVG Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-80 z-0">
        <img
          src={"/official.svg"}
          alt="背景SVG"
          className="w-full h-full object-cover"
          style={{ opacity: 0.67 }}
        />
      </div>
      <div className="relative z-10 container-wide py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              积木
            </h3>
            <p className="text-white leading-relaxed">
              领先的商业发展与投资咨询公司，
              以创新解决方案和战略洞察力赋能企业。
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

          {/* 服务 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">服务</h4>
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

          {/* 快速链接 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">快速链接</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-white hover:text-white/80 smooth-transition">超级AI</a></li>
              <li><a href="#robotics" className="text-white hover:text-white/80 smooth-transition">机器人</a></li>
              <li><a href="#academy" className="text-white hover:text-white/80 smooth-transition">学院</a></li>
              <li><a href="#arvr" className="text-white hover:text-white/80 smooth-transition">AR/VR解决方案</a></li>
              <li><a href="#software" className="text-white hover:text-white/80 smooth-transition">软件解决方案</a></li>
              <li><a href="#tokenomics" className="text-white hover:text-white/80 smooth-transition">代币经济</a></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">联系方式</h4>
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
                <span>俄罗斯莫斯科萨哈罗夫大街9号</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部栏 */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white text-sm">
              © 2025 GoldBlocks.Pro 版权所有。
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white hover:text-white/80 smooth-transition">隐私政策</a>
              <a href="#" className="text-white hover:text-white/80 smooth-transition">服务条款</a>
              <a href="#" className="text-white hover:text-white/80 smooth-transition">Cookie政策</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CH_Footer;
