import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ARVRSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `增强现实（AR）和虚拟现实（VR）正在通过游戏、培训、购物等方式开启体验数字世界的新途径。\n然而，如何让用户持续参与并奖励创作者仍然是一个挑战，因为大部分价值都掌握在平台所有者手中。\n代币化可以将虚拟世界中的资产、用户行为和创意内容转化为具有真实价值的代币。这将鼓励更深入的参与，并推动虚拟空间的长期发展。\n我们的目标是在AR/VR生态系统中实现参与和奖励的代币化，让用户和创作者都能分享他们所创造的价值。`;
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  // Typewriter effect for dynamic content
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
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <section ref={ref} id="arvr" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Text Content - Left Side */}
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              让数字体验变成价值
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              AR和VR为游戏、购物和培训创造了令人兴奋的体验，但如何奖励用户的参与却很棘手。代币化让参与和内容创作变成数字资产。我们专注于将AR/VR活动代币化，让用户在助力生态系统发展的同时获得价值。
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
              src="/ARVR.jpg" 
              alt="AR and VR digital experience illustration" 
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

export default ARVRSection;