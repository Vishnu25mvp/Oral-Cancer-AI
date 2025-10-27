import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <footer
      className="text-center py-3 text-sm border-t"
      style={{ borderColor: colors.border, color: colors.secondary }}
    >
      © 2025 Oral Cancer AI — Empowering Early Detection
    </footer>
  );
};

export default Footer;
