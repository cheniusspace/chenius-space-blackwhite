import React from 'react';

const GirlDrawing = () => {
  return (
    <div className="girl-drawing fixed inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Simple girl silhouette */}
        <div className="relative">
          {/* Head */}
          <div className="w-32 h-32 rounded-full border border-white/30" />
          
          {/* Body */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-16 h-24 border-l border-r border-white/30" />
          
          {/* Simple dress */}
          <div className="absolute top-[calc(100%+5rem)] left-1/2 -translate-x-1/2 w-24 h-16 border-t border-white/30 rounded-b-full" />
        </div>
      </div>
    </div>
  );
};

export default GirlDrawing; 