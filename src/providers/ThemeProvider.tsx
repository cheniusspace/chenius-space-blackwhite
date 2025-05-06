
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  isDark: true,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Check if there's a theme preference saved in localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "dark";
  });

  const isDark = theme === "dark";

  useEffect(() => {
    // Apply the theme class to the document element
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
      // Update CSS variables for the pastel dark theme
      document.documentElement.style.setProperty('--color-Dark-50', '#E9EDEF');
      document.documentElement.style.setProperty('--color-Dark-100', '#C8B6FF');
      document.documentElement.style.setProperty('--color-Dark-600', '#211F30');
      document.documentElement.style.setProperty('--color-Purple-300', '#D1BFFF');
      document.documentElement.style.setProperty('--color-Purple-400', '#C8B6FF');
      document.documentElement.style.setProperty('--color-Purple-500', '#B8A5FF');
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      // Update CSS variables for the pastel light theme
      document.documentElement.style.setProperty('--color-Dark-50', '#5A5A7A');
      document.documentElement.style.setProperty('--color-Dark-100', '#FFB6C1');
      document.documentElement.style.setProperty('--color-Dark-600', '#FFF2F5');
      document.documentElement.style.setProperty('--color-Purple-300', '#FFD6FF');
      document.documentElement.style.setProperty('--color-Purple-400', '#FFB6C1');
      document.documentElement.style.setProperty('--color-Purple-500', '#FFA5B9');
    }

    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
