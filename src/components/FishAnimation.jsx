import React, { useEffect, useRef } from 'react';

export default function LightWisps() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    let animationFrameId;
    let scrollY = window.scrollY;

    // Light wisp class
    class LightWisp {
      constructor() {
        this.reset();
        this.opacity = 0; // Start with 0 opacity
        this.targetOpacity = Math.random() * 0.3 + 0.1; // Target opacity for this wisp
        this.fadeInSpeed = Math.random() * 0.01 + 0.005; // Random fade-in speed
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseY = this.y;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.direction = Math.random() * Math.PI * 2;
        this.flickerSpeed = Math.random() * 0.02 + 0.01;
        this.flickerAmount = Math.random() * 0.1 + 0.05;
        this.time = Math.random() * 1000;
      }

      update() {
        // Fade in
        if (this.opacity < this.targetOpacity) {
          this.opacity += this.fadeInSpeed;
        }

        // Move wisp
        this.x += Math.cos(this.direction) * this.speed;
        this.y = this.baseY + Math.sin(this.direction) * this.speed;
        
        // Update flicker
        this.time += this.flickerSpeed;
        const flickerOpacity = Math.sin(this.time) * this.flickerAmount + 0.2;
        this.opacity = Math.min(this.targetOpacity, flickerOpacity);
        
        // Wrap around edges
        if (this.x < -this.size) {
          this.x = canvas.width + this.size;
        } else if (this.x > canvas.width + this.size) {
          this.x = -this.size;
        }
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.baseY = this.y;
        } else if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.baseY = this.y;
        }

        // Very gradual direction changes
        if (Math.random() < 0.005) {
          this.direction += (Math.random() - 0.5) * 0.2;
        }
      }

      draw() {
        // Check if wisp is behind content sections
        const systemsSection = document.getElementById('systems');
        const pricingSection = document.getElementById('pricing');
        
        if (systemsSection && pricingSection) {
          const systemsRect = systemsSection.getBoundingClientRect();
          const pricingRect = pricingSection.getBoundingClientRect();
          
          // Skip drawing if wisp is in content sections
          if (
            (this.y > systemsRect.top && this.y < systemsRect.bottom) ||
            (this.y > pricingRect.top && this.y < pricingRect.bottom)
          ) {
            return;
          }
        }

        ctx.save();
        
        // Create gradient for the wisp
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `rgba(236, 72, 153, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(236, 72, 153, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');

        // Draw the wisp
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Add a smaller, brighter center
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas resized:', canvas.width, canvas.height);
    };

    // Create wisps
    const wisps = Array.from({ length: 20 }, () => new LightWisp());
    console.log('Created wisps:', wisps.length);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      wisps.forEach(wisp => {
        wisp.update();
        wisp.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
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
        width: '100%', 
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: 'transparent'
      }}
    />
  );
} 