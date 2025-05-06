
import { ReactNode } from "react";
import { Footer } from "./Footer";
import Header from "./Header";
import { useTheme } from "@/providers/ThemeProvider";
import Rain from "../effects/Rain";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
      isDark 
        ? "bg-[var(--color-Dark-600)] text-[var(--color-Dark-50)]" 
        : "bg-[var(--color-Dark-600)] text-[var(--color-Dark-50)]"
    }`}>
      <Rain />
      <Header />
      
      <main id="main-content" className="flex-grow pt-16 md:pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
