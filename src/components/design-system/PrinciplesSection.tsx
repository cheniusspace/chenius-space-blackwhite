
import React from "react";
import { HeartHandshake } from "lucide-react";

const PrinciplesSection = () => {
  return (
    <section id="principles">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Design Principles</h2>
      <div className="space-y-6">
        <div className="p-6 border rounded-md">
          <h3 className="text-xl font-heading mb-4 tracking-normal">Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-medium flex items-center">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Clarity
              </h4>
              <p>Eliminate ambiguity. Make interfaces clear and intuitive by using familiar patterns and consistent visual elements.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-medium flex items-center">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Efficiency
              </h4>
              <p>Design interfaces that help users accomplish their tasks with minimum effort and maximum efficiency.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-medium flex items-center">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Consistency
              </h4>
              <p>Maintain consistent patterns, behaviors, and visual elements throughout the interface to build user confidence.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-heading font-medium flex items-center">
                <HeartHandshake className="mr-2 h-5 w-5" />
                Accessibility
              </h4>
              <p>Design for all users, ensuring interfaces are usable by people with diverse abilities and in various contexts.</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border rounded-md">
          <h3 className="text-xl font-heading mb-4 tracking-normal">Application</h3>
          <p className="mb-4">These principles guide our design decisions across all aspects of the interface:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use consistent spacing and alignment to create visual order</li>
            <li>Apply color with purpose to guide attention and communicate meaning</li>
            <li>Design for flexibility across different screen sizes and devices</li>
            <li>Prioritize content hierarchy to help users find what they need</li>
            <li>Create feedback mechanisms that acknowledge user actions</li>
            <li>Reduce cognitive load by simplifying complex tasks and workflows</li>
            <li>Incorporate familiar patterns to leverage existing user knowledge</li>
            <li>Design with empathy to address real user needs and pain points</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
