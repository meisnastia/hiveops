import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggleLang = () => {
    i18n.changeLanguage(current === "ua" ? "en" : "ua");
  };

  return (
    <button
      onClick={toggleLang}
      aria-label={`Switch to ${current === "ua" ? "English" : "Ukrainian"}`}
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
        fontSize: "0.75rem",
        fontWeight: 700,
        fontFamily: "'Space Grotesk', sans-serif",
        transition: "border-color 0.3s",
      }}
    >
      {current === "ua" ? "EN" : "UA"}
    </button>
  );
}
