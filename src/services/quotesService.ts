export type Quote = {
  id: string;
  content: string;
  author: string;
  source?: string;
  date: string;
};

const quotes: Quote[] = [
  {
    id: "1",
    content: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    source: "Notebooks",
    date: new Date().toISOString()
  },
  {
    id: "2",
    content: "Less is more.",
    author: "Ludwig Mies van der Rohe",
    source: "Architectural Philosophy",
    date: new Date().toISOString()
  },
  {
    id: "3",
    content: "The ability to simplify means to eliminate the unnecessary so that the necessary may speak.",
    author: "Hans Hofmann",
    source: "Search for the Real",
    date: new Date().toISOString()
  },
  {
    id: "4",
    content: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
    source: "Wind, Sand and Stars",
    date: new Date().toISOString()
  },
  {
    id: "5",
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    source: "The New York Times",
    date: new Date().toISOString()
  }
];

export const fetchQuoteOfTheDay = async () => {
  // Get a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Fallback data in case the API fails
export const fallbackQuote: Quote = quotes[0]; 