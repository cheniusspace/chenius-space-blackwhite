
import { ReactNode } from "react";
import { Footer } from "./Footer";
import Header from "./Header";
import { useTheme } from "@/providers/ThemeProvider";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-[#0C0A17] text-[#E9EDEF]" : "bg-white text-[#0C0A17]"}`}>
      <Header />
      
      <main id="main-content" className="flex-grow pt-16 md:pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
