import { supabase } from "@/integrations/supabase/client";

export type Creation = {
  id: string;
  title: string;
  category: string;
  date: string;
  imageClass: string;
  image_url: string | null;
  tags?: { id: string; name: string }[];
};

export const fetchCreations = async (selectedTag: string | null) => {
  let query = supabase
    .from("creations")
    .select(`
      *,
      tags:creations_tags(
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
    // Flatten the nested tags array structure
    const normalizedTags = item.tags ? 
      item.tags.map((tagGroup: any) => tagGroup.tags).filter(Boolean) : [];
    
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
  
  return normalizedData;
};

// Fallback sample data for when the API fails
export const creationsData = [
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
