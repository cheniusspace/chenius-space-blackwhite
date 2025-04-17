import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardGrid } from "@/components/ui/card-grid";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Creation = {
  id: string;
  title: string;
  category: string;
  date: string;
  imageClass: string;
  image_url: string | null;
  tags?: { id: string; name: string }[];
};

const Creations = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data: tagsData, error: tagsError } = await supabase
          .from("tags")
          .select("*")
          .order("name");
          
        if (tagsError) {
          throw tagsError;
        }
        
        setTags(tagsData || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast({
          title: "Error",
          description: "Failed to load tags",
          variant: "destructive",
        });
      }
    };

    fetchTags();
  }, [toast]);
  
  useEffect(() => {
    const fetchCreations = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from("creations")
          .select(`
            *,
            creations_tags!inner (
              tag_id
            ),
            tags:creations_tags!inner(
              tags(id, name)
            )
          `);
        
        if (selectedTag) {
          query = query.eq("creations_tags.tag_id", selectedTag);
        }
        
        const { data, error } = await query.order("date", { ascending: false });
        
        if (error) {
          throw error;
        }
        
        const normalizedData = data?.map(item => {
          const normalizedTags = item.tags ? 
            item.tags.map((tagItem: any) => tagItem.tags) : [];
          
          return {
            id: item.id,
            title: item.title,
            category: item.category,
            date: new Date(item.date).toLocaleString('default', { month: 'long', year: 'numeric' }),
            imageClass: item.image_url ? "" : "bg-chenius-gray-800",
            image_url: item.image_url,
            tags: normalizedTags
          };
        }) || [];
        
        setCreations(normalizedData);
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
    
    fetchCreations();
  }, [selectedTag, toast]);
  
  const handleTagFilter = (tagId: string | null) => {
    setSelectedTag(tagId);
  };

  return (
    <Layout>
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

        <div className="mb-12">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button 
              onClick={() => handleTagFilter(null)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedTag === null 
                  ? "bg-black text-white" 
                  : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
              }`}
            >
              All Works
            </button>
            {tags.map(tag => (
              <button 
                key={tag.id}
                onClick={() => handleTagFilter(tag.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedTag === tag.id 
                    ? "bg-black text-white" 
                    : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-chenius-gray-500">Loading...</div>
          </div>
        ) : creations.length > 0 ? (
          <CardGrid>
            {creations.map((item) => (
              <Link 
                key={item.id} 
                to={`#${item.id}`} 
                className="group block"
              >
                {item.image_url ? (
                  <div className="aspect-[4/5] mb-4 transition-transform duration-500 group-hover:scale-[0.98]">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`aspect-[4/5] ${item.imageClass} mb-4 transition-transform duration-500 group-hover:scale-[0.98]`} />
                )}
                <h3 className="text-lg font-medium">{item.title}</h3>
                <div className="flex justify-between mt-2 text-sm text-chenius-gray-500">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-chenius-gray-100 px-2 py-1 rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </CardGrid>
        ) : (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-chenius-gray-500">No creations found</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const creationsData = [
  {
    id: "1",
    title: "Monochrome Study",
    category: "Photography",
    date: "April 2023",
    imageClass: "bg-chenius-gray-800",
    image_url: null,
  },
  {
    id: "2",
    title: "Geometric Patterns",
    category: "Illustration",
    date: "March 2023",
    imageClass: "bg-chenius-gray-300",
    image_url: null,
  },
  {
    id: "3",
    title: "Minimalist Architecture",
    category: "Photography",
    date: "February 2023",
    imageClass: "bg-chenius-gray-600",
    image_url: null,
  },
  {
    id: "4",
    title: "Typographic Explorations",
    category: "Design",
    date: "January 2023",
    imageClass: "bg-chenius-gray-700",
    image_url: null,
  },
  {
    id: "5",
    title: "Linear Compositions",
    category: "Illustration",
    date: "December 2022",
    imageClass: "bg-chenius-gray-400",
    image_url: null,
  },
  {
    id: "6",
    title: "Urban Contrasts",
    category: "Photography",
    date: "November 2022",
    imageClass: "bg-chenius-gray-900",
    image_url: null,
  },
];

export default Creations;
