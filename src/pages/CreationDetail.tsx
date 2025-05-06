
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Tag as TagIcon, Edit2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { Creation } from "@/services/creationsService";

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
          // Transform the data to match our Creation type
          const transformedData: Creation = {
            id: data.id,
            title: data.title,
            featured_image: data.image_url || "",
            date: data.date,
            created_at: data.created_at,
            updated_at: data.updated_at,
            status: data.status as 'in_progress' | 'completed' | 'archived',
            tags: data.tags ? data.tags.map((tagItem: any) => tagItem.tags) : [],
            overview: {
              text: data.description || "",
              images: []
            },
            motivation: {
              text: "",
              images: []
            },
            tools: {
              text: "",
              list: [],
              images: []
            },
            achievements: {
              text: "",
              list: [],
              images: []
            },
            downsides: {
              text: "",
              list: [],
              images: []
            },
            gallery: {
              images: [],
              captions: []
            },
            future_plans: {
              text: "",
              list: [],
              images: []
            },
            conclusion: {
              text: "",
              images: []
            }
          };
          
          setCreation(transformedData);
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

  const getStatusColor = (status: Creation['status']) => {
    switch (status) {
      case 'in_progress':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusText = (status: Creation['status']) => {
    switch (status) {
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'archived':
        return 'Archived';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full subtle-grid bg-gray-500 text-white">
        <MouseTrail />
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-screen-xl py-24 min-h-[60vh] flex items-center justify-center">
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
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-screen-xl py-24 min-h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-2xl font-medium mb-4">Creation not found</h1>
            <p className="text-white/50 mb-6">
              The creation you are looking for does not exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/creations" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Creations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <MouseTrail />
      <div className="relative z-10">
        <div className="container mx-auto px-4 max-w-screen-xl py-24">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-white/50">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/creations" className="hover:text-white transition-colors">Creations</Link>
              <span>/</span>
              <span className="text-white">{creation.title}</span>
            </nav>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-start justify-between gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                  <span className="text-sm text-white/50 tracking-widest uppercase">{creation.overview?.text.substring(0, 20)}...</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                  {creation.title}
                </h1>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(creation.status)}`}>
                    {getStatusText(creation.status)}
                  </span>
                  <span className="text-white/50 flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(creation.date).toLocaleDateString('default', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Edit2 size={16} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {creation.featured_image ? (
                <div className="relative aspect-video rounded-none overflow-hidden bg-white/5">
                  <img 
                    src={creation.featured_image} 
                    alt={creation.title} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              ) : (
                <div className="aspect-video bg-white/5 rounded-none flex items-center justify-center">
                  <p className="text-white/50">No image available</p>
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                {creation.overview?.text ? (
                  <div 
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: creation.overview.text }}
                  />
                ) : (
                  <p className="text-white/50">No description available.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white/5 p-6 rounded-none border border-white/10">
                <h3 className="text-lg font-medium mb-6">Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-white/50 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/50">Date</p>
                      <p className="font-medium">{new Date(creation.date).toLocaleDateString('default', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  
                  {creation.tags && creation.tags.length > 0 && (
                    <div className="flex items-start gap-3">
                      <TagIcon className="h-5 w-5 text-white/50 mt-0.5" />
                      <div>
                        <p className="text-sm text-white/50">Tags</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {creation.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-white/10 px-3 py-1 rounded-full text-white/70"
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

              <div className="bg-white/5 p-6 rounded-none border border-white/10">
                <h3 className="text-lg font-medium mb-6">Actions</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Edit2 size={16} />
                    Edit Creation
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <ExternalLink size={16} />
                    View Live Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationDetail;
