
import React from "react";

const PatternsSection = () => {
  return (
    <section id="patterns">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Patterns & Utilities</h2>
      
      {/* Layout Pattern */}
      <div id="layout-pattern" className="mb-10">
        <h3 className="text-xl font-heading mb-4 tracking-normal">Layout Patterns</h3>
        <div className="border p-4 mb-4 rounded-md">
          <div className="border-b pb-4 mb-4 border-chenius-gray-200">Header</div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 border p-4">Sidebar</div>
            <div className="md:w-3/4 border p-4 min-h-[200px]">Main Content Area</div>
          </div>
          <div className="border-t pt-4 mt-4 border-chenius-gray-200">Footer</div>
        </div>
        <div className="p-4 border rounded-md">
          <h4 className="text-base font-heading mb-2">Common Layouts</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Single Column:</strong> Ideal for focused content like articles or forms</li>
            <li><strong>Two Columns:</strong> Good for dashboards with sidebar navigation</li>
            <li><strong>Three Columns:</strong> Useful for complex applications with multiple navigation levels</li>
            <li><strong>Card Grid:</strong> Excellent for displaying collections of similar items</li>
          </ul>
        </div>
      </div>
      
      {/* Hover Effects */}
      <div id="hover-effects" className="mb-10">
        <h3 className="text-xl font-heading mb-4 tracking-normal">Hover Effects</h3>
        <div className="flex flex-wrap gap-4 p-6 border rounded-md">
          <a href="#" className="text-lg font-body border-b border-transparent hover:border-current transition-all duration-200">Underline Hover Effect</a>
          <button className="border-2 border-black px-4 py-2 relative overflow-hidden group">
            <span className="relative z-10">Fill Hover Effect</span>
            <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>
        </div>
        <div className="mt-4 p-4 border rounded-md">
          <h4 className="text-base font-heading mb-2">Hover Effect Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use subtle hover effects to indicate interactivity</li>
            <li>Ensure hover effects are consistent across similar elements</li>
            <li>Consider adding transitions for smoother effects</li>
            <li>Remember that hover effects don't work on touch devices</li>
          </ul>
        </div>
      </div>
      
      {/* List Patterns */}
      <div id="list-patterns" className="mb-10">
        <h3 className="text-xl font-heading mb-4 tracking-normal">List Patterns</h3>
        <div className="space-y-6 p-6 border rounded-md">
          <div>
            <h4 className="text-base font-heading mb-2">Bulleted List</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>First item in bulleted list</li>
              <li>Second item in bulleted list</li>
              <li>Third item with sub-items:
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Sub-item one</li>
                  <li>Sub-item two</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-heading mb-2">Numbered List</h4>
            <ol className="list-decimal pl-6 space-y-1">
              <li>First step in the process</li>
              <li>Second step in the process</li>
              <li>Third step with sub-steps:
                <ol className="list-alpha pl-6 mt-1 space-y-1">
                  <li>Sub-step one</li>
                  <li>Sub-step two</li>
                </ol>
              </li>
            </ol>
          </div>
          
          <div className="mt-4">
            <h4 className="text-base font-heading mb-2">List Pattern Guidelines</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Use bulleted lists for unordered collections of items</li>
              <li>Use numbered lists for sequential steps or ranked items</li>
              <li>Maintain consistent formatting within lists</li>
              <li>Consider using nested lists for hierarchical information</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatternsSection;
