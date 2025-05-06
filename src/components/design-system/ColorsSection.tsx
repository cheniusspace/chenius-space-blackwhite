
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";

const ColorsSection = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="colors">
      <h2 className="text-2xl font-bold mb-6 tracking-wider">Colors</h2>
      <div className="space-y-6">
        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Primary Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className={`h-24 ${isDark ? "bg-[#211F30]" : "bg-[#FFF2F5]"} rounded-lg border border-white/10`}></div>
              <div className="text-center">
                <p className="font-bold">{isDark ? "Dark Purple" : "Soft Pink"}</p>
                <p className="text-sm text-white/60">{isDark ? "#211F30" : "#FFF2F5"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`h-24 ${isDark ? "bg-[#C8B6FF]" : "bg-[#FFD6FF]"} rounded-lg border border-white/10`}></div>
              <div className="text-center">
                <p className="font-bold">{isDark ? "Pastel Purple" : "Pastel Pink"}</p>
                <p className="text-sm text-white/60">{isDark ? "#C8B6FF" : "#FFD6FF"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`h-24 ${isDark ? "bg-[#B8A5FF]" : "bg-[#FFB6C1]"} rounded-lg border border-white/10`}></div>
              <div className="text-center">
                <p className="font-bold">{isDark ? "Muted Purple" : "Muted Pink"}</p>
                <p className="text-sm text-white/60">{isDark ? "#B8A5FF" : "#FFB6C1"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Text Colors & Contrast</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold">Good Contrast Examples</h4>
              <div className="space-y-2">
                <div className={`p-4 ${isDark ? "bg-[#211F30]" : "bg-[#FFF2F5]"} rounded-lg`}>
                  <p className={`${isDark ? "text-[#E9EDEF]" : "text-[#5A5A7A]"}`}>Primary Text</p>
                  <p className={`${isDark ? "text-[#E9EDEF]/80" : "text-[#5A5A7A]/80"}`}>Secondary Text</p>
                  <p className={`${isDark ? "text-[#E9EDEF]/60" : "text-[#5A5A7A]/60"}`}>Tertiary Text</p>
                </div>
                <div className={`p-4 ${isDark ? "bg-[#C8B6FF]/10" : "bg-[#FFD6FF]/10"} rounded-lg`}>
                  <p className={`${isDark ? "text-[#E9EDEF]" : "text-[#5A5A7A]"}`}>Primary Text</p>
                  <p className={`${isDark ? "text-[#E9EDEF]/90" : "text-[#5A5A7A]/90"}`}>Secondary Text</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Accent Colors</h4>
              <div className="space-y-2">
                <div className={`p-4 ${isDark ? "bg-[#B8A5FF]" : "bg-[#FFA5B9]"} rounded-lg`}>
                  <p className="text-white">Accent Color Primary</p>
                </div>
                <div className={`p-4 ${isDark ? "bg-[#C8B6FF]" : "bg-[#FFB6C1]"} rounded-lg`}>
                  <p className="text-white">Accent Color Secondary</p>
                </div>
                <div className={`p-4 ${isDark ? "bg-[#D1BFFF]" : "bg-[#FFD6FF]"} rounded-lg`}>
                  <p className="text-white">Accent Color Tertiary</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h3 className="text-xl font-bold mb-4 tracking-tight">Color Usage Guidelines</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use {isDark ? "dark purple (#211F30)" : "soft pink (#FFF2F5)"} as the primary background color</li>
            <li>Use {isDark ? "light blue/white (#E9EDEF)" : "muted purple (#5A5A7A)"} for primary text</li>
            <li>Apply accent colors for highlighting and interactive elements</li>
            <li>Use {isDark ? "pastel purple (#C8B6FF)" : "pastel pink (#FFD6FF)"} for borders and decorative elements</li>
            <li>Use text with 80% opacity for secondary text</li>
            <li>Use text with 60% opacity for tertiary text and less important elements</li>
            <li>Maintain consistent border opacity (10%) for subtle separation</li>
            <li>Use hover states with increased opacity for interactive elements</li>
            <li>Ensure text contrast ratio meets WCAG AA standards (4.5:1) or AAA standards (7:1)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;
