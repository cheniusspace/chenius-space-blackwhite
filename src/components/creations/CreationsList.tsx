import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchCreations, type Creation } from "@/services/creationsService";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus } from "lucide-react";

interface CreationsListProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const CreationsList = ({ searchQuery = "", onSearchChange }: CreationsListProps) => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [internalSearchQuery, setInternalSearchQuery] = useState(searchQuery);
  const { toast } = useToast();

  useEffect(() => {
    const loadCreations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCreations();
        setCreations(data);
      } catch (error) {
        console.error("Error fetching creations:", error);
        toast({
          title: "Error",
          description: "Failed to load creations",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCreations();
  }, [toast]);

  const handleSearchChange = (query: string) => {
    setInternalSearchQuery(query);
    onSearchChange?.(query);
  };

  const filteredCreations = creations.filter(creation =>
    creation.title.toLowerCase().includes(internalSearchQuery.toLowerCase()) ||
    creation.description.toLowerCase().includes(internalSearchQuery.toLowerCase()) ||
    creation.tags.some(tag => tag.toLowerCase().includes(internalSearchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-muted-foreground">Loading creations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search creations..."
            value={internalSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button asChild>
          <Link to="/creations/new">
            <Plus className="mr-2 h-4 w-4" />
            New Creation
          </Link>
        </Button>
      </div>

      {/* Creations Grid */}
      {filteredCreations.length === 0 ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-muted-foreground mb-4">
              {internalSearchQuery ? "No creations found matching your search." : "No creations found."}
            </div>
            {!internalSearchQuery && (
              <Button asChild>
                <Link to="/creations/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first creation
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreations.map((creation) => (
            <Card key={creation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="line-clamp-2">{creation.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {creation.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creation.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {creation.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {creation.tags.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                          +{creation.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{new Date(creation.date).toLocaleDateString()}</span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/creations/${creation.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreationsList;
