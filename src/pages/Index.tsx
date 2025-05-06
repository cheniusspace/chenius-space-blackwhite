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
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Join Discord Channel</span>
                      </div>
                    </a>
                  </div>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Have a project in mind or just want to say hello? I'd love to hear from you.
                  </p>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm text-white/50 tracking-widest">NAME</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm text-white/50 tracking-widest">EMAIL</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm text-white/50 tracking-widest">MESSAGE</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-none transition-all duration-300"
                    >
                      <span className="text-white group-hover:text-white/90 transition-colors tracking-widest">SEND MESSAGE</span>
                      <MessageSquare size={20} className="text-white/60 group-hover:text-white/90 transition-colors" />
                    </button>
                  </form>
                </div>

                {/* Right Column - Stalk Me */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-none" />
                  <div className="relative h-full min-h-[300px] flex items-center justify-center p-8">
                    <div className="text-center space-y-8 w-full">
                      <div className="grid grid-cols-1 gap-12">
                        {/* Music Platforms */}
                        <div className="space-y-4">
                          <p className="text-white/50 text-sm tracking-widest">MUSIC</p>
                          <div className="grid grid-cols-3 gap-4">
                            <a 
                              href="https://music.youtube.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span className="text-sm text-white/90">YouTube Music</span>
                              </div>
                            </a>
                            <a 
                              href="https://open.spotify.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-2 10c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm3-5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3 3z"/>
                                </svg>
                                <span className="text-sm text-white/90">Spotify</span>
                              </div>
                            </a>
                            <a 
                              href="https://music.apple.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-2 10c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm3-5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3 3z"/>
                                </svg>
                                <span className="text-sm text-white/90">Apple Music</span>
                              </div>
                            </a>
                          </div>
                        </div>

                        {/* Design & Visual */}
                        <div className="space-y-4">
                          <p className="text-white/50 text-sm tracking-widest">DESIGN & VISUAL</p>
                          <div className="grid grid-cols-3 gap-4">
                            <a 
                              href="https://dribbble.com/cheniusspace" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 24c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Dribbble</span>
                              </div>
                            </a>
                            <a 
                              href="https://www.pinterest.com/cheniusspace/" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-2 10c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3zm3-5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3 3z"/>
                                </svg>
                                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Pinterest</span>
                              </div>
                            </a>
                            <a 
                              href="https://www.instagram.com/cheniusspace" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2.163c3.204 0 3.584.014 4.85.072 4.358.2 6.78 2.618 6.98 6.98.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Instagram</span>
                              </div>
                            </a>
                          </div>
                        </div>

                        {/* Social & Development Platforms */}
                        <div className="space-y-4">
                          <p className="text-white/50 text-sm tracking-widest">SOCIAL & DEVELOPMENT</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a 
                              href="https://discord.gg/yWuTjstH" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                                </svg>
                                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Discord</span>
                              </div>
                            </a>
                            <a 
                              href="mailto:your-email@example.com" 
                              className="group relative flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                                <svg className="w-6 h-6 text-white/60 group-hover:text-white/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                                </svg>
                                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Email</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
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