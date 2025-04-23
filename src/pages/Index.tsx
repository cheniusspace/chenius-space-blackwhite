import { Link } from "react-router-dom";
import { RainEffect } from "@/components/ui/rain-effect";
import { MouseTrail } from "@/components/effects/MouseTrail";
import { useState, useEffect } from "react";
import { fetchCreations, type Creation } from "@/services/creationsService";
import { fetchJournals, type Journal } from "@/services/journalsService";
import { fetchFavorites, type Favorite } from "@/services/favoritesService";
import { fetchTermOfTheDay, type Term } from "@/services/termsService";
import { fetchTopics, type Topic } from "@/services/topicsService";
import { CreationCard } from "@/components/creations/CreationCard";
import { TopicCard } from "@/components/topics/TopicCard";
import { ArrowRight, ExternalLink, BookOpen } from "lucide-react";

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

  return (
    <div className="w-full subtle-grid bg-black text-white">
      <MouseTrail />
      <div className="relative z-0">
        <RainEffect />
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-16">
              <img 
                src="/images/home.png" 
                alt="Chenius Space Home" 
                className="mx-auto h-32 w-auto object-contain"
              />
            </div>
            <h1 className="text-6xl font-bold tracking-tight mb-12">
              <span className="brand-text-bold">CHENIUS</span>
              <span className="brand-text-thin">SPACE</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide mb-16">
              A digital space where creativity meets technology, 
              exploring the intersection of art, design, and innovation.
            </p>
            <div className="flex justify-center gap-8">
              <Link to="/creations" className="button-highlight px-8 py-4 text-sm uppercase tracking-wider">
                Explore Creations
              </Link>
              <Link to="/journals" className="button-highlight px-8 py-4 text-sm uppercase tracking-wider">
                Read Journals
              </Link>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <section className="py-24 border-t border-white/10">
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
        <section className="py-24 border-t border-white/10">
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
        <section className="py-24 border-t border-white/10">
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
        <section className="py-24 border-t border-white/10">
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
        <section className="py-24 border-t border-white/10">
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

