import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RainEffectProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export const RainEffect = ({ className, ...props }: RainEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    // Rain drop class
    class RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;

      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 15 + 10;
        this.speed = Math.random() * 1 + 0.5;
        // Mobile: much lighter opacity (0.05-0.15), Desktop: original (0.1-0.4)
        this.opacity = isMobile 
          ? Math.random() * 0.1 + 0.05
          : Math.random() * 0.3 + 0.1;
        // Mobile: thinner drops (0.2-0.4), Desktop: original (0.3-1.1)
        this.width = isMobile
          ? Math.random() * 0.2 + 0.2
          : Math.random() * 0.8 + 0.3;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.length;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        
        // Theme-aware rain color
        const isDarkMode = document.documentElement.classList.contains('dark');
        if (isDarkMode) {
          ctx.strokeStyle = `rgba(233, 233, 233, ${this.opacity})`; // Light gray for dark mode
        } else {
          ctx.strokeStyle = `rgba(75, 85, 99, ${this.opacity})`; // Dark gray for light mode
        }
        
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Create rain drops
    const drops: RainDrop[] = [];
    // Mobile: fewer drops (50), Desktop: original (100)
    const dropCount = isMobile ? 50 : 100;
    const columnCount = 20; // Number of vertical columns for rain
    const columnWidth = canvas.width / columnCount;
    
    for (let i = 0; i < dropCount; i++) {
      // Distribute drops evenly across columns
      const column = i % columnCount;
      const x = column * columnWidth + Math.random() * columnWidth;
      drops.push(new RainDrop(x));
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 -z-10 pointer-events-none",
        className
      )}
      {...props}
    />
  );
}; 
