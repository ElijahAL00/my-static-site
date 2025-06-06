// LightWisp class must be outside the component for correct scoping
class LightWisp {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    this.opacity = 0;
    this.targetOpacity = Math.random() * 0.3 + 0.1;
    this.fadeInSpeed = Math.random() * 0.01 + 0.005;
  }
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.baseY = this.y;
    this.size = Math.random() * 15 + 5;
    this.speed = Math.random() * 0.5 + 0.2;
    this.direction = Math.random() * Math.PI * 2;
    this.flickerSpeed = Math.random() * 0.02 + 0.01;
    this.flickerAmount = Math.random() * 0.1 + 0.05;
    this.time = Math.random() * 1000;
  }
  update(isAnimatingRef) {
    if (!isAnimatingRef.current) return;
    if (this.opacity < this.targetOpacity) {
      this.opacity += this.fadeInSpeed;
    }
    this.x += Math.cos(this.direction) * this.speed;
    this.y = this.baseY + Math.sin(this.direction) * this.speed;
    this.time += this.flickerSpeed;
    const flickerOpacity = Math.sin(this.time) * this.flickerAmount + 0.2;
    this.opacity = Math.min(this.targetOpacity, flickerOpacity);
    if (this.x < -this.size) {
      this.x = this.canvas.width + this.size;
    } else if (this.x > this.canvas.width + this.size) {
      this.x = -this.size;
    }
    if (this.y < -this.size) {
      this.y = this.canvas.height + this.size;
      this.baseY = this.y;
    } else if (this.y > this.canvas.height + this.size) {
      this.y = -this.size;
      this.baseY = this.y;
    }
    if (Math.random() < 0.005) {
      this.direction += (Math.random() - 0.5) * 0.2;
    }
  }
  draw(ctx, isAnimatingRef) {
    if (!isAnimatingRef.current) return;
    // Prevent wisps from drawing in the systems and pricing sections
    const systemsSection = document.getElementById('systems');
    const pricingSection = document.getElementById('pricing');
    if (systemsSection && pricingSection) {
      const systemsRect = systemsSection.getBoundingClientRect();
      const pricingRect = pricingSection.getBoundingClientRect();
      // Convert canvas Y to viewport Y
      const yInViewport = this.y;
      if (
        (yInViewport > systemsRect.top && yInViewport < systemsRect.bottom) ||
        (yInViewport > pricingRect.top && yInViewport < pricingRect.bottom)
      ) {
        return;
      }
    }
    ctx.save();
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 2
    );
    gradient.addColorStop(0, `rgba(236, 72, 153, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(236, 72, 153, ${this.opacity * 0.5})`);
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fill();
    const centerGradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    centerGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
    centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.fillStyle = centerGradient;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

import React, { useEffect, useRef } from 'react';

export default function LightWisps() {
  const canvasRef = useRef(null);
  const wispsRef = useRef([]);
  const ctxRef = useRef(null);
  const animationFrameIdRef = useRef();
  const isAnimatingRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    function resizeCanvasAndWisps() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      wispsRef.current = Array.from({ length: 20 }, () => new LightWisp(canvas));
    }

    function animate() {
      if (!isAnimatingRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      wispsRef.current.forEach(wisp => {
        wisp.update(isAnimatingRef);
        wisp.draw(ctx, isAnimatingRef);
      });
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

    function handleVisibilityChange() {
      isAnimatingRef.current = !document.hidden;
      if (isAnimatingRef.current) animate();
    }

    window.addEventListener('resize', resizeCanvasAndWisps);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resizeCanvasAndWisps();
    animate();

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener('resize', resizeCanvasAndWisps);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: 'transparent',
      }}
    />
  );
} 