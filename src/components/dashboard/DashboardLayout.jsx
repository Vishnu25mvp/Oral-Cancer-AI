import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardLayout = ({ children }) => {
  const { theme, colors } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-500`}
      style={{
        background:
          theme === "light"
            ? `linear-gradient(135deg, ${colors.background}, #f0f9ff)`
            : `linear-gradient(135deg, #0f172a, #1e293b)`,
        color: colors.text,
      }}
    >
      {/* Sticky header at top */}
      <Header />

      {/* Main layout with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed height & independent scroll */}
        <aside
          className="w-64 h-screen sticky top-0 flex-shrink-0 overflow-y-auto border-r shadow-lg"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(30,41,59,0.85)",
            borderColor: colors.border,
          }}
        >
          <Sidebar />
        </aside>

        {/* Main content - independent scroll */}
        <main
          className="flex-1 flex flex-col overflow-y-auto p-6"
          style={{
            background:
              theme === "light"
                ? "rgba(255,255,255,0.6)"
                : "rgba(15,23,42,0.7)",
          }}
        >
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
