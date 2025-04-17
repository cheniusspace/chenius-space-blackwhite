import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-chenius-white border-b border-chenius-gray-200">
      <div className="w-full px-4 md:px-6">
        <div className="flex h-24 items-center">
          <Link to="/" className="flex items-center">
            <div className="w-16 h-16 border border-chenius-gray-200 flex items-center justify-center bg-chenius-white">
              <img 
                src="/logo.png" 
                alt="CHENIUS Space"
                className="w-12 h-12"
              />
            </div>
          </Link>
          
          {isMobile ? (
            <div className="flex-1 flex justify-end">
              <button
                onClick={toggleMenu}
                className="flex items-center"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-24 left-0 w-full bg-chenius-white border-b border-chenius-gray-200 py-4 px-4 z-50">
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
                    <Link to="/contact" className="text-base font-body uppercase tracking-wide" onClick={closeMenu}>
                      Contact
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <nav className="flex-1 flex items-center justify-center space-x-8">
              <Link
                to="/creations"
                className={`text-sm font-body uppercase tracking-wide transition-colors ${
                  isActive("/creations") ? "text-chenius-black" : "text-chenius-gray-500 hover:text-chenius-black"
                }`}
              >
                Creations
              </Link>
              <Link
                to="/journals"
                className={`text-sm font-body uppercase tracking-wide transition-colors ${
                  isActive("/journals") ? "text-chenius-black" : "text-chenius-gray-500 hover:text-chenius-black"
                }`}
              >
                Journals
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-body uppercase tracking-wide transition-colors ${
                  isActive("/favorites") ? "text-chenius-black" : "text-chenius-gray-500 hover:text-chenius-black"
                }`}
              >
                Favorites
              </Link>
            </nav>
          )}
          
          <Link 
            to="/contact" 
            className="w-16 h-16 border border-chenius-gray-200 flex items-center justify-center bg-chenius-white hover:bg-chenius-gray-100 transition-colors ml-4"
          >
            <MessageSquare className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
