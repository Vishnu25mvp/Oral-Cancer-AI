import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardLayout = ({ children }) => {
  const { theme, colors } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500`}
      style={{
        background:
          theme === "light"
            ? `linear-gradient(135deg, ${colors.background}, #f0f9ff)`
            : `linear-gradient(135deg, #0f172a, #1e293b)`,
        color: colors.text,
      }}
    >
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
