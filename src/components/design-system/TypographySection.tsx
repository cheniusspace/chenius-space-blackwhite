
import React from "react";

const TypographySection = () => {
  return (
    <section id="typography">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Typography</h2>
      <div className="space-y-6">
        <div className="p-6 border rounded-md">
          <h1 className="text-4xl font-heading mb-4 tracking-tight">Heading 1 - Viga</h1>
          <h2 className="text-3xl font-heading mb-4 tracking-normal">Heading 2 - Viga</h2>
          <h3 className="text-2xl font-heading mb-3 tracking-normal">Heading 3 - Viga</h3>
          <h4 className="text-xl font-heading mb-3 tracking-normal">Heading 4 - Viga</h4>
          <h5 className="text-lg font-heading mb-2 tracking-normal">Heading 5 - Viga</h5>
          <h6 className="text-base font-heading mb-2 tracking-normal">Heading 6 - Viga</h6>
        </div>
        
        <div className="p-6 border rounded-md">
          <p className="font-body text-lg mb-4 tracking-wide leading-relaxed">
            Body Text (Large) - Saira Semi Condensed: This is an example of the primary body text used for paragraphs and general content. 
            The font is designed for readability while maintaining a modern, technical aesthetic.
          </p>
          <p className="font-body text-base mb-4 tracking-wide leading-relaxed">
            Body Text (Medium) - Saira Semi Condensed: Secondary body text used for additional information and extended reading content. 
            The line height and tracking are optimized for comfortable reading.
          </p>
          <p className="font-body text-sm tracking-wide leading-relaxed">
            Body Text (Small) - Saira Semi Condensed: Used for captions, footnotes, and smaller informational text throughout the interface.
          </p>
        </div>
        
        <div className="p-6 border rounded-md">
          <h3 className="text-xl font-heading mb-4 tracking-normal">Typography Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use Viga for headings to create visual hierarchy</li>
            <li>Use Saira Semi Condensed for body text to ensure readability</li>
            <li>Maintain consistent text sizing throughout the interface</li>
            <li>Use appropriate line heights for different text sizes</li>
            <li>Keep paragraph width under 70 characters for optimal readability</li>
            <li>Ensure sufficient contrast between text and background colors</li>
            <li>Use tracking-tight for large headings and tracking-normal for smaller text</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;
