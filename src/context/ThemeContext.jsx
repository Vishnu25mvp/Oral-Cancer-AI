import React, { createContext, useState, useEffect } from "react";

// Create context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // --- Base color palette for light/dark modes ---
  const colorPalettes = {
    light: {
      primary: "#2563eb",      // blue-600
      secondary: "#1e293b",    // slate-800
      accent: "#3b82f6",       // blue-500
      background: "#f9fafb",   // gray-50
      card: "#ffffff",         // white
      text: "#1f2937",         // gray-800
      border: "#e5e7eb",       // gray-200
    },
    dark: {
      primary: "#3b82f6",      // blue-500
      secondary: "#cbd5e1",    // slate-300
      accent: "#60a5fa",       // blue-400
      background: "#0f172a",   // slate-900
      card: "#1e293b",         // slate-800
      text: "#f1f5f9",         // slate-100
      border: "#334155",       // slate-700
    },
  };

  const [colors, setColors] = useState(colorPalettes[theme]);

  // Load theme from localStorage on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
      setColors(colorPalettes[savedTheme]);
    } else {
      document.documentElement.classList.add("light");
      setColors(colorPalettes.light);
    }
  }, []);

  // Apply theme dynamically
  useEffect(() => {
    const opposite = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(opposite);
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    setColors(colorPalettes[theme]);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // You can easily access theme + palette anywhere in app
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors,
        palette: colorPalettes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
