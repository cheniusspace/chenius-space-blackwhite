
import React from 'react';
import { useTheme } from "@/providers/ThemeProvider";
import { RainEffect } from "@/components/ui/rain-effect";

export default function Index() {
  const { isDark } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <RainEffect className="opacity-50" />
      
      <section className="text-center my-16">
        <h1 
          data-text="Welcome" 
          className={`text-4xl md:text-6xl font-bold mb-6 ${
            isDark ? 'text-[var(--color-Dark-50)]' : 'text-[var(--color-Light-50)]'
          }`}
        >
          Welcome
        </h1>
        
        <p className={`text-xl md:text-2xl max-w-2xl mx-auto ${
          isDark ? 'text-[var(--color-Dark-50)]' : 'text-[var(--color-Light-50)]'
        }`}>
          Explore my digital garden of creations, journals, and favorites
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSections.map((section, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-lg border border-opacity-20 transition-all hover:translate-y-[-5px] ${
                isDark 
                  ? 'bg-[#2A283B]/30 border-[var(--color-Purple-400)] text-[var(--color-Dark-50)]' 
                  : 'bg-[#FFF9FB]/50 border-[var(--color-Purple-400)] text-[var(--color-Light-50)]'
              }`}
            >
              <h3 
                data-text={section.title} 
                className="text-2xl font-semibold mb-4"
              >
                {section.title}
              </h3>
              <p className="mb-6">{section.description}</p>
              <a 
                href={section.link} 
                className={`inline-block px-6 py-2 rounded drawing-button ${
                  isDark ? 'text-[var(--color-Purple-400)]' : 'text-[var(--color-Purple-400)]'
                }`}
              >
                Explore
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const featuredSections = [
  {
    title: "Creations",
    description: "Projects and creative works I've developed",
    link: "/creations"
  },
  {
    title: "Journals",
    description: "Thoughts, ideas, and daily observations",
    link: "/journals"
  },
  {
    title: "Favorites",
    description: "Collections of things I love and recommend",
    link: "/favorites"
  }
];
