import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SOCIAL_LINKS } from "../../config/socialLinks";
import SEO from "../SEO";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    try {
      const res = await fetch("https://formspree.io/f/placeholder", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SEO
        title="Contact"
        description="Get in touch with Anastasia Hnylytska — DevOps / Platform Engineer."
        path="/contact"
      />
      <Container style={{ minHeight: "70vh", paddingTop: "3rem" }}>
        <h1 className="section-heading">
          {t("contact_title_1")} <span className="honey-text">{t("contact_title_2")}</span>
        </h1>

        <Row className="justify-content-center g-5">
          <Col md={6}>
            <form onSubmit={handleSubmit}>
              <input type="text" name="_gotcha" style={{ display: "none" }} />
              {[
                { field: "name", type: "text", key: "contact_name" },
                { field: "email", type: "email", key: "contact_email" },
              ].map(({ field, type, key }) => (
                <div key={field} style={{ marginBottom: "1.2rem" }}>
                  <input
                    type={type}
                    name={field}
                    placeholder={t(key)}
                    required
                    className="glass-input"
                  />
                </div>
              ))}
              <div style={{ marginBottom: "1.2rem" }}>
                <textarea
                  name="message"
                  placeholder={t("contact_message")}
                  required
                  rows={5}
                  className="glass-input"
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="glass-btn-solid"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                <FaPaperPlane />
                {status === "sending" ? t("contact_sending") : t("contact_send")}
              </button>
              {status === "sent" && (
                <p style={{ color: "var(--success)", marginTop: "1rem" }}>
                  {t("contact_sent")}
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "var(--error)", marginTop: "1rem" }}>
                  {t("contact_error")}
                </p>
              )}
            </form>
          </Col>
          <Col md={4}>
            <div className="glass-card" style={{ padding: "2rem" }}>
              <h3
                style={{
                  color: "var(--text-heading)",
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {t("contact_connect")}
              </h3>
              {SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    padding: "0.6rem 0",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                >
                  <Icon style={{ fontSize: "1.2rem" }} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
