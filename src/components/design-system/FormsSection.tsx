
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormsSection = () => {
  return (
    <div id="forms" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Form Elements</h3>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 border p-6 rounded-md">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <Button className="w-full">Submit</Button>
        </div>
        <div className="space-y-4">
          <h4 className="text-base font-heading mb-2">Form Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Always use labels with form controls</li>
            <li>Provide clear, helpful placeholder text</li>
            <li>Group related form fields together</li>
            <li>Use appropriate input types (email, password, etc.)</li>
            <li>Provide clear error states and validation feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormsSection;
