
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-chenius-gray-200">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          <div>
            <Link to="/" className="text-xl font-semibold tracking-tight mb-2 block">
              CHENIUS Space
            </Link>
            <p className="text-chenius-gray-500 text-sm">
              A personal collection of works, thoughts, and inspirations.
            </p>
          </div>
          
          <div className="flex flex-col space-y-1 md:space-y-0 md:flex-row md:items-center md:space-x-6">
            <Link to="/creations" className="hover-underline text-sm">
              Creations
            </Link>
            <Link to="/journals" className="hover-underline text-sm">
              Journals
            </Link>
            <Link to="/favorites" className="hover-underline text-sm">
              Favorites
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-chenius-gray-200 flex justify-between items-center">
          <p className="text-xs text-chenius-gray-500">
            © {year} CHENIUS Space. All rights reserved.
          </p>
          <p className="text-xs text-chenius-gray-500">
            Minimalist. Monochrome. Meaningful.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
