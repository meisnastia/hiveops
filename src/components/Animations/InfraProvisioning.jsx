import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaServer,
  FaNetworkWired,
  FaDatabase,
  FaShieldAlt,
  FaBalanceScale,
} from "react-icons/fa";

const PLAN_LINES = [
  { text: "$ terraform plan", type: "command" },
  { text: "", type: "empty" },
  { text: "Terraform will perform the following actions:", type: "info" },
  { text: "", type: "empty" },
  { text: "  # google_compute_network.main will be created", type: "add" },
  { text: '  + resource "google_compute_network" "main" {', type: "add" },
  { text: '      + name = "hive-vpc"', type: "add" },
  { text: "    }", type: "add" },
  { text: "", type: "empty" },
  { text: "  # google_container_cluster.primary will be created", type: "add" },
  { text: '  + resource "google_container_cluster" "primary" {', type: "add" },
  { text: '      + name     = "hive-gke"', type: "add" },
  { text: '      + location = "europe-west1"', type: "add" },
  { text: "    }", type: "add" },
  { text: "", type: "empty" },
  { text: "  # google_sql_database_instance.db will be created", type: "add" },
  { text: '  + resource "google_sql_database_instance" "db" {', type: "add" },
  { text: '      + database_version = "POSTGRES_15"', type: "add" },
  { text: "    }", type: "add" },
  { text: "", type: "empty" },
  {
    text: "Plan: 5 to add, 0 to change, 0 to destroy.",
    type: "summary",
  },
];

const RESOURCES = [
  { icon: <FaNetworkWired />, label: "VPC Network", triggerLine: 4 },
  { icon: <FaServer />, label: "GKE Cluster", triggerLine: 9 },
  { icon: <FaDatabase />, label: "Cloud SQL", triggerLine: 15 },
  { icon: <FaShieldAlt />, label: "Firewall", triggerLine: 18 },
  { icon: <FaBalanceScale />, label: "Load Balancer", triggerLine: 20 },
];

export default function InfraProvisioning() {
  const { t } = useTranslation();
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let line = 0;
    const timer = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= PLAN_LINES.length) {
        clearInterval(timer);
        setTimeout(() => {
          setVisibleLines(0);
          setStarted(false);
        }, 4000);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <section className="section-padding" ref={ref}>
      <Container>
        <h2 className="section-heading">
          {t("infra_title_1")} <span className="honey-text">{t("infra_title_2")}</span>
        </h2>
        <p
          className="text-center"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "3rem",
            maxWidth: "500px",
            margin: "0 auto 3rem",
          }}
        >
          {t("infra_desc")}
        </p>

        <Row className="g-4">
          <Col lg={7}>
            <div
              style={{
                background: "var(--terminal-bg)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                padding: "1rem 1.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                lineHeight: 1.8,
                minHeight: "380px",
                maxHeight: "420px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginBottom: "1rem",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--error)",
                  }}
                />
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--success)",
                  }}
                />
              </div>

              {PLAN_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  style={{
                    color:
                      line.type === "command"
                        ? "var(--terminal-accent)"
                        : line.type === "add"
                        ? "var(--terminal-green)"
                        : line.type === "summary"
                        ? "var(--accent)"
                        : "var(--terminal-muted)",
                  }}
                >
                  {line.text || "\u00A0"}
                </div>
              ))}
              {visibleLines > 0 && visibleLines < PLAN_LINES.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: "7px",
                    height: "12px",
                    background: "var(--terminal-accent)",
                    animation: "blink-cursor 1s step-end infinite",
                  }}
                />
              )}
            </div>
          </Col>

          <Col lg={5}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                paddingTop: "1rem",
              }}
            >
              {RESOURCES.map((res, i) => {
                const visible = visibleLines >= res.triggerLine;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.5rem",
                      background: visible
                        ? "var(--bg-card)"
                        : "transparent",
                      border: `1px solid ${
                        visible
                          ? "var(--border-primary)"
                          : "transparent"
                      }`,
                      borderRadius: "10px",
                      opacity: visible ? 1 : 0,
                      transform: visible
                        ? "translateX(0)"
                        : "translateX(30px)",
                      transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        background: "rgba(255, 193, 7, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        color: "var(--accent)",
                        flexShrink: 0,
                      }}
                    >
                      {res.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        {res.label}
                      </div>
                      <div
                        style={{
                          color: "var(--success)",
                          fontSize: "0.75rem",
                        }}
                      >
                        + created
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
