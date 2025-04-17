import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <div className="fixed top-4 right-4 z-30">
        <ThemeToggle />
      </div>
    </div>
  );
}
