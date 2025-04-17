import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { RainEffect } from "@/components/ui/rain-effect";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RainEffect />
      <section className="flex-1">
        <div className="container relative flex flex-col items-center justify-center min-h-screen py-24">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to CHENIUS Space
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
              A creative space where ideas come to life. Explore my creations, read my journals, and discover what inspires me.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild>
                <Link to="/creations">
                  Explore Creations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Summary Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <SectionHeading
            title="Content Summary"
            description="Explore my collections and thoughts"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Creations Summary */}
            <div className="bg-white border border-chenius-gray-200 p-8">
              <h3 className="text-2xl font-heading tracking-tight mb-4">Creations</h3>
              <p className="text-chenius-gray-500 mb-6">
                A collection of my creative works, projects, and experiments.
              </p>
              <Link
                to="/creations"
                className="inline-flex items-center text-sm font-medium hover-underline"
              >
                View all creations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Journals Summary */}
            <div className="bg-white border border-chenius-gray-200 p-8">
              <h3 className="text-2xl font-heading tracking-tight mb-4">Journals</h3>
              <p className="text-chenius-gray-500 mb-6">
                Thoughts, ideas, and reflections on various topics.
              </p>
              <Link
                to="/journals"
                className="inline-flex items-center text-sm font-medium hover-underline"
              >
                Read all journals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Favorites Summary */}
            <div className="bg-white border border-chenius-gray-200 p-8">
              <h3 className="text-2xl font-heading tracking-tight mb-4">Favorites</h3>
              <p className="text-chenius-gray-500 mb-6">
                A curated collection of things I love and find inspiring.
              </p>
              <Link
                to="/favorites"
                className="inline-flex items-center text-sm font-medium hover-underline"
              >
                Explore favorites <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <SectionHeading
            title="About"
            description="Learn more about CHENIUS Space"
          />
          <div className="mt-12">
            <p className="text-lg text-chenius-gray-500 mb-8">
              CHENIUS Space is a personal collection of works, thoughts, and inspirations.
              It's a place where I share my creations, document my journey, and curate
              things that inspire me.
            </p>
            <Button asChild variant="outline" className="h-12">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
