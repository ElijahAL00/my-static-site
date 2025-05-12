import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Features from './components/Features';
import CursorEffect from './components/CursorEffect';
import LightWisps from './components/FishAnimation';
import ErrorBoundary from './components/ErrorBoundary';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-light">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white">
        <CursorEffect />
        <LightWisps />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <main>
            <Hero />
            <Features />
            <Pricing />
          </main>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
} 