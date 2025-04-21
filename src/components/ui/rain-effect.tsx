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

    // Rain drop class
    class RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 15 + 10; // Smaller drops (10-25px)
        this.speed = Math.random() * 2 + 1; // Slower speed (1-3px/frame)
        this.opacity = Math.random() * 0.3 + 0.1; // More subtle opacity
        this.width = Math.random() * 0.8 + 0.3; // Thinner lines
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.length;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.stroke();

        // Add smaller splash effect at the bottom
        if (this.y + this.length > canvas.height - 10) {
          const splashSize = Math.random() * 2 + 1;
          ctx.beginPath();
          ctx.arc(this.x, canvas.height, splashSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
          ctx.fill();
        }
      }
    }

    // Create rain drops
    const drops: RainDrop[] = [];
    for (let i = 0; i < 150; i++) { // Fewer drops
      drops.push(new RainDrop());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
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
