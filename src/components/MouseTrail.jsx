import React, { useEffect, useRef } from 'react';
import './MouseTrail.css';

const MouseTrail = ({ particleColor = "rgba(0,0,0,0.6)", connectionColor = "rgba(0,0,0,0.6)" }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null, isMoving: false });
  const animationRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const particleCount = 150;

  class Particle {
    constructor(x, y, size, color, weight) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.weight = weight;
      this.life = 100; // Particle lifetime
    }

    update() {
      this.life--;
      this.size -= 0.05;
      this.y += this.weight;
      this.weight += 0.1;
      return this.life > 0 && this.size > 0;
    }
  }

  const initParticles = () => {
    particlesRef.current = [];
  };

  const createParticles = (x, y) => {
    const count = 3; // Particles per frame
    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length < particleCount) {
        particlesRef.current.push(
          new Particle(
            x + (Math.random() * 20 - 10),
            y + (Math.random() * 20 - 10),
            Math.random() * 5 + 2,
            particleColor,
            Math.random() * 2 - 1
          )
        );
      }
    }
  };

  const connectParticles = (ctx) => {
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = dx * dx + dy * dy;
        
        if (distance < 2500) { // Connection threshold
          const opacity = 1 - distance / 2500;
          ctx.strokeStyle = connectionColor.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Only create particles while mouse is moving
    if (mouseRef.current.isMoving && mouseRef.current.x && mouseRef.current.y) {
      createParticles(mouseRef.current.x, mouseRef.current.y);
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const isAlive = particle.update();
      if (isAlive) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }
      return isAlive;
    });

    connectParticles(ctx);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isMoving: true
      };
      lastMoveTimeRef.current = Date.now();
    };

    // Check if mouse stopped every 100ms
    const movementCheck = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 50) {
        mouseRef.current.isMoving = false;
      }
    }, 100);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    initParticles();
    animate();

    return () => {
      clearInterval(movementCheck);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-trail-canvas" />;
};

export default MouseTrail;