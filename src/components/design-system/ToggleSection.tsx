
import React from "react";

const ToggleSection = () => {
  return (
    <div id="toggle" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Toggle</h3>
      <div className="p-6 border rounded-md">
        <div className="flex items-center space-x-2">
          <div className="bg-chenius-gray-200 h-6 w-12 rounded-full relative">
            <div className="absolute left-1 top-1 bg-white h-4 w-4 rounded-full"></div>
          </div>
          <span>Off</span>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <div className="bg-black h-6 w-12 rounded-full relative">
            <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
          </div>
          <span>On</span>
        </div>
        <div className="mt-4">
          <h4 className="text-base font-heading mb-2">Toggle Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use toggles for binary settings (on/off, yes/no)</li>
            <li>Provide clear labeling for what the toggle controls</li>
            <li>Consider using a label that indicates the current state</li>
            <li>Apply immediate changes when possible (avoid requiring a save action)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToggleSection;
