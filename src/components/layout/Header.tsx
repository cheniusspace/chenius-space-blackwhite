
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-chenius-gray-200">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="font-heading text-2xl font-bold tracking-wider">
            CHENIUS Space
          </Link>
          
          {isMobile ? (
            <>
              <button
                onClick={toggleMenu}
                className="flex items-center"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-24 left-0 w-full bg-background border-b border-chenius-gray-200 py-4 px-4 z-50">
                  <nav className="flex flex-col space-y-4">
                    <Link to="/creations" className="text-base font-body uppercase tracking-wide" onClick={closeMenu}>
                      Creations
                    </Link>
                    <Link to="/journals" className="text-base font-body uppercase tracking-wide" onClick={closeMenu}>
                      Journals
                    </Link>
                    <Link to="/favorites" className="text-base font-body uppercase tracking-wide" onClick={closeMenu}>
                      Favorites
                    </Link>
                    <Link to="/design-system" className="text-base font-body uppercase tracking-wide" onClick={closeMenu}>
                      Design System
                    </Link>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <nav className="flex items-center space-x-8">
              <Link to="/creations" className="text-sm font-body uppercase tracking-wide hover-underline">
                Creations
              </Link>
              <Link to="/journals" className="text-sm font-body uppercase tracking-wide hover-underline">
                Journals
              </Link>
              <Link to="/favorites" className="text-sm font-body uppercase tracking-wide hover-underline">
                Favorites
              </Link>
              <Link to="/design-system" className="text-sm font-body uppercase tracking-wide hover-underline">
                Design System
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
