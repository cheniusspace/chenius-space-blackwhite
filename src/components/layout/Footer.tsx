import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0C0A17] border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <span className="text-[#E9EDEF] text-3xl font-medium">CHENIUS</span>
                <span className="text-[#D5DBDF] text-3xl">SPACE</span>
              </Link>
              <p className="text-[#D5DBDF]/70 text-lg tracking-widest">
                Web Design | Architecture | AI Tools
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href="mailto:tran@breakproject.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg"
              >
                <Mail size={20} />
                <span>tran@breakproject.com</span>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 grid grid-cols-2 gap-12">
            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="text-[#E9EDEF] text-sm font-medium tracking-widest uppercase">Explore</h3>
              <nav className="space-y-2">
                <Link to="/creations" className="block text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  Creations
                </Link>
                <Link to="/journals" className="block text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  Journals
                </Link>
                <Link to="/favorites" className="block text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  Favorites
                </Link>
              </nav>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="text-[#E9EDEF] text-sm font-medium tracking-widest uppercase">Connect</h3>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-[#D5DBDF]/70 hover:text-[#E9EDEF] transition-colors text-lg">
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#D5DBDF]/50 text-base">
              © 2024 Chenius Space. All rights reserved.
            </p>
            <div className="flex gap-6 text-base">
              <Link to="/privacy" className="text-[#D5DBDF]/50 hover:text-[#E9EDEF] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#D5DBDF]/50 hover:text-[#E9EDEF] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
