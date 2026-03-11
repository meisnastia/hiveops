import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isUa = i18n.language === "ua";

  return (
    <Container
      className="text-center"
      style={{
        paddingTop: "8rem",
        minHeight: "80vh",
        color: "var(--text-primary)",
      }}
    >
      <h1 style={{ fontSize: "6rem", color: "var(--accent)" }}>404</h1>
      <h2>{isUa ? "Сторінку не знайдено" : "Page Not Found"}</h2>
      <p style={{ color: "var(--text-secondary)" }}>
        {isUa ? "Такої сторінки не існує." : "This page doesn't exist."}
      </p>
      <Link
        to="/"
        className="btn"
        style={{
          background: "var(--accent)",
          color: "#1A1200",
          fontWeight: 600,
          marginTop: "1rem",
          padding: "0.6rem 2rem",
        }}
      >
        {isUa ? "На головну" : "Back Home"}
      </Link>
    </Container>
  );
}
