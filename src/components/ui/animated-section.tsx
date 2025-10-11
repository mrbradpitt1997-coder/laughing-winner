import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export const AnimatedSection = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const directionClasses = {
    up: "translate-y-12",
    left: "-translate-x-12",
    right: "translate-x-12",
  };

  const initialTransform = directionClasses[direction];

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${initialTransform}`
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </section>
  );
};
