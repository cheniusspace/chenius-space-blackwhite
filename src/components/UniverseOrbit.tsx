import React from 'react';

interface OrbitItem {
  title: string;
  angle: number;
  radius: number;
}

const UniverseOrbit: React.FC = () => {
  // Center content (Total Content)
  const centerContent = {
    title: 'TOTAL CONTENT',
    count: '5',
    subtitle: 'PIECES OF CONTENT TO EXPLORE'
  };

  // Second circle (3 items with numbers)
  const secondCircleItems = [
    { title: 'Creations', count: '3', angle: 0, radius: 250 },
    { title: 'Journals', count: '1', angle: 120, radius: 250 },
    { title: 'Favorites', count: '1', angle: 240, radius: 250 }
  ];

  // Outer circle (topics)
  const outerCircleItems = [
    { title: 'Technology', angle: 0, radius: 400 },
    { title: 'Design', angle: 45, radius: 400 },
    { title: 'Music', angle: 90, radius: 400 },
    { title: 'Architecture', angle: 135, radius: 400 },
    { title: 'Personal', angle: 180, radius: 400 },
    { title: 'Art', angle: 225, radius: 400 },
    { title: 'Science', angle: 270, radius: 400 },
    { title: 'Philosophy', angle: 315, radius: 400 }
  ];

  const calculatePosition = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    };
  };

  return (
    <div className="relative w-full h-[1000px] flex items-center justify-center">
      {/* Sun-like Center Circle */}
      <div className="absolute w-64 h-64 rounded-full flex items-center justify-center">
        {/* Sun glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-Pink-300/20 to-transparent rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-Pink-300/10 to-transparent rounded-full blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-Pink-300/5 to-transparent rounded-full blur-lg" />
        
        {/* Sun core */}
        <div className="absolute w-64 h-64 rounded-full border border-Pink-300/30 flex items-center justify-center bg-gradient-to-br from-Pink-300/10 to-transparent">
          <div className="text-center">
            <h3 className="text-Pink-300 text-sm font-light mb-2">{centerContent.title}</h3>
            <p className="text-4xl font-light text-Pink-300 mb-2">{centerContent.count}</p>
            <p className="text-Dark-100 text-xs opacity-70">{centerContent.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Planet-like Second Circle */}
      {secondCircleItems.map((item, index) => {
        const pos = calculatePosition(item.angle, item.radius);
        return (
          <div
            key={index}
            className="absolute w-32 h-32 rounded-full border border-Purple-300/20 flex items-center justify-center bg-gradient-to-br from-Purple-300/5 to-transparent"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
          >
            <div className="text-center">
              <p className="text-2xl font-light text-Purple-300 mb-1">{item.count}</p>
              <h3 className="text-Purple-300 text-sm font-light">{item.title}</h3>
            </div>
          </div>
        );
      })}

      {/* Planet-like Outer Circle */}
      {outerCircleItems.map((item, index) => {
        const pos = calculatePosition(item.angle, item.radius);
        return (
          <div
            key={index}
            className="absolute w-24 h-24 rounded-full border border-Pink-300/20 flex items-center justify-center bg-gradient-to-br from-Pink-300/5 to-transparent"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
          >
            <div className="text-center">
              <h3 className="text-Pink-300 text-xs font-light">{item.title}</h3>
            </div>
          </div>
        );
      })}

      {/* Orbital Lines */}
      <svg className="absolute w-full h-full" style={{ zIndex: -1 }}>
        {/* Second circle orbit */}
        <circle
          cx="0"
          cy="0"
          r="250"
          fill="none"
          stroke="rgba(246, 192, 198, 0.05)"
          strokeWidth="1"
        />
        {/* Outer circle orbit */}
        <circle
          cx="0"
          cy="0"
          r="400"
          fill="none"
          stroke="rgba(246, 192, 198, 0.05)"
          strokeWidth="1"
        />
        {/* Connecting Lines */}
        {secondCircleItems.map((item, index) => {
          const pos = calculatePosition(item.angle, item.radius);
          return (
            <line
              key={index}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(246, 192, 198, 0.1)"
              strokeWidth="1"
            />
          );
        })}
        {outerCircleItems.map((item, index) => {
          const pos = calculatePosition(item.angle, item.radius);
          return (
            <line
              key={index}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(246, 192, 198, 0.05)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default UniverseOrbit; 