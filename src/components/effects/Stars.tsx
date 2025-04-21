import React from 'react';

const Stars = () => {
  // Generate 200 stars with random positions and sizes
  const stars = Array.from({ length: 200 }).map((_, i) => {
    const size = Math.random() * 2 + 0.5; // Random size between 0.5 and 2.5
    const delay = Math.random() * 5; // Random animation delay
    const duration = 2 + Math.random() * 3; // Random animation duration between 2-5s
    
    return (
      <div
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
          opacity: Math.random() * 0.5 + 0.1, // Random opacity between 0.1 and 0.6
        }}
      />
    );
  });

  return (
    <div className="stars fixed inset-0 pointer-events-none">
      {stars}
    </div>
  );
};

export default Stars; 