import { createContext, useContext, ReactNode } from "react";

type ThemeContextType = {
  theme: "dark";
  isDark: true;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  isDark: true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Apply the dark theme class to the document element
  const root = window.document.documentElement;
  root.classList.remove("light");
  root.classList.add("dark");

  return (
    <ThemeContext.Provider value={{ theme: "dark", isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}
