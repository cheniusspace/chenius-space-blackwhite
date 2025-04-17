
import React from "react";

const ColorsSection = () => {
  return (
    <section id="colors">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Color Palette</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-black rounded-md"></div>
            <span className="mt-2 text-sm font-body">Black</span>
            <span className="text-xs text-chenius-gray-500">#000000</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-white border rounded-md"></div>
            <span className="mt-2 text-sm font-body">White</span>
            <span className="text-xs text-chenius-gray-500">#FFFFFF</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-100 rounded-md"></div>
            <span className="mt-2 text-sm font-body">Gray 100</span>
            <span className="text-xs text-chenius-gray-500">#F6F6F7</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-200 rounded-md"></div>
            <span className="mt-2 text-sm font-body">Gray 200</span>
            <span className="text-xs text-chenius-gray-500">#EBEBEC</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-300 rounded-md"></div>
            <span className="mt-2 text-sm font-body">Gray 300</span>
            <span className="text-xs text-chenius-gray-500">#DCDCDD</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-400 rounded-md"></div>
            <span className="mt-2 text-sm font-body text-white">Gray 400</span>
            <span className="text-xs text-white opacity-70">#BBBBBF</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-500 rounded-md"></div>
            <span className="mt-2 text-sm font-body text-white">Gray 500</span>
            <span className="text-xs text-white opacity-70">#8E9196</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-600 rounded-md"></div>
            <span className="mt-2 text-sm font-body text-white">Gray 600</span>
            <span className="text-xs text-white opacity-70">#6E7073</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-700 rounded-md"></div>
            <span className="mt-2 text-sm font-body text-white">Gray 700</span>
            <span className="text-xs text-white opacity-70">#52545A</span>
          </div>
          <div className="flex flex-col">
            <div className="h-20 bg-chenius-gray-800 rounded-md"></div>
            <span className="mt-2 text-sm font-body text-white">Gray 800</span>
            <span className="text-xs text-white opacity-70">#3A3B3F</span>
          </div>
        </div>
        
        <div className="p-6 border rounded-md">
          <h3 className="text-xl font-heading mb-4 tracking-normal">Color Usage Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use black for main headings and key UI elements</li>
            <li>Use gray tones for supporting text and secondary elements</li>
            <li>Maintain sufficient contrast ratios for accessibility (WCAG 2.1 AA standards)</li>
            <li>Be consistent with color application across similar elements</li>
            <li>Use lighter grays for backgrounds and darker grays for text</li>
            <li>Reserve high-contrast colors for important UI actions and notifications</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;
