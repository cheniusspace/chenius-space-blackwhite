import { supabase } from "@/integrations/supabase/client";

export type Creation = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  status: 'in_progress' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  tags?: { id: string; name: string }[];
  creations_tags?: { tag_id: string }[];
};

export const fetchCreations = async (tagId?: string | null): Promise<Creation[]> => {
  try {
    // First, let's check what fields are actually available
    const { data: schemaData, error: schemaError } = await supabase
      .from('creations')
      .select('*')
      .limit(1);

    if (schemaError) {
      console.error('Schema error:', schemaError);
      return [];
    }

    console.log('Available fields:', schemaData?.[0] ? Object.keys(schemaData[0]) : 'No data');

    // Now try to fetch the actual data
    const { data, error } = await supabase
      .from('creations')
      .select(`
        *,
        creations_tags!left (
          tag_id
        ),
        tags:creations_tags!left (
          tags!left (
            id,
            name
          )
        )
      `)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching creations:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No creations found in database');
      return [];
    }

    console.log('First creation:', data[0]);
    return data.map(creation => ({
      ...creation,
      tags: creation.tags?.map(tag => tag.tags).filter(Boolean) || []
    }));
  } catch (error) {
    console.error('Error in fetchCreations:', error);
    return [];
  }
};

// Fallback data in case the API fails
export const creationsData: Creation[] = [
  {
    id: "healing-journey",
    title: "Scars of Yesterday - A Healing Journey",
    description: "A deeply personal album created with SUNO AI, exploring the path of healing from childhood trauma and parental relationships. Each track represents a step in the journey of self-discovery and emotional recovery.",
    image_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop",
    date: "2024-03-20",
    status: "completed",
    created_at: "2024-03-20T00:00:00",
    updated_at: "2024-03-20T00:00:00",
    tags: [
      { id: "9", name: "music" },
      { id: "10", name: "healing" },
      { id: "11", name: "AI" },
      { id: "12", name: "personal" }
    ],
    creations_tags: [
      { tag_id: "9" },
      { tag_id: "10" },
      { tag_id: "11" },
      { tag_id: "12" }
    ]
  },
  {
    id: "1",
    title: "Building Chenius Space",
    description: "A modern web application built with React, TypeScript, and Supabase.",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2800&auto=format&fit=crop",
    date: "2024-03-20",
    status: "in_progress",
    created_at: "2024-03-20T00:00:00",
    updated_at: "2024-03-20T00:00:00",
    tags: [
      { id: "6", name: "development" },
      { id: "7", name: "web" },
      { id: "8", name: "react" }
    ],
    creations_tags: [
      { tag_id: "6" },
      { tag_id: "7" },
      { tag_id: "8" }
    ]
  },
  {
    id: "2",
    title: "Minimalist Photography Series",
    description: "A series of black and white photographs exploring urban architecture and negative space.",
    image_url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2800&auto=format&fit=crop",
    date: "2023-04-15",
    status: "completed",
    created_at: "2023-04-15T00:00:00",
    updated_at: "2023-04-15T00:00:00",
    tags: [
      { id: "1", name: "photography" },
      { id: "2", name: "minimalism" },
      { id: "3", name: "architecture" }
    ],
    creations_tags: [
      { tag_id: "1" },
      { tag_id: "2" },
      { tag_id: "3" }
    ]
  },
  {
    id: "3",
    title: "Typography Exploration",
    description: "An experimental typography project focusing on minimal forms and negative space.",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2787&auto=format&fit=crop",
    date: "2023-03-22",
    status: "completed",
    created_at: "2023-03-22T00:00:00",
    updated_at: "2023-03-22T00:00:00",
    tags: [
      { id: "4", name: "typography" },
      { id: "2", name: "minimalism" },
      { id: "5", name: "design" }
    ],
    creations_tags: [
      { tag_id: "4" },
      { tag_id: "2" },
      { tag_id: "5" }
    ]
  }
];
