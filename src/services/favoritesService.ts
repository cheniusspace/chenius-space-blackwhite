import { supabase } from "@/integrations/supabase/client";

export type Favorite = {
  id: string;
  title: string;
  category: string;
  author: string;
  description: string | null;
  image_url: string | null;
  external_link: string | null;
  tags?: string[];
};

export const fetchFavorites = async (category: string | null = null) => {
  let query = supabase
    .from("favorites")
    .select(`
      *,
      favorites_tags (
        tag_id
      )
    `)
    .order("title", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.map(favorite => ({
    ...favorite,
    tags: favorite.favorites_tags?.map(tag => tag.tag_id) || []
  }));
};

// Fallback data in case the API fails
export const favoritesData: Favorite[] = [
  {
    id: "1",
    title: "Dieter Rams: Less, but Better",
    category: "Book",
    author: "Dieter Rams",
    description: "A comprehensive look at the design philosophy of Dieter Rams, exploring his 'less but better' approach to design.",
    image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop",
    external_link: "https://example.com/dieter-rams-book",
    tags: ["design", "minimalism", "books"]
  },
  {
    id: "2",
    title: "Hiroshi Sugimoto",
    category: "Photography",
    author: "Hiroshi Sugimoto",
    description: "A collection of Sugimoto's minimalist black and white photographs exploring time, space, and perception.",
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2787&auto=format&fit=crop",
    external_link: "https://example.com/sugimoto",
    tags: ["photography", "minimalism", "art"]
  }
]; 