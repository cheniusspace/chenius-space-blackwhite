import { supabase } from "@/integrations/supabase/client";

export type Creation = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  date: string;
  image_url: string | null;
  tags?: string[];
};

export const fetchCreations = async (selectedTag: string | null = null) => {
  let query = supabase
    .from("creations")
    .select(`
      *,
      creations_tags (
        tag_id
      )
    `)
    .order("date", { ascending: false });

  if (selectedTag) {
    query = query.eq("creations_tags.tag_id", selectedTag);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.map(creation => ({
    ...creation,
    tags: creation.creations_tags?.map(tag => tag.tag_id) || []
  }));
};

// Fallback data in case the API fails
export const creationsData: Creation[] = [
  {
    id: "1",
    title: "Minimalist Photography Series",
    category: "Photography",
    description: "A series of black and white photographs exploring urban architecture and negative space.",
    date: "2023-04-15",
    image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2800&auto=format&fit=crop",
    tags: ["photography", "minimalism", "architecture"]
  },
  {
    id: "2",
    title: "Typography Exploration",
    category: "Design",
    description: "An experimental typography project focusing on minimal forms and negative space.",
    date: "2023-03-22",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2787&auto=format&fit=crop",
    tags: ["typography", "design", "minimalism"]
  }
];
