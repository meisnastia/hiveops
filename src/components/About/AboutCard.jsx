import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutCard() {
  const { t } = useTranslation();

  return (
    <div
      className="glass-card"
      style={{
        padding: "2rem",
        color: "var(--text-secondary)",
        lineHeight: 1.8,
        fontSize: "1.05rem",
      }}
    >
      <p>{t("about_text_1")}</p>
      <p>{t("about_text_2")}</p>
      <p>{t("about_text_3")}</p>
      <p style={{ marginBottom: 0 }}>
        <strong style={{ color: "var(--accent)" }}>
          &quot;{t("about_quote")}&quot;
        </strong>
      </p>
    </div>
  );
}
