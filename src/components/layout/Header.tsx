
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-bold tracking-tight">
            CHENIUS
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/creations" className="text-foreground hover-underline">Creations</Link>
            <Link to="/journals" className="text-foreground hover-underline">Journals</Link>
            <Link to="/favorites" className="text-foreground hover-underline">Favorites</Link>
            <Link to="/design-system" className="text-foreground hover-underline">Design</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              to="/add-content" 
              className="rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Add Content
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
