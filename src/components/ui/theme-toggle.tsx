
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
        "w-10 h-10 rounded-full",
        "transition-all duration-200",
        className
      )}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="sr-only">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" aria-hidden="true" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" aria-hidden="true" />
      )}
    </Button>
  );
}
