import { supabase } from "@/integrations/supabase/client";

export type Journal = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  tags?: string[];
};

export const fetchJournals = async () => {
  const { data, error } = await supabase
    .from("journals")
    .select(`
      *,
      journals_tags (
        tag_id
      )
    `)
    .order("date", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(journal => ({
    ...journal,
    tags: journal.journals_tags?.map(tag => tag.tag_id) || []
  }));
};

// Fallback data in case the API fails
export const journalsData: Journal[] = [
  {
    id: "1",
    title: "On Minimalism and Digital Space",
    excerpt: "Exploring the relationship between minimal design principles and our digital environments...",
    content: "In today's digital landscape, minimalism has become more than just an aesthetic choice—it's a philosophy that shapes how we interact with technology. This journal entry explores the ways in which minimal design principles can create more meaningful and intentional digital experiences...",
    date: "2023-04-15",
    read_time: "5 min read",
    tags: ["design", "minimalism", "digital"]
  },
  {
    id: "2",
    title: "The Value of Monochrome in a Colorful World",
    excerpt: "When we strip away color, what remains? A meditation on form, contrast, and meaning...",
    content: "In a world saturated with color, the choice to work in monochrome is a deliberate one. This journal entry explores how removing color can actually enhance our perception of form, texture, and composition...",
    date: "2023-03-22",
    read_time: "7 min read",
    tags: ["photography", "monochrome", "art"]
  }
]; 