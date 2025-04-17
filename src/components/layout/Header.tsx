
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-white/90 backdrop-blur-sm border-b border-chenius-gray-200" : "py-6"
      }`}
    >
      <div className="container px-4 md:px-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-heading font-bold tracking-wider">
          CHENIUS Space
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/creations"
            className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
              isActive("/creations") ? "font-medium" : "font-light"
            }`}
          >
            Creations
          </Link>
          <Link
            to="/journals"
            className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
              isActive("/journals") ? "font-medium" : "font-light"
            }`}
          >
            Journals
          </Link>
          <Link
            to="/favorites"
            className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
              isActive("/favorites") ? "font-medium" : "font-light"
            }`}
          >
            Favorites
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6">
          <nav className="flex flex-col space-y-8 text-lg">
            <Link
              to="/"
              className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
                isActive("/") ? "font-medium" : "font-light"
              }`}
            >
              Home
            </Link>
            <Link
              to="/creations"
              className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
                isActive("/creations") ? "font-medium" : "font-light"
              }`}
            >
              Creations
            </Link>
            <Link
              to="/journals"
              className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
                isActive("/journals") ? "font-medium" : "font-light"
              }`}
            >
              Journals
            </Link>
            <Link
              to="/favorites"
              className={`hover-underline px-1 py-1 font-body uppercase tracking-wide ${
                isActive("/favorites") ? "font-medium" : "font-light"
              }`}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
