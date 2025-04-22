import React from "react";

const TypographySection = () => {
  return (
    <section id="typography">
      <h2 className="text-2xl font-bold mb-6 tracking-wider">Typography</h2>
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-lg">
          <h1 className="text-7xl font-bold mb-4 tracking-tight">
            <span className="brand-text-bold">CHENIUS</span>
            <span className="brand-text-thin">SPACE</span>
          </h1>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Heading 2 - Jost</h2>
            <h3 className="text-3xl font-bold tracking-tight">Heading 3 - Jost</h3>
            <h4 className="text-2xl font-bold tracking-tight">Heading 4 - Jost</h4>
            <h5 className="text-xl font-bold tracking-tight">Heading 5 - Jost</h5>
            <h6 className="text-lg font-bold tracking-tight">Heading 6 - Jost</h6>
          </div>
        </div>
        
        <div className="p-6 bg-white/5 rounded-lg">
          <p className="text-lg mb-4 tracking-wide leading-relaxed">
            Body Text (Large) - Jost: This is an example of the primary body text used for paragraphs and general content. 
            The font is designed for readability while maintaining a modern, minimalist aesthetic.
          </p>
          <p className="text-base mb-4 tracking-wide leading-relaxed">
            Body Text (Medium) - Jost: Secondary body text used for additional information and extended reading content. 
            The line height and tracking are optimized for comfortable reading.
          </p>
          <p className="text-sm tracking-wide leading-relaxed">
            Body Text (Small) - Jost: Used for captions, footnotes, and smaller informational text throughout the interface.
          </p>
        </div>
        
        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Typography Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use Jost for all text elements to maintain consistency</li>
            <li>Apply bold weight for headings and regular weight for body text</li>
            <li>Maintain consistent text sizing throughout the interface</li>
            <li>Use appropriate line heights for different text sizes</li>
            <li>Keep paragraph width under 70 characters for optimal readability</li>
            <li>Ensure sufficient contrast between text and background colors</li>
            <li>Use tracking-tight for headings and tracking-wide for body text</li>
            <li>Apply uppercase transformation for navigation and buttons</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;
