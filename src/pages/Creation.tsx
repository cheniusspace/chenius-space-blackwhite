import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreationDetail } from "@/components/creations/CreationDetail";
import { fetchCreations, creationsData, type Creation } from "@/services/creationsService";
import { useToast } from "@/hooks/use-toast";
import { MouseTrail } from "@/components/effects/MouseTrail";

const Creation = () => {
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getCreation = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCreations();
        const foundCreation = data.find(c => c.id === id);
        if (foundCreation) {
          setCreation(foundCreation);
        } else {
          const fallbackCreation = creationsData.find(c => c.id === id);
          if (fallbackCreation) {
            setCreation(fallbackCreation);
          } else {
            toast({
              title: "Error",
              description: "Creation not found",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching creation:", error);
        toast({
          title: "Error",
          description: "Failed to load creation",
          variant: "destructive",
        });
        const fallbackCreation = creationsData.find(c => c.id === id);
        if (fallbackCreation) {
          setCreation(fallbackCreation);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getCreation();
    }
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="w-full subtle-grid bg-gray-500 text-white">
        <MouseTrail />
        <div className="container mx-auto px-4 max-w-screen-xl py-24">
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-white/50">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!creation) {
    return (
      <div className="w-full subtle-grid bg-gray-500 text-white">
        <MouseTrail />
        <div className="container mx-auto px-4 max-w-screen-xl py-24">
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-white/50">Creation not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <MouseTrail />
      <CreationDetail creation={creation} />
    </div>
  );
};

export default Creation; 