import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        background: "transparent",
        border: "1px solid var(--border-subtle)",
        borderRadius: "50%",
        width: "44px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--accent)",
        fontSize: "1rem",
        transition: "transform 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(30deg)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg)")}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
