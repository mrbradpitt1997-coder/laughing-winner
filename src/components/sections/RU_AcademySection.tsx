import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const AcademySection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `Образование больше не ограничивается классами — оно происходит онлайн, через микро-курсы и даже обучение в сообществах. Проблема в том, что сложно проверять достижения, справедливо вознаграждать вклад и мотивировать учащихся со временем. С помощью токенизации достижения, такие как завершённые курсы или ценные вклады, могут стать цифровыми удостоверениями или токенами наград. Их можно безопасно хранить, мгновенно проверять и использовать для открытия новых возможностей. Наша компания планирует токенизировать академические достижения, создавая справедливую и прозрачную систему вознаграждений для учащихся и преподавателей.`;
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
              Вознаграждение обучения с помощью токенов
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              Образование меняется благодаря онлайн-курсам и микро-квалификациям, но справедливое вознаграждение учащихся и преподавателей остаётся сложной задачей. Токенизация позволяет участникам получать ценность за свои достижения. Мы создаём токены для академических этапов, облегчая вознаграждение за обучение и преподавание, а также стимулируя участие в образовательных экосистемах.
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
      </div>
    </section>
  );
};

export default AcademySection;