import React, { useState, useCallback, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaSearch,
  FaFlask,
  FaBox,
  FaCloudUploadAlt,
  FaRocket,
  FaCheckCircle,
  FaPlay,
} from "react-icons/fa";

const STAGES = [
  { icon: <FaSearch />, label: "Lint", duration: 600 },
  { icon: <FaFlask />, label: "Test", duration: 900 },
  { icon: <FaBox />, label: "Build", duration: 1200 },
  { icon: <FaCloudUploadAlt />, label: "Push", duration: 500 },
  { icon: <FaRocket />, label: "Deploy", duration: 800 },
];

export default function CICDVisualizer() {
  const { t } = useTranslation();
  const [running, setRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [completed, setCompleted] = useState([]);
  const [done, setDone] = useState(false);

  const timersRef = useRef([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const runPipeline = useCallback(() => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setCompleted([]);
    setCurrentStage(-1);
    timersRef.current = [];

    let i = 0;
    const runStage = () => {
      if (i >= STAGES.length) {
        setCurrentStage(-1);
        setDone(true);
        setRunning(false);
        return;
      }
      const idx = i;
      setCurrentStage(idx);
      const tid = setTimeout(() => {
        setCompleted((prev) => [...prev, idx]);
        i++;
        runStage();
      }, STAGES[idx].duration);
      timersRef.current.push(tid);
    };

    const startTid = setTimeout(runStage, 300);
    timersRef.current.push(startTid);
  }, [running]);

  return (
    <section
      className="section-padding honeycomb-bg"
      style={{ background: "var(--bg-section)" }}
    >
      <Container>
        <h2 className="section-heading">
          {t("cicd_title_1")} <span className="honey-text">{t("cicd_title_2")}</span>
        </h2>
        <p
          className="text-center"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            maxWidth: "500px",
            margin: "0 auto 2rem",
          }}
        >
          {t("cicd_desc")}
        </p>

        <div className="text-center" style={{ marginBottom: "2.5rem" }}>
          <button
            onClick={runPipeline}
            disabled={running}
            style={{
              background: running ? "var(--bg-card)" : "var(--accent)",
              color: running ? "var(--text-muted)" : "var(--text-on-accent)",
              border: "none",
              padding: "0.8rem 2.5rem",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: running ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
            }}
          >
            <FaPlay /> {running ? t("cicd_running") : done ? t("cicd_run_again") : t("cicd_deploy")}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {STAGES.map((stage, i) => {
            const isActive = currentStage === i;
            const isCompleted = completed.includes(i);

            return (
              <div
                key={i}
                style={{
                  width: "120px",
                  padding: "1.5rem 1rem",
                  background: isCompleted
                    ? "rgba(168, 213, 94, 0.1)"
                    : isActive
                    ? "rgba(255, 193, 7, 0.1)"
                    : "var(--bg-card)",
                  border: `1px solid ${
                    isCompleted
                      ? "var(--success)"
                      : isActive
                      ? "var(--accent)"
                      : "var(--border-card)"
                  }`,
                  borderRadius: "12px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "3px",
                      background: "var(--accent)",
                      animation: `pipeline-progress ${stage.duration}ms linear forwards`,
                    }}
                  />
                )}

                <div
                  style={{
                    fontSize: "1.5rem",
                    color: isCompleted
                      ? "var(--success)"
                      : isActive
                      ? "var(--accent)"
                      : "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {isCompleted ? <FaCheckCircle /> : stage.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: isCompleted
                      ? "var(--success)"
                      : isActive
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  }}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>

        {done && (
          <div
            className="text-center"
            style={{
              marginTop: "2rem",
              color: "var(--success)",
              fontWeight: 600,
              fontSize: "1.1rem",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <FaCheckCircle /> {t("deployed_success")}
          </div>
        )}
      </Container>
    </section>
  );
}
