import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface ScrollCounterProps {
  value: string | number;
  duration?: number;
  suffix?: string;
}

export default function ScrollCounter({ value, duration = 1.5, suffix = "" }: ScrollCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Isolate number characters
    const strVal = String(value);
    const numericPart = strVal.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(numericPart);

    if (isNaN(parsed)) {
      setCount(0);
      return;
    }

    setHasAnimated(true);
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Ease out quad formula
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * parsed;
      
      if (strVal.includes(".")) {
        // Keep one decimal place
        setCount(Number(currentVal.toFixed(1)) as any);
      } else {
        setCount(Math.floor(currentVal));
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(parsed as any);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
