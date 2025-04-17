import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Star, BookOpen, Palette } from "lucide-react";
import { RainEffect } from "@/components/ui/rain-effect";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { useTheme } from "@/hooks/use-theme";
import { RainSound } from "@/components/ui/rain-sound";

const Index = () => {
  const theme = useTheme();
  const backgroundImage = theme === "dark" ? "/images/home-l.png" : "/images/home-r.png";

  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div className="absolute inset-0 h-screen flex">
        <div className="w-1/2 bg-background"></div>
        <div 
          className="w-1/2 bg-cover bg-center bg-no-repeat transition-all duration-300" 
          style={{ backgroundImage: `url('/images/home-r.png')` }}
        />
      </div>
      
      {/* Rain Effect */}
      <div className="absolute inset-0 z-10">
        <RainEffect />
      </div>
      
      {/* Content Container */}
      <div className="relative z-20">
        {/* Hero Section */}
        <div className="flex flex-col items-start justify-start min-h-screen px-4 md:px-12 pt-12">
          <div className="max-w-2xl w-full">
            <ChatBubble 
              message="PREPARE FOR ADVENTURE IN CHENIUS SPACE!"
              time="Just now"
            />
            <div className="mt-8">
              <ChatBubble 
                message="I love rain sound. I hope you too, toggle sound rain by clicking here"
                time="Just now"
                delay
              >
                <RainSound />
              </ChatBubble>
            </div>
          </div>
        </div>

        {/* Rest of the content */}
        <div className="bg-background">
          {/* Features Section */}
          <section className="py-24">
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
              <div className="p-8 cloud-card">
                <SectionHeading
                  title="What You'll Find Here"
                  description="A curated collection of creative works and thoughts"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="p-6 cloud-card">
                    <Palette className="h-8 w-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Visual Creations</h3>
                    <p className="text-muted-foreground">
                      Explore a collection of minimalist designs, artworks, and creative projects.
                    </p>
                  </div>
                  <div className="p-6 cloud-card">
                    <BookOpen className="h-8 w-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thoughtful Journals</h3>
                    <p className="text-muted-foreground">
                      Read personal reflections, ideas, and experiences shared through writing.
                    </p>
                  </div>
                  <div className="p-6 cloud-card">
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
              <div className="p-8 cloud-card">
                <SectionHeading
                  title="Featured Content"
                  description="A glimpse into the collections"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="p-8 cloud-card">
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

                  <div className="p-8 cloud-card">
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

                  <div className="p-8 cloud-card">
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
    </div>
  );
};

export default Index;

