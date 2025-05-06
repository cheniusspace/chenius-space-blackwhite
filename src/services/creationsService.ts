
import { supabase } from "@/integrations/supabase/client";

export type Creation = {
  id: string;
  title: string;
  featured_image: string;
  imageClass?: string;
  overview: {
    text: string;
    images?: string[];
  };
  motivation: {
    text: string;
    images?: string[];
  };
  tools: {
    text: string;
    images?: string[];
    list: string[];
  };
  achievements: {
    text: string;
    images?: string[];
    list: string[];
  };
  downsides: {
    text: string;
    images?: string[];
    list: string[];
  };
  gallery: {
    images: string[];
    captions?: string[];
  };
  future_plans: {
    text: string;
    images?: string[];
    list: string[];
  };
  conclusion: {
    text: string;
    images?: string[];
  };
  date: string;
  created_at: string;
  updated_at: string;
  status: 'in_progress' | 'completed' | 'archived';
  tags?: { id: string; name: string }[];
  creations_tags?: { tag_id: string }[];
};

export const fetchCreations = async (tagFilter?: string | null): Promise<Creation[]> => {
  try {
    const { data, error } = await supabase
      .from('creations')
      .select(`
        *,
        creations_tags (
          tag_id
        ),
        tags:creations_tags!inner (
          tags!inner (
            id,
            name
          )
        )
      `)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching creations:', error);
      throw error;
    }

    // Transform the data to match our Creation type
    const transformedData = (data || []).map(creation => {
      // Extract tags from nested structure
      const tags = creation.tags?.map(tag => tag.tags) || [];
      
      // Map database fields to our Creation type
      return {
        id: creation.id,
        title: creation.title,
        featured_image: creation.image_url || "",  // Map old image_url to featured_image
        date: creation.date,
        created_at: creation.created_at,
        updated_at: creation.updated_at,
        status: creation.status,
        // Create default structure for new fields
        overview: {
          text: creation.description || "",
          images: []
        },
        motivation: {
          text: "",
          images: []
        },
        tools: {
          text: "",
          list: [],
          images: []
        },
        achievements: {
          text: "",
          list: [],
          images: []
        },
        downsides: {
          text: "",
          list: [],
          images: []
        },
        gallery: {
          images: [],
          captions: []
        },
        future_plans: {
          text: "",
          list: [],
          images: []
        },
        conclusion: {
          text: "",
          images: []
        },
        tags,
        creations_tags: creation.creations_tags
      };
    });
    
    // Apply tag filtering if a tag is provided
    if (tagFilter) {
      return transformedData.filter(creation => 
        creation.tags?.some(tag => tag.name === tagFilter)
      );
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error in fetchCreations:', error);
    return creationsData;
  }
};

