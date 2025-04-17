
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

  // Sample tags with valid UUIDs to use as examples
  const sampleTags: Tag[] = [
    { id: "fd3fdb8c-5519-4c31-9d85-0ae4c13909cb", name: "Design" },
    { id: "7e8591ce-be2f-4b21-8e86-4639a24309d8", name: "Photography" },
    { id: "ac7f24c7-7b19-4af7-b20c-1d85ec206ce2", name: "Art" },
    { id: "39cf73c3-3b28-4373-9ecc-409b692415f5", name: "Technology" },
    { id: "5a47c2b5-cc83-48c7-ac15-fcdb496dc276", name: "Writing" },
    { id: "0cc1b763-7e93-4909-b46b-d21d9b8858ae", name: "Inspiration" }
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
