
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarSection = () => {
  return (
    <div id="avatar" className="mb-10">
      <h3 className="text-xl font-heading mb-4 tracking-normal">Avatars</h3>
      <div className="p-6 border rounded-md">
        <div className="flex items-center gap-4 mb-6">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-4">
          <h4 className="text-base font-heading mb-2">Avatar Guidelines</h4>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Use avatars to represent users or entities</li>
            <li>Provide meaningful fallback text (initials) when images are unavailable</li>
            <li>Maintain consistent sizes for avatars in similar contexts</li>
            <li>Consider using different sizes based on importance or prominence</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvatarSection;