// Fallback data in case the API fails
export const creationsData: Creation[] = [
  {
    id: "healing-journey",
    title: "Scars of Yesterday - A Healing Journey",
    featured_image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop",
    imageClass: "healing-journey",
    overview: {
      text: "A deeply personal album created with SUNO AI, exploring the path of healing from childhood trauma and parental relationships. Each track represents a step in the journey of self-discovery and emotional recovery.",
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    motivation: {
      text: "This project was born from a deep need to process and heal from childhood experiences. Music has always been a therapeutic outlet, and with the advent of AI tools like SUNO, I found a way to express these emotions in a new form.",
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    tools: {
      text: "The album was created using a combination of AI tools and traditional music production software.",
      list: [
        "SUNO AI for music generation",
        "Ableton Live for post-processing",
        "iZotope RX for audio cleanup",
        "Logic Pro for final mixing"
      ],
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    achievements: {
      text: "The project has helped me process difficult emotions and connect with others who have had similar experiences.",
      list: [
        "Created 8 emotionally resonant tracks",
        "Developed a unique sound that blends AI and human emotion",
        "Received positive feedback from listeners who related to the themes",
        "Successfully processed and released difficult emotions through music"
      ],
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    downsides: {
      text: "While the project was therapeutic, there were challenges in the process.",
      list: [
        "AI limitations in capturing complex emotional nuances",
        "Technical challenges in post-processing AI-generated music",
        "Emotional difficulty in revisiting painful memories",
        "Time-consuming process of refining AI outputs"
      ],
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    gallery: {
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ],
      captions: [
        "Studio setup during production",
        "Final album artwork"
      ]
    },
    future_plans: {
      text: "This project has opened new possibilities for combining AI and emotional expression.",
      list: [
        "Create a follow-up album exploring different aspects of healing",
        "Develop a workshop on using AI for emotional expression",
        "Collaborate with other artists on similar projects",
        "Create a visual component to accompany the music"
      ],
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    conclusion: {
      text: "This project has shown me that technology can be a powerful tool for emotional healing and self-expression. The combination of AI and human emotion has created something unique and meaningful.",
      images: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    date: "2024-03-20",
    created_at: "2024-03-20T00:00:00",
    updated_at: "2024-03-20T00:00:00",
    status: "completed",
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
    featured_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2800&auto=format&fit=crop",
    imageClass: "building-chenius-space",
    overview: {
      text: "A modern web application built with React, TypeScript, and Supabase.",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    motivation: {
      text: "To create a personal space for sharing creative works and experiences.",
      images: []
    },
    tools: {
      text: "Built with modern web technologies and tools.",
      list: [
        "React for frontend",
        "TypeScript for type safety",
        "Supabase for backend",
        "Tailwind CSS for styling"
      ],
      images: []
    },
    achievements: {
      text: "Successfully created a modern, responsive web application.",
      list: [
        "Implemented responsive design",
        "Set up authentication",
        "Created content management system",
        "Integrated image upload"
      ],
      images: []
    },
    downsides: {
      text: "Some challenges were encountered during development.",
      list: [
        "Learning curve with new technologies",
        "Time constraints",
        "Complex state management",
        "Performance optimization"
      ],
      images: []
    },
    gallery: {
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2800&auto=format&fit=crop"
      ],
      captions: ["Homepage design"]
    },
    future_plans: {
      text: "Plans for future development and improvements.",
      list: [
        "Add more interactive features",
        "Improve performance",
        "Add analytics",
        "Expand content types"
      ],
      images: []
    },
    conclusion: {
      text: "A successful project that demonstrates modern web development practices.",
      images: []
    },
    date: "2024-03-20",
    created_at: "2024-03-20T00:00:00",
    updated_at: "2024-03-20T00:00:00",
    status: "in_progress",
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
    featured_image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2800&auto=format&fit=crop",
    imageClass: "minimalist-photography-series",
    overview: {
      text: "A series of black and white photographs exploring urban architecture and negative space.",
      images: [
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2800&auto=format&fit=crop"
      ]
    },
    motivation: {
      text: "To explore the beauty of minimalism in urban environments.",
      images: []
    },
    tools: {
      text: "Used professional photography equipment and editing software.",
      list: [
        "Sony A7III camera",
        "Adobe Lightroom",
        "Adobe Photoshop",
        "Professional lighting equipment"
      ],
      images: []
    },
    achievements: {
      text: "Created a cohesive series of minimalist photographs.",
      list: [
        "Developed unique style",
        "Exhibited in local gallery",
        "Published in photography magazine",
        "Built portfolio"
      ],
      images: []
    },
    downsides: {
      text: "Some challenges in the creative process.",
      list: [
        "Weather constraints",
        "Location access",
        "Time management",
        "Technical limitations"
      ],
      images: []
    },
    gallery: {
      images: [
        "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2800&auto=format&fit=crop"
      ],
      captions: ["Urban minimalism"]
    },
    future_plans: {
      text: "Plans for future photography projects.",
      list: [
        "Expand series",
        "New locations",
        "Different techniques",
        "Collaborations"
      ],
      images: []
    },
    conclusion: {
      text: "A successful exploration of minimalism in photography.",
      images: []
    },
    date: "2023-04-15",
    created_at: "2023-04-15T00:00:00",
    updated_at: "2023-04-15T00:00:00",
    status: "completed",
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
    featured_image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2787&auto=format&fit=crop",
    imageClass: "typography-exploration",
    overview: {
      text: "An experimental typography project focusing on minimal forms and negative space.",
      images: [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2787&auto=format&fit=crop"
      ]
    },
    motivation: {
      text: "To explore the boundaries of typography and minimalism.",
      images: []
    },
    tools: {
      text: "Used various design tools and software.",
      list: [
        "Adobe Illustrator",
        "Adobe InDesign",
        "FontLab",
        "Custom brushes"
      ],
      images: []
    },
    achievements: {
      text: "Created innovative typographic designs.",
      list: [
        "Developed new typeface",
        "Created experimental layouts",
        "Published in design journal",
        "Won design award"
      ],
      images: []
    },
    downsides: {
      text: "Challenges in the design process.",
      list: [
        "Technical limitations",
        "Time constraints",
        "Client feedback",
        "Printing issues"
      ],
      images: []
    },
    gallery: {
      images: [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2787&auto=format&fit=crop"
      ],
      captions: ["Typography samples"]
    },
    future_plans: {
      text: "Plans for future typography projects.",
      list: [
        "New typeface design",
        "Digital applications",
        "Collaborations",
        "Exhibitions"
      ],
      images: []
    },
    conclusion: {
      text: "A successful exploration of typography and minimalism.",
      images: []
    },
    date: "2023-03-22",
    created_at: "2023-03-22T00:00:00",
    updated_at: "2023-03-22T00:00:00",
    status: "completed",
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
