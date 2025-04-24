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
    <div className="w-full subtle-grid bg-[#0A0A0A] text-white">
      <MouseTrail />
      <div className="relative z-0">
        <RainEffect />
      </div>
      <div className="relative z-10">
        {/* Vertical Navigation Squares */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col items-center">
            {/* Top Line */}
            <div className="w-0.5 h-8 bg-white/30 mb-4" />
            
            <div className="flex flex-col items-center gap-4">
              {['hero', 'topics', 'term', 'creations', 'journals', 'favorites'].map((section, index) => (
                <button
                  key={section}
                  onClick={() => {
                    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative w-2 h-2"
                  aria-label={`Go to ${section} section`}
                >
                  {/* Section Name Tooltip */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
                      <div className="bg-white text-black px-3 py-1 text-xs font-medium whitespace-nowrap">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Outline Square */}
                  <div className={`absolute inset-0 border border-white/30 transform transition-all duration-300 ${
                    activeSection === index ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                  }`} />
                  
                  {/* Filled Square */}
                  <div className={`absolute inset-0 bg-white transform transition-all duration-300 ${
                    activeSection === index ? 'rotate-45 opacity-100' : 'rotate-0 opacity-0'
                  }`} />
                </button>
              ))}
            </div>

            {/* Bottom Line */}
            <div className="w-0.5 h-8 bg-white/30 mt-4" />
          </div>
        </div>

        {/* Hero Section */}
        <section className="h-[calc(100vh-64px)] flex flex-col items-center justify-center py-8 sm:py-0 relative">
          {/* Random Topic Squares */}
          <div className="absolute top-[8%] left-[8%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Palette className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">DESIGN</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[8%] right-[8%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Cpu className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">TECH</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[8%] left-[8%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Brush className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">ART</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[8%] right-[8%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Lightbulb className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">INNOVATE</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[20%] left-[20%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <PenTool className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">CREATE</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[20%] right-[20%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Compass className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">EXPLORE</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[20%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Hammer className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">BUILD</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[20%] right-[20%]">
            <div className="w-24 h-24 border border-white/10 transform rotate-45 p-4 flex items-center justify-center square-glow">
              <div className="flex flex-col items-center -rotate-45">
                <Sparkles className="w-5 h-5 text-white/50 mb-1" />
                <span className="text-white/50 text-sm font-light tracking-wider">INSPIRE</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-16 -mt-20">
              {/* Image Container */}
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[80px] sm:text-[150px] md:text-[200px] -tracking-[0.1em] text-center">
                    <span className="font-['Antonio'] text-white/10 font-bold">CHENIUS</span>
                    <span className="font-['Antonio'] text-white/5 font-light">SPACE</span>
                  </span>
                </div>

                <div className="absolute inset-0">
                  <div className="absolute inset-0 border-2 sm:border-4 border-white/30 transform rotate-45 animate-glow" />
                  <div className="absolute inset-0 border-2 sm:border-4 border-white/30 transform -rotate-45 animate-glow-delay-1" />
                  <div className="absolute inset-0 border-2 sm:border-4 border-white/30 transform rotate-45 animate-glow-delay-2" />
                </div>
                
                <div className="relative overflow-hidden">
                  <img 
                    src="/images/chenius.png" 
                    alt="Chenius Space Home" 
                    className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500 animate-float rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section 
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen flex items-center justify-center py-24 border-t border-white/10"
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

