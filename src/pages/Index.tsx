import { Link } from "react-router-dom";
import { RainEffect } from "@/components/ui/rain-effect";
import Layout from "@/components/layout/Layout";

export default function Index() {
  return (
    <Layout>
      <div className="min-h-screen w-full subtle-grid bg-black text-white">
        <div className="relative z-0">
          <RainEffect />
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-7xl font-bold tracking-tight">
                <span className="brand-text-bold">CHENIUS</span>
                <span className="brand-text-thin">SPACE</span>
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide mt-8">
                A digital space where creativity meets technology, 
                exploring the intersection of art, design, and innovation.
              </p>
              <div className="flex justify-center gap-6 mt-12">
                <Link to="/creations">
                  <button className="drawing-button">
                    Explore Creations
                  </button>
                </Link>
                <Link to="/journals">
                  <button className="drawing-button">
                    Read Journals
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

