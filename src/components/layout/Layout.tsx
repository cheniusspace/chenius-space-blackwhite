import { ReactNode } from "react";
import { Footer } from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-cs-dark-900 text-cs-dark-100">
      <Header />
      
      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
