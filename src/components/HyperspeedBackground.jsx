import React, { useEffect, useRef } from 'react';

const HyperspeedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Square class for the background pattern
    class Square {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10; // Square size between 10-30px
        this.speed = Math.random() * 2 + 0.5; // Movement speed
        this.opacity = Math.random() * 0.3 + 0.1; // Opacity between 0.1-0.4
        this.color = this.getRandomColor();
        this.rotation = Math.random() * Math.PI * 2; // Random rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.02; // Rotation speed
        this.direction = Math.random() * Math.PI * 2; // Random direction
      }

      getRandomColor() {
        const colors = [
          'rgba(59, 130, 246, ', // Blue
          'rgba(37, 99, 235, ', // Indigo
          'rgba(29, 78, 216, ', // Dark blue
          'rgba(147, 197, 253, ', // Light blue
          'rgba(219, 234, 254, ', // Very light blue
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move square in its direction
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
        
        // Rotate the square
        this.rotation += this.rotationSpeed;
        
        // Reset if square goes off screen
        if (this.x < -this.size || this.x > canvas.width + this.size || 
            this.y < -this.size || this.y > canvas.height + this.size) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.strokeStyle = this.color + (this.opacity + 0.1) + ')';
        ctx.lineWidth = 1;
        
        // Move to square center and rotate
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw square
        const halfSize = this.size / 2;
        ctx.fillRect(-halfSize, -halfSize, this.size, this.size);
        ctx.strokeRect(-halfSize, -halfSize, this.size, this.size);
        
        ctx.restore();
      }
    }

    // Create squares
    const squares = [];
    const numSquares = 80; // Number of squares

    for (let i = 0; i < numSquares; i++) {
      squares.push(new Square());
    }

    // Animation loop
    let animationId;
    const animate = () => {
      // Clear canvas with white background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // White with transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw squares
      squares.forEach(square => {
        square.update();
        square.draw();
      });

      // Add subtle grid pattern overlay
      ctx.save();
      ctx.globalAlpha = 0.02;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'; // Subtle blue grid
      ctx.lineWidth = 1;
      
      // Draw grid lines
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'white', // White background
        zIndex: 0
      }}
    />
  );
};

export default HyperspeedBackground; 