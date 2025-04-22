import { useEffect, useRef } from 'react';

export const MouseTrail = () => {
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
    window.addEventListener('resize', resizeCanvas);

    const trailLength = 20;
    const trailColor = "255,255,255"; // White color to match your theme
    const trail: { x: number; y: number }[] = [];

    function draw() {
      if (!ctx) return;
      
      // Clear the canvas instead of using a semi-transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trail.length; i++) {
        const alpha = 0.3 - (i / trailLength) * 0.3; // Reduced opacity
        ctx.save();
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${trailColor},${alpha})`;
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      window.requestAnimationFrame(draw);
    }

    function addTrailPoint(x: number, y: number) {
      trail.push({ x, y });
      if (trail.length > trailLength) {
        trail.shift();
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      addTrailPoint(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.requestAnimationFrame(draw);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}; 