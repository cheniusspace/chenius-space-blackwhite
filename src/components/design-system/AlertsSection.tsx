
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle } from "lucide-react";

const AlertsSection = () => {
  return (
    <div id="alerts" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Alerts</h3>
      <div className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This is an informational alert with default styling.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>This is a destructive alert for error messages.</AlertDescription>
        </Alert>
        <div className="mt-4 p-4 border rounded-md">
          <h4 className="text-base font-heading mb-2">Alert Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use Info icon for informational alerts</li>
            <li>Use AlertCircle icon for error/destructive alerts</li>
            <li>Use AlertTriangle for warnings</li>
            <li>Use Check icon for success messages</li>
            <li>Keep alert messages clear and concise</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertsSection;
