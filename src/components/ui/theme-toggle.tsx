import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-8 w-8 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm",
        "transition-all duration-500 ease-in-out transform-gpu",
        "hover:bg-foreground/15 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5",
        "active:scale-95 active:transition-none",
        "focus:outline-none",
        "flex items-center justify-center overflow-hidden",
        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-foreground/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        className
      )}
    >
      <div className="relative z-10 flex items-center justify-center">
        <Sun className="h-4 w-4 text-foreground/60 rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-180 dark:scale-0 drop-shadow-sm" />
        <Moon className="absolute h-4 w-4 text-foreground/60 rotate-180 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 drop-shadow-sm" />
      </div>
      
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-slate-200/10 to-cs-slate-300/10 opacity-0 dark:opacity-0 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cs-black-200/10 to-cs-slate-400/10 opacity-0 dark:opacity-100 transition-opacity duration-500" />
      
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100" />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}