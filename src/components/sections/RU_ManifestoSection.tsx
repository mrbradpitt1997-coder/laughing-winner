import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ManifestoSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `Во всех отраслях токенизация меняет способы создания и обмена ценностью. Проще говоря, это превращение реальных активов, услуг или даже действий в цифровые токены, которые можно отслеживать и обменивать на блокчейне.\nПроблема в том, что многие компании не знают, какая модель токенов им подходит, а законы сильно различаются в разных странах.\nПри правильном подходе токенизация даёт больше прозрачности, быстрые транзакции и выход на глобальные рынки.\nНаша цель — упростить этот переход, предлагая гибкие модели токенов, соответствующие требованиям законодательства и легко интегрируемые с бизнес-системами.`;
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
            Преобразуем активы в цифровые токены
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Мир движется к цифровому владению, где практически всё — активы, услуги или действия — может стать токеном. Многие компании сталкиваются с выбором подходящей модели токенов и интеграцией с их системами. Токенизация упрощает этот процесс, обеспечивая прозрачное владение, быстрые транзакции и новые способы создания ценности. Наша компания помогает бизнесу внедрять токенизацию просто и гибко, превращая повседневные действия в цифровые токены.
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
                  {isExpanded ? "Показать меньше" : "Читать далее"}
                </button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
