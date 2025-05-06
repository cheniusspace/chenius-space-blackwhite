
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
import { ArrowRight, ExternalLink, BookOpen, Palette, Cpu, Brush, Lightbulb, PenTool, Compass, Hammer, Sparkles, Heart, ChevronRight, Users, Globe, Book, Building2, MessageSquare } from "lucide-react";
import ContentSpace from '../components/ContentSpace';
import { motion } from "framer-motion";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Sample lyrics with timestamps
  const lyrics = [
    { time: 0, text: "In the shadows of my childhood" },
    { time: 4, text: "Where love was hard to find" },
    { time: 8, text: "I built walls to protect my heart" },
    { time: 12, text: "But now it's time to unwind" },
    { time: 16, text: "Through the pain and through the tears" },
    { time: 20, text: "I'm learning to be free" },
    { time: 24, text: "Finding strength in my own voice" },
    { time: 28, text: "As I heal and grow with me" },
    { time: 32, text: "Every scar tells a story" },
    { time: 36, text: "Of battles fought within" },
    { time: 40, text: "But I'm rising from the ashes" },
    { time: 44, text: "Ready to begin again" },
  ];

  const [currentLyric, setCurrentLyric] = useState(lyrics[0]);

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
        
        // Update current lyric
        const currentLyricIndex = lyrics.findIndex((lyric, index) => {
          const nextLyric = lyrics[index + 1];
          return nextLyric ? 
            audio.currentTime >= lyric.time && audio.currentTime < nextLyric.time :
            audio.currentTime >= lyric.time;
        });
        
        if (currentLyricIndex !== -1) {
          setCurrentLyric(lyrics[currentLyricIndex]);
        }
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

  const handleVolumeChange = (delta: number) => {
    if (audioRef.current) {
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      audioRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
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
        <div className="flex flex-col gap-4">
          {/* Lyrics Display */}
          <div className="relative h-16 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-lg text-white/90 font-light">{currentLyric.text}</p>
                <button 
                  onClick={() => setShowLyrics(!showLyrics)}
                  className="text-xs text-white/50 hover:text-white/90 transition-colors"
                >
                  {showLyrics ? 'Hide Lyrics' : 'Show All Lyrics'}
                </button>
              </div>
            </div>
          </div>

          {/* Full Lyrics Panel */}
          {showLyrics && (
            <div className="max-h-48 overflow-y-auto space-y-2 p-4 bg-white/5 rounded-none border border-white/10">
              {lyrics.map((lyric, index) => (
                <div 
                  key={index}
                  className={`text-sm transition-colors ${
                    lyric === currentLyric 
                      ? 'text-white/90 font-medium' 
                      : 'text-white/50'
                  }`}
                >
                  {lyric.text}
                </div>
              ))}
            </div>
          )}

          {/* Player Controls */}
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
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
              >
                {volume === 0 ? (
                  <svg 
                    className="w-5 h-5"
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
                    className="w-5 h-5"
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
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                    setVolume(newVolume);
                    audioRef.current.muted = newVolume === 0;
                    setIsMuted(newVolume === 0);
                  }
                }}
                className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
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
    favorites: true
  });
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const getRecentContent = async () => {
      try {
        const [creations, journals, favorites] = await Promise.all([
          fetchCreations(),
          fetchJournals(),
          fetchFavorites()
        ]);

        setRecentCreations(creations.slice(0, 3));
        setRecentJournals(journals.slice(0, 2));
        setFeaturedFavorites(favorites.slice(0, 4));
        
        setIsLoading({
          creations: false,
          journals: false,
          favorites: false
        });
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
    <div className="w-full subtle-grid bg-homepage-blue/10 text-white">
      <MouseTrail />
      <div className="relative z-[100]">
        <RainEffect />
      </div>
      <div className="relative z-10 font-['Jost']">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Small Dots */}
            <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-homepage-purple/80 rounded-full" />
            <div className="absolute bottom-[25%] right-[35%] w-2 h-2 bg-homepage-lavender/80 rounded-full" />
            <div className="absolute top-[35%] right-[48%] w-2 h-2 bg-homepage-lightBlue/80 rounded-full" />
            <div className="absolute bottom-[45%] right-[62%] w-2 h-2 bg-homepage-pink/80 rounded-full" />
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
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl w-full">
                      <span className="block text-white tracking-wide font-semibold">Lost</span>
                      <span className="block text-white/80 font-extralight tracking-normal">But Finding</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      In the silence of my thoughts, I wander through shadows of uncertainty, seeking fragments of who I might become
                    </p>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/60">WEB DESIGN</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/60">ARCHITECTURE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/60">SELF DISCOVERY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/30 rounded-full" />
                      <span className="text-xs text-white/60">TECHNOLOGY</span>
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
            <span className="px-4 bg-homepage-blue/20 text-homepage-pink text-base tracking-widest">ABOUT CHENIUS SPACE</span>
          </div>
        </div>

        {/* About Section */}
        <section className="min-h-screen py-24">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-sm text-white/50 tracking-widest uppercase">Brief Introduction</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-extralight">About Me and </span>
                <span className="text-white/80 font-bold">Chenius Space</span>
              </h2>
            </div>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mb-16">
            My name is Tran, but I go by Chenius—a name I've chosen to encourage myself to pursue my passions. CHENIUS space is where I embrace my indiscipline and impatience, transforming them into creative expressions.
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
                  <h3 className="text-lg md:text-xl font-medium text-white/90">Creations</h3>
                  <p className="text-base md:text-lg text-white/70">
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
                  <h3 className="text-lg md:text-xl font-medium text-white/90">Journals</h3>
                  <p className="text-base md:text-lg text-white/70">
                    Documenting the journey of learning, failing, and evolving in the ever-changing landscape of digital creation.
                  </p>
                </div>
              </div>
            </div>

            {/* Music Section */}
            <div className="space-y-6 pt-12 border-t border-white/10 mt-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-base text-white/50 tracking-widest">HEALING JOURNEY</span>
              </div>
              
              <div className="space-y-4">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-none border border-white/10 p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-light">"Scars of Yesterday" - A Healing Journey</h3>
                    <p className="text-white/70">
                      A deeply personal album created with SUNO AI, exploring the path of healing from childhood trauma and parental relationships. Each track represents a step in the journey of self-discovery and emotional recovery.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="https://open.spotify.com/album/your-album-id" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-2 10c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm3-5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3 3z"/>
                        </svg>
                        <span className="text-sm text-white/90">Listen on Spotify</span>
                      </a>
                      <a 
                        href="https://music.youtube.com/playlist?list=your-playlist-id" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-sm text-white/90">YouTube Music</span>
                      </a>
                      <a 
                        href="https://music.apple.com/album/your-album-id" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-2 10c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm3-5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3 3z"/>
                        </svg>
                        <span className="text-sm text-white/90">Apple Music</span>
                      </a>
                    </div>
                  </div>
                </div>
                <AudioPlayer />
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
            <span className="px-4 bg-[#111111] text-white/50 text-base tracking-widest">EXPLORE THE SPACE</span>
          </div>
        </div>

        {/* Topics Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-sm text-white/50 tracking-widest uppercase">what you can find here</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-bold">Areas </span>
                <span className="text-white/80 font-extralight">I'm exploring</span>
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
            <span className="px-4 bg-[#111111] text-white/50 text-base tracking-widest">RECENT CREATIONS</span>
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
                <span className="text-xs text-white/50 tracking-widest">RECENT PROJECTS</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-extralight">CHENIUS </span>
                <span className="text-white/80 font-bold">Creations</span>
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
                  <Link 
                    key={creation.id} 
                    to={`/creations/${creation.id}`}
                    className={`group ${index === 0 ? 'md:col-span-2' : ''}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-white/5">
                      {creation.featured_image && (
                        <img
                          src={creation.featured_image}
                          alt={creation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                            <span className="text-xs text-white/50 tracking-widest">
                              {creation.tags && creation.tags.length > 0 ? creation.tags[0].name : "Creation"}
                            </span>
                          </div>
                          <h3 className="text-2xl font-light">{creation.title}</h3>
                          <p className="text-sm text-white/70 line-clamp-2">
                            {creation.overview && creation.overview.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
            <span className="px-4 bg-[#111111] text-white/50 text-base tracking-widest">LATEST JOURNALS</span>
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
                <span className="text-sm text-white/50 tracking-widest">LATEST JOURNALS</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-extralight">Dummy </span>
                <span className="text-white/80 font-bold">Journals</span>
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
            <span className="px-4 bg-[#111111] text-white/50 text-base tracking-widest">FEATURED FAVORITES</span>
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
                <span className="text-sm text-white/50 tracking-widest uppercase">What Inspires Me</span>
              </div>
              <div className="flex justify-between items-end">
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-extralight">Favorite </span>
                <span className="text-white/80 font-bold">People, Books, and Resources</span>
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
                    <h3 className="text-xl font-bold mb-3">{favorite.title}</h3>
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

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#111111] text-white/50 text-base tracking-widest">LET'S TALK OR JUST STALK</span>
          </div>
        </div>

        {/* Contact Me Section */}
        <section id="contact" className="py-32">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                <span className="text-sm text-white/50 tracking-widest">LET'S TALK OR STALK</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-white font-bold">Poke </span>
                <span className="text-white/80 font-extralight">Me or </span>
                <span className="text-white font-bold">Stalk </span>
                <span className="text-white/80 font-extralight">Me</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-none blur-3xl" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Poke Me */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-xl text-white/80 leading-relaxed">
                      The easiest and fastest way to talk with me is to join my Discord channel and have a chat!
                    </p>
                    <a 
                      href="https://discord.gg/yWuTjstH" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center gap-3">
                        <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.245.198.37.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107a15.742 15.742 0 0 0 1.227 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        <span className="text-sm text-white/90">Join Discord Channel</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Column - Or Stalk Me */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-xl text-white/80 leading-relaxed">
                      Or follow me on these platforms to get updates and see what I'm working on:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <a 
                        href="https://twitter.com/your-handle" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-start bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center gap-3">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                          </svg>
                          <span className="text-sm text-white/90">Twitter</span>
                        </div>
                      </a>
                      
                      <a 
                        href="https://github.com/your-username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-start bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center gap-3">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                          </svg>
                          <span className="text-sm text-white/90">GitHub</span>
                        </div>
                      </a>
                      
                      <a 
                        href="https://instagram.com/your-handle" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-start bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center gap-3">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                          </svg>
                          <span className="text-sm text-white/90">Instagram</span>
                        </div>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/in/your-profile" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-start bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center gap-3">
                          <svg className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                          </svg>
                          <span className="text-sm text-white/90">LinkedIn</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
