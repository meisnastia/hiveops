import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function AboutPreview() {
  const { t } = useTranslation();

  return (
    <section
      className="section-padding honeycomb-bg"
      style={{ background: "var(--bg-section)" }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <h2 className="section-heading">
              {t("about_title_1")} <span className="honey-text">{t("about_title_2")}</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {t("about_preview")}
            </p>
            <Link
              to="/about"
              className="glass-btn-accent"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.05rem",
              }}
            >
              {t("about_learn_more")} <FaArrowRight />
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
