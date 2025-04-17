
import React from "react";
import { Badge } from "@/components/ui/badge";

const BadgesSection = () => {
  return (
    <div id="badges" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Badges</h3>
      <div className="border rounded-md">
        <div className="flex flex-wrap gap-2 p-6 border-b">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <div className="p-6">
          <h4 className="text-base font-heading mb-2">Badge Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use badges to highlight status, counts, or categories</li>
            <li>Keep badge text concise and clear</li>
            <li>Use appropriate badge variants based on context</li>
            <li>Ensure sufficient contrast between badge and background</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BadgesSection;
