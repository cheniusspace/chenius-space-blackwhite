
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsSection = () => {
  return (
    <div id="tabs" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Tabs</h3>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="p-4 border mt-2">
          <p>This is the overview tab content. It provides a summary of information.</p>
        </TabsContent>
        <TabsContent value="details" className="p-4 border mt-2">
          <p>This is the details tab content. It provides more specific information.</p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border mt-2">
          <p>This is the settings tab content. It contains configurable options.</p>
        </TabsContent>
      </Tabs>
      <div className="mt-4 p-4 border rounded-md">
        <h4 className="text-base font-heading mb-2">Tab Guidelines</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Use tabs to organize content into logical sections</li>
          <li>Keep tab labels short and descriptive</li>
          <li>Ensure tab content is contextually related</li>
          <li>Limit the number of tabs to avoid overwhelming users</li>
        </ul>
      </div>
    </div>
  );
};

export default TabsSection;
