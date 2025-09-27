import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/providers/ThemeProvider";

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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border bg-background/95">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/" className="nav-brand flex items-center no-underline">
              <span className="font-semibold text-xl md:text-2xl text-cs-slate-600 dark:text-cs-slate-400">
                CHENIUS
              </span>
              <span className="font-thin text-xl md:text-2xl text-cs-black-600 dark:text-cs-white-400 tracking-tight">
                SPACE
              </span>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard#creations"
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
              data-text="CREATIONS"
            >
              creations
            </Link>
            <Link
              to="/journals"
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-black-500 dark:hover:text-cs-white-400"
              data-text="JOURNALS"
            >
              journals
            </Link>
            <Link
              to="/favorites"
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
              data-text="FAVORITES"
            >
              favorites
            </Link>
            <button
              onClick={handleContactClick}
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-black-500 dark:hover:text-cs-white-400"
              aria-label="Poke me"
            >
              poke me
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              className="transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
              onClick={handleMenuClick}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${isMenuOpen || isAnimating ? 'flex' : 'hidden'} ${
            isMenuOpen ? 'mobile-menu-enter' : isAnimating ? 'mobile-menu-exit' : ''
          } md:hidden flex-col absolute top-16 left-0 right-0 p-4 gap-4 z-50 bg-background/95 border-t border-border`}
        >
          <Link
            to="/dashboard#creations"
            className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
            data-text="CREATIONS"
            onClick={handleMenuClick}
          >
            creations
          </Link>
          <Link
            to="/journals"
            className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-black-500 dark:hover:text-cs-white-400"
            data-text="JOURNALS"
            onClick={handleMenuClick}
          >
            journals
          </Link>
          <Link
            to="/favorites"
            className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
            data-text="FAVORITES"
            onClick={handleMenuClick}
          >
            favorites
          </Link>
          <button
            onClick={handleContactClick}
            className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-black-500 dark:hover:text-cs-white-400"
            aria-label="Poke me"
          >
            poke me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
