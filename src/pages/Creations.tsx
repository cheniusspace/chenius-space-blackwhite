import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { useToast } from "@/hooks/use-toast";
import { TagFilters } from "@/components/creations/TagFilters";
import { CreationCard } from "@/components/creations/CreationCard";
import { fetchCreations, creationsData, type Creation } from "@/services/creationsService";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { useNavigate } from "react-router-dom";

const Creations = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/dashboard#creations");
  }, [navigate]);

  useEffect(() => {
    const getCreations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCreations(selectedTag);
        setCreations(data);
      } catch (error) {
        console.error("Error fetching creations:", error);
        toast({
          title: "Error",
          description: "Failed to load creations",
          variant: "destructive",
        });
        setCreations(creationsData);
      } finally {
        setIsLoading(false);
      }
    };
    
    getCreations();
  }, [selectedTag, toast]);

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <MouseTrail />
      <div className="relative z-10 font-['Jost']">
        <div className="container mx-auto px-4 max-w-screen-xl py-24">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
              <span className="text-sm text-white/50 tracking-widest uppercase">Creative Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl tracking-wide">
              <span className="text-white font-extralight">CHENIUS </span>
              <span className="text-white/80 font-bold">Creations</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mt-6">
              A collection of visual works, designs, and creative projects made with heart and boba.
            </p>
          </div>

          <div className="mb-8">
            <TagFilters 
              selectedTag={selectedTag} 
              onTagFilter={setSelectedTag} 
            />
          </div>

          {isLoading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="animate-pulse text-white/50">Loading...</div>
            </div>
          ) : creations.length > 0 ? (
            <CardGrid>
              {creations.map((item) => (
                <CreationCard key={item.id} {...item} />
              ))}
            </CardGrid>
          ) : (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="text-white/50">No creations found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creations;
