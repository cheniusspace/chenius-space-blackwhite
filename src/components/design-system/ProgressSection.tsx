
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ProgressSection = () => {
  const [progressValue, setProgressValue] = useState(45);

  return (
    <div id="progress" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Progress</h3>
      <div className="space-y-4 p-6 border rounded-md">
        <Progress value={progressValue} className="w-full" />
        <div className="flex gap-2">
          <Button onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
            Decrease
          </Button>
          <Button onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
            Increase
          </Button>
        </div>
        <div className="text-sm font-body">Current progress: {progressValue}%</div>
        <div className="mt-4">
          <h4 className="text-base font-heading mb-2">Progress Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use progress indicators for operations that take time</li>
            <li>Show percentage completion when possible</li>
            <li>Consider using indeterminate progress indicators when completion time is unknown</li>
            <li>Provide context about what operation is in progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
