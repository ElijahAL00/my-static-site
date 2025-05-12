import React, { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const canvasRef = useRef(null);
  const rippleRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRipple = (x, y) => ({
      x,
      y,
      radius: 0,
      speed: 15,
      opacity: 0.3
    });

    const drawRipple = () => {
      const gradient = ctx.createRadialGradient(
        rippleRef.current.x, rippleRef.current.y, 0,
        rippleRef.current.x, rippleRef.current.y, rippleRef.current.radius
      );
      gradient.addColorStop(0, `rgba(236, 72, 153, ${rippleRef.current.opacity})`);
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(rippleRef.current.x, rippleRef.current.y, rippleRef.current.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animateElements = () => {
      elementsRef.current.forEach(element => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const elementCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const distance = Math.sqrt(
          Math.pow(elementCenter.x - rippleRef.current.x, 2) +
          Math.pow(elementCenter.y - rippleRef.current.y, 2)
        );

        element.style.transform = Math.abs(distance - rippleRef.current.radius) < 50
          ? 'scale(1.05) translateY(-5px)'
          : 'scale(1) translateY(0)';
        element.style.transition = 'transform 0.3s ease-out';
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rippleRef.current) {
        rippleRef.current.radius += rippleRef.current.speed;
        rippleRef.current.opacity -= 0.001;

        drawRipple();
        animateElements();

        if (rippleRef.current.opacity <= 0) {
          rippleRef.current = null;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleClick = (e) => {
      const pricingCard = e.target.closest('.pricing-card');
      const isBookCallButton = e.target.closest('button')?.textContent.trim() === 'Book call';
      const isPricingSection = e.target.closest('#pricing');
      
      if (!pricingCard || isBookCallButton || isPricingSection) return;

      rippleRef.current = createRipple(e.clientX, e.clientY);
      elementsRef.current = document.querySelectorAll('.pricing-card');
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('click', handleClick);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[2]"
    />
  );
} 