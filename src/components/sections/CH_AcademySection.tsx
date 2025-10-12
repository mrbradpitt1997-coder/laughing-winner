import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const AcademySection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `教育不再局限于教室——它正在通过网络、微型课程，甚至社区学习发生。挑战在于很难验证成就、公平奖励贡献，并长期激励学习者。通过代币化，完成课程或有价值的贡献可以成为数字凭证或奖励代币。这些可以安全存储、即时验证，甚至用于解锁新机会。我们公司计划将学术里程碑代币化，为学习者和教育者创建一个公平透明的奖励体系。`;
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
  <section ref={ref} id="academy" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Media Placeholder - Left Side (Reversed) */}
          <div className={`relative aspect-video bg-white rounded-lg flex items-center justify-center order-2 lg:order-1 w-full overflow-hidden transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}>
            <img 
              src="/ACA.png" 
              alt="Academy and education tokenization illustration" 
              className="object-contain max-h-full max-w-full rounded-lg transition-transform duration-500 hover:scale-105" 
              loading="lazy"
              draggable="false"
            />
          </div>
          
          {/* Text Content - Right Side (Reversed) */}
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              用代币奖励学习
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              随着在线课程和微型证书的发展，教育正在发生变化，但公平奖励学习者和教师仍然是一个挑战。代币化让参与者可以因成就获得价值。我们为学术里程碑创建代币，让学习和教学更容易获得奖励，同时鼓励参与教育生态系统。
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
                  {isExpanded ? "收起" : "阅读更多"}
                </button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademySection;