import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { STATS } from "../../config/skillsData";

const LABEL_KEYS = {
  "Cloud Labs": "stat_labs",
  "GCP Skill Badges": "stat_badges",
  "Pet Projects": "stat_projects",
  "Terraform Configs": "stat_terraform",
  "CI/CD Pipelines": "stat_pipelines",
  "Months Learning": "stat_months",
};

function AnimatedCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-stats)" }}
    >
      <Container>
        <h2 className="section-heading">
          {t("stats_title_1")} <span className="honey-text">{t("stats_title_2")}</span>
        </h2>
        <Row className="g-4 justify-content-center">
          {STATS.map(({ label, value, suffix, prefix }) => (
            <Col key={label} xs={6} md={4} lg={2}>
              <div
                className="text-center glass-card"
                style={{
                  padding: "1.5rem 1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    color: "var(--accent)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <AnimatedCounter
                    target={value}
                    suffix={suffix}
                    prefix={prefix || ""}
                  />
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginTop: "0.3rem",
                  }}
                >
                  {LABEL_KEYS[label] ? t(LABEL_KEYS[label]) : label}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
