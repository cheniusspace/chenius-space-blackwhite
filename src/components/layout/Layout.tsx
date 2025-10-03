import { ReactNode } from "react";
import { Footer } from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
      <Header />
      
      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
