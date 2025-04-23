export type Topic = {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
};

const topics: Topic[] = [
  {
    id: "1",
    title: "3D Printing",
    description: "Explore the world of 3D printing, from modeling to final prints.",
    icon: "/icons/3d-printing.svg",
    link: "/topics/3d-printing"
  },
  {
    id: "2",
    title: "Web Design",
    description: "Discover modern web design techniques and best practices.",
    icon: "/icons/web-design.svg",
    link: "/topics/web-design"
  },
  {
    id: "3",
    title: "AI Tools",
    description: "Learn about the latest AI tools and their applications.",
    icon: "/icons/ai-tools.svg",
    link: "/topics/ai-tools"
  },
  {
    id: "4",
    title: "AI Music",
    description: "Explore the intersection of AI and music creation.",
    icon: "/icons/ai-music.svg",
    link: "/topics/ai-music"
  },
  {
    id: "5",
    title: "Sewing",
    description: "Dive into the art of sewing and fabric crafts.",
    icon: "/icons/sewing.svg",
    link: "/topics/sewing"
  },
  {
    id: "6",
    title: "Crocheting",
    description: "Learn about crocheting techniques and patterns.",
    icon: "/icons/crocheting.svg",
    link: "/topics/crocheting"
  },
  {
    id: "7",
    title: "Knitting",
    description: "Explore knitting patterns and techniques.",
    icon: "/icons/knitting.svg",
    link: "/topics/knitting"
  },
  {
    id: "8",
    title: "Kalimba",
    description: "Discover the beautiful world of kalimba music.",
    icon: "/icons/kalimba.svg",
    link: "/topics/kalimba"
  }
];

export async function fetchTopics(): Promise<Topic[]> {
  try {
    // In the future, this will fetch from Supabase
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    return topics;
  }
} 