import React, { useState, useEffect } from "react";

const BOOT_LINES = [
  "$ ssh visitor@hiveops.dev",
  "visitor@hiveops:~$ initializing hive cluster...",
  "",
  "  ╔══════════════════════════════════════╗",
  "  ║          H I V E O P S              ║",
  "  ║     Infrastructure as Instinct      ║",
  "  ╚══════════════════════════════════════╝",
  "",
  "[ OK ] Loading kernel modules...",
  "[ OK ] Mounting /dev/honeycomb...",
  "[ OK ] Starting containerd runtime...",
  "[ OK ] Initializing Terraform state...",
  "[ OK ] Connecting to GCP project...",
  "[ OK ] Authenticating Azure credentials...",
  "[ OK ] Pulling Helm charts...",
  "[ OK ] Syncing ArgoCD applications...",
  "",
  "visitor@hiveops:~$ kubectl get pods -n portfolio",
  "NAME                        READY   STATUS    AGE",
  "hive-frontend-7d4f8b-x2k    1/1     Running   2y",
  "skills-api-5c8d2f-m8n       1/1     Running   2y",
  "projects-srv-9f2a1-k3p      1/1     Running   1y",
  "monitoring-stack-3b7e4      1/1     Running   1y",
  "",
  "All systems operational. Welcome to the hive.",
  "",
];

export default function Preloader({ load }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!load) return;

    const lineTimer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 35);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, [load]);

  return (
    <div
      className="preloader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "var(--bg-preloader, #0D0A05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: load ? 1 : 0,
        pointerEvents: load ? "all" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        style={{
          width: "min(90%, 600px)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          lineHeight: 1.6,
          color: "#BCAAA4",
          maxHeight: "70vh",
          overflow: "hidden",
        }}
      >
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: line.startsWith("[ OK ]")
                ? "#A8D55E"
                : line.startsWith("$") || line.startsWith("visitor@")
                ? "#FFC107"
                : line.includes("STATUS")
                ? "#7C4DFF"
                : line.includes("Running")
                ? "#A8D55E"
                : line.includes("═") || line.includes("║")
                ? "#FFC107"
                : "#BCAAA4",
            }}
          >
            {line || "\u00A0"}
          </div>
        ))}
        {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "14px",
              background: "#FFC107",
              animation: "blink-cursor 1s step-end infinite",
            }}
          />
        )}
      </div>
      <div
        style={{
          width: "min(80%, 400px)",
          height: "3px",
          background: "rgba(255, 193, 7, 0.1)",
          borderRadius: "2px",
          marginTop: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #FFC107, #FF8F00)",
            borderRadius: "2px",
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
