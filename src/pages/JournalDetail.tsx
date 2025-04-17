import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Clock, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Journal = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  read_time: string;
  tags?: { id: string; name: string }[];
};

const JournalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchJournal = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("journals")
          .select(`
            *,
            tags:journals_tags(
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
          
          setJournal(normalizedData);
        }
      } catch (error) {
        console.error("Error fetching journal:", error);
        toast({
          title: "Error",
          description: "Failed to load journal details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJournal();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-chenius-gray-500">Loading...</div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Journal not found</h1>
        <p className="text-chenius-gray-500 mb-6">
          The journal you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/journals" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Journals
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 max-w-3xl mx-auto py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 p-0 hover:bg-transparent">
          <Link to="/journals" className="flex items-center gap-2 text-chenius-gray-500">
            <ArrowLeft size={16} />
            Back to Journals
          </Link>
        </Button>
        
        <SectionHeading
          title={journal.title}
          description={journal.excerpt}
          className="mt-4"
        />
        
        <div className="flex flex-wrap gap-4 items-center text-sm text-chenius-gray-500 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{journal.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{journal.read_time}</span>
          </div>
        </div>
      </div>
      
      <div className="prose prose-chenius max-w-none">
        {journal.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {journal.tags && journal.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-chenius-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TagIcon className="h-4 w-4 text-chenius-gray-500" />
            <span className="font-medium">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {journal.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-sm bg-chenius-gray-100 px-3 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalDetail;
