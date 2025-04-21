import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TagFilters } from "@/components/creations/TagFilters";
import { CreationCard } from "@/components/creations/CreationCard";
import { fetchCreations, creationsData, type Creation } from "@/services/creationsService";

const Creations = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getCreations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCreations(selectedTag);
        console.log('Fetched creations:', data); // Debug: Log fetched data
        setCreations(data);
      } catch (error) {
        console.error("Error fetching creations:", error);
        toast({
          title: "Error",
          description: "Failed to load creations",
          variant: "destructive",
        });
        // Use fallback data if API fails
        setCreations(creationsData);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCreations();
  }, [selectedTag, toast]);

  return (
    <div className="container px-4 md:px-6 max-w-7xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <SectionHeading
          title="Creations"
          description="A collection of visual works, designs, and creative projects presented in monochromatic elegance."
          className="mb-0"
        />
        
        <Button asChild>
          <Link to="/add-content" className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} />
            Add Creation
          </Link>
        </Button>
      </div>

      <TagFilters 
        selectedTag={selectedTag} 
        onTagFilter={setSelectedTag} 
      />

      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-chenius-gray-500 font-body">Loading...</div>
        </div>
      ) : creations.length > 0 ? (
        <CardGrid>
          {creations.map((item) => (
            <CreationCard key={item.id} {...item} />
          ))}
        </CardGrid>
      ) : (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-chenius-gray-500 font-body">No creations found</div>
        </div>
      )}
    </div>
  );
};

export default Creations;
