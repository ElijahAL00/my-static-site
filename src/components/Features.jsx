import React, { useEffect, useState, useRef } from 'react';

const features = [
  { title: 'Lead Generation', items: ['Personalized Cold Outreach', 'Unlimited Scalability', 'Campaign Management'] },
  { title: 'Project Management', items: ['Proposal Generator', 'AI Onboarding', 'Invoice Tracker'] },
  { title: 'Hiring Systems', items: ['Client Intake', 'AI Screening', 'Form Processing'] },
  { title: 'Sales Administration', items: ['Customized CRMs', 'AI Asset Generators', 'SEO Optimization'] },
];

export default function Features() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (hasAnimated) {
      // Ensure visible after animation
      if (titleRef.current) {
        titleRef.current.classList.remove('will-animate');
        titleRef.current.classList.add('opacity-100');
      }
      if (contentRef.current) {
        contentRef.current.classList.remove('will-animate');
        contentRef.current.classList.add('opacity-100');
      }
      return;
    }
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          entry.target.classList.add('animate-fade-in');
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (titleRef.current) observer.observe(titleRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, [hasAnimated]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="systems" className="w-full min-h-screen bg-black py-16 px-4 flex flex-col items-center justify-center">
      <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 will-animate">
        OUR SYSTEMS
      </h2>
      <div ref={contentRef} className="w-full max-w-6xl space-y-8 will-animate">
        {features.map((feature, i) => (
          <div 
            key={i}
            onClick={scrollToPricing}
            className="bg-pink-500/10 backdrop-blur-sm rounded-xl p-8 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-8
                      border border-pink-500/20 transition-all duration-300 hover:scale-105 
                      hover:bg-pink-500/20 hover:shadow-pink-500/20 group cursor-pointer"
          >
            <div className="font-semibold text-2xl text-white group-hover:text-pink-300 transition-colors">
              {feature.title}
            </div>
            {feature.items.map((item, k) => (
              <div key={k} className="flex items-center gap-2 text-white/80 group-hover:text-pink-200 transition-colors">
                <svg className="w-4 h-4 text-pink-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
} 