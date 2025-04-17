import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Star, BookOpen, Palette } from "lucide-react";
import { RainEffect } from "@/components/ui/rain-effect";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url('/images/home-r.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 z-10">
          <RainEffect />
        </div>
        <div className="relative z-20 container mx-auto px-4 md:px-6 h-screen flex items-center">
          <div className="max-w-2xl mx-auto text-white">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Welcome to CHENIUS Space
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              A minimalist digital space where creativity meets tranquility
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100">
                <Link to="/creations">
                  Explore Creations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto border-white text-white hover:bg-white/10">
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
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <SectionHeading
            title="What You'll Find Here"
            description="A curated collection of creative works and thoughts"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 border border-gray-200 bg-white">
              <Palette className="h-8 w-8 mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Visual Creations</h3>
              <p className="text-gray-600">
                Explore a collection of minimalist designs, artworks, and creative projects.
              </p>
            </div>
            <div className="p-6 border border-gray-200 bg-white">
              <BookOpen className="h-8 w-8 mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Thoughtful Journals</h3>
              <p className="text-gray-600">
                Read personal reflections, ideas, and experiences shared through writing.
              </p>
            </div>
            <div className="p-6 border border-gray-200 bg-white">
              <Star className="h-8 w-8 mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Curated Favorites</h3>
              <p className="text-gray-600">
                Discover a collection of inspiring works and references that influence my creative journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Preview Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <SectionHeading
            title="Featured Content"
            description="A glimpse into the collections"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 p-8 border border-gray-200">
              <h3 className="text-2xl font-heading tracking-tight mb-4 text-gray-800">Creations</h3>
              <p className="text-gray-600 mb-6">
                A collection of my creative works, projects, and experiments.
              </p>
              <Link
                to="/creations"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 hover-underline"
              >
                View all creations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200">
              <h3 className="text-2xl font-heading tracking-tight mb-4 text-gray-800">Journals</h3>
              <p className="text-gray-600 mb-6">
                Thoughts, ideas, and reflections on various topics.
              </p>
              <Link
                to="/journals"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 hover-underline"
              >
                Read all journals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-8 border border-gray-200">
              <h3 className="text-2xl font-heading tracking-tight mb-4 text-gray-800">Favorites</h3>
              <p className="text-gray-600 mb-6">
                A curated collection of things I love and find inspiring.
              </p>
              <Link
                to="/favorites"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 hover-underline"
              >
                Explore favorites <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <SectionHeading
            title="About CHENIUS Space"
            description="A minimalist digital gallery"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                CHENIUS Space is a personal digital gallery that embraces minimalism through a monochromatic aesthetic.
                This space serves as a canvas for creative exploration, thoughtful writing, and curated inspirations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                The absence of color allows the content to speak for itself, emphasizing form, texture, and meaning above all else.
              </p>
              <Button asChild variant="outline" className="h-12 border-gray-300 text-gray-700 hover:bg-gray-100">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-gray-200 aspect-square flex items-center justify-center">
              <span className="text-xl text-gray-500">Portrait Space</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions or want to collaborate? Feel free to reach out.
          </p>
          <Button asChild size="lg" className="bg-gray-800 text-white hover:bg-gray-700">
            <Link to="/contact">
              Contact Me <MessageSquare className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

