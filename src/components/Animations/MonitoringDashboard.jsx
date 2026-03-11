import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function MetricLine({ started }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!started || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const points = [];
    for (let x = 0; x < w; x += 6) {
      points.push({
        x,
        y: h * 0.3 + Math.sin(x * 0.03) * h * 0.2 + Math.random() * h * 0.15,
      });
    }

    let drawn = 0;
    const timer = setInterval(() => {
      if (drawn >= points.length - 1) {
        clearInterval(timer);
        return;
      }
      ctx.beginPath();
      ctx.strokeStyle = "#FFC107";
      ctx.lineWidth = 2;
      ctx.moveTo(points[drawn].x, points[drawn].y);
      ctx.lineTo(points[drawn + 1].x, points[drawn + 1].y);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 193, 7, 0.05)";
      ctx.beginPath();
      ctx.moveTo(points[drawn].x, points[drawn].y);
      ctx.lineTo(points[drawn + 1].x, points[drawn + 1].y);
      ctx.lineTo(points[drawn + 1].x, h);
      ctx.lineTo(points[drawn].x, h);
      ctx.fill();

      drawn++;
    }, 30);

    return () => clearInterval(timer);
  }, [started]);

  return <canvas ref={canvasRef} width={300} height={120} style={{ width: "100%", height: "120px" }} />;
}

function BarChart({ started }) {
  const [bars, setBars] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const targets = [65, 78, 45, 92, 55, 84, 70, 60];

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setBars((prev) =>
        prev.map((val, i) => Math.min(val + 3, targets[i]))
      );
    }, 40);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px", padding: "0 0.5rem" }}>
      {bars.map((val, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${val}%`,
            background: `linear-gradient(to top, var(--accent), rgba(255, 193, 7, 0.4))`,
            borderRadius: "3px 3px 0 0",
            transition: "height 0.1s linear",
          }}
        />
      ))}
    </div>
  );
}

function PodStatus({ started }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!started) return;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setActive(count);
      if (count >= 6) clearInterval(timer);
    }, 400);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", padding: "1rem" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "36px",
            height: "36px",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: i < active ? "var(--success)" : "var(--bg-card)",
            transition: "background 0.3s ease",
            border: "none",
          }}
        />
      ))}
    </div>
  );
}

export default function MonitoringDashboard() {
  const { t } = useTranslation();
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

  const panelStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border-card)",
    borderRadius: "10px",
    padding: "1.2rem",
    height: "100%",
  };

  const panelTitle = {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    marginBottom: "0.75rem",
    fontFamily: "'JetBrains Mono', monospace",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <section
      className="section-padding honeycomb-bg"
      style={{ background: "var(--bg-section)" }}
      ref={ref}
    >
      <Container>
        <h2 className="section-heading">
          {t("monitoring_title_1")} <span className="honey-text">{t("monitoring_title_2")}</span>
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
          {t("monitoring_desc")}
        </p>

        <Row className="g-3">
          <Col md={6}>
            <div style={panelStyle}>
              <div style={panelTitle}>{t("monitoring_cpu")}</div>
              <MetricLine started={started} />
            </div>
          </Col>
          <Col md={6}>
            <div style={panelStyle}>
              <div style={panelTitle}>{t("monitoring_requests")}</div>
              <BarChart started={started} />
            </div>
          </Col>
          <Col md={6}>
            <div style={panelStyle}>
              <div style={panelTitle}>{t("monitoring_errors")}</div>
              <div
                className="text-center"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--success)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  padding: "1.5rem 0",
                }}
              >
                {started ? "0.02%" : "—"}
              </div>
              <div
                className="text-center"
                style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
              >
                {t("monitoring_slo")} (&lt; 0.1%)
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div style={panelStyle}>
              <div style={panelTitle}>{t("monitoring_pods")}</div>
              <PodStatus started={started} />
              <div
                className="text-center"
                style={{
                  fontSize: "0.75rem",
                  color: started ? "var(--success)" : "var(--text-muted)",
                  marginTop: "0.5rem",
                }}
              >
                {started ? `6/6 ${t("monitoring_running")}` : t("monitoring_waiting")}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
