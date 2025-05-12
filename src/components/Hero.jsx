import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Hero() {
  const titleRef = useIntersectionObserver();
  const subtitleRef = useIntersectionObserver();

  return (
    <section id="hero" className="relative flex items-center justify-center px-8 min-h-screen bg-black">
      <div className="flex flex-col items-center text-center max-w-5xl -mt-32">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-[1.1] will-animate"
        >
          <span className="block">Growth systems</span>
          <span className="block mt-2">for B2B companies</span>
        </h1>
        <p 
          ref={subtitleRef}
          className="mt-8 text-lg md:text-xl text-white/60 font-light tracking-wide max-w-2xl will-animate italic"
        >
          We'd write an essay about how great we are but we don't sell copy, we sell Results
        </p>
      </div>
    </section>
  );
} 