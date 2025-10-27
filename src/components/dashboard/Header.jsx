import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <header
      className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-40"
      style={{
        background:
          theme === "light"
            ? "rgba(255,255,255,0.9)"
            : "rgba(30,41,59,0.9)",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <h1 className="text-xl font-semibold" style={{ color: colors.primary }}>
        Dashboard Overview
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 border rounded-full hover:scale-110 transition"
          style={{ borderColor: colors.border }}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer"
          title="User Profile"
        >
          D
        </div>
      </div>
    </header>
  );
};

export default Header;
