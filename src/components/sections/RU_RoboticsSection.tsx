import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const RoboticsSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `Мир робототехники и производства становится умнее и более автоматизированным. Машины теперь производят товары с невероятной скоростью и точностью. Однако производителям часто сложно справедливо вознаграждать качество, отслеживать результаты по сложным цепочкам поставок и обеспечивать ответственность всех участников. Токенизация решает эти задачи, превращая проверки качества и результаты работы в цифровые токены, которые прозрачны и отслеживаемы. Мы стремимся токенизировать ключевые показатели качества и эффективности, чтобы компании могли вознаграждать за отличные результаты и строить более сильные, эффективные производственные сети.`;
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
              Вознаграждение качества в современном производстве
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              Роботы и современные фабрики делают производство быстрее и умнее, но отслеживать качество и вознаграждать сотрудников бывает сложно. Токенизация решает эту проблему, превращая показатели эффективности и качества в цифровые награды. Мы создаём токены за достижения в производстве, помогая сотрудникам и компаниям получать выгоду от высокой производительности и качества продукции.
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