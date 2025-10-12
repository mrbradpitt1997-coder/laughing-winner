import React, { useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const MintingTechSection = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const fullText = `Технология минтинга — основа для создания цифровых токенов, представляющих реальные активы, услуги или идеи на блокчейне.\nМногие компании сталкиваются с трудностями в понимании процесса минтинга, управлении выпуском токенов, обеспечении безопасности и реальной полезности.\nТокенизация через минтинг обеспечивает прозрачность, отслеживаемое право собственности и повышенную ликвидность, превращая активы в цифровые токены, которыми легко торговать и проверять.\nНаша компания стремится упростить этот процесс с помощью безопасных и удобных решений для минтинга, чтобы организации могли уверенно выводить свою ценность на блокчейн.`;
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
    <section ref={ref} id="minting" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Text Content - Left Side */}
          <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-12"
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Создание цифровой ценности через минтинг
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-foreground leading-relaxed">
              Минтинг — это процесс создания новых цифровых токенов на блокчейне, аналогично чеканке монет в реальном мире, но полностью в цифровом формате. Многие компании сталкиваются с трудностями в понимании минтинга, управлении выпуском и обеспечении безопасности и полезности токенов. Токенизация через минтинг — это прозрачный способ вывести активы на блокчейн, обеспечив отслеживаемое право собственности и реальную рыночную ценность. Наша компания разрабатывает простые решения для минтинга, чтобы организации могли превращать свои идеи, активы и услуги в безопасные, торгуемые цифровые токены всего за несколько шагов.
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
              src="/MiningCr.png" 
              alt="Mining crypto illustration" 
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

export default MintingTechSection;
