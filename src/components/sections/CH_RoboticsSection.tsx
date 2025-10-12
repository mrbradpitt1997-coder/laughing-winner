import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const RoboticsSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `机器人与制造业正变得更加智能和自动化。机器如今以惊人的速度和精度生产产品。然而，制造商常常难以公平奖励质量、追踪复杂供应链中的绩效，并确保各方责任明确。代币化可以通过将质量检测和绩效结果转化为透明、可追溯的数字代币来解决这些问题。我们的目标是将关键质量和绩效指标代币化，让企业能够奖励卓越表现，打造更强大、更高效的生产网络。`;
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  useEffect(() => {
    if (isExpanded) {
      setDisplayedText("");
      setIsTyping(true);
      let i = 0;
      function typeChar() {
        setDisplayedText(fullText.slice(0, i));
        if (i < fullText.length) {
          typingTimeout.current = setTimeout(typeChar, 12 + Math.random() * 30);
          i++;
        } else {
          setIsTyping(false);
        }
      }
      typeChar();
    } else {
      setDisplayedText("");
      setIsTyping(false);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    }
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const handleExpand = (open: boolean) => {
    setIsExpanded(open);
  };
  return (
  <section ref={ref} id="robotics" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Text Content - Left Side */}
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              智能制造中的质量激励
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              机器人和现代工厂让生产更快更智能，但追踪质量和奖励员工却很有挑战。代币化通过将绩效和质量转化为数字奖励来解决这一问题。我们为制造业成就创建代币，帮助员工和企业受益于更高的生产力和更优质的产品。
            </p>
            
            <Collapsible open={isExpanded} onOpenChange={handleExpand}>
              <CollapsibleContent
                className="overflow-hidden transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                asChild
              >
                <div
                  className="transition-all duration-500 ease-in-out opacity-0 translate-y-4 data-[state=open]:opacity-100 data-[state=open]:translate-y-0"
                  data-state={isExpanded ? 'open' : 'closed'}
                >
                  <p className="text-base sm:text-lg text-foreground leading-relaxed pt-4 sm:pt-6 whitespace-pre-line">
                    {displayedText}
                    {isTyping && <span className="inline-block w-2 h-5 bg-foreground align-middle animate-pulse ml-1" />}
                  </p>
                </div>
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <button className="text-foreground underline hover:no-underline transition-all duration-200 mt-4 sm:mt-6 min-h-[44px] min-w-[44px]">
                  {isExpanded ? "收起" : "阅读全文"}
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          
          {/* Media Placeholder - Right Side */}
          <div className={`relative aspect-video bg-muted rounded-lg flex items-center justify-center w-full overflow-hidden transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <img 
              src="/oil-rig-2.png" 
              alt="Oil rig and robotics illustration" 
              className="object-cover w-full h-full rounded-lg transition-transform duration-500 hover:scale-105" 
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoboticsSection;