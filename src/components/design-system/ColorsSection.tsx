import React from "react";

const ColorsSection = () => {
  return (
    <section id="colors">
      <h2 className="text-2xl font-bold mb-6 tracking-wider">Colors</h2>
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Primary Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-black rounded-lg border border-white/10"></div>
              <div className="text-center">
                <p className="font-bold">Black</p>
                <p className="text-sm text-white/60">#000000</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-white rounded-lg border border-white/10"></div>
              <div className="text-center">
                <p className="font-bold">White</p>
                <p className="text-sm text-white/60">#FFFFFF</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-white/10 rounded-lg border border-white/10"></div>
              <div className="text-center">
                <p className="font-bold">Subtle White</p>
                <p className="text-sm text-white/60">rgba(255,255,255,0.1)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Text Colors & Contrast</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold">Good Contrast Examples</h4>
              <div className="space-y-2">
                <div className="p-4 bg-black rounded-lg">
                  <p className="text-white">Primary Text (21:1)</p>
                  <p className="text-white/80">Secondary Text (16.8:1)</p>
                  <p className="text-white/60">Tertiary Text (12.6:1)</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-white">Primary Text (12.6:1)</p>
                  <p className="text-white/90">Secondary Text (11.3:1)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Poor Contrast Examples</h4>
              <div className="space-y-2">
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-white/40">Text Too Light (4.2:1)</p>
                  <p className="text-white/30">Text Too Light (3.1:1)</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <p className="text-white/50">Text Too Light (5.6:1)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Color Usage Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use black as the primary background color</li>
            <li>Use white for primary text and important elements</li>
            <li>Apply subtle white backgrounds (10% opacity) for cards and sections</li>
            <li>Use white with 80% opacity for secondary text</li>
            <li>Use white with 60% opacity for tertiary text and less important elements</li>
            <li>Maintain consistent border opacity (10%) for subtle separation</li>
            <li>Use hover states with increased opacity for interactive elements</li>
            <li>Ensure text contrast ratio meets WCAG AA standards (4.5:1) or AAA standards (7:1)</li>
            <li>Avoid using text with opacity less than 60% on black backgrounds</li>
            <li>Avoid using text with opacity less than 90% on subtle white backgrounds</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;
