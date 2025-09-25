import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Tag as TagIcon, Edit2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MouseTrail } from "@/components/effects/MouseTrail";

type Creation = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  date: string;
  image_url: string | null;
  status: 'in_progress' | 'completed' | 'archived';
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
            date: new Date(data.created_at).toLocaleString('default', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
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
                  <span className="text-sm text-white/50 tracking-widest uppercase">{creation.category}</span>
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
                    {creation.date}
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
              {creation.image_url ? (
                <div className="relative aspect-video rounded-none overflow-hidden bg-white/5">
                  <img 
                    src={creation.image_url} 
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
                {creation.description ? (
                  <div 
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: creation.description }}
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
                      <p className="font-medium">{creation.date}</p>
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
