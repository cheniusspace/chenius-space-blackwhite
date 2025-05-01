
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-full relative",
        "transition-all duration-300",
        className
      )}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
      <Sun 
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
        aria-hidden={theme === 'light'} 
      />
      <Moon 
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
        aria-hidden={theme === 'dark'} 
      />
    </Button>
  );
}
