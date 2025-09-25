import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchJournals, journalsData, type Journal } from "@/services/journalsService";
import { Button } from "@/components/ui/button";

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getJournals = async () => {
      setIsLoading(true);
      try {
        const data = await fetchJournals();
        setJournals(data);
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
    
    getJournals();
  }, [toast]);

  return (
    <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <SectionHeading
          title="Journals"
          description="Thoughts, reflections, and narratives exploring creativity, design, and personal experiences."
        />
        <Button asChild>
          <Link to="/journals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Journal
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-platinum-500/50">Loading...</div>
        </div>
      ) : journals.length > 0 ? (
        <div className="space-y-12">
          {journals.map((journal) => (
            <article key={journal.id} className="border-b border-platinum-500/10 pb-10">
              <Link to={`/journals/${journal.id}`} className="block group">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center text-sm text-platinum-500/50 mb-3">
                    <span>{new Date(journal.date).toLocaleDateString('default', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                    <span>{journal.read_time}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading mb-4 group-hover:text-platinum-500 transition-colors">
                    {journal.title}
                  </h2>
                  <p className="text-platinum-500/50 mb-4">
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
          <div className="text-platinum-500/50">No journals found</div>
        </div>
      )}
    </div>
  );
};

export default Journals;
