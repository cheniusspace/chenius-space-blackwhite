
import { cn } from "@/lib/utils";

const colors = [
  {
    name: "Background",
    light: "bg-background",
    dark: "dark:bg-background",
    text: "text-foreground",
  },
  {
    name: "Foreground",
    light: "bg-foreground",
    dark: "dark:bg-foreground",
    text: "text-background",
  },
  {
    name: "Card",
    light: "bg-card",
    dark: "dark:bg-card",
    text: "text-card-foreground",
  },
  {
    name: "Primary",
    light: "bg-primary",
    dark: "dark:bg-primary",
    text: "text-primary-foreground",
  },
  {
    name: "Secondary",
    light: "bg-secondary",
    dark: "dark:bg-secondary",
    text: "text-secondary-foreground",
  },
  {
    name: "Muted",
    light: "bg-muted",
    dark: "dark:bg-muted",
    text: "text-muted-foreground",
  },
  {
    name: "Accent",
    light: "bg-accent",
    dark: "dark:bg-accent",
    text: "text-accent-foreground",
  },
  {
    name: "Destructive",
    light: "bg-destructive",
    dark: "dark:bg-destructive",
    text: "text-destructive-foreground",
  },
  {
    name: "Border",
    light: "bg-border",
    dark: "dark:bg-border",
    text: "text-foreground",
  },
  {
    name: "Input",
    light: "bg-input",
    dark: "dark:bg-input",
    text: "text-foreground",
  },
];

export function ColorsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color) => (
        <div
          key={color.name}
          className="flex flex-col gap-2 rounded-lg border p-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium" id={`color-name-${color.name.toLowerCase()}`}>{color.name}</span>
            <div className="flex gap-2">
              <div 
                className={cn("h-6 w-6 rounded-full", color.light)} 
                aria-labelledby={`color-name-${color.name.toLowerCase()}`}
                aria-description={`Light mode ${color.name} color`}
              />
              <div 
                className={cn("h-6 w-6 rounded-full", color.dark)} 
                aria-labelledby={`color-name-${color.name.toLowerCase()}`}
                aria-description={`Dark mode ${color.name} color`}
              />
            </div>
          </div>
          <div className={cn("rounded-lg p-4", color.light, color.text)}>
            Light mode
          </div>
          <div className={cn("rounded-lg p-4", color.dark, color.text)}>
            Dark mode
          </div>
        </div>
      ))}
    </div>
  );
} 
