import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RainSound } from "../ui/rain-sound";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-bold tracking-tight">
            CHENIUS
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium" aria-label="Main navigation">
            <Link to="/creations" className="text-foreground hover-underline focus-visible-ring rounded-sm">Creations</Link>
            <Link to="/journals" className="text-foreground hover-underline focus-visible-ring rounded-sm">Journals</Link>
            <Link to="/favorites" className="text-foreground hover-underline focus-visible-ring rounded-sm">Favorites</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <RainSound />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
