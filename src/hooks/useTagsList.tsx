
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

        setTags(data || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast({
          title: "Error",
          description: "Failed to load tags",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [toast]);

  return { tags, isLoading };
}
