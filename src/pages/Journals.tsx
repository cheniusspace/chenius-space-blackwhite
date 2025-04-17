
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Journal = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
};

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const { data, error } = await supabase
          .from("journals")
          .select("*")
          .order("date", { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          const formattedData = data.map(journal => ({
            ...journal,
            date: new Date(journal.date).toLocaleDateString('default', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          }));
          
          setJournals(formattedData);
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
        toast({
          title: "Error",
          description: "Failed to load journals",
          variant: "destructive",
        });
        setJournals(journalsData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJournals();
  }, [toast]);

  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12">
        <SectionHeading
          title="Journals"
          description="Thoughts, reflections, and narratives exploring creativity, design, and personal experiences."
        />

        {isLoading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-chenius-gray-500">Loading...</div>
          </div>
        ) : journals.length > 0 ? (
          <div className="space-y-12">
            {journals.map((journal) => (
              <article key={journal.id} className="border-b border-chenius-gray-200 pb-10">
                <Link to={`/journals/${journal.id}`} className="block group">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center text-sm text-chenius-gray-500 mb-3">
                      <span>{journal.date}</span>
                      <span>{journal.read_time}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-chenius-gray-700 transition-colors">
                      {journal.title}
                    </h2>
                    <p className="text-chenius-gray-500 mb-4">
                      {journal.excerpt}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-sm font-medium hover-underline">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-chenius-gray-500">No journals found</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const journalsData = [
  {
    id: "1",
    title: "On Minimalism and Digital Space",
    excerpt:
      "Exploring the relationship between minimal design principles and our digital environments...",
    date: "April 15, 2023",
    read_time: "5 min read",
  },
  {
    id: "2",
    title: "The Value of Monochrome in a Colorful World",
    excerpt:
      "When we strip away color, what remains? A meditation on form, contrast, and meaning...",
    date: "March 22, 2023",
    read_time: "7 min read",
  },
  {
    id: "3",
    title: "Finding Inspiration in Constraints",
    excerpt:
      "How working within self-imposed limitations can lead to unexpected creative breakthroughs...",
    date: "February 10, 2023",
    read_time: "4 min read",
  },
  {
    id: "4",
    title: "Notes on Typography and Readability",
    excerpt:
      "Thoughts on the intersection of aesthetic typography and functional readability...",
    date: "January 5, 2023",
    read_time: "6 min read",
  },
  {
    id: "5",
    title: "The Space Between: On Negative Space",
    excerpt:
      "Understanding the importance of what isn't there, and how emptiness shapes meaning...",
    date: "December 12, 2022",
    read_time: "8 min read",
  },
];

export default Journals;
