import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 left-1/4 w-32 h-32 border border-white/5 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 right-1/4 w-24 h-24 border border-white/5 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/5 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Brand and Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight">
                <span className="brand-text-bold">CHENIUS</span>
                <span className="brand-text-thin">SPACE</span>
              </h3>
              <p className="text-white/40 text-xs mt-1">Web Design | Architecture | Music | Digital Art</p>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              Exploring the intersection of art, design, and technology through creative expression and innovative solutions.
            </p>
          </div>

          {/* Right Column - Links and Social */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-white/80 text-sm font-medium">Navigation</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </Link>
                <Link to="/creations" className="block text-white/60 hover:text-white transition-colors text-sm">
                  Creations
                </Link>
                <Link to="/journals" className="block text-white/60 hover:text-white transition-colors text-sm">
                  Journals
                </Link>
                <Link to="/favorites" className="block text-white/60 hover:text-white transition-colors text-sm">
                  Favorites
                </Link>
                <Link to="/design-system" className="block text-white/60 hover:text-white transition-colors text-sm">
                  Design System
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-white/80 text-sm font-medium">Connect</h4>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} Chenius Space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
