import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SOCIAL_LINKS } from "../config/socialLinks";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-footer)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "2rem 0",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            md={6}
            className="text-center text-md-start"
            style={{ color: "var(--text-secondary)" }}
          >
            <p className="mb-0">
              &copy; {year} Anastasia Hnylytska. {t("footer_built")}{" "}
              <span style={{ color: "var(--accent)" }}>&#x2B21;</span>
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              {SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1.3rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
