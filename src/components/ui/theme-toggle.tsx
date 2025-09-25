import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 rounded-xl border border-foreground/20 bg-foreground/10 backdrop-blur-sm",
        "transition-all duration-500 ease-in-out transform-gpu",
        "hover:bg-foreground/25 hover:border-foreground/40 hover:scale-110 hover:shadow-lg hover:shadow-foreground/10",
        "active:scale-95 active:transition-none",
        "focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background",
        "flex items-center justify-center overflow-hidden",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        className
      )}
    >
      <div className="relative z-10">
        <Sun className="h-5 w-5 text-yellow-200 rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-180 dark:scale-0 drop-shadow-sm" />
        <Moon className="absolute inset-0 h-5 w-5 text-blue-200 rotate-180 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 drop-shadow-sm" />
      </div>
      
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
      
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}