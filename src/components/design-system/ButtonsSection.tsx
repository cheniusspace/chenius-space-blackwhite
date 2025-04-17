
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ButtonsSection = () => {
  return (
    <div id="buttons" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Buttons</h3>
      <div className="p-6 border rounded-md">
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button disabled>Disabled</Button>
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="lg">Large</Button>
          <Button variant="default">
            <Plus className="mr-2" />
            With Icon
          </Button>
        </div>
        <div className="mt-4">
          <h4 className="text-base font-heading mb-2">Usage Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use Default for primary actions</li>
            <li>Use Secondary for secondary actions that appear alongside a primary action</li>
            <li>Use Outline for less prominent actions</li>
            <li>Use Ghost for tertiary actions or in tight spaces</li>
            <li>Use Link for navigation actions that appear inline with text</li>
            <li>Use Destructive for actions that may result in data loss</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ButtonsSection;
