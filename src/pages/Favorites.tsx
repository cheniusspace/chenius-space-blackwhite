
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const favoritesData = [
  {
    id: 1,
    title: "Dieter Rams: Less, but Better",
    category: "Book",
    author: "Dieter Rams",
    imageClass: "bg-chenius-gray-300",
  },
  {
    id: 2,
    title: "Hiroshi Sugimoto",
    category: "Photography",
    author: "Hiroshi Sugimoto",
    imageClass: "bg-chenius-gray-800",
  },
  {
    id: 3,
    title: "Massimo Vignelli's Design Canon",
    category: "Design Philosophy",
    author: "Massimo Vignelli",
    imageClass: "bg-chenius-gray-200",
  },
  {
    id: 4,
    title: "Tadao Ando: The Geometry of Human Space",
    category: "Architecture",
    author: "Tadao Ando",
    imageClass: "bg-chenius-gray-500",
  },
  {
    id: 5,
    title: "Kenya Hara: White",
    category: "Book",
    author: "Kenya Hara",
    imageClass: "bg-chenius-gray-100",
  },
  {
    id: 6,
    title: "Josef Müller-Brockmann: Grid Systems",
    category: "Book",
    author: "Josef Müller-Brockmann",
    imageClass: "bg-chenius-gray-400",
  },
  {
    id: 7,
    title: "Helmut Lang Archive",
    category: "Fashion",
    author: "Helmut Lang",
    imageClass: "bg-chenius-gray-700",
  },
  {
    id: 8,
    title: "John Pawson: Minimum",
    category: "Book",
    author: "John Pawson",
    imageClass: "bg-chenius-gray-200",
  },
];

const Favorites = () => {
  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12">
        <SectionHeading
          title="Favorites"
          description="A curated collection of books, artists, designers, and works that inspire and influence my creative practice."
        />

        <div className="mb-12">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Books
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Photography
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Design
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Architecture
            </button>
            <button className="px-4 py-2 bg-white border border-chenius-gray-200 rounded-full text-sm whitespace-nowrap hover:bg-chenius-gray-100">
              Fashion
            </button>
          </div>
        </div>

        <CardGrid columns={4}>
          {favoritesData.map((item) => (
            <Link 
              key={item.id} 
              to={`#${item.id}`} 
              className="group block"
            >
              <div className={`aspect-square ${item.imageClass} mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-[0.98]`}>
                <ExternalLink className="w-8 h-8 text-chenius-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <div className="flex flex-col mt-2">
                <span className="text-sm">{item.category}</span>
                <span className="text-sm text-chenius-gray-500">{item.author}</span>
              </div>
            </Link>
          ))}
        </CardGrid>
      </div>
    </Layout>
  );
};

export default Favorites;
