
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTagsList } from "@/hooks/useTagsList";
import TagsInput from "@/components/ui/tags-input";

const AddContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tags } = useTagsList();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Creation form state
  const [creation, setCreation] = useState({
    title: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    image_url: "",
    selectedTags: [] as string[]
  });

  // Journal form state
  const [journal, setJournal] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    read_time: "",
    selectedTags: [] as string[]
  });

  // Favorite form state
  const [favorite, setFavorite] = useState({
    title: "",
    category: "",
    author: "",
    description: "",
    image_url: "",
    external_link: "",
    selectedTags: [] as string[]
  });

  // Handle creation form submission
  const handleCreationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert creation record
      const { data: creationData, error: creationError } = await supabase
        .from("creations")
        .insert({
          title: creation.title,
          category: creation.category,
          description: creation.description || null,
          date: creation.date,
          image_url: creation.image_url || null
        })
        .select("id")
        .single();

      if (creationError) throw creationError;

      // Insert tags relations if any tags selected
      if (creation.selectedTags.length > 0) {
        const tagRelations = creation.selectedTags.map(tagId => ({
          creation_id: creationData.id,
          tag_id: tagId
        }));

        const { error: tagsError } = await supabase
          .from("creations_tags")
          .insert(tagRelations);

        if (tagsError) throw tagsError;
      }

      toast({
        title: "Success",
        description: "Creation added successfully",
      });
      
      navigate("/creations");
    } catch (error) {
      console.error("Error adding creation:", error);
      toast({
        title: "Error",
        description: "Failed to add creation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle journal form submission
  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert journal record
      const { data: journalData, error: journalError } = await supabase
        .from("journals")
        .insert({
          title: journal.title,
          excerpt: journal.excerpt,
          content: journal.content,
          date: journal.date,
          read_time: journal.read_time
        })
        .select("id")
        .single();

      if (journalError) throw journalError;

      // Insert tags relations if any tags selected
      if (journal.selectedTags.length > 0) {
        const tagRelations = journal.selectedTags.map(tagId => ({
          journal_id: journalData.id,
          tag_id: tagId
        }));

        const { error: tagsError } = await supabase
          .from("journals_tags")
          .insert(tagRelations);

        if (tagsError) throw tagsError;
      }

      toast({
        title: "Success",
        description: "Journal added successfully",
      });
      
      navigate("/journals");
    } catch (error) {
      console.error("Error adding journal:", error);
      toast({
        title: "Error",
        description: "Failed to add journal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle favorite form submission
  const handleFavoriteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert favorite record
      const { data: favoriteData, error: favoriteError } = await supabase
        .from("favorites")
        .insert({
          title: favorite.title,
          category: favorite.category,
          author: favorite.author,
          description: favorite.description || null,
          image_url: favorite.image_url || null,
          external_link: favorite.external_link || null
        })
        .select("id")
        .single();

      if (favoriteError) throw favoriteError;

      // Insert tags relations if any tags selected
      if (favorite.selectedTags.length > 0) {
        const tagRelations = favorite.selectedTags.map(tagId => ({
          favorite_id: favoriteData.id,
          tag_id: tagId
        }));

        const { error: tagsError } = await supabase
          .from("favorites_tags")
          .insert(tagRelations);

        if (tagsError) throw tagsError;
      }

      toast({
        title: "Success",
        description: "Favorite added successfully",
      });
      
      navigate("/favorites");
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast({
        title: "Error",
        description: "Failed to add favorite",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 max-w-5xl mx-auto py-12">
        <SectionHeading
          title="Add New Content"
          description="Create new entries for your portfolio. Select the appropriate tab to add creations, journals, or favorites."
        />

        <Tabs defaultValue="creation" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creation">Creation</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="favorite">Favorite</TabsTrigger>
          </TabsList>

          {/* Creation Form */}
          <TabsContent value="creation">
            <Card>
              <CardHeader>
                <CardTitle>Add New Creation</CardTitle>
                <CardDescription>
                  Share your creative works, designs, and projects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreationSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="creation-title">Title</Label>
                      <Input 
                        id="creation-title" 
                        placeholder="Title of your work" 
                        value={creation.title}
                        onChange={e => setCreation({...creation, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="creation-category">Category</Label>
                      <Input 
                        id="creation-category" 
                        placeholder="Design, Photography, etc." 
                        value={creation.category}
                        onChange={e => setCreation({...creation, category: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="creation-date">Date</Label>
                      <Input 
                        id="creation-date" 
                        type="date" 
                        value={creation.date}
                        onChange={e => setCreation({...creation, date: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="creation-image">Image URL</Label>
                      <Input 
                        id="creation-image" 
                        placeholder="https://example.com/image.jpg" 
                        value={creation.image_url}
                        onChange={e => setCreation({...creation, image_url: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="creation-description">Description</Label>
                      <Textarea 
                        id="creation-description" 
                        placeholder="Describe your work" 
                        value={creation.description}
                        onChange={e => setCreation({...creation, description: e.target.value})}
                        className="min-h-32"
                      />
                    </div>
                    
                    <div>
                      <Label>Tags</Label>
                      <TagsInput 
                        availableTags={tags}
                        selectedTags={creation.selectedTags}
                        onTagsChange={(tagIds) => setCreation({...creation, selectedTags: tagIds})}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Add Creation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journal Form */}
          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle>Add New Journal</CardTitle>
                <CardDescription>
                  Share your thoughts, essays, and articles.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJournalSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="journal-title">Title</Label>
                      <Input 
                        id="journal-title" 
                        placeholder="Title of your journal" 
                        value={journal.title}
                        onChange={e => setJournal({...journal, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="journal-excerpt">Excerpt</Label>
                      <Textarea 
                        id="journal-excerpt" 
                        placeholder="A brief summary of your journal" 
                        value={journal.excerpt}
                        onChange={e => setJournal({...journal, excerpt: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="journal-content">Content</Label>
                      <Textarea 
                        id="journal-content" 
                        placeholder="Your journal content" 
                        value={journal.content}
                        onChange={e => setJournal({...journal, content: e.target.value})}
                        className="min-h-64"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="journal-date">Date</Label>
                      <Input 
                        id="journal-date" 
                        type="date" 
                        value={journal.date}
                        onChange={e => setJournal({...journal, date: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="journal-read-time">Read Time</Label>
                      <Input 
                        id="journal-read-time" 
                        placeholder="5 min read" 
                        value={journal.read_time}
                        onChange={e => setJournal({...journal, read_time: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Tags</Label>
                      <TagsInput 
                        availableTags={tags}
                        selectedTags={journal.selectedTags}
                        onTagsChange={(tagIds) => setJournal({...journal, selectedTags: tagIds})}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Add Journal"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorite Form */}
          <TabsContent value="favorite">
            <Card>
              <CardHeader>
                <CardTitle>Add New Favorite</CardTitle>
                <CardDescription>
                  Share your favorite books, articles, or inspirations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFavoriteSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="favorite-title">Title</Label>
                      <Input 
                        id="favorite-title" 
                        placeholder="Title of the work" 
                        value={favorite.title}
                        onChange={e => setFavorite({...favorite, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favorite-category">Category</Label>
                      <Input 
                        id="favorite-category" 
                        placeholder="Book, Article, etc." 
                        value={favorite.category}
                        onChange={e => setFavorite({...favorite, category: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favorite-author">Author</Label>
                      <Input 
                        id="favorite-author" 
                        placeholder="Author name" 
                        value={favorite.author}
                        onChange={e => setFavorite({...favorite, author: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favorite-image">Image URL</Label>
                      <Input 
                        id="favorite-image" 
                        placeholder="https://example.com/image.jpg" 
                        value={favorite.image_url}
                        onChange={e => setFavorite({...favorite, image_url: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favorite-link">External Link</Label>
                      <Input 
                        id="favorite-link" 
                        placeholder="https://example.com" 
                        value={favorite.external_link}
                        onChange={e => setFavorite({...favorite, external_link: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="favorite-description">Description</Label>
                      <Textarea 
                        id="favorite-description" 
                        placeholder="Describe why you like this work" 
                        value={favorite.description}
                        onChange={e => setFavorite({...favorite, description: e.target.value})}
                        className="min-h-32"
                      />
                    </div>
                    
                    <div>
                      <Label>Tags</Label>
                      <TagsInput 
                        availableTags={tags}
                        selectedTags={favorite.selectedTags}
                        onTagsChange={(tagIds) => setFavorite({...favorite, selectedTags: tagIds})}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Add Favorite"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AddContent;
