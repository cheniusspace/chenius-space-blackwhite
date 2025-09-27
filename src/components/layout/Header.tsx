import { Link } from "react-router-dom";
import { Menu, X, Search, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/providers/ThemeProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Scroll spy effect to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'creations', 'journals', 'favorites'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border bg-background/95">
      <div className="container mx-auto max-w-screen-xl px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Logo */}
          <div className="flex items-center">
            <Link to="/" className="nav-brand flex items-center no-underline">
              <span className="font-semibold text-xl md:text-2xl text-foreground">
                CHENIUS
              </span>
              <span className="font-thin text-xl md:text-2xl text-cs-slate-600 dark:text-cs-white-400 tracking-widest">
                SPACE
              </span>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard#creations"
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-slate-400"
              data-text="PROJECTS"
            >
              projects
            </Link>
            <Link
              to="/journals"
              className="refined-nav-link text-sm font-medium transition-colors text-foreground hover:text-cs-slate-500 dark:hover:text-cs-white-400"
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
            {/* Search button hidden for now */}
            {/* <button
              className="relative h-8 w-8 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-500 ease-in-out transform-gpu hover:bg-foreground/15 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 active:scale-95 active:transition-none focus:outline-none flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              aria-label="Search"
            >
              <div className="relative z-10 flex items-center justify-center">
                <Search className="h-4 w-4 text-foreground/60 drop-shadow-sm" />
              </div>
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-slate-200/10 to-cs-slate-300/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-black-200/10 to-cs-slate-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
            </button> */}
            <button
              className="relative h-8 w-8 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-500 ease-in-out transform-gpu hover:bg-foreground/15 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 active:scale-95 active:transition-none focus:outline-none flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              aria-label="Contact"
              onClick={handleContactClick}
            >
              <div className="relative z-10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-foreground/60 drop-shadow-sm" />
              </div>
              
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-slate-200/10 to-cs-slate-300/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-black-200/10 to-cs-slate-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
              
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
            </button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Search button hidden for now */}
            {/* <button
              className="relative h-8 w-8 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-500 ease-in-out transform-gpu hover:bg-foreground/15 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 active:scale-95 active:transition-none focus:outline-none flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              aria-label="Search"
            >
              <div className="relative z-10 flex items-center justify-center">
                <Search className="h-4 w-4 text-foreground/60 drop-shadow-sm" />
              </div>
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-slate-200/10 to-cs-slate-300/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-black-200/10 to-cs-slate-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
            </button> */}
            <button
              className="relative h-8 w-8 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-500 ease-in-out transform-gpu hover:bg-foreground/15 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 active:scale-95 active:transition-none focus:outline-none flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              aria-label="Contact"
              onClick={handleContactClick}
            >
              <div className="relative z-10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-foreground/60 drop-shadow-sm" />
              </div>
              
              {/* Animated background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-slate-200/10 to-cs-slate-300/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-black-200/10 to-cs-slate-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
              
              {/* Pulse effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
            </button>
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
            data-text="PROJECTS"
            onClick={handleMenuClick}
          >
            projects
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
        </div>
      </div>
    </nav>
  );
};

export default Header;
