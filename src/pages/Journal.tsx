import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Journal } from "@/services/journalsService";

const Journal = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJournal = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('journals')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setJournal(data);
      } catch (error) {
        console.error("Error fetching journal:", error);
        toast({
          title: "Error",
          description: "Failed to load journal",
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
      <div className="container mx-auto max-w-4xl py-24">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading journal...</div>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="container mx-auto max-w-4xl py-24">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground mb-4">Journal not found</div>
            <Button asChild>
              <Link to="/journals">Back to Journals</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-24">
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4"
        >
          <Link to="/journals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journals
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(journal.date).toLocaleDateString('default', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {journal.read_time}
            </div>
          </div>
          <CardTitle className="text-3xl">{journal.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <div className="text-lg text-muted-foreground mb-8">
              {journal.excerpt}
            </div>
            <div className="whitespace-pre-wrap">
              {journal.content}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Journal;
