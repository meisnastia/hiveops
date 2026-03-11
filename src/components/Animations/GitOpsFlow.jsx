import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaGitAlt,
  FaGithub,
  FaHammer,
  FaCheckCircle,
  FaDocker,
  FaRocket,
} from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";

const STEPS = [
  { icon: <FaGitAlt />, label: "Git Push", color: "#F05032" },
  { icon: <FaGithub />, label: "GitHub Actions", color: "#FFC107" },
  { icon: <FaHammer />, label: "Build", color: "#FF8F00" },
  { icon: <FaCheckCircle />, label: "Test", color: "#A8D55E" },
  { icon: <FaDocker />, label: "Registry", color: "#2496ED" },
  { icon: <FaRocket />, label: "ArgoCD", color: "#EF7B4D" },
  { icon: <SiKubernetes />, label: "K8s Cluster", color: "#326CE5" },
];

export default function GitOpsFlow() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let step = 0;
    const timer = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= STEPS.length) {
        clearInterval(timer);
        setTimeout(() => {
          setActiveStep(-1);
          setStarted(false);
        }, 3000);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [started]);

  return (
    <section className="section-padding" ref={ref}>
      <Container>
        <h2 className="section-heading">
          {t("gitops_title_1")} <span className="honey-text">{t("gitops_title_2")}</span>
        </h2>
        <p
          className="text-center"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "3rem",
            maxWidth: "600px",
            margin: "0 auto 3rem",
          }}
        >
          {t("gitops_desc")}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            flexWrap: "wrap",
            padding: "2rem 0",
          }}
        >
          {STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  opacity: i <= activeStep ? 1 : 0.2,
                  transform:
                    i <= activeStep ? "scale(1)" : "scale(0.85)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background:
                      i <= activeStep
                        ? `linear-gradient(135deg, ${step.color}33, ${step.color}66)`
                        : "var(--bg-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    color: i <= activeStep ? step.color : "var(--text-muted)",
                    border: "none",
                    boxShadow:
                      i === activeStep
                        ? `0 0 20px ${step.color}44`
                        : "none",
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color:
                      i <= activeStep
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                    fontWeight: i === activeStep ? 600 : 400,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: "40px",
                    height: "2px",
                    background:
                      i < activeStep
                        ? "var(--accent)"
                        : "var(--border-subtle)",
                    position: "relative",
                    transition: "background 0.4s ease",
                    margin: "0 4px",
                    marginBottom: "2rem",
                  }}
                >
                  {i < activeStep && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-3px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        animation: "flow-particle 0.8s linear infinite",
                        "--flow-distance": "32px",
                      }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
