
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Tag = {
  id: string;
  name: string;
};

export function useTagsList() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Sample tags to use as examples
  const sampleTags: Tag[] = [
    { id: "sample-1", name: "Design" },
    { id: "sample-2", name: "Photography" },
    { id: "sample-3", name: "Art" },
    { id: "sample-4", name: "Technology" },
    { id: "sample-5", name: "Writing" },
    { id: "sample-6", name: "Inspiration" }
  ];

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from("tags")
          .select("*")
          .order("name");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setTags(data);
        } else {
          // If no tags exist in the database, use sample tags
          setTags(sampleTags);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast({
          title: "Error",
          description: "Failed to load tags",
          variant: "destructive",
        });
        // Fall back to sample tags on error
        setTags(sampleTags);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [toast]);

  return { tags, isLoading, sampleTags };
}
