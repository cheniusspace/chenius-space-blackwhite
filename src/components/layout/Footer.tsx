import { Link } from "react-router-dom";
import { Github, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0C0A17] border-t border-[#434D61]/20">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="text-[#E9EDEF] text-lg font-medium hover:text-[#D5DBDF] transition-colors">
              CHENIUS<span className="text-[#D5DBDF]">SPACE</span>
            </Link>
            <p className="text-[#D5DBDF] text-sm">© 2024 Chenius Space. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-[#D5DBDF] hover:text-[#E9EDEF] transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-[#D5DBDF] hover:text-[#E9EDEF] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-[#D5DBDF] hover:text-[#E9EDEF] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
