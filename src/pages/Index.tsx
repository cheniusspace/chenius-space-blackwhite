import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Star, BookOpen, Palette } from "lucide-react";
import { RainEffect } from "@/components/ui/rain-effect";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Rain Effect */}
      <div className="fixed inset-0 z-10">
        <RainEffect />
      </div>
      
      {/* Content Container */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Welcome to CHENIUS Space
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                A minimalist digital space where creativity meets tranquility
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/creations">
                    Explore Creations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/journals">
                    Read Journals
                    <BookOpen className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-lg">
              <SectionHeading
                title="What You'll Find Here"
                description="A curated collection of creative works and thoughts"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 rounded-lg">
                  <Palette className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Visual Creations</h3>
                  <p className="text-muted-foreground">
                    Explore a collection of minimalist designs, artworks, and creative projects.
                  </p>
                </div>
                <div className="p-6 rounded-lg">
                  <BookOpen className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Thoughtful Journals</h3>
                  <p className="text-muted-foreground">
                    Read personal reflections, ideas, and experiences shared through writing.
                  </p>
                </div>
                <div className="p-6 rounded-lg">
                  <Star className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Curated Favorites</h3>
                  <p className="text-muted-foreground">
                    Discover a collection of inspiring works and references that influence my creative journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Preview Section */}
        <section className="py-24">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-lg">
              <SectionHeading
                title="Featured Content"
                description="A glimpse into the collections"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-8 rounded-lg">
                  <h3 className="text-2xl font-heading tracking-tight mb-4">Creations</h3>
                  <p className="text-muted-foreground mb-6">
                    A collection of my creative works, projects, and experiments.
                  </p>
                  <Link
                    to="/creations"
                    className="inline-flex items-center text-sm font-medium hover-underline"
                  >
                    View all creations <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="p-8 rounded-lg">
                  <h3 className="text-2xl font-heading tracking-tight mb-4">Journals</h3>
                  <p className="text-muted-foreground mb-6">
                    Thoughts, ideas, and reflections on various topics.
                  </p>
                  <Link
                    to="/journals"
                    className="inline-flex items-center text-sm font-medium hover-underline"
                  >
                    Read all journals <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                <div className="p-8 rounded-lg">
                  <h3 className="text-2xl font-heading tracking-tight mb-4">Favorites</h3>
                  <p className="text-muted-foreground mb-6">
                    A curated collection of inspiring works and references.
                  </p>
                  <Link
                    to="/favorites"
                    className="inline-flex items-center text-sm font-medium hover-underline"
                  >
                    Browse favorites <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;

