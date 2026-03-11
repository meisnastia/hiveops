import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FaTerminal,
  FaDownload,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaGlobe,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import SEO from "../SEO";

// PDF.js worker (local copy — CDN doesn't have this version)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

/* ── Data ─────────────────────────────────────── */

const SKILLS_LINES = [
  { group: "Cloud", items: "GCP (Compute, GKE, Cloud SQL, IAM, Cloud Run, Firebase), Azure (basics), AWS (concepts)" },
  { group: "IaC", items: "Terraform (modules, remote state, workspaces), Helm (basics), Ansible (basics)" },
  { group: "Containers", items: "Docker (Compose, multi-stage builds), Kubernetes (concepts, kubectl, GKE labs)" },
  { group: "CI/CD", items: "GitHub Actions (workflows, secrets, environments), GitLab CI (basics), ArgoCD (concepts)" },
  { group: "Monitoring", items: "Prometheus, Grafana, Loki, Alertmanager, Cloud Monitoring" },
  { group: "Scripting", items: "Bash, Python (automation), YAML, HCL" },
  { group: "OS & Network", items: "Linux (Ubuntu/Debian), Nginx, DNS/TCP-IP fundamentals" },
];

const BADGES = [
  "Create and Manage Cloud Resources (2022)",
  "Implement Load Balancing on Compute Engine (2023)",
  "Set Up an App Dev Environment on GCP (2023)",
  "Build Infrastructure with Terraform on Google Cloud (2023)",
  "Deploy Kubernetes Applications on Google Cloud (2023)",
  "Manage Kubernetes in Google Cloud (2024)",
  "Get Started with Dataplex (2024)",
  "Implement DevOps Workflows in Google Cloud (2024)",
];

/* ── Styles ──────────────────────────────────── */

const sectionTitle = {
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "var(--accent)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "2px solid var(--accent)",
};

const cardBg = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  borderRadius: "12px",
  padding: "2rem",
};

/* ── PDF URLs ────────────────────────────────── */

const PDF_FILES = {
  en: "/CV_Anastasia_Hnylytska_EN.pdf",
  ua: "/CV_Anastasia_Hnylytska_UA.pdf",
};

/* ── Component ──────────────────────────────── */

