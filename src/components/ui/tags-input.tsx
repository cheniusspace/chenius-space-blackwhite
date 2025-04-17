
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Tag as TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tag } from "@/hooks/useTagsList";

interface TagsInputProps {
  availableTags: Tag[];
  selectedTags: string[];
  onTagsChange: (selectedTags: string[]) => void;
  sampleTags?: Tag[];
}

const TagsInput = ({ availableTags, selectedTags, onTagsChange, sampleTags = [] }: TagsInputProps) => {
  const { toast } = useToast();
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  // Toggle selection of an existing tag
  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  // Create a new tag
  const createNewTag = async () => {
    if (!newTagName.trim()) return;
    
    setIsCreatingTag(true);
    
    try {
      // Check if tag already exists
      const { data: existingTag } = await supabase
        .from("tags")
        .select("id")
        .eq("name", newTagName.trim())
        .maybeSingle();
      
      if (existingTag) {
        // Tag already exists, just select it
        if (!selectedTags.includes(existingTag.id)) {
          onTagsChange([...selectedTags, existingTag.id]);
        }
        toast({
          title: "Tag already exists",
          description: "This tag has been selected for you",
        });
      } else {
        // Create new tag
        const { data, error } = await supabase
          .from("tags")
          .insert({ name: newTagName.trim() })
          .select()
          .single();
          
        if (error) throw error;
        
        onTagsChange([...selectedTags, data.id]);
        toast({
          title: "Success",
          description: "New tag created",
        });
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      toast({
        title: "Error",
        description: "Failed to create tag",
        variant: "destructive",
      });
    } finally {
      setNewTagName("");
      setIsCreatingTag(false);
    }
  };

  // Add sample tags to selection
  const addSampleTags = () => {
    if (sampleTags.length === 0) return;
    
    // Add 2-3 random sample tags
    const availableSampleTags = sampleTags.filter(tag => !selectedTags.includes(tag.id));
    if (availableSampleTags.length === 0) return;
    
    const randomSampleTags = availableSampleTags
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(3, availableSampleTags.length));
    
    const newSelectedTags = [...selectedTags, ...randomSampleTags.map(tag => tag.id)];
    onTagsChange(newSelectedTags);
    
    toast({
      title: "Sample tags added",
      description: "Some sample tags have been added for demonstration",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {availableTags.map(tag => (
          <Button
            key={tag.id}
            type="button"
            variant={selectedTags.includes(tag.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleTag(tag.id)}
            className="flex items-center gap-1"
          >
            {tag.name}
            {selectedTags.includes(tag.id) && <Check className="h-3 w-3" />}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add new tag..."
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              createNewTag();
            }
          }}
        />
        <Button 
          type="button" 
          onClick={createNewTag} 
          disabled={isCreatingTag || !newTagName.trim()}
          variant="outline"
        >
          Add
        </Button>
      </div>
      
      {sampleTags && sampleTags.length > 0 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSampleTags}
          className="flex items-center gap-1"
        >
          <TagIcon className="h-4 w-4" />
          Add Sample Tags
        </Button>
      )}
      
      {selectedTags.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Selected tags:</div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tagId => {
              const tag = availableTags.find(t => t.id === tagId);
              return tag ? (
                <Button
                  key={tagId}
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => toggleTag(tagId)}
                  className="flex items-center gap-1"
                >
                  {tag.name}
                  <X className="h-3 w-3" />
                </Button>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsInput;
