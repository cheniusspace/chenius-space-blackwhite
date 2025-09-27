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

// Typing animation component
function TypingText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setDisplayedText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      } else if (currentIndex === text.length) {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (currentIndex === 0 && isDeleting) {
        // Finished deleting, start typing again
        setIsDeleting(false);
      }
    }, isDeleting ? speed / 2 : speed); // Delete faster than type

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isVisible, isDeleting]);

  return (
    <span ref={ref}>
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-gray-200 animate-pulse ml-1"></span>
    </span>
  );
}

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
      <div className="relative bg-background/5 backdrop-blur-sm rounded-none border border-foreground/10 hover:border-foreground/20 transition-all duration-300 p-4">
        <div className="flex flex-col gap-4">
          {/* Lyrics Display */}
          <div className="relative h-16 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-lg text-foreground/90 font-light">{currentLyric.text}</p>
                <button 
                  onClick={() => setShowLyrics(!showLyrics)}
                  className="text-xs text-foreground/50 hover:text-foreground/90 transition-colors"
                >
                  {showLyrics ? 'Hide Lyrics' : 'Show All Lyrics'}
                </button>
              </div>
            </div>
          </div>

          {/* Full Lyrics Panel */}
          {showLyrics && (
            <div className="max-h-48 overflow-y-auto space-y-2 p-4 bg-background/5 rounded-none border border-foreground/10">
              {lyrics.map((lyric, index) => (
                <div 
                  key={index}
                  className={`text-sm transition-colors ${
                    lyric === currentLyric 
                      ? 'text-foreground/90 font-medium' 
                      : 'text-foreground/50'
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
              className="w-10 h-10 flex items-center justify-center bg-background/10 hover:bg-background/20 rounded-full transition-colors"
            >
              {isPlaying ? (
                <svg 
                  className="w-5 h-5 text-foreground/90"
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
                  className="w-5 h-5 text-foreground/90"
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
                className="h-1 bg-background/10 rounded-full overflow-hidden cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  ref={progressBarRef}
                  className="h-full bg-foreground/90 w-0 transition-all duration-100"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-foreground/60">{formatTime(currentTime)}</span>
                <span className="text-xs text-foreground/60">{formatTime(duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
                className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground/90 transition-colors"
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
                className="w-20 h-1 bg-background/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer"
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
    <div className="w-full subtle-grid text-foreground">
      <MouseTrail />
      <div className="relative z-[100]">
        <RainEffect />
      </div>
      <div className="relative z-10 font-['Jost']">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden h-screen">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Hollow Circles with Theme-Aware Shadows - Ultra Random Distribution */}
            {/* Large Hollow Circles */}
            <div className="absolute top-[17%] right-[43%] w-10 h-10 border-2 border-cs-gray-600/60 dark:border-black/25 rounded-full shadow-lg shadow-cs-gray-300/40 dark:shadow-white/25" />
            <div className="absolute bottom-[73%] left-[67%] w-9 h-9 border-2 border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-lg shadow-cs-gray-300/50 dark:shadow-white/30" />
            <div className="absolute top-[84%] right-[19%] w-8 h-8 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[29%] left-[81%] w-7 h-7 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[56%] left-[14%] w-6 h-6 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[41%] right-[76%] w-8 h-8 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[3%] left-[93%] w-7 h-7 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[88%] right-[7%] w-6 h-6 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[91%] left-[23%] w-9 h-9 border-2 border-cs-gray-600/60 dark:border-black/25 rounded-full shadow-lg shadow-cs-gray-300/40 dark:shadow-white/25" />
            <div className="absolute bottom-[12%] right-[58%] w-8 h-8 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[68%] left-[89%] w-7 h-7 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[52%] right-[31%] w-6 h-6 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[6%] left-[37%] w-7 h-7 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[47%] right-[94%] w-6 h-6 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[95%] left-[49%] w-9 h-9 border-2 border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-lg shadow-cs-gray-300/45 dark:shadow-white/35" />
            
            {/* Medium Hollow Circles */}
            <div className="absolute top-[33%] right-[71%] w-6 h-6 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[78%] left-[29%] w-5 h-5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[62%] left-[86%] w-4 h-4 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/50 dark:shadow-white/40" />
            <div className="absolute bottom-[19%] right-[44%] w-4.5 h-4.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[8%] right-[82%] w-5 h-5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[63%] left-[51%] w-4 h-4 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[96%] left-[17%] w-3.5 h-3.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/50 dark:shadow-white/40" />
            <div className="absolute bottom-[34%] right-[13%] w-4 h-4 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[41%] left-[73%] w-5 h-5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[87%] right-[66%] w-4.5 h-4.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[74%] left-[38%] w-4 h-4 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[26%] right-[95%] w-3.5 h-3.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[59%] left-[4%] w-5 h-5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[71%] right-[57%] w-4 h-4 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[15%] left-[61%] w-4.5 h-4.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[48%] right-[24%] w-4 h-4 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/50 dark:shadow-white/40" />
            <div className="absolute top-[82%] left-[92%] w-4 h-4 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[53%] right-[89%] w-5 h-5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[27%] left-[8%] w-3.5 h-3.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/50 dark:shadow-white/40" />
            <div className="absolute bottom-[91%] right-[42%] w-4 h-4 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[2%] left-[65%] w-4 h-4 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[69%] right-[6%] w-3.5 h-3.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[98%] left-[34%] w-4 h-4 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            
            {/* Small Hollow Circles */}
            <div className="absolute top-[23%] left-[76%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[67%] right-[19%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[89%] right-[83%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute bottom-[14%] left-[35%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute top-[51%] left-[92%] w-2 h-2 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute bottom-[39%] right-[57%] w-2.5 h-2.5 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute top-[76%] right-[26%] w-2.5 h-2.5 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[81%] left-[43%] w-2 h-2 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[34%] left-[15%] w-3 h-3 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute bottom-[28%] right-[74%] w-2 h-2 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute top-[65%] left-[68%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute bottom-[46%] right-[11%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute top-[12%] left-[54%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[93%] right-[38%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[98%] left-[87%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute bottom-[72%] right-[61%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute top-[44%] left-[31%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute bottom-[55%] right-[86%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute top-[87%] left-[59%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[17%] right-[33%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[6%] left-[78%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute bottom-[84%] right-[47%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute top-[71%] left-[24%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute bottom-[36%] right-[69%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute top-[29%] left-[97%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[61%] right-[4%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[95%] left-[41%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute bottom-[9%] right-[91%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute top-[18%] left-[66%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute bottom-[77%] right-[16%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            <div className="absolute top-[83%] left-[12%] w-3 h-3 border-2 border-cs-gray-800/80 dark:border-black/20 rounded-full shadow-md shadow-cs-gray-400/60 dark:shadow-white/30" />
            <div className="absolute bottom-[42%] right-[52%] w-2.5 h-2.5 border-2 border-cs-gray-900/90 dark:border-black/25 rounded-full shadow-md shadow-cs-gray-400/70 dark:shadow-white/35" />
            <div className="absolute top-[57%] left-[85%] w-2 h-2 border-2 border-cs-gray-900/95 dark:border-black/30 rounded-full shadow-md shadow-cs-gray-400/80 dark:shadow-white/40" />
            
            {/* Tiny Hollow Circles */}
            <div className="absolute top-[37%] right-[63%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[73%] left-[27%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[84%] left-[71%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[16%] right-[39%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[59%] left-[13%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[41%] right-[87%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[26%] right-[74%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[68%] left-[56%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[91%] left-[44%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[7%] right-[62%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[14%] left-[88%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[82%] right-[18%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[67%] left-[32%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[33%] right-[76%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[43%] left-[69%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[57%] right-[31%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[78%] left-[85%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[22%] right-[49%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[5%] left-[21%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[95%] right-[79%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[96%] left-[97%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[4%] right-[3%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[2%] left-[5%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[98%] right-[95%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[98%] left-[3%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[2%] right-[97%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[4%] left-[7%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[96%] right-[93%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[96%] left-[93%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[4%] right-[7%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[6%] left-[9%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[94%] right-[91%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[94%] left-[91%] w-1.5 h-1.5 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[6%] right-[9%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[8%] left-[11%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[92%] right-[89%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[92%] left-[89%] w-1 h-1 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[8%] right-[11%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[10%] left-[13%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[90%] right-[87%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute top-[90%] left-[87%] w-1.5 h-1.5 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute bottom-[10%] right-[13%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute top-[12%] left-[15%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
            <div className="absolute bottom-[88%] right-[85%] w-1 h-1 border border-cs-gray-600/55 dark:border-black/20 rounded-full shadow-sm shadow-cs-gray-300/35 dark:shadow-white/25" />
            <div className="absolute top-[88%] left-[85%] w-1 h-1 border border-cs-gray-700/70 dark:border-black/30 rounded-full shadow-sm shadow-cs-gray-300/45 dark:shadow-white/35" />
            <div className="absolute bottom-[12%] right-[15%] w-1.5 h-1.5 border border-cs-gray-700/65 dark:border-black/25 rounded-full shadow-sm shadow-cs-gray-300/40 dark:shadow-white/30" />
          </div>

          <div className="container mx-auto h-full px-4 max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full items-center">
              {/* Left Column - Visual Elements */}
                   <div className="lg:col-span-6 relative z-10 order-2 lg:order-1 flex items-start justify-center">
                     <div className="relative w-full aspect-[3/4] max-w-[450px] mx-auto">
                       {/* Gradient Light Effect - Theme Aware */}
                       <div className="absolute inset-0 -m-2">
                         {/* Light mode: slate background, Dark mode: slate light */}
                         <div className="absolute inset-0 bg-gradient-radial from-slate-600/60 via-slate-500/30 via-slate-400/20 via-slate-300/10 to-transparent dark:from-slate-400/50 dark:via-slate-300/15 dark:via-slate-200/20 dark:via-slate-100/10 rounded-full blur-xl scale-75" />
                  </div>
                       
                  {/* Main Image Container */}
                       <div className="relative w-full h-full z-10">
                    <motion.img 
                      src="/images/chenius.png" 
                      alt="Chenius Space Home" 
                           className="relative w-full h-full object-contain drop-shadow-xl"
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
              <div className="lg:col-span-6 relative z-10 order-1 lg:order-2 flex items-center justify-center h-full">
                <div className="space-y-6 sm:space-y-8 lg:space-y-12 text-center lg:text-left w-full">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                           <span className="text-base sm:text-lg md:text-xl text-cs-slate-400 tracking-[0.1em]">DREAMING BY CREATING</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl w-full">
                      <span className="block text-cs-gray-600 dark:text-cs-white-400 tracking-wide font-semibold">Digital & Physical</span>
                      <span className="block text-cs-slate-400 font-extralight tracking-normal">designs</span>
                    </h1>
                  </div>

                       <p className="text-base sm:text-lg md:text-xl text-cs-gray-600 dark:text-cs-gray-800 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                         Here I gather <Link to="/creations" className="text-cs-slate-600 dark:text-white hover:text-cs-black-800 dark:hover:text-gray-200 underline decoration-cs-slate-400/30 dark:decoration-white/30 hover:decoration-cs-slate-600/60 dark:hover:decoration-white/60 transition-all duration-200 hover:bg-cs-slate-100/10 dark:hover:bg-white/5 px-1 py-0.5 rounded-sm font-medium">What I Make</Link>, <Link to="/journals" className="text-cs-slate-600 dark:text-white hover:text-cs-black-800 dark:hover:text-gray-200 underline decoration-cs-slate-400/30 dark:decoration-white/30 hover:decoration-cs-slate-600/60 dark:hover:decoration-white/60 transition-all duration-200 hover:bg-cs-slate-100/10 dark:hover:bg-white/5 px-1 py-0.5 rounded-sm font-medium">What I Like</Link>, and <Link to="/favorites" className="text-cs-slate-600 dark:text-white hover:text-cs-black-800 dark:hover:text-gray-200 underline decoration-cs-slate-400/30 dark:decoration-white/30 hover:decoration-cs-slate-600/60 dark:hover:decoration-white/60 transition-all duration-200 hover:bg-cs-slate-100/10 dark:hover:bg-white/5 px-1 py-0.5 rounded-sm font-medium">What Inspires Me</Link> along the way.
                    </p>

                    </div>
                    </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-foreground/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-background text-foreground text-base tracking-widest">ABOUT CHENIUS SPACE</span>
          </div>
        </div>

        {/* About Section */}
        <section className="py-32">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="space-y-6">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl tracking-wide mb-6">
                  <span className="text-foreground font-extralight">Welcome to </span>
                  <span className="text-foreground/80 font-bold">Chenius Space</span>
              </h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  A digital sanctuary where creativity meets technology. Here, I explore the intersection of design, 
                  development, and personal growth through various projects and writings. This space serves as both 
                  a portfolio of my work and a journal of my journey in the digital landscape.
                </p>
            </div>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Web Design</span>
                      </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">UI/UX</span>
                    </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Frontend Development</span>
                </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">React</span>
                      </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">TypeScript</span>
                    </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Tailwind CSS</span>
                </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Digital Art</span>
              </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Creative Writing</span>
            </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Personal Growth</span>
              </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Technology</span>
                    </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Innovation</span>
                  </div>
                <div className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 transition-colors rounded-none">
                  <span className="text-sm text-foreground/80">Self Discovery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-foreground/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-background text-foreground/50 text-base tracking-widest">RECENT CREATIONS</span>
          </div>
        </div>

        {/* Creations Preview */}
        <section 
          id="creations"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-24"
        >
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                <span className="text-xs text-foreground/50 tracking-widest">RECENT PROJECTS</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-foreground font-extralight">CHENIUS </span>
                <span className="text-foreground/80 font-bold">Creations</span>
              </h2>
            </div>
            
            {isLoading.creations ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`animate-pulse ${item === 2 ? 'md:col-span-2' : ''}`}>
                    <div className="aspect-[4/3] bg-foreground/5 rounded-none" />
                    <div className="mt-6 space-y-3">
                      <div className="h-5 bg-foreground/5 w-2/3" />
                      <div className="h-4 bg-foreground/5 w-1/2" />
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
                    <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-foreground/5">
                      {creation.image_url && (
                        <img
                          src={creation.image_url}
                          alt={creation.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                            <span className="text-xs text-foreground/50 tracking-widest">
                              {creation.tags?.[0]?.name || 'Uncategorized'}
                            </span>
                          </div>
                          <h3 className="text-2xl font-light text-foreground">{creation.title}</h3>
                          <p className="text-sm text-foreground/70 line-clamp-2">{creation.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-foreground/50">
                No creations found
              </div>
            )}
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-foreground/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-background text-foreground/50 text-base tracking-widest">LATEST JOURNALS</span>
          </div>
        </div>

        {/* Journals Preview */}
        <section 
          id="journals"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-24"
        >
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                <span className="text-sm text-foreground/50 tracking-widest">LATEST JOURNALS</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-foreground font-extralight">Dummy </span>
                <span className="text-foreground/80 font-bold">Journals</span>
              </h2>
            </div>

            {isLoading.journals ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={`animate-pulse ${item === 1 ? 'md:col-span-2' : ''}`}>
                    <div className="h-48 bg-foreground/5 rounded-none" />
                    <div className="mt-6 space-y-3">
                      <div className="h-5 bg-foreground/5 w-2/3" />
                      <div className="h-4 bg-foreground/5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {recentJournals.map((journal, index) => (
                  <div key={journal.id} className={`group ${index === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="relative h-48 overflow-hidden rounded-none border border-foreground/10 hover:border-foreground/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative h-full p-8 flex flex-col">
                        <div className="space-y-6 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-foreground/50 tracking-widest">
                              {new Date(journal.date).toLocaleDateString('default', { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-xs text-foreground/50">•</span>
                            <span className="text-xs text-foreground/50">{journal.read_time}</span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-light group-hover:text-foreground transition-colors">{journal.title}</h3>
                            <p className="text-sm text-foreground/70 line-clamp-2">{journal.excerpt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-foreground/50">
                No journals found
              </div>
            )}
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-foreground/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-background text-foreground/50 text-base tracking-widest">LET'S TALK OR JUST STALK</span>
          </div>
        </div>

        {/* Favorites Section */}
        <section id="favorites" className="py-24">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                <span className="text-sm text-foreground/50 tracking-widest">FAVORITES</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-foreground font-bold">What </span>
                <span className="text-foreground/80 font-extralight">Inspires Me</span>
              </h2>
              </div>
            <div className="text-center">
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                A collection of things that spark my creativity and keep me motivated in my journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Me Section */}
        <section id="contact" className="py-32">
          <div className="container mx-auto px-4 max-w-screen-xl">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-foreground/50 to-transparent" />
                <span className="text-sm text-foreground/50 tracking-widest">LET'S TALK OR STALK</span>
              </div>
              <h2 className="text-3xl md:text-4xl tracking-wide">
                <span className="text-foreground font-bold">Poke </span>
                <span className="text-foreground/80 font-extralight">Me or </span>
                <span className="text-foreground font-bold">Stalk </span>
                <span className="text-foreground/80 font-extralight">Me</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-none blur-3xl" />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Contact Form */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-xl text-foreground/80 leading-relaxed">
                    Have a project in mind or just want to say hello? I'd love to hear from you.
                  </p>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm text-foreground/70">Name</label>
                        <input
                          type="text"
                          id="name"
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm text-foreground/70">Email</label>
                        <input
                          type="email"
                          id="email"
                            className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm text-foreground/70">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:outline-none transition-colors"
                          placeholder="What's this about?"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm text-foreground/70">Message</label>
                      <textarea
                        id="message"
                          rows={6}
                          className="w-full px-4 py-2 bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:outline-none transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                        className="w-full px-6 py-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 text-foreground/80 hover:text-foreground"
                    >
                        Send Message
                    </button>
                  </form>
                  </div>
                </div>

                {/* Right Column - Social Links */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-none" />
                  <div className="relative h-full min-h-[300px] flex items-center justify-center p-8">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <a 
                        href="https://instagram.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                        className="group relative flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                          <svg className="w-6 h-6 text-foreground/60 group-hover:text-foreground/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                          <span className="text-sm text-foreground/60 group-hover:text-foreground/90 transition-colors">Instagram</span>
                              </div>
                            </a>
                            <a 
                        href="https://dribbble.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                        className="group relative flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                          <svg className="w-6 h-6 text-foreground/60 group-hover:text-foreground/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                                </svg>
                          <span className="text-sm text-foreground/60 group-hover:text-foreground/90 transition-colors">Dribbble</span>
                              </div>
                            </a>
                            <a 
                        href="https://github.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                        className="group relative flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                          <svg className="w-6 h-6 text-foreground/60 group-hover:text-foreground/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 1.226 1.994 1.911 2.166 2.163 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                                </svg>
                          <span className="text-sm text-foreground/60 group-hover:text-foreground/90 transition-colors">GitHub</span>
                              </div>
                            </a>
                            <a 
                              href="mailto:your-email@example.com" 
                        className="group relative flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 overflow-hidden p-4 rounded-none"
                            >
                        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center gap-3">
                          <svg className="w-6 h-6 text-foreground/60 group-hover:text-foreground/90 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                                </svg>
                          <span className="text-sm text-foreground/60 group-hover:text-foreground/90 transition-colors">Email</span>
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