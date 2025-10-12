import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "邮箱无效",
        description: "请输入有效的邮箱地址。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "订阅成功！",
        description: "您已成功订阅我们的新闻通讯。",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
  <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <div className={`text-center space-y-4 sm:space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              订阅 World 新闻通讯
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              第一时间了解更具人性化经济体系背后的思想、理念与技术
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Input
              type="email"
              placeholder="请输入您的邮箱地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-16 px-8 bg-white text-foreground rounded-full border-2 border-border focus:ring-2 focus:ring-primary text-lg"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-16 px-12 bg-foreground text-background hover:bg-foreground/90 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? "正在订阅..." : "订阅"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
