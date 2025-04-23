import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchFavorites, favoritesData, type Favorite } from "@/services/favoritesService";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getFavorites = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFavorites(selectedCategory);
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load favorites",
          variant: "destructive",
        });
        setFavorites(favoritesData);
      } finally {
        setIsLoading(false);
      }
    };
    
    getFavorites();
  }, [selectedCategory, toast]);

  // Get unique categories from favorites
  const categories = Array.from(new Set(favorites.map(favorite => favorite.category)));

  return (
    <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12">
      <SectionHeading
        title="Favorites"
        description="A curated collection of books, artists, designers, and works that inspire and influence my creative practice."
      />

      <div className="mb-12">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === null 
                ? "bg-platinum-500 text-rich_black-500" 
                : "bg-rich_black-500 border border-platinum-500/10 hover:bg-platinum-500/10"
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-platinum-500 text-rich_black-500"
                  : "bg-rich_black-500 border border-platinum-500/10 hover:bg-platinum-500/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-platinum-500/50">Loading...</div>
        </div>
      ) : favorites.length > 0 ? (
        <CardGrid>
          {favorites.map((favorite) => (
            <div key={favorite.id} className="group">
              <div className="aspect-square bg-rich_black-500/50 mb-4">
                {favorite.image_url && (
                  <img
                    src={favorite.image_url}
                    alt={favorite.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-heading mb-2">{favorite.title}</h3>
              <p className="text-platinum-500/50 mb-2">{favorite.author}</p>
              {favorite.external_link && (
                <a
                  href={favorite.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium hover-underline"
                >
                  View Details <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </CardGrid>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-platinum-500/50">No favorites found</div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
