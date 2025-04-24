export type Term = {
  id: string;
  term: string;
  definition: string;
  category: string;
  example?: string;
  date: string;
};

const terms: Term[] = [
  {
    id: "1",
    term: "Negative Space",
    definition: "The empty or open space around and between the subject(s) of an image. It's a fundamental element in composition that helps define the subject and create balance.",
    category: "Design",
    example: "The use of negative space in the FedEx logo creates an arrow between the 'E' and 'x'.",
    date: new Date().toISOString()
  },
  {
    id: "2",
    term: "Gestalt",
    definition: "A psychological concept that refers to the human tendency to perceive patterns and wholes rather than individual elements. In design, it's used to create unified compositions.",
    category: "Psychology",
    example: "The Olympic rings are perceived as interlocking circles rather than separate elements.",
    date: new Date().toISOString()
  },
  {
    id: "3",
    term: "Hierarchy",
    definition: "The arrangement of elements in a way that implies importance. It guides the viewer's attention and helps communicate the relative significance of different parts of a design.",
    category: "Typography",
    example: "Using different font sizes for headings and body text creates visual hierarchy.",
    date: new Date().toISOString()
  },
  {
    id: "4",
    term: "Grid System",
    definition: "A framework of intersecting vertical and horizontal lines used to structure content in a design. It helps create consistency, alignment, and organization.",
    category: "Layout",
    example: "Newspaper layouts often use a grid system to organize articles and images.",
    date: new Date().toISOString()
  },
  {
    id: "5",
    term: "Kerning",
    definition: "The adjustment of space between individual letter pairs in typography. Proper kerning improves readability and visual harmony.",
    category: "Typography",
    example: "Adjusting the space between 'A' and 'V' to prevent awkward gaps.",
    date: new Date().toISOString()
  }
];

export const fetchTermOfTheDay = async () => {
  // Get a random term from the array
  const randomIndex = Math.floor(Math.random() * terms.length);
  return terms[randomIndex];
};

// Fallback data in case the API fails
export const fallbackTerm: Term = terms[0]; 