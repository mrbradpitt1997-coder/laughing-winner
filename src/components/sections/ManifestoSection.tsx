import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ManifestoSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `Across industries, tokenization is changing how value is created and exchanged. In simple terms, it means turning real-world assets, services, or even activities into digital tokens that can be tracked and traded on blockchain networks.\nThe challenge today is that many businesses don't know which token model fits their needs, and regulations can vary widely between countries.\nWhen done correctly, tokenization brings more transparency, faster transactions, and the ability to reach global markets.\nOur company's goal is to make this transition easier by offering flexible token models that meet legal requirements and work smoothly with existing business systems.`;
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
            Transforming Assets into Digital Tokens
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            The world is moving toward digital ownership, where almost anything assets, services, or actions can become tokens. Many businesses struggle with choosing the right token model and connecting it to their systems. Tokenization makes this easier, providing clear ownership, fast transactions, and new ways to create value. Our company helps businesses adopt tokenization in a simple, flexible way, turning everyday activities into digital tokens.
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
                {isExpanded ? "Show less" : "Read more"}
              </button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
