import { Link } from "react-router-dom";
import { Instagram, Dribbble, Share2, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-[#111111] border-t border-white/10 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column - Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-white font-semibold">CHENIUS</span>
              <span className="text-white opacity-80 font-thin">SPACE</span>
            </Link>
            <p className="text-white/60 text-sm max-w-md">
              A digital space for creative exploration and artistic expression. 
              Discover unique creations, read insightful journals, and explore curated favorites.
            </p>
          </div>

          {/* Right Column - Links & Social */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div className="space-y-4">
              <h3 className="text-white font-medium text-sm">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/creations" className="text-white/60 hover:text-white text-sm transition-colors">
                    Creations
                  </Link>
                </li>
                <li>
                  <Link to="/journals" className="text-white/60 hover:text-white text-sm transition-colors">
                    Journals
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="text-white/60 hover:text-white text-sm transition-colors">
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h3 className="text-white font-medium text-sm">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.instagram.com/cheniusspace" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://dribbble.com/cheniusspace" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <Dribbble size={16} />
                    Dribbble
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.pinterest.com/cheniusspace/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <Share2 size={16} />
                    Pinterest
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:your-email@example.com" 
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors"
                  >
                    <Mail size={16} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            © {currentYear} Chenius Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
