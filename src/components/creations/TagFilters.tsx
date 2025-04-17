
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTagsList } from "@/hooks/useTagsList";

interface TagFiltersProps {
  selectedTag: string | null;
  onTagFilter: (tagId: string | null) => void;
}

export const TagFilters = ({ selectedTag, onTagFilter }: TagFiltersProps) => {
  const { tags, isLoading } = useTagsList();
  
  return (
    <div className="mb-12">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        <button 
          onClick={() => onTagFilter(null)}
          className={`px-4 py-2 rounded-none text-sm whitespace-nowrap font-body uppercase tracking-wider ${
            selectedTag === null 
              ? "bg-black text-white" 
              : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
          }`}
        >
          All Works
        </button>
        {tags.map(tag => (
          <button 
            key={tag.id}
            onClick={() => onTagFilter(tag.id)}
            className={`px-4 py-2 rounded-none text-sm whitespace-nowrap font-body uppercase tracking-wider ${
              selectedTag === tag.id 
                ? "bg-black text-white" 
                : "bg-white border border-chenius-gray-200 hover:bg-chenius-gray-100"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};
