
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

interface RainEffectProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export const RainEffect = ({ className, ...props }: RainEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

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

      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 15 + 10;
        this.speed = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.width = Math.random() * 0.8 + 0.3;
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
        // Use pastel colors based on theme
        const colorLight = 'rgba(255, 182, 193, '; // Pastel Pink
        const colorDark = 'rgba(200, 182, 255, '; // Pastel Purple
        ctx.strokeStyle = `${isDark ? colorDark : colorLight}${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Create rain drops
    const drops: RainDrop[] = [];
    const dropCount = 100;
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
  }, [isDark]);

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
