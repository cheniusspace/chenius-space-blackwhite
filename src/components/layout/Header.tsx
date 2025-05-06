import { Link } from "react-router-dom";
import { Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuClick = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
      setIsAnimating(false);
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10 bg-[#111111]/90">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center py-4 md:py-8">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <span className="text-white font-semibold">CHENIUS</span>
          <span className="text-white opacity-80 font-thin">SPACE</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-white/90 transition-colors"
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <div 
          className={`${isMenuOpen || isAnimating ? 'flex' : 'hidden'} ${isMenuOpen ? 'mobile-menu-enter' : isAnimating ? 'mobile-menu-exit' : ''} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 bg-[#111111]/95 md:bg-transparent p-4 md:p-0 gap-2 md:gap-4 z-50`}
        >
          <Link to="/creations" className="refined-nav-link text-white hover:text-white/90 text-sm" data-text="CREATIONS" onClick={handleMenuClick}>creations</Link>
          <Link to="/journals" className="refined-nav-link text-white hover:text-white/90 text-sm" data-text="JOURNALS" onClick={handleMenuClick}>journals</Link>
          <Link to="/favorites" className="refined-nav-link text-white hover:text-white/90 text-sm" data-text="FAVORITES" onClick={handleMenuClick}>favorites</Link>
          <button 
            onClick={handleContactClick}
            className="refined-nav-link text-white hover:text-white/90 text-sm flex items-center justify-center" 
            aria-label="Contact"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
