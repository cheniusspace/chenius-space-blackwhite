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
import { ArrowRight, ExternalLink, BookOpen, Palette, Cpu, Brush, Lightbulb, PenTool, Compass, Hammer, Sparkles, Heart } from "lucide-react";

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
            {/* Main Circles */}
            <div className="absolute top-[20%] right-[10%] w-22 h-22 border border-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[20%] left-[5%] w-18 h-18 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[35%] left-[25%] w-26 h-26 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[60%] left-[52%] w-30 h-30 border border-[#333333]/80 rounded-full" />
            <div className="absolute top-[80%] left-[78%] w-28 h-28 border border-[#333333]/80 rounded-full" />

            {/* Small Dots */}
            <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute top-[35%] right-[48%] w-2 h-2 bg-[#333333]/80 rounded-full" />
            <div className="absolute bottom-[45%] right-[62%] w-2 h-2 bg-[#333333]/80 rounded-full" />

            {/* Lines */}
            <div className="absolute top-[18%] right-[15%] w-22 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[35deg]" />
            <div className="absolute bottom-[20%] left-[20%] w-26 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[55deg]" />
            <div className="absolute top-[38%] left-[30%] w-34 h-0.5 bg-gradient-to-r from-transparent via-[#333333]/80 to-transparent rotate-[95deg]" />

            {/* Large Circles */}
            <div className="absolute top-[25%] right-[25%] w-40 h-40 border border-[#333333]/70 rounded-full" />
            <div className="absolute bottom-[40%] right-[38%] w-46 h-46 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[55%] right-[52%] w-52 h-52 border border-[#333333]/70 rounded-full" />
            <div className="absolute top-[72%] left-[72%] w-38 h-38 border border-[#333333]/70 rounded-full" />

            {/* Extra Large Circles */}
            <div className="absolute top-[5%] left-[10%] w-58 h-58 border border-[#333333]/60 rounded-full" />
            <div className="absolute top-[65%] right-[15%] w-68 h-68 border border-[#333333]/60 rounded-full" />
          </div>

          <div className="container mx-auto px-4 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[90vh] items-center">
              {/* Left Column - Visual Elements */}
              <div className="lg:col-span-6 relative z-10">
                <div className="relative w-full aspect-square max-w-[500px] mx-auto">
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
                <div className="space-y-8 sm:space-y-12">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                      <span className="text-xs text-white/50 tracking-widest">MY UNKNOWN JOURNEY</span>
            </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none">
                      <span className="block text-white font-medium">Lost</span>
                      <span className="block text-white/80">But Finding</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
                      In the silence of my thoughts, I wander through shadows of uncertainty, seeking fragments of who I might become
                    </p>
          </div>

                  <div className="flex flex-wrap gap-6">
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
                  <div className="flex flex-wrap gap-4 sm:gap-8">
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

        {/* CHENIUS Space Section */}
        <section className="min-h-screen py-24 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                    <span className="text-xs text-white/50 tracking-widest">ABOUT THE SPACE</span>
              </div>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none">
                    <span className="block text-white font-medium">CHENIUS</span>
                    <span className="block text-white/80">Space</span>
                  </h2>

                  <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
                    A space where I embrace my imperfections and turn them into creative expressions. Through design, development, and self-discovery, I'm learning to appreciate every piece of myself.
                  </p>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white/90">Creative Exploration</h3>
                    <p className="text-white/60">
                      A collection of projects, experiments, and creations that showcase the intersection of art and technology.
                    </p>
                    <Link 
                      to="/creations"
                      className="group relative inline-block"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-6 py-3 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm text-white/90 tracking-widest">VIEW MY CREATIONS</span>
                      </button>
                    </Link>
          </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white/90">Personal Growth</h3>
                    <p className="text-white/60">
                      Documenting the journey of learning, failing, and evolving in the ever-changing landscape of digital creation.
                    </p>
                    <Link 
                      to="/journals"
                      className="group relative inline-block"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-6 py-3 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm text-white/90 tracking-widest">READ MY JOURNALS</span>
                      </button>
                    </Link>
              </div>
            </div>

                {/* Music Section */}
                <div className="space-y-6 pt-12 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                    <span className="text-xs text-white/50 tracking-widest">MY SONG</span>
          </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg text-white/60">
                      Thanks to Suno, I created a fun song that captures the essence of myself and this space. 
                      It's a musical journey through my creative process and the emotions behind this digital sanctuary.
                    </p>
                    <AudioPlayer />
                    <div className="mt-6">
                      <p className="text-sm text-white/60 mb-4">Also available on:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <a 
                          href="https://music.youtube.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          <span className="text-sm text-white/90">YouTube Music</span>
                        </a>
                        <a 
                          href="https://open.spotify.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">Spotify</span>
                        </a>
                        <a 
                          href="https://music.apple.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">Apple Music</span>
                        </a>
                        <a 
                          href="https://www.pandora.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">Pandora</span>
                        </a>
                        <a 
                          href="https://www.iheart.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">iHeartRadio</span>
                        </a>
                        <a 
                          href="https://www.deezer.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">Deezer</span>
                        </a>
                        <a 
                          href="https://www.tiktok.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">TikTok</span>
                        </a>
                        <a 
                          href="https://music.amazon.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.4c5.28 0 9.6 4.32 9.6 9.6s-4.32 9.6-9.6 9.6S2.4 17.28 2.4 12 6.72 2.4 12 2.4zm0 1.2c-4.68 0-8.4 3.72-8.4 8.4s3.72 8.4 8.4 8.4 8.4-3.72 8.4-8.4-3.72-8.4-8.4-8.4zm0 1.2c3.96 0 7.2 3.24 7.2 7.2s-3.24 7.2-7.2 7.2-7.2-3.24-7.2-7.2 3.24-7.2 7.2-7.2zm0 1.2c-3.36 0-6 2.64-6 6s2.64 6 6 6 6-2.64 6-6-2.64-6-6-6zm0 1.2c2.64 0 4.8 2.16 4.8 4.8s-2.16 4.8-4.8 4.8-4.8-2.16-4.8-4.8 2.16-4.8 4.8-4.8z"/>
                          </svg>
                          <span className="text-sm text-white/90">Amazon Music</span>
                        </a>
              </div>
            </div>
          </div>
                </div>

                {/* Favorites Section */}
                <div className="space-y-6 pt-12 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                    <span className="text-xs text-white/50 tracking-widest">MY FAVORITES</span>
                </div>
                
                  <div className="space-y-4">
                    <p className="text-lg text-white/60">
                      One of the easiest ways to get to know someone is by finding their favorites. I also create a curated list of my favorite things - not just to keep track of what I love, but also to share with the world the incredible people, places, and things that inspire me.
                    </p>
                    <Link 
                      to="/favorites"
                      className="group relative inline-block"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="relative px-6 py-3 bg-white/5 backdrop-blur-sm rounded-none border border-white/10 hover:border-white/20 transition-all duration-300">
                        <span className="text-sm text-white/90 tracking-widest">EXPLORE MY FAVORITES</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-white/10" />

        {/* Topics Section */}
        <section 
          id="topics"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen flex items-center justify-center py-24"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center mb-12">
                <h2 className="text-2xl font-bold mb-12">What You Can Find in the Space</h2>
                <div className="relative w-full max-w-6xl">
                  {/* Main Content Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Stats */}
                    <div className="space-y-8">
                      {/* Total Content */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-lg">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                          <p className="text-sm text-white/60 mb-4 tracking-widest">TOTAL CONTENT</p>
                          <p className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/60">
                            {recentCreations.length + recentJournals.length + featuredFavorites.length}
                          </p>
                          <p className="text-lg text-white/60 mt-4 tracking-widest">PIECES OF CONTENT TO EXPLORE</p>
                        </div>
                      </div>

                      {/* Content Categories */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Creations */}
                        <div className="group relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg">
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl opacity-50" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Palette className="w-10 h-10 text-white/90" />
                              </div>
                            </div>
                            <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{recentCreations.length}</p>
                            <p className="text-sm text-white/60 tracking-widest">CREATIONS</p>
                          </div>
                          <Link 
                            to="/creations"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
                          >
                            <span className="text-sm text-white/90 tracking-widest">EXPLORE</span>
                          </Link>
                        </div>

                        {/* Journals */}
                        <div className="group relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg">
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl opacity-50" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <BookOpen className="w-10 h-10 text-white/90" />
                              </div>
                            </div>
                            <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{recentJournals.length}</p>
                            <p className="text-sm text-white/60 tracking-widest">JOURNALS</p>
              </div>
              <Link 
                            to="/journals"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
              >
                            <span className="text-sm text-white/90 tracking-widest">EXPLORE</span>
              </Link>
            </div>

                        {/* Favorites */}
                        <div className="group relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg">
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl opacity-50" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Heart className="w-10 h-10 text-white/90" />
                              </div>
                  </div>
                            <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{featuredFavorites.length}</p>
                            <p className="text-sm text-white/60 tracking-widest">FAVORITES</p>
                </div>
                          <Link 
                            to="/favorites"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
                          >
                            <span className="text-sm text-white/90 tracking-widest">EXPLORE</span>
                          </Link>
                        </div>

                        {/* Topics Preview */}
                        <div className="group relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg">
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            <div className="relative w-20 h-20 mb-4">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl opacity-50" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Cpu className="w-10 h-10 text-white/90" />
                    </div>
                  </div>
                            <p className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{topics.length}</p>
                            <p className="text-sm text-white/60 tracking-widest">TOPICS</p>
                          </div>
                          <Link 
                            to="/topics"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center"
                          >
                            <span className="text-sm text-white/90 tracking-widest">EXPLORE</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Topics Grid */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg blur-3xl opacity-20" />
                      <div className="grid grid-cols-3 gap-2 relative">
                        {isLoading.topics ? (
                          [1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="animate-pulse">
                              <div className="aspect-square bg-white/5 rounded-lg" />
                  </div>
                          ))
                        ) : (
                          topics.map((topic) => (
                            <Link
                              key={topic.id}
                              to={topic.link}
                              className="group relative aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 rounded-lg"
                            >
                              <div className="absolute inset-0 flex items-center justify-center p-2">
                                <div className="relative w-12 h-12">
                                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl opacity-50" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                      src={topic.icon}
                                      alt={topic.title}
                                      className="w-6 h-6 text-platinum-500 transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-sm font-medium text-white/90 mb-1 text-center tracking-widest">{topic.title}</h3>
                                <p className="text-xs text-white/70 text-center line-clamp-2">{topic.description}</p>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 my-12" />
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


