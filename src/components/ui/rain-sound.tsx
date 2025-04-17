import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RainSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/sounds/rain.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Set volume to 30%

    // Add event listeners for debugging
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('Audio is ready to play');
    });

    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
    });

    // Start playing automatically
    audioRef.current.play().catch(error => {
      console.error('Error playing audio:', error);
    });
    setIsPlaying(true);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-50",
        "w-12 h-12 rounded-full",
        "bg-white/80 backdrop-blur-sm",
        "border border-chenius-gray-200",
        "hover:bg-white hover:border-chenius-gray-300",
        "transition-all duration-200",
        "animate-float"
      )}
    >
      {isPlaying ? (
        <Volume2 className="h-6 w-6" />
      ) : (
        <VolumeX className="h-6 w-6" />
      )}
    </Button>
  );
}; 