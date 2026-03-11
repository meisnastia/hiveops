import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Type from "./Type";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        paddingTop: "clamp(5rem, 12vw, 10rem)",
        paddingBottom: "clamp(2rem, 5vw, 4rem)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Photo — left */}
          <Col md={5} className="text-center mb-5 mb-md-0">
            <div className="hero-photo-wrapper">
              <img
                src="/img/nastya.png"
                alt="Anastasia Hnylytska"
                className="hero-photo-img"
              />
            </div>
          </Col>

          {/* Text — right */}
          <Col md={7}>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                marginBottom: "0.5rem",
              }}
            >
              {t("hero_greeting")}
            </p>
            <h1
              style={{
                color: "var(--text-heading)",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ color: "var(--accent)" }}>{t("hero_name")}</span>{" "}
              {t("hero_surname")}
            </h1>
            <div
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                minHeight: "2.5rem",
              }}
            >
              <Type />
            </div>
            <p
              style={{
                color: "var(--text-tertiary)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "540px",
              }}
            >
              {t("hero_intro")}
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="/projects"
                className="glass-btn-solid"
              >
                {t("view_projects")}
              </a>
              <a
                href="/terminal"
                className="glass-btn-accent"
              >
                {t("terminal_resume")}
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
