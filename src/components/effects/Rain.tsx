
import React from 'react';
import { useTheme } from "@/providers/ThemeProvider";

const Rain = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="rain-container fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className={`rain-drop absolute w-[1px] ${isDark ? 'bg-[#C8B6FF]/30' : 'bg-[#FFB6C1]/30'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            height: `${Math.random() * 20 + 10}px`,
            animation: `rain ${Math.random() * 12 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Rain;
