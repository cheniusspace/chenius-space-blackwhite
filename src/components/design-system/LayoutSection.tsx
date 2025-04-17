
import React from "react";
import { LayoutGrid } from "lucide-react";

const LayoutSection = () => {
  return (
    <section id="layout">
      <h2 className="text-2xl font-heading font-bold mb-6 tracking-normal">Layout & Grid</h2>
      <div className="space-y-8">
        {/* Grid System */}
        <div id="grid-system" className="space-y-4">
          <h3 className="text-xl font-heading mb-2 tracking-normal">Grid System</h3>
          <div className="p-4 border rounded-md">
            <div className="grid grid-cols-12 gap-2 mb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-10 bg-chenius-gray-200 flex items-center justify-center text-xs">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 mr-2" /> 1/3
              </div>
              <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 mr-2" /> 2/3
              </div>
              <div className="h-20 bg-chenius-gray-200 flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 mr-2" /> 3/3
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-chenius-gray-600">
                Our grid system uses a 12-column layout with responsive breakpoints at 640px (sm), 
                768px (md), 1024px (lg), and 1280px (xl).
              </p>
            </div>
          </div>
        </div>
        
        {/* Containers */}
        <div id="containers" className="space-y-4">
          <h3 className="text-xl font-heading mb-2 tracking-normal">Containers</h3>
          <div className="p-4 border rounded-md">
            <div className="max-w-7xl mx-auto p-4 bg-chenius-gray-100 mb-4 rounded-md">
              <div className="text-center">max-w-7xl Container (1280px)</div>
            </div>
            <div className="max-w-5xl mx-auto p-4 bg-chenius-gray-100 mb-4 rounded-md">
              <div className="text-center">max-w-5xl Container (1024px)</div>
            </div>
            <div className="max-w-3xl mx-auto p-4 bg-chenius-gray-100 rounded-md">
              <div className="text-center">max-w-3xl Container (768px)</div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-chenius-gray-600">
                Containers help maintain consistent content width across the application.
                They automatically center content and apply appropriate padding at different screen sizes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Spacing */}
        <div id="spacing" className="space-y-4">
          <h3 className="text-xl font-heading mb-2 tracking-normal">Spacing</h3>
          <div className="p-4 border rounded-md">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-chenius-gray-200 mr-4"></div>
                <div>Spacing: 16px (1rem)</div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-chenius-gray-200 mr-8"></div>
                <div>Spacing: 32px (2rem)</div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-chenius-gray-200 mr-12"></div>
                <div>Spacing: 48px (3rem)</div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-chenius-gray-600">
                Our spacing system uses multiples of 4px (0.25rem) as the base unit.
                Common spacing values include 4px (0.25rem), 8px (0.5rem), 16px (1rem), 
                24px (1.5rem), 32px (2rem), and 48px (3rem).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutSection;
