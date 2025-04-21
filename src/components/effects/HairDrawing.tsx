import React from 'react';

const HairDrawing = () => {
  return (
    <div className="hair-drawing fixed inset-0 pointer-events-none">
      {/* Hair strands */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="hair-strand absolute w-[2px] bg-white/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            height: `${Math.random() * 50 + 20}px`,
            transform: `rotate(${Math.random() * 60 - 30}deg)`,
            animation: `hair-draw ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default HairDrawing; 