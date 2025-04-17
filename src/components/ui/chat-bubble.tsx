import { useState } from "react";

interface ChatBubbleProps {
  message: string;
  time: string;
  children?: React.ReactNode;
  delay?: boolean;
}

export function ChatBubble({ message, time, children, delay }: ChatBubbleProps) {
  return (
    <div className="flex items-start gap-4">
      <img 
        className="w-16 h-16 rounded-full" 
        src="/images/logo.png" 
        alt="Chenius Space logo"
      />
      <div className={`flex flex-col w-full max-w-[600px] leading-1.5 p-6 bg-transparent bg-gradient-to-b from-white to-[#f8f9fa] shadow-[0_2px_8px_0_rgba(37,44,97,0.08),0_1px_2px_0_rgba(93,100,148,0.1)] rounded-e-xl rounded-es-xl speech-bubble ${delay ? 'delayed' : ''}`}>
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-semibold text-[#484c7a]">Chenius Space</span>
          <span className="text-xl font-normal text-[#484c7a]/70">{time}</span>
        </div>
        <p className="text-4xl font-normal py-4 text-[#484c7a]">{message}</p>
        {children && <div className="flex justify-end mt-2">{children}</div>}
      </div>
    </div>
  );
} 