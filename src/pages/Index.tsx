import { Link } from "react-router-dom";
import { RainEffect } from "@/components/ui/rain-effect";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { useState, useEffect, useRef } from "react";
import { fetchCreations, type Creation } from "@/services/creationsService";
import { fetchJournals, type Journal } from "@/services/journalsService";
import { fetchFavorites, type Favorite } from "@/services/favoritesService";
import { fetchTermOfTheDay, type Term } from "@/services/termsService";
import { fetchTopics, type Topic } from "@/services/topicsService";
import { CreationCard } from "@/components/creations/CreationCard";
import { TopicCard } from "@/components/topics/TopicCard";
import { ArrowRight, ExternalLink, BookOpen, Palette, Cpu, Brush, Lightbulb, PenTool, Compass, Hammer, Sparkles } from "lucide-react";

export default function Index() {
  const [recentCreations, setRecentCreations] = useState<Creation[]>([]);
  const [recentJournals, setRecentJournals] = useState<Journal[]>([]);
  const [featuredFavorites, setFeaturedFavorites] = useState<Favorite[]>([]);
  const [termOfTheDay, setTermOfTheDay] = useState<Term | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState({
    creations: true,
    journals: true,
    favorites: true,
    term: true,
    topics: true
  });
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const getRecentContent = async () => {
      try {
        // Fetch creations
        const creations = await fetchCreations();
        setRecentCreations(creations.slice(0, 3));
        setIsLoading(prev => ({ ...prev, creations: false }));

        // Fetch journals
        const journals = await fetchJournals();
        setRecentJournals(journals.slice(0, 2));
        setIsLoading(prev => ({ ...prev, journals: false }));

        // Fetch favorites
        const favorites = await fetchFavorites();
        setFeaturedFavorites(favorites.slice(0, 4));
        setIsLoading(prev => ({ ...prev, favorites: false }));

        // Fetch term of the day
        const term = await fetchTermOfTheDay();
        setTermOfTheDay(term);
        setIsLoading(prev => ({ ...prev, term: false }));

        // Fetch topics
        const topicsData = await fetchTopics();
        setTopics(topicsData);
        setIsLoading(prev => ({ ...prev, topics: false }));
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    getRecentContent();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="w-full subtle-grid bg-[#000000] text-white">
      <MouseTrail />
      <div className="relative z-[100]">
        <RainEffect />
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[90vh] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Random Circles - More Scattered with Padding */}
            <div className="absolute top-[20%] right-[10%] w-22 h-22 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[20%] left-[5%] w-18 h-18 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[35%] right-[18%] w-10 h-10 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[35%] left-[25%] w-26 h-26 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[45%] right-[30%] w-12 h-12 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[48%] left-[38%] w-16 h-16 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[60%] right-[45%] w-20 h-20 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[60%] left-[52%] w-30 h-30 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[70%] right-[58%] w-8 h-8 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[70%] left-[65%] w-24 h-24 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[80%] right-[72%] w-16 h-16 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[80%] left-[78%] w-28 h-28 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[90%] left-[92%] w-20 h-20 border border-[#333333]/80 rounded-full" />

            {/* Small Dots - More Scattered with Padding */}
            <div className="absolute top-[5%] left-[15%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[15%] left-[28%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[25%] left-[42%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[35%] right-[48%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[35%] left-[55%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[45%] right-[62%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[45%] left-[68%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[55%] right-[75%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[55%] left-[82%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[65%] right-[88%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[65%] left-[92%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[75%] right-[95%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[75%] left-[98%] w-1.5 h-1.5 bg-[#333333]/80 rounded-full" />

            {/* Lines - More Scattered with Padding */}
            <div className="absolute top-[8%] left-[10%] w-28 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[15deg]" />
            <div className="absolute top-[18%] right-[15%] w-22 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[35deg]" />
            <div className="absolute bottom-[20%] left-[20%] w-26 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[55deg]" />
            <div className="absolute top-[28%] right-[25%] w-20 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[75deg]" />
            <div className="absolute top-[38%] left-[30%] w-34 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[95deg]" />
            <div className="absolute bottom-[40%] right-[38%] w-24 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[115deg]" />
            <div className="absolute top-[48%] left-[45%] w-30 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[135deg]" />
            <div className="absolute bottom-[50%] right-[52%] w-18 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[155deg]" />
            <div className="absolute top-[58%] left-[58%] w-32 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[175deg]" />
            <div className="absolute top-[68%] right-[65%] w-26 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[195deg]" />
            <div className="absolute bottom-[65%] left-[72%] w-22 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[215deg]" />
            <div className="absolute bottom-[75%] right-[78%] w-28 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[235deg]" />

            {/* Additional Circles - More Scattered with Padding */}
            <div className="absolute top-[10%] left-[18%] w-34 h-34 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[25%] right-[25%] w-40 h-40 border border-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[25%] left-[32%] w-28 h-28 border border-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[40%] right-[38%] w-46 h-46 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[42%] left-[45%] w-22 h-22 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[55%] right-[52%] w-52 h-52 border border-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[55%] left-[58%] w-30 h-30 border border-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[70%] right-[65%] w-26 h-26 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[72%] left-[72%] w-38 h-38 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[85%] right-[78%] w-24 h-24 border border-[#333333]/70 rounded-full" />

            {/* Additional Small Dots - More Scattered with Padding */}
            <div className="absolute top-[15%] left-[22%] w-1.5 h-1.5 bg-[#333333]/70 rounded-full" />
            <div className="absolute top-[32%] right-[28%] w-2 h-2 bg-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[30%] left-[35%] w-1.5 h-1.5 bg-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[45%] right-[42%] w-2 h-2 bg-[#333333]/70 rounded-full" />
            <div className="absolute top-[45%] left-[48%] w-1.5 h-1.5 bg-[#333333]/70 rounded-full" />
            <div className="absolute top-[62%] right-[55%] w-2 h-2 bg-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[60%] left-[62%] w-1.5 h-1.5 bg-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[75%] right-[68%] w-2 h-2 bg-[#333333]/70 rounded-full" />
            <div className="absolute top-[75%] left-[75%] w-1.5 h-1.5 bg-[#333333]/70 rounded-full" />
            <div className="absolute top-[92%] right-[82%] w-2 h-2 bg-[#333333]/70 rounded-full" />

            {/* Extra Large Circles - More Scattered with Padding */}
            <div className="absolute top-[5%] left-[10%] w-58 h-58 border border-[#333333]/60 rounded-full" />
            <div className="absolute top-[65%] right-[15%] w-68 h-68 border border-[#333333]/60 rounded-full" />
            <div className="absolute bottom-[15%] left-[65%] w-63 h-63 border border-[#333333]/60 rounded-full" />
            <div className="absolute top-[35%] right-[68%] w-53 h-53 border border-[#333333]/60 rounded-full" />
            <div className="absolute top-[85%] left-[85%] w-72 h-72 border border-[#333333]/60 rounded-full" />
          </div>

          <div className="container mx-auto px-4 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[90vh] items-center">
              {/* Left Column - Visual Elements */}
              <div className="lg:col-span-6 relative z-10">
                <div className="relative w-full aspect-square">
                  {/* Main Image Container */}
                  <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl opacity-50 hover:opacity-80 transition-opacity duration-1000" />
                    <img 
                      src="/images/chenius.png" 
                      alt="Chenius Space Home" 
                      className="relative w-full h-full object-contain transform hover:scale-105 transition-all duration-500 opacity-80 hover:opacity-100 animate-[float_4s_ease-in-out_infinite]"
                    />
                  </div>

                  {/* Status Indicators */}
                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <div className="w-0.5 h-4 bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div className="lg:col-span-6 relative z-10">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                      <span className="text-xs text-white/50 tracking-widest">MY UNKNOWN JOURNEY</span>
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-light tracking-tight leading-none">
                      <span className="block text-white font-medium">Lost</span>
                      <span className="block text-white/80">But Finding</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/60 max-w-lg leading-relaxed">
                      In the silence of my thoughts, I wander through shadows of uncertainty, seeking fragments of who I might become
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm text-white/90 tracking-widest">TAKE A LOOK, WHO KNOWS WE ARE ALIKE</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/40">WEB DESIGN</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/40">ARCHITECTURE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/40">MUSIC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/40">DIGITAL ART</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/40">SELF DEV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Down Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button 
              onClick={() => {
                const topicsSection = document.getElementById('topics');
                topicsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center gap-1 group"
            >
              <span className="text-xs text-white/50 tracking-widest">EXPLORE MORE</span>
              <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Topics Section */}
        <section 
          id="topics"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen flex items-center justify-center py-24"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Explore Topics</h2>
                <p className="text-platinum-500/70">
                  Discover our diverse collection of interests and expertise, from creative arts to technical innovations.
                </p>
              </div>
              <Link 
                to="/topics" 
                className="group flex items-center gap-2 text-platinum-500/50 hover:text-platinum-500 transition-colors"
              >
                View All Topics
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M8 6h8M6 10h12M4 14h16M6 18h12"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading">Content Overview</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold mb-2">{recentCreations.length}</p>
                    <p className="text-platinum-500/70">Creations</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {recentCreations.slice(0, 3).map((creation) => (
                        <span 
                          key={creation.id}
                          className="px-3 py-1 text-xs bg-white/10"
                        >
                          {creation.category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-2">{featuredFavorites.length}</p>
                    <p className="text-platinum-500/70">Favorites</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {featuredFavorites.slice(0, 3).map((favorite) => (
                        <span 
                          key={favorite.id}
                          className="px-3 py-1 text-xs bg-white/10"
                        >
                          {favorite.category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-bold mb-2">{recentJournals.length}</p>
                    <p className="text-platinum-500/70">Journals</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {recentJournals.slice(0, 3).map((journal) => (
                        <span 
                          key={journal.id}
                          className="px-3 py-1 text-xs bg-white/10"
                        >
                          {journal.tags?.[0] || 'General'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {isLoading.topics ? (
                <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="animate-pulse">
                      <div className="h-32 bg-white/5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {topics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      title={topic.title}
                      icon={topic.icon}
                      link={topic.link}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Term of the Day */}
        <section 
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen flex items-center justify-center py-24 border-t border-white/10"
        >
          <div className="container mx-auto px-4">
            {isLoading.term ? (
              <div className="max-w-3xl mx-auto animate-pulse">
                <div className="h-6 bg-white/5 w-3/4 mx-auto mb-4" />
                <div className="h-4 bg-white/5 w-1/4 mx-auto" />
              </div>
            ) : termOfTheDay ? (
              <div className="max-w-3xl mx-auto text-center">
                <BookOpen className="h-10 w-10 mx-auto mb-6 text-platinum-500/50" />
                <div className="space-y-6">
                  <h3 className="text-2xl font-heading font-light">
                    {termOfTheDay.term}
                  </h3>
                  <p className="text-platinum-500/50 text-lg">
                    {termOfTheDay.definition}
                  </p>
                  <div className="text-platinum-500/50">
                    <p className="font-medium">{termOfTheDay.category}</p>
                    {termOfTheDay.example && (
                      <p className="text-base mt-2 italic">"{termOfTheDay.example}"</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-platinum-500/50">
                No term available
              </div>
            )}
          </div>
        </section>

        {/* Creations Preview */}
        <section 
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen flex items-center justify-center py-24 border-t border-white/10"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-bold">Recent Creations</h2>
              <Link 
                to="/creations" 
                className="group flex items-center gap-2 text-platinum-500/50 hover:text-platinum-500 transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {isLoading.creations ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-[4/3] bg-white/5 rounded-lg" />
                    <div className="mt-6 space-y-3">
                      <div className="h-5 bg-white/5 w-2/3" />
                      <div className="h-4 bg-white/5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCreations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentCreations.map((creation) => (
                  <div key={creation.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
                      {creation.image_url && (
                        <img
                          src={creation.image_url}
                          alt={creation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full mb-2">
                          {creation.category}
                        </span>
                        <h3 className="text-xl font-heading mb-2">{creation.title}</h3>
                        <p className="text-base text-platinum-500/70 line-clamp-2">{creation.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-platinum-500/50">
                No creations found
              </div>
            )}
          </div>
        </section>

        {/* Journals Preview */}
        <section 
          ref={(el) => (sectionsRef.current[4] = el)}
          className="min-h-screen flex items-center justify-center py-24 border-t border-white/10"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-bold">Latest Journals</h2>
              <Link 
                to="/journals" 
                className="group flex items-center gap-2 text-platinum-500/50 hover:text-platinum-500 transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {isLoading.journals ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[1, 2].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="h-4 bg-white/5 w-1/4 mb-6" />
                    <div className="h-8 bg-white/5 w-3/4 mb-4" />
                    <div className="h-4 bg-white/5 w-full mb-4" />
                    <div className="h-4 bg-white/5 w-1/2" />
                  </div>
                ))}
              </div>
            ) : recentJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {recentJournals.map((journal) => (
                  <Link 
                    key={journal.id} 
                    to={`/journals/${journal.id}`}
                    className="group block p-8 bg-white/5 hover:bg-white/10 transition-colors rounded-lg"
                  >
                    <div className="flex justify-between items-center text-sm text-platinum-500/50 mb-4">
                      <span>{new Date(journal.date).toLocaleDateString('default', { 
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                      <span>{journal.read_time}</span>
                    </div>
                    <h3 className="text-2xl font-heading mb-6 group-hover:text-platinum-500 transition-colors">
                      {journal.title}
                    </h3>
                    <p className="text-platinum-500/50 text-lg mb-6">
                      {journal.excerpt}
                    </p>
                    <div className="mt-6">
                      <span className="inline-flex items-center text-sm font-medium hover-underline">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-platinum-500/50">
                No journals found
              </div>
            )}
          </div>
        </section>

        {/* Favorites Preview */}
        <section 
          ref={(el) => (sectionsRef.current[5] = el)}
          className="min-h-screen flex items-center justify-center py-24 border-t border-white/10"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-bold">Featured Favorites</h2>
              <Link 
                to="/favorites" 
                className="group flex items-center gap-2 text-platinum-500/50 hover:text-platinum-500 transition-colors"
              >
                View All
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {isLoading.favorites ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-square bg-white/5 rounded-lg mb-6" />
                    <div className="h-6 bg-white/5 w-3/4 mb-4" />
                    <div className="h-4 bg-white/5 w-1/2" />
                  </div>
                ))}
              </div>
            ) : featuredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {featuredFavorites.map((favorite) => (
                  <div key={favorite.id} className="group">
                    <div className="aspect-square bg-rich_black-500/50 rounded-lg mb-6 overflow-hidden">
                      {favorite.image_url && (
                        <img
                          src={favorite.image_url}
                          alt={favorite.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-heading mb-3">{favorite.title}</h3>
                    <p className="text-platinum-500/50 mb-4">{favorite.author}</p>
                    {favorite.external_link && (
                      <a
                        href={favorite.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium hover-underline"
                      >
                        View Details <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-platinum-500/50">
                No favorites found
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

