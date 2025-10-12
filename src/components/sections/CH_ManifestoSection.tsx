import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ManifestoSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `在各行各业，代币化正在改变价值的创造和交换方式。简单来说，就是将现实世界的资产、服务甚至活动转化为可以在区块链网络上追踪和交易的数字代币。\n目前的挑战在于，许多企业不知道哪种代币模型适合自身需求，而且各国法规差异很大。\n如果正确实施，代币化可以带来更高的透明度、更快的交易速度，并能进入全球市场。\n我们的目标是通过提供灵活且合规的代币模型，帮助企业顺利完成转型，并与现有业务系统无缝衔接。`;
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
    <section ref={ref} id="manifesto" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 lg:space-y-10">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            将资产转化为数字代币
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            世界正在迈向数字所有权，几乎任何资产、服务或行为都可以变成代币。许多企业在选择合适的代币模型和系统对接方面面临困难。代币化让这一切变得更简单，带来清晰的所有权、快速的交易和全新的价值创造方式。我们帮助企业以简单灵活的方式采用代币化，将日常活动转化为数字代币。
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
      </div>
    </section>
  );
};

export default ManifestoSection;
