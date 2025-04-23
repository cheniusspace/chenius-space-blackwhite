import { Link } from "react-router-dom";
import { RainEffect } from "@/components/ui/rain-effect";
import { MouseTrail } from "@/components/effects/MouseTrail";

export default function Index() {
  return (
    <div className="w-full subtle-grid bg-black text-white">
      <MouseTrail />
      <div className="relative z-0">
        <RainEffect />
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src="/images/home.png" 
                alt="Chenius Space Home" 
                className="mx-auto h-32 w-auto object-contain"
              />
            </div>
            <h1 className="text-7xl font-bold tracking-tight">
              <span className="brand-text-bold">CHENIUS</span>
              <span className="brand-text-thin">SPACE</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide mt-8">
              A digital space where creativity meets technology, 
              exploring the intersection of art, design, and innovation.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Link to="/creations" className="button-highlight px-6 py-3 text-sm uppercase tracking-wider">
                Explore Creations
              </Link>
              <Link to="/journals" className="button-highlight px-6 py-3 text-sm uppercase tracking-wider">
                Read Journals
              </Link>
            </div>
          </div>
        </div>

        {/* Creations Preview */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Recent Creations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-video bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <div className="p-4">
                    <h3 className="text-xl font-medium mb-2">Creation {item}</h3>
                    <p className="text-white/60">A brief description of the creation and its significance.</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/creations" className="button-highlight px-6 py-3 text-sm uppercase tracking-wider">
                View All Creations
              </Link>
            </div>
          </div>
        </section>

        {/* Journals Preview */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Latest Journals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-lg">
                  <div className="p-6 bg-white/5 group-hover:bg-white/10 transition-colors">
                    <h3 className="text-xl font-medium mb-2">Journal Entry {item}</h3>
                    <p className="text-white/60 mb-4">A preview of the journal entry content...</p>
                    <div className="text-sm text-white/40">Published on {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/journals" className="button-highlight px-6 py-3 text-sm uppercase tracking-wider">
                Read All Journals
              </Link>
            </div>
          </div>
        </section>

        {/* Favorites Preview */}
        <section className="py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Favorite {item}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/favorites" className="button-highlight px-6 py-3 text-sm uppercase tracking-wider">
                Browse All Favorites
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

