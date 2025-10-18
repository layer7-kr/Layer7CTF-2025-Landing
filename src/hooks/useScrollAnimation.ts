import { useRef } from 'react';
import { useInView, useScroll, useTransform, Variants } from 'motion/react';

export interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    ease = 'easeOut'
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: triggerOnce 
  });

  return {
    ref,
    isInView,
    motionProps: {
      initial: { opacity: 0, y: 50 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: {
        duration,
        delay,
        ease: ease as any
      }
    }
  };
}

export function useStaggerAnimation(
  options: ScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    duration = 0.6,
    ease = 'easeOut'
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: triggerOnce 
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: ease as any
      }
    }
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants
  };
}

export function useParallaxAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: 0.1,
    once: false 
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return {
    ref,
    isInView,
    y,
    opacity,
    scale
  };
}
