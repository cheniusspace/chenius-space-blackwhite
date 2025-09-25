import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTagsList } from "@/hooks/useTagsList";
import { 
  FileText, 
  Bookmark, 
  Boxes,
  Clock, 
  ArrowRight,
  List,
  LayoutDashboard,
  Eye,
  Plus
} from "lucide-react";
import { fetchCreations } from "@/services/creationsService";
import { fetchJournals } from "@/services/journalsService";
import { fetchFavorites } from "@/services/favoritesService";
import { formatDistanceToNow } from "date-fns";
import CreationsList from "@/components/creations/CreationsList";
import type { Journal } from "@/services/journalsService";

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
  const [stats, setStats] = useState({
    creations: 0,
    journals: 0,
    favorites: 0
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreations, setShowCreations] = useState(false);
  const [showJournals, setShowJournals] = useState(false);
  const [showOverview, setShowOverview] = useState(true);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoadingJournals, setIsLoadingJournals] = useState(false);

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
            icon: <Boxes className="h-4 w-4" />
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

        // Sort by date (newest first) and limit to 6 items
        const sortedActivity = activityItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6);

        setRecentActivity(sortedActivity);
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        toast({
          title: "Error",
          description: "Failed to load recent activity",
          variant: "destructive",
        });
        setRecentActivity([]); // Set empty array on error
      } finally {
        setIsLoadingActivity(false);
      }
    };

    fetchRecentActivity();
  }, [toast]);

  const navItems = [
    {
      title: "Overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "#overview",
      onClick: () => {
        setShowOverview(true);
        setShowCreations(false);
        setShowJournals(false);
      }
    },
    {
      title: "All Creations",
      icon: <Boxes className="h-5 w-5" />,
      href: "#creations",
      onClick: () => {
        setShowCreations(true);
        setShowOverview(false);
        setShowJournals(false);
      }
    },
    {
      title: "All Journals",
      icon: <FileText className="h-5 w-5" />,
      href: "#journals",
      onClick: () => {
        setShowJournals(true);
        setShowOverview(false);
        setShowCreations(false);
      }
    }
  ];

  // Fetch journals when showing journals section
  useEffect(() => {
    const getJournals = async () => {
      if (showJournals) {
        setIsLoadingJournals(true);
        try {
          const data = await fetchJournals();
          setJournals(data);
        } catch (error) {
          console.error("Error fetching journals:", error);
          toast({
            title: "Error",
            description: "Failed to load journals",
            variant: "destructive",
          });
        } finally {
          setIsLoadingJournals(false);
        }
      }
    };

    getJournals();
  }, [showJournals, toast]);

  return (
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <div className="container mx-auto px-4 max-w-screen-xl py-24">
        <div className="flex gap-8">
          {/* Sticky Navigation */}
          <div className="w-64 shrink-0">
            <div className="sticky top-24 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={item.onClick}
                  className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Section */}
            {showOverview && (
              <>
                <div id="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {/* Creations Card */}
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors rounded-none">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/10 rounded-none">
                            <Boxes className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">Creations</CardTitle>
                            <CardDescription className="text-white/50">
                              {stats.creations} total creations
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <button 
                          onClick={() => {
                            setShowCreations(true);
                            setShowOverview(false);
                          }}
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">View all</span>
                        </button>
                        <Link 
                          to="/creations/new" 
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add</span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Journals Card */}
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors rounded-none">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/10 rounded-none">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">Journals</CardTitle>
                            <CardDescription className="text-white/50">
                              {stats.journals} total journals
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <button 
                          onClick={() => {
                            setShowJournals(true);
                            setShowOverview(false);
                          }}
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">View all</span>
                        </button>
                        <Link 
                          to="/journals/new" 
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add</span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Favorites Card */}
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors rounded-none">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white/10 rounded-none">
                            <Bookmark className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg">Favorites</CardTitle>
                            <CardDescription className="text-white/50">
                              {stats.favorites} total favorites
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <Link 
                          to="/favorites" 
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">View all</span>
                        </Link>
                        <Link 
                          to="/favorites/new" 
                          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="text-sm">Add</span>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity Section */}
                <div id="activity" className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-none">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {isLoadingActivity ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-white/50">Loading recent activity...</div>
                      </div>
                    ) : recentActivity.length === 0 ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-white/50">No recent activity found</div>
                      </div>
                    ) : (
                      recentActivity.map((activity) => (
                        <div 
                          key={`${activity.type}-${activity.id}`}
                          className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                        >
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-2 bg-white/10 rounded-none">
                                  {activity.icon}
                                </div>
                                <div>
                                  <div className="text-white font-medium">
                                    {activity.title}
                                  </div>
                                  <div className="text-sm text-white/50 mt-1">
                                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <span className="text-xs text-white/50 uppercase tracking-wider">
                                  {activity.type === 'creation' && 'Creation'}
                                  {activity.type === 'journal' && 'Journal'}
                                  {activity.type === 'favorite' && 'Favorite'}
                                </span>
                                <div className="flex items-center space-x-2">
                                  {activity.type === 'creation' && (
                                    <>
                                      <Link
                                        to={`/creations/${activity.id}`}
                                        className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        View
                                      </Link>
                                      <Link
                                        to={`/creations/${activity.id}/edit`}
                                        className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        Edit
                                      </Link>
                                    </>
                                  )}
                                  {activity.type === 'journal' && (
                                    <>
                                      <Link
                                        to={`/journals/${activity.id}`}
                                        className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        View
                                      </Link>
                                      <Link
                                        to={`/journals/${activity.id}/edit`}
                                        className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                      >
                                        Edit
                                      </Link>
                                    </>
                                  )}
                                  {activity.type === 'favorite' && (
                                    <Link
                                      to={`/favorites/${activity.id}`}
                                      className="px-3 py-1.5 text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                      View
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Creations Section */}
            {showCreations && (
              <div id="creations" className="space-y-6">
                <div className="flex items-center justify-between">
                  <SectionHeading
                    title="All Creations"
                    description="View and manage all your creations"
                  />
                  <Button asChild>
                    <Link to="/creations/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Creation
                    </Link>
                  </Button>
                </div>
                <CreationsList 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            )}

            {/* Journals Section */}
            {showJournals && (
              <div id="journals" className="space-y-6">
                <div className="flex items-center justify-between">
                  <SectionHeading
                    title="All Journals"
                    description="View and manage all your journal entries"
                  />
                  <Button asChild>
                    <Link to="/journals/new">
                      <Plus className="mr-2 h-4 w-4" />
                      New Journal
                    </Link>
                  </Button>
                </div>

                {isLoadingJournals ? (
                  <div className="min-h-[300px] flex items-center justify-center">
                    <div className="animate-pulse text-platinum-500/50">Loading...</div>
                  </div>
                ) : journals.length > 0 ? (
                  <div className="space-y-12">
                    {journals.map((journal) => (
                      <article key={journal.id} className="border-b border-platinum-500/10 pb-10">
                        <Link to={`/journals/${journal.id}`} className="block group">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center text-sm text-platinum-500/50 mb-3">
                              <span>{new Date(journal.date).toLocaleDateString('default', { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}</span>
                              <span>{journal.read_time}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading mb-4 group-hover:text-platinum-500 transition-colors">
                              {journal.title}
                            </h2>
                            <p className="text-platinum-500/50 mb-4">
                              {journal.excerpt}
                            </p>
                            <div className="mt-4">
                              <span className="inline-flex items-center text-sm font-medium hover-underline">
                                Read More <ArrowRight className="ml-1 h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="min-h-[300px] flex items-center justify-center">
                    <div className="text-platinum-500/50">No journals found</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 