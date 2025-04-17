
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Creation = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  date: string;
  image_url: string | null;
  tags?: { id: string; name: string }[];
};

const CreationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCreation = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("creations")
          .select(`
            *,
            tags:creations_tags(
              tags(id, name)
            )
          `)
          .eq("id", id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const normalizedData = {
            ...data,
            date: new Date(data.date).toLocaleDateString('default', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            tags: data.tags ? data.tags.map((tagItem: any) => tagItem.tags) : []
          };
          
          setCreation(normalizedData);
        }
      } catch (error) {
        console.error("Error fetching creation:", error);
        toast({
          title: "Error",
          description: "Failed to load creation details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCreation();
  }, [id, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12 min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-chenius-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!creation) {
    return (
      <Layout>
        <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-medium mb-4">Creation not found</h1>
          <p className="text-chenius-gray-500 mb-6">
            The creation you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/creations" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Creations
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 p-0 hover:bg-transparent">
            <Link to="/creations" className="flex items-center gap-2 text-chenius-gray-500">
              <ArrowLeft size={16} />
              Back to Creations
            </Link>
          </Button>
          
          <SectionHeading
            title={creation.title}
            description={creation.category}
            className="mt-4"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {creation.image_url ? (
              <img 
                src={creation.image_url} 
                alt={creation.title} 
                className="w-full h-auto rounded-md mb-6"
              />
            ) : (
              <div className="w-full aspect-video bg-chenius-gray-200 rounded-md mb-6 flex items-center justify-center">
                <p className="text-chenius-gray-500">No image available</p>
              </div>
            )}
            
            <div className="prose prose-chenius max-w-none mt-6">
              {creation.description ? (
                <p>{creation.description}</p>
              ) : (
                <p className="text-chenius-gray-500">No description available.</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-chenius-gray-50 p-6 rounded-md">
              <h3 className="text-lg font-medium mb-4">Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-chenius-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-chenius-gray-500">Date</p>
                    <p className="font-medium">{creation.date}</p>
                  </div>
                </div>
                
                {creation.tags && creation.tags.length > 0 && (
                  <div className="flex items-start gap-3">
                    <TagIcon className="h-5 w-5 text-chenius-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-chenius-gray-500">Tags</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {creation.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-chenius-gray-100 px-2 py-1 rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreationDetail;
