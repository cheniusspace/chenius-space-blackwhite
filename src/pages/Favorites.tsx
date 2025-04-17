import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Favorite = {
  id: string;
  title: string;
  category: string;
  author: string;
  imageClass: string;
  image_url: string | null;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let query = supabase.from("favorites").select("*");
        
        if (selectedCategory) {
          query = query.eq("category", selectedCategory);
        }
        
        const { data, error } = await query;
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedData = data.map(favorite => ({
            ...favorite,
            imageClass: favorite.image_url ? "" : "bg-chenius-gray-800"
          }));
          
          setFavorites(formattedData);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.map(item => item.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load favorites",
          variant: "destructive",
        });
        
        setFavorites(favoritesData);
        setCategories(["Books", "Photography", "Design", "Architecture", "Fashion"]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [selectedCategory, toast]);
  
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12">
      <SectionHeading
        title="Favorites"
        description="A curated collection of books, artists, designers, and works that inspire and influence my creative practice."
      />

      <div className="mb-12">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <button 
            onClick={() => handleCategoryFilter(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === null 
                ? "bg-black text-white" 
                : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-chenius-gray-500">Loading...</div>
        </div>
      ) : favorites.length > 0 ? (
        <CardGrid>
          {favorites.map((favorite) => (
            <div key={favorite.id} className="group">
              <div className={`aspect-square ${favorite.imageClass} mb-4`}>
                {favorite.image_url && (
                  <img
                    src={favorite.image_url}
                    alt={favorite.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{favorite.title}</h3>
              <p className="text-chenius-gray-500 mb-2">{favorite.author}</p>
              <Link
                to={`/favorites/${favorite.id}`}
                className="inline-flex items-center text-sm font-medium hover-underline"
              >
                View Details <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </CardGrid>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-chenius-gray-500">No favorites found</div>
        </div>
      )}
    </div>
  );
};

const favoritesData = [
  {
    id: "1",
    title: "Dieter Rams: Less, but Better",
    category: "Book",
    author: "Dieter Rams",
    imageClass: "bg-chenius-gray-300",
    image_url: null,
  },
  {
    id: "2",
    title: "Hiroshi Sugimoto",
    category: "Photography",
    author: "Hiroshi Sugimoto",
    imageClass: "bg-chenius-gray-800",
    image_url: null,
  },
  {
    id: "3",
    title: "Massimo Vignelli's Design Canon",
    category: "Design Philosophy",
    author: "Massimo Vignelli",
    imageClass: "bg-chenius-gray-200",
    image_url: null,
  },
  {
    id: "4",
    title: "Tadao Ando: The Geometry of Human Space",
    category: "Architecture",
    author: "Tadao Ando",
    imageClass: "bg-chenius-gray-500",
    image_url: null,
  },
  {
    id: "5",
    title: "Kenya Hara: White",
    category: "Book",
    author: "Kenya Hara",
    imageClass: "bg-chenius-gray-100",
    image_url: null,
  },
  {
    id: "6",
    title: "Josef Müller-Brockmann: Grid Systems",
    category: "Book",
    author: "Josef Müller-Brockmann",
    imageClass: "bg-chenius-gray-400",
    image_url: null,
  },
  {
    id: "7",
    title: "Helmut Lang Archive",
    category: "Fashion",
    author: "Helmut Lang",
    imageClass: "bg-chenius-gray-700",
    image_url: null,
  },
  {
    id: "8",
    title: "John Pawson: Minimum",
    category: "Book",
    author: "John Pawson",
    imageClass: "bg-chenius-gray-200",
    image_url: null,
  },
];

export default Favorites;
