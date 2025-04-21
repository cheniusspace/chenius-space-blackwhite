import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      {/* Navigation */}
      <nav className="refined-nav w-full">
        <div className="container mx-auto flex justify-between items-center p-8">
          {/* Brand */}
          <Link to="/" className="nav-brand">
            <span className="text-white/90 text-2xl">CHENIUS</span>
            <span className="text-white/40 text-2xl">SPACE</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-16">
            <Link to="/creations" className="refined-nav-link" data-text="CREATIONS">creations</Link>
            <Link to="/journals" className="refined-nav-link" data-text="JOURNALS">journals</Link>
            <Link to="/favorites" className="refined-nav-link" data-text="FAVORITES">favorites</Link>
          </div>
        </div>
      </nav>

      <main id="main-content" className="pt-24">
        {children}
      </main>
    </div>
  );
}
