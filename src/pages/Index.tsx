
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
              Welcome to CHENIUS Space
            </h1>
            <p className="text-xl md:text-2xl text-chenius-gray-500 mb-12">
              A minimalist collection of works, thoughts, and inspirations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="w-full sm:w-auto bg-black text-white hover:bg-chenius-gray-800">
                <Link to="/creations">
                  Explore Creations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/journals">
                  Read Journals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-chenius-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-chenius-gray-200 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Creations</h3>
              <p className="text-chenius-gray-500 mb-6">
                A showcase of visual works, designs, and creative projects.
              </p>
              <Link to="/creations" className="inline-flex items-center text-sm font-medium hover-underline">
                View Collection <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-8 border border-chenius-gray-200 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Journals</h3>
              <p className="text-chenius-gray-500 mb-6">
                Thoughts, reflections, and narratives from personal experiences.
              </p>
              <Link to="/journals" className="inline-flex items-center text-sm font-medium hover-underline">
                Read Entries <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-8 border border-chenius-gray-200 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Favorites</h3>
              <p className="text-chenius-gray-500 mb-6">
                A curated selection of inspirations, references, and influences.
              </p>
              <Link to="/favorites" className="inline-flex items-center text-sm font-medium hover-underline">
                Discover Collection <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                About CHENIUS Space
              </h2>
              <p className="text-chenius-gray-500 mb-4">
                CHENIUS Space is a personal digital gallery that embraces minimalism through a monochromatic aesthetic.
              </p>
              <p className="text-chenius-gray-500 mb-4">
                This space serves as a canvas for creative exploration, thoughtful writing, and curated inspirations — all presented through the timeless lens of black and white.
              </p>
              <p className="text-chenius-gray-500">
                The absence of color allows the content to speak for itself, emphasizing form, texture, and meaning above all else.
              </p>
            </div>
            <div className="bg-chenius-gray-200 aspect-square flex items-center justify-center">
              <span className="text-xl text-chenius-gray-500">Portrait Space</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
