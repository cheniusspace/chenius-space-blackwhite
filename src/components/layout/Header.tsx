import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const Header = () => {
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
    <nav className="refined-nav w-full border-b border-[#434D61]/20 bg-[#0C0A17]">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center py-4 md:py-8">
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
          className={`${isMenuOpen || isAnimating ? 'flex' : 'hidden'} ${isMenuOpen ? 'mobile-menu-enter' : isAnimating ? 'mobile-menu-exit' : ''} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:bg-transparent p-4 md:p-0 gap-2 md:gap-4 z-50`}
        >
          <Link to="/creations" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF] text-sm" data-text="CREATIONS" onClick={handleMenuClick}>creations</Link>
          <Link to="/journals" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF] text-sm" data-text="JOURNALS" onClick={handleMenuClick}>journals</Link>
          <Link to="/favorites" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF] text-sm" data-text="FAVORITES" onClick={handleMenuClick}>favorites</Link>
          <a href="mailto:your-email@example.com" className="refined-nav-link text-[#D5DBDF] hover:text-[#E9EDEF] text-sm flex items-center justify-center" aria-label="Contact">
            <MessageSquare size={16} />
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Header;
