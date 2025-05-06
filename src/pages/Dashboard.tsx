import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTagsList } from "@/hooks/useTagsList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagsInput from "@/components/ui/tags-input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { 
  Plus, 
  FileText, 
  Bookmark, 
  Lightbulb, 
  BarChart2, 
  Users, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Pencil,
  Eye,
  PlusCircle
} from "lucide-react";
import { fetchCreations, type Creation } from "@/services/creationsService";
import { fetchJournals } from "@/services/journalsService";
import { fetchFavorites } from "@/services/favoritesService";
import { formatDistanceToNow } from "date-fns";

type CreationStatus = 'in_progress' | 'completed' | 'archived';

type ActivityItem = {
  id: string;
  type: 'creation' | 'journal' | 'favorite';
  title: string;
  date: string;
  icon: React.ReactNode;
};

const Dashboard = () => {
  const { toast } = useToast();
  const { tags } = useTagsList();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [stats, setStats] = useState({
    creations: 0,
    journals: 0,
    favorites: 0
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [editingCreation, setEditingCreation] = useState<Creation | null>(null);
  const navigate = useNavigate();
  
  // Fetch stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [creations, journals, favorites] = await Promise.all([
          fetchCreations(),
          fetchJournals(),
          fetchFavorites()
        ]);

        setStats({
          creations: creations.length,
          journals: journals.length,
          favorites: favorites.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast({
          title: "Error",
          description: "Failed to load statistics",
          variant: "destructive",
        });
      }
    };

    fetchStats();
  }, [toast]);

  // Fetch recent activity
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        setIsLoadingActivity(true);
        const [creations, journals, favorites] = await Promise.all([
          fetchCreations(),
          fetchJournals(),
          fetchFavorites()
        ]);

        // Transform data into activity items
        const activityItems: ActivityItem[] = [
          ...creations.map(creation => ({
            id: creation.id,
            type: 'creation' as const,
            title: creation.title,
            date: creation.date,
            icon: <Lightbulb className="h-4 w-4" />
          })),
          ...journals.map(journal => ({
            id: journal.id,
            type: 'journal' as const,
            title: journal.title,
            date: journal.created_at,
            icon: <FileText className="h-4 w-4" />
          })),
          ...favorites.map(favorite => ({
            id: favorite.id,
            type: 'favorite' as const,
            title: favorite.title,
            date: favorite.created_at,
            icon: <Bookmark className="h-4 w-4" />
          }))
        ];

        // Sort by date (newest first) and limit to 5 items
        const sortedActivity = activityItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setRecentActivity(sortedActivity);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        toast({
          title: "Error",
          description: "Failed to load recent activity",
          variant: "destructive",
        });
      } finally {
        setIsLoadingActivity(false);
      }
    };

    fetchRecentActivity();
  }, [toast]);

  // Creation form state
  const [creation, setCreation] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    image_url: "",
    status: "in_progress" as CreationStatus,
    selectedTags: [] as string[]
  });

  // Handle edit button click
  const handleEditClick = async (activity: ActivityItem) => {
    if (activity.type === 'creation') {
      try {
        const [creations] = await Promise.all([
          fetchCreations()
        ]);
        const creationToEdit = creations.find(c => c.id === activity.id);
        if (creationToEdit) {
          setEditingCreation(creationToEdit);
          setCreation({
            title: creationToEdit.title,
            description: creationToEdit.description || "",
            date: creationToEdit.date,
            image_url: creationToEdit.image_url || "",
            status: creationToEdit.status,
            selectedTags: creationToEdit.tags?.map(tag => tag.id) || []
          });
          setShowCreationForm(true);
        }
      } catch (error) {
        console.error("Error loading creation for edit:", error);
        toast({
          title: "Error",
          description: "Failed to load creation for editing",
          variant: "destructive",
        });
      }
    } else if (activity.type === 'journal') {
      // TODO: Handle journal edit
    } else if (activity.type === 'favorite') {
      // TODO: Handle favorite edit
    }
  };

  // Update form submission to handle both create and update
  const handleCreationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingCreation) {
        // Update existing creation
        const { error: updateError } = await supabase
          .from("creations")
          .update({
            title: creation.title,
            description: creation.description || null,
            date: creation.date,
            image_url: creation.image_url || null,
            status: creation.status
          })
          .eq("id", editingCreation.id);

        if (updateError) throw updateError;

        // Update tags
        if (creation.selectedTags.length > 0) {
          // First, delete existing tags
          const { error: deleteTagsError } = await supabase
            .from("creations_tags")
            .delete()
            .eq("creation_id", editingCreation.id);

          if (deleteTagsError) throw deleteTagsError;

          // Then, insert new tags
          const tagRelations = creation.selectedTags.map(tagId => ({
            creation_id: editingCreation.id,
            tag_id: tagId
          }));

          const { error: insertTagsError } = await supabase
            .from("creations_tags")
            .insert(tagRelations);

          if (insertTagsError) throw insertTagsError;
        }

        toast({
          title: "Success",
          description: "Creation updated successfully",
        });
      } else {
        // Create new creation
        const { data: newCreation, error: createError } = await supabase
          .from("creations")
          .insert({
            title: creation.title,
            description: creation.description || null,
            date: creation.date,
            image_url: creation.image_url || null,
            status: creation.status
          })
          .select()
          .single();

        if (createError) throw createError;

        // Add tags if any are selected
        if (creation.selectedTags.length > 0) {
          const tagRelations = creation.selectedTags.map(tagId => ({
            creation_id: newCreation.id,
            tag_id: tagId
          }));

          const { error: insertTagsError } = await supabase
            .from("creations_tags")
            .insert(tagRelations);

          if (insertTagsError) throw insertTagsError;
        }

        toast({
          title: "Success",
          description: "Creation added successfully",
        });
      }

      // Reset form and refresh data
      setShowCreationForm(false);
      setEditingCreation(null);
      setCreation({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        image_url: "",
        status: "in_progress",
        selectedTags: []
      });

      // Refresh stats and recent activity
      const [creations, journals, favorites] = await Promise.all([
        fetchCreations(),
        fetchJournals(),
        fetchFavorites()
      ]);

      setStats({
        creations: creations.length,
        journals: journals.length,
        favorites: favorites.length
      });

      // Update recent activity
      const activityItems: ActivityItem[] = [
        ...creations.map(creation => ({
          id: creation.id,
          type: 'creation' as const,
          title: creation.title,
          date: creation.date,
          icon: <Lightbulb className="h-4 w-4" />
        })),
        ...journals.map(journal => ({
          id: journal.id,
          type: 'journal' as const,
          title: journal.title,
          date: journal.created_at,
          icon: <FileText className="h-4 w-4" />
        })),
        ...favorites.map(favorite => ({
          id: favorite.id,
          type: 'favorite' as const,
          title: favorite.title,
          date: favorite.created_at,
          icon: <Bookmark className="h-4 w-4" />
        }))
      ];

      const sortedActivity = activityItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setRecentActivity(sortedActivity);
    } catch (error) {
      console.error("Error saving creation:", error);
      toast({
        title: "Error",
        description: "Failed to save creation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <div className="container mx-auto px-4 max-w-screen-xl py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Creations Card */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Creations</span>
                <Link 
                  to="/add-content" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                </Link>
              </CardTitle>
              <CardDescription className="text-white/50">
                {stats.creations} total creations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-white/70" />
                  <span className="text-white/70">Recent Activity</span>
                </div>
                <Link 
                  to="/creations" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Journals Card */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Journals</span>
                <Link 
                  to="/add-content" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                </Link>
              </CardTitle>
              <CardDescription className="text-white/50">
                {stats.journals} total journals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-white/70" />
                  <span className="text-white/70">Recent Activity</span>
                </div>
                <Link 
                  to="/journals" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Favorites Card */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Favorites</span>
                <Link 
                  to="/add-content" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                </Link>
              </CardTitle>
              <CardDescription className="text-white/50">
                {stats.favorites} total favorites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bookmark className="h-4 w-4 text-white/70" />
                  <span className="text-white/70">Recent Activity</span>
                </div>
                <Link 
                  to="/favorites" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <SectionHeading title="Recent Activity" />
            <div className="flex items-center space-x-4">
              <Link 
                to="/add-content" 
                className="inline-flex items-center px-4 py-2 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Creation
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {isLoadingActivity ? (
              <div className="text-white/50">Loading activity...</div>
            ) : recentActivity.length === 0 ? (
              <div className="text-white/50">No recent activity</div>
            ) : (
              recentActivity.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    {activity.icon}
                    <div>
                      <div className="text-white">{activity.title}</div>
                      <div className="text-sm text-white/50">
                        {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {activity.type === 'creation' && (
                      <>
                        <Link
                          to={`/creations/${activity.id}`}
                          className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/add-content?edit=${activity.id}`}
                          className="p-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 