export default function Resume() {
  const { t, i18n } = useTranslation();
  const [width, setWidth] = useState(900);
  const [pdfReady, setPdfReady] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const lang = i18n.language === "ua" ? "ua" : "en";
  const pdfPath = PDF_FILES[lang];

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = width >= 2560 ? 2.0 : width >= 1920 ? 1.7 : width >= 1200 ? 1.4 : width > 786 ? 1.1 : 0.55;

  const experience = [
    {
      title: t("resume_exp1_title"),
      company: t("resume_exp1_company"),
      period: t("resume_exp1_period"),
      points: [t("resume_exp1_p1"), t("resume_exp1_p2"), t("resume_exp1_p3"), t("resume_exp1_p4"), t("resume_exp1_p5"), t("resume_exp1_p6")],
    },
    {
      title: t("resume_exp2_title"),
      company: t("resume_exp2_company"),
      period: t("resume_exp2_period"),
      points: [t("resume_exp2_p1"), t("resume_exp2_p2"), t("resume_exp2_p3")],
    },
    {
      title: t("resume_exp3_title"),
      company: t("resume_exp3_company"),
      period: t("resume_exp3_period"),
      points: [t("resume_exp3_p1"), t("resume_exp3_p2"), t("resume_exp3_p3")],
    },
  ];

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SEO title="Resume" description="Anastasia Hnylytska — DevOps / Platform Engineer. Resume." path="/resume" />

      <Container style={{ maxWidth: "900px", paddingTop: "2rem", paddingBottom: "3rem" }}>
        {/* Top bar */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h1 className="section-heading mb-0">
            {t("resume_title_1")} <span className="honey-text">{t("resume_title_2")}</span>
          </h1>
          <div className="d-flex gap-2">
            <a
              href={pdfPath}
              download={`CV_Anastasia_Hnylytska_${lang.toUpperCase()}.pdf`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "var(--accent)",
                color: "var(--text-on-accent)",
                border: "none",
                padding: "0.5rem 1.2rem",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <FaDownload /> {t("resume_save_pdf")}
            </a>
            <Link
              to="/terminal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "transparent",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "0.5rem 1.2rem",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <FaTerminal /> {t("resume_terminal")}
            </Link>
          </div>
        </div>

        {/* ═══ PDF Preview (collapsible) ═══ */}
        <button
          onClick={() => setShowPreview((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "transparent",
            color: "var(--accent)",
            border: "1px solid var(--border-card)",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            marginBottom: "1.5rem",
          }}
        >
          {showPreview ? <FaEyeSlash /> : <FaEye />}
          {showPreview ? (i18n.language === "ua" ? "Сховати превью PDF" : "Hide PDF preview") : (i18n.language === "ua" ? "Превью PDF" : "Preview PDF")}
        </button>

        {showPreview && (
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {!pdfReady && (
              <div style={{ padding: "3rem 0", display: "flex", justifyContent: "center" }}>
                <div className="spinner" />
              </div>
            )}
            <Document
              file={pdfPath}
              onLoadSuccess={({ numPages: n }) => { setNumPages(n); setPdfReady(true); }}
              onLoadError={() => setPdfReady(true)}
              className="d-flex flex-column align-items-center"
            >
              {Array.from({ length: numPages || 1 }, (_, i) => (
                <Page
                  key={`page-${i}`}
                  pageNumber={i + 1}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              ))}
            </Document>
          </div>
        )}

        {/* ═══ ON-SCREEN CARD RESUME (detail view below preview) ═══ */}

        {/* Header card */}
        <div style={{ ...cardBg, marginBottom: "1.5rem" }}>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 style={{ color: "var(--text-heading)", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                {t("hero_name")} {t("hero_surname")}
              </h2>
              <p style={{ color: "var(--accent)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                {t("resume_position")}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: 0 }}>
                {t("resume_summary")}
              </p>
            </Col>
            <Col md={4} className="mt-3 mt-md-0">
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {[
                  { icon: <FaMapMarkerAlt />, text: "Ukraine" },
                  { icon: <FaEnvelope />, text: "agnilickaya5@gmail.com", href: "mailto:agnilickaya5@gmail.com" },
                  { icon: <FaTelegram />, text: "@anastasi_coco", href: "https://t.me/anastasi_coco" },
                  { icon: <FaLinkedin />, text: "linkedin.com/in/ahnylytska", href: "https://www.linkedin.com/in/ahnylytska/" },
                  { icon: <FaGithub />, text: "github.com/meisnastia", href: "https://github.com/meisnastia" },
                  { icon: <FaGlobe />, text: "smartbee.me" },
                ].map(({ icon, text, href }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>{icon}</span>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Experience */}
        <div style={{ ...cardBg, marginBottom: "1.5rem" }}>
          <div style={sectionTitle}>{t("resume_section_exp")}</div>
          {experience.map((exp, i) => (
            <div key={i} style={{
              marginBottom: i < experience.length - 1 ? "1.5rem" : 0,
              paddingBottom: i < experience.length - 1 ? "1.5rem" : 0,
              borderBottom: i < experience.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-1">
                <div>
                  <h4 style={{ color: "var(--text-heading)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{exp.title}</h4>
                  <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{exp.company}</p>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{exp.period}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                {exp.points.map((p, j) => <li key={j} style={{ marginBottom: "0.2rem" }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div style={{ ...cardBg, marginBottom: "1.5rem" }}>
          <div style={sectionTitle}>{t("resume_section_edu")}</div>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-1" style={{ marginBottom: "0.8rem" }}>
            <div>
              <h4 style={{ color: "var(--text-heading)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{t("resume_edu_degree")}</h4>
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginBottom: 0 }}>{t("resume_edu_school")}</p>
            </div>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{t("resume_edu_period")}</span>
          </div>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-1" style={{ marginBottom: "0.8rem" }}>
            <div>
              <h4 style={{ color: "var(--text-heading)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{t("resume_edu2_degree")}</h4>
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.85rem", marginBottom: 0 }}>{t("resume_edu2_school")}</p>
            </div>
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{t("resume_edu2_period")}</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", fontStyle: "italic", margin: 0 }}>{t("resume_edu_note")}</p>
        </div>

        <Row className="g-3">
          <Col lg={7}>
            <div style={{ ...cardBg, height: "100%" }}>
              <div style={sectionTitle}>{t("resume_section_skills")}</div>
              {SKILLS_LINES.map((s, i) => (
                <div key={i} style={{ marginBottom: i < SKILLS_LINES.length - 1 ? "0.6rem" : 0 }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem" }}>{s.group}: </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>{s.items}</span>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={5}>
            <div style={{ ...cardBg, marginBottom: "1rem" }}>
              <div style={sectionTitle}>{t("resume_section_badges")}</div>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.8 }}>
                {BADGES.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
            <div style={cardBg}>
              <div style={sectionTitle}>{t("resume_section_lang")}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.8 }}>
                <div><strong>{t("resume_lang_uk")}</strong> — {t("resume_lang_uk_level")}</div>
                <div><strong>{t("resume_lang_en")}</strong> — {t("resume_lang_en_level")}</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
