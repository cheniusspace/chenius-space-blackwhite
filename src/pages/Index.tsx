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
import { ArrowRight, ExternalLink, BookOpen, Palette, Cpu, Brush, Lightbulb, PenTool, Compass, Hammer, Sparkles, Heart, ChevronRight, Users, Globe, Book, Building2 } from "lucide-react";
import ContentSpace from '../components/ContentSpace';
import { motion } from "framer-motion";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress}%`;
        }
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300 p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            {isPlaying ? (
              <svg 
                className="w-5 h-5 text-white/90"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            ) : (
              <svg 
                className="w-5 h-5 text-white/90"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <div 
              className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                ref={progressBarRef}
                className="h-full bg-white/90 w-0 transition-all duration-100"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
              <span className="text-xs text-white/60">{formatTime(duration)}</span>
            </div>
          </div>
          <button 
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
          >
            {isMuted ? (
              <svg 
                className="w-4 h-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" 
                />
              </svg>
            ) : (
              <svg 
                className="w-4 h-4"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
                />
              </svg>
            )}
          </button>
        </div>
        <audio 
          ref={audioRef}
          src="/sounds/ImCHENIUS.mp3"
          className="hidden"
        />
      </div>
    </div>
  );
}

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
    <div className="w-full subtle-grid bg-gray-500 text-white">
      <MouseTrail />
      <div className="relative z-[100]">
        <RainEffect />
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Small Dots */}
            <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[35%] right-[48%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[45%] right-[62%] w-2 h-2 bg-[#333333]/80 rounded-full" />
          </div>

          <div className="container mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center max-w-screen-xl mx-auto">
              {/* Left Column - Visual Elements */}
              <div className="lg:col-span-6 relative z-10 order-2 lg:order-1">
                <div className="relative w-full aspect-[3/4] max-w-[1000px] mx-auto">
                  {/* Halo Effect */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_60%)] blur-md" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_40%)] blur-sm" />
                  </div>
                  {/* Main Image Container */}
                  <div className="relative w-full h-full">
                    {/* Halo Effect */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_60%)] blur-md" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_40%)] blur-sm" />
                    </div>
                    <motion.img 
                      src="/images/chenius.png" 
                      alt="Chenius Space Home" 
                      className="relative w-full h-full object-contain"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.005, 1],
                        opacity: [0.95, 1, 0.95],
                      }}
                      transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [0, 0.5, 1],
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div className="lg:col-span-6 relative z-10 order-1 lg:order-2">
                <div className="space-y-6 sm:space-y-8 lg:space-y-12 text-center lg:text-left">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-center lg:justify-start gap-3">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                      <span className="text-xs text-white/50 tracking-widest">MY UNKNOWN JOURNEY</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none">
                      <span className="block text-white font-medium">Lost</span>
                      <span className="block text-white/80">But Finding</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                      In the silence of my thoughts, I wander through shadows of uncertainty, seeking fragments of who I might become
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                    <button 
                      onClick={() => {
                        const aboutSection = document.querySelector('.min-h-screen.py-24.border-t.border-white\\/10');
                        aboutSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group relative"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm text-white/90 tracking-widest">TAKE A LOOK, WHO KNOWS WE'RE PART OF EACH OTHER'S JOURNEY</span>
                      </div>
                    </button>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8">
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
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#11131F] text-white/50 text-sm tracking-widest">ABOUT THE SPACE</span>
          </div>
        </div>

        {/* CHENIUS Space Section */}
        <section className="min-h-screen py-24">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">ABOUT THE SPACE</span>
              </div>
              <h2 className="text-5xl font-light tracking-tight">
                <span className="text-white font-medium">CHENIUS</span> Space
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-16">
              A space where I embrace my indiscipline and impatience, transforming them into creative expressions. 
            </p>

            {/* Creative Exploration Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Link 
                    to="/creations"
                    className="block"
                  >
                    <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-white/5 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                      <img 
                        src="/images/creative-exploration.png" 
                        alt="Creative Exploration"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 p-4 bg-black/50 backdrop-blur-sm rounded-none border-l border-b border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
                        <ChevronRight className="w-8 h-8 text-white/90 -rotate-45" />
                      </div>
                    </div>
                  </Link>
                  <h3 className="text-xl font-medium text-white/90">Creative Exploration</h3>
                  <p className="text-white/60">
                    A collection of projects, experiments, and creations that showcase the intersection of art and technology.
                  </p>
                </div>
                <div className="space-y-4">
                  <Link 
                    to="/journals"
                    className="block"
                  >
                    <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-white/5 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                      <img 
                        src="/images/personal-growth.png" 
                        alt="Personal Growth"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 p-4 bg-black/50 backdrop-blur-sm rounded-none border-l border-b border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
                        <ChevronRight className="w-8 h-8 text-white/90 -rotate-45" />
                      </div>
                    </div>
                  </Link>
                  <h3 className="text-xl font-medium text-white/90">Personal Growth</h3>
                  <p className="text-white/60">
                    Documenting the journey of learning, failing, and evolving in the ever-changing landscape of digital creation.
                  </p>
                </div>
              </div>
            </div>

            {/* Music Section */}
            <div className="space-y-6 pt-12 border-t border-white/10 mt-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">SONG ABOUT CHENIUS</span>
              </div>
              
              <div className="space-y-4">
                <AudioPlayer />
                <div className="mt-6">
                  <p className="text-sm text-white/60 mb-4">Also available on:</p>
                  <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4">
                    <a 
                      href="https://music.youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300 whitespace-nowrap"
                    >
                      <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="text-sm text-white/90">YouTube Music</span>
                    </a>
                    {/* Other music platform links */}
                  </div>
                </div>
              </div>
            </div>

            {/* Favorites Section */}
            <div className="space-y-6 pt-12 border-t border-white/10 mt-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">MY FAVORITES</span>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-white/60">
                  I don't wanna lose track of my favorite people, places and things
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-white/90" />
                    <span className="text-sm text-white/60">People</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-white/90" />
                    <span className="text-sm text-white/60">Websites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-white/90" />
                    <span className="text-sm text-white/60">Books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-white/90" />
                    <span className="text-sm text-white/60">Organizations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#11131F] text-white/50 text-sm tracking-widest">EXPLORE THE SPACE</span>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">EXPLORE THE SPACE</span>
              </div>
              <h2 className="text-5xl font-light tracking-tight">
                <span className="text-white font-medium">Topics</span> I'm Exploring
              </h2>
            </div>
            <div className="relative">
              <ContentSpace />
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#11131F] text-white/50 text-sm tracking-widest">RECENT CREATIONS</span>
          </div>
        </div>

        {/* Creations Preview */}
        <section 
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-24"
        >
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">RECENT WORK</span>
              </div>
              <h2 className="text-5xl font-light tracking-tight">
                <span className="text-white font-medium">Creative</span> Explorations
              </h2>
            </div>
            
            {isLoading.creations ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`animate-pulse ${item === 2 ? 'md:col-span-2' : ''}`}>
                    <div className="aspect-[4/3] bg-white/5 rounded-none" />
                    <div className="mt-6 space-y-3">
                      <div className="h-5 bg-white/5 w-2/3" />
                      <div className="h-4 bg-white/5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCreations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {recentCreations.map((creation, index) => (
                  <div key={creation.id} className={`group ${index === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-white/5">
                      {creation.image_url && (
                        <img
                          src={creation.image_url}
                          alt={creation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                            <span className="text-xs text-white/50 tracking-widest">{creation.category}</span>
                          </div>
                          <h3 className="text-2xl font-light">{creation.title}</h3>
                          <p className="text-sm text-white/70 line-clamp-2">{creation.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/50">
                No creations found
              </div>
            )}
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#11131F] text-white/50 text-sm tracking-widest">LATEST JOURNALS</span>
          </div>
        </div>

        {/* Journals Preview */}
        <section 
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-24"
        >
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">LATEST JOURNALS</span>
              </div>
              <h2 className="text-5xl font-light tracking-tight">
                <span className="text-white font-medium">Personal</span> Reflections
              </h2>
            </div>

            {isLoading.journals ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`animate-pulse ${item === 1 ? 'md:col-span-2' : ''}`}>
                    <div className="h-48 bg-white/5 rounded-none" />
                    <div className="mt-6 space-y-3">
                      <div className="h-5 bg-white/5 w-2/3" />
                      <div className="h-4 bg-white/5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {recentJournals.map((journal, index) => (
                  <div key={journal.id} className={`group ${index === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="relative h-48 overflow-hidden rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative h-full p-8 flex flex-col">
                        <div className="space-y-6 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-white/50 tracking-widest">
                              {new Date(journal.date).toLocaleDateString('default', { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-xs text-white/50">•</span>
                            <span className="text-xs text-white/50">{journal.read_time}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-light group-hover:text-white transition-colors">{journal.title}</h3>
                            <p className="text-sm text-white/70 line-clamp-2">{journal.excerpt}</p>
                          </div>
                        </div>
                        <div className="mt-8">
                          <Link 
                            to={`/journals/${journal.id}`}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
                          >
                            <span className="text-sm tracking-widest">READ MORE</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/50">
                No journals found
              </div>
            )}
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#11131F] text-white/50 text-sm tracking-widest">FEATURED FAVORITES</span>
          </div>
        </div>

        {/* Favorites Preview */}
        <section 
          ref={(el) => (sectionsRef.current[3] = el)}
          className="py-24"
        >
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-xs text-white/50 tracking-widest">FEATURED FAVORITES</span>
              </div>
              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-light tracking-tight">
                  <span className="block text-white font-medium">My</span>
                  <span className="block text-white/80">Favorites</span>
                </h2>
                <Link 
                  to="/favorites" 
                  className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                >
                  <span className="text-sm tracking-widest">VIEW ALL FAVORITES</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
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


