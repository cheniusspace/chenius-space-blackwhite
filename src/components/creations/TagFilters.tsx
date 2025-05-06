import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTagsList } from "@/hooks/useTagsList";

interface TagFiltersProps {
  selectedTag: string | null;
  onTagFilter: (tagName: string | null) => void;
}

export const TagFilters = ({ selectedTag, onTagFilter }: TagFiltersProps) => {
  const { tags, isLoading } = useTagsList();
  
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => onTagFilter(null)}
          className={`px-4 py-2 rounded-none text-sm font-medium transition-all duration-200 ${
            selectedTag === null 
              ? "bg-white text-black" 
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          }`}
        >
          All Works
        </button>
        {tags.map(tag => (
          <button 
            key={tag.id}
            onClick={() => onTagFilter(tag.name)}
            className={`px-4 py-2 rounded-none text-sm font-medium transition-all duration-200 ${
              selectedTag === tag.name 
                ? "bg-white text-black" 
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
