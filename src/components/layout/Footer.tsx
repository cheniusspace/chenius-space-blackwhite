import { Link } from "react-router-dom";
import { Instagram, Dribbble, Share2, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-cs-dark-900 border-t border-cs-dark-700 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column - Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-cs-dark-100 font-semibold">CHENIUS</span>
              <span className="text-cs-dark-200 font-thin">SPACE</span>
            </Link>
            <p className="text-cs-dark-300 text-sm max-w-md">
              A digital space for creative exploration and artistic expression. 
              Discover unique creations, read insightful journals, and explore curated favorites.
            </p>
          </div>

          {/* Right Column - Links & Social */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-foreground font-medium text-sm">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard#creations" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Creations
                  </Link>
                </li>
                <li>
                  <Link to="/journals" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Journals
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h3 className="text-foreground font-medium text-sm">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-2">
                    <Instagram size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-2">
                    <Dribbble size={16} />
                    Dribbble
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@chenius.space" className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-2">
                    <Mail size={16} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Chenius Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
