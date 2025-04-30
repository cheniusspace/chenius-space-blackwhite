import { ReactNode, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuClick = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      // Wait for the exit animation to complete before hiding the menu
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
      setIsAnimating(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navigation */}
      <nav className="refined-nav w-full border-b border-[#434D61]/20 bg-red-500">
        <div className="container mx-auto flex justify-between items-center p-4 md:p-8">
          {/* Brand */}
          <Link to="/" className="nav-brand">
            <span className="text-[#E9EDEF] text-lg">CHENIUS</span>
            <span className="text-[#D5DBDF] text-lg">SPACE</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#D5DBDF] hover:text-[#E9EDEF] transition-colors"
            onClick={handleMenuClick}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <div 
            className={`${isMenuOpen || isAnimating ? 'flex' : 'hidden'} ${isMenuOpen ? 'mobile-menu-enter' : isAnimating ? 'mobile-menu-exit' : ''} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:bg-transparent p-4 md:p-0 gap-4 md:gap-8 z-50`}
          >
            <Link to="/creations" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF]" data-text="CREATIONS" onClick={handleMenuClick}>creations</Link>
            <Link to="/journals" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF]" data-text="JOURNALS" onClick={handleMenuClick}>journals</Link>
            <Link to="/favorites" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF]" data-text="FAVORITES" onClick={handleMenuClick}>favorites</Link>
          </div>
        </div>
      </nav>

      <main id="main-content" className="flex-grow pt-16 md:pt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
