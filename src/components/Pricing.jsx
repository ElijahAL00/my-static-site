import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const toggleRef = useIntersectionObserver();
  const cardsRef = useIntersectionObserver();

  return (
    <section id="pricing" className="w-full min-h-screen bg-black py-16 px-4 flex flex-col items-center justify-center">
      <div 
        ref={toggleRef}
        className="mb-12 flex gap-2 will-animate justify-end w-full max-w-5xl"
      >
        <button
          className={`px-6 py-2 rounded font-medium transition-colors ${!annual ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-pink-500/10 text-white hover:bg-pink-500/20'}`}
          onClick={() => setAnnual(false)}
        >
          Monthly pricing
        </button>
        <button
          className={`px-6 py-2 rounded font-medium transition-colors ${annual ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-pink-500/10 text-white hover:bg-pink-500/20'}`}
          onClick={() => setAnnual(true)}
        >
          Annual pricing
        </button>
      </div>
      <div 
        ref={cardsRef}
        className="flex flex-col md:flex-row gap-8 w-full max-w-5xl will-animate"
      >
        {/* Automation Partner Card */}
        <div className="pricing-card flex-1 bg-pink-500/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-500/20 text-white flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:bg-pink-500/20 hover:shadow-pink-500/20">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Automation Partner</h2>
            <p className="mb-6 text-white/80">For B2B companies who want a senior automation partner.</p>
            <ul className="mb-8 space-y-2 text-base text-white/80">
              {[
                'Dual Package systems + Unlimited Maintance',
                'Monthly Analytics Overview + Strategy Meeting',
                'Private Slack channel with M-F availability',
                'Make.com & N8N',
                'No contracts, cancel anytime',
                '5x ROI Guarantee'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="relative h-8">
              <div className={`absolute transition-all duration-500 ${annual ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <span className="text-3xl font-bold">$6,760</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <div className={`absolute transition-all duration-500 ${annual ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <span className="text-3xl font-bold">$60,840</span>
                <span className="text-xl text-white/60">/year</span>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="https://cal.com/macaron/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-pink-500 text-white text-center py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300"
              >
                Book call
              </a>
            </div>
          </div>
        </div>
        {/* Fractional COO Card */}
        <div className="pricing-card flex-1 bg-pink-500/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-500/20 text-white flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:bg-pink-500/20 hover:shadow-pink-500/20">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Fractional COO</h2>
            <p className="mb-6 text-white/80">For high-growth B2B businesses who want COO-level expertise.</p>
            <ul className="mb-8 space-y-2 text-base text-white/80">
              {[
                'All Systems + Unlimited Maintenance & Enhancements',
                'Weekly Analytics Overview + Strategy Meeting',
                'Private Slack channel with M-F availability',
                'Make.com & N8N',
                'No contracts, cancel anytime',
                '10x ROI Guarantee'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="relative h-8">
              <div className={`absolute transition-all duration-500 ${annual ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <span className="text-3xl font-bold">$9,480</span>
                <span className="text-xl text-white/60">/month</span>
              </div>
              <div className={`absolute transition-all duration-500 ${annual ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <span className="text-3xl font-bold">$85,320</span>
                <span className="text-xl text-white/60">/year</span>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="https://cal.com/macaron/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-pink-500 text-white text-center py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300"
              >
                Book call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 