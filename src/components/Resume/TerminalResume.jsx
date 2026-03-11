import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "react-bootstrap";
import SEO from "../SEO";
import "./TerminalResume.css";

const COMMANDS = {
  help: {
    output: [
      "Available commands:",
      "",
      "  whoami       — About me",
      "  skills       — Technical skills",
      "  experience   — Work experience",
      "  projects     — Featured projects",
      "  education    — Education",
      "  certs        — GCP Badges",
      "  stats        — Key metrics",
      "  contact      — Get in touch",
      "  clear        — Clear terminal",
      "  help         — Show this help",
    ],
  },
  whoami: {
    output: [
      "┌──────────────────────────────────────┐",
      "│  Anastasia (Nastya) Hnylytska        │",
      "│  DevOps / Platform Engineer           │",
      "│  Location: Ukraine                    │",
      "│  Languages: Ukrainian, English (B2)   │",
      "└──────────────────────────────────────┘",
      "",
      "Got into DevOps by watching a platform engineer work daily.",
      "What started as curiosity in 2022 became a deep passion.",
      "2+ years of learning, building, and going deeper every month.",
      "",
      '"I don\'t just learn tools — I understand why they',
      'exist and what problems they solve."',
    ],
  },
  skills: {
    output: [
      "cloud:",
      "  - GCP (Compute, GKE, Cloud SQL, IAM, Cloud Run)    ███████░░░ intermediate",
      "  - Azure (VMs, App Service, basics)                  ████░░░░░░ basic",
      "  - AWS (EC2, S3, IAM concepts)                       ███░░░░░░░ basic",
      "",
      "infrastructure_as_code:",
      "  - Terraform (modules, remote state, workspaces)    ███████░░░ intermediate",
      "  - Helm Charts                                      ████░░░░░░ basic",
      "  - Ansible (basic playbooks)                        ███░░░░░░░ basic",
      "",
      "containers:",
      "  - Docker (compose, multi-stage, networking)        ███████░░░ intermediate",
      "  - Kubernetes (concepts, kubectl, labs)             ████░░░░░░ basic",
      "",
      "ci_cd:",
      "  - GitHub Actions (workflows, envs, secrets)        ███████░░░ intermediate",
      "  - GitLab CI (stages, runners)                      ████░░░░░░ basic",
      "  - ArgoCD (GitOps concepts)                         ███░░░░░░░ basic",
      "",
      "monitoring:",
      "  - Prometheus + Grafana                             ████░░░░░░ basic",
      "  - Loki (log aggregation)                           ███░░░░░░░ basic",
      "",
      "scripting:",
      "  - Bash                                             ████░░░░░░ basic",
      "  - Python (automation scripts)                      ███░░░░░░░ basic",
      "  - YAML / HCL                                      ███████░░░ intermediate",
    ],
  },
  experience: {
    output: [
      "── Cloud Skills Boost ──────────────── Oct 2022 — Present",
      "   Google Cloud Platform",
      "   • Where it all started — structured learning on real GCP infra",
      "   • Completed 35+ labs, earned 8 skill badges",
      "   • Progressed: basic VMs → GKE clusters → Terraform → full CI/CD",
      "",
      "── DevOps Engineer (Mentorship) ────────── 2024 — 2025",
      "   Under guidance of a Senior Platform Engineer",
      "   • Built CI/CD for production AI platform: tests → lint → build (~3 min)",
      "   • Maintained 900+ tests across 48 suites, per-module coverage thresholds",
      "   • 4 rounds of security audits — FP rate 36% → <5%",
      "   • Monitoring: watchdog, TTFT tracking, connection health metrics",
      "   • Automated multi-stage build: frontend → native → signing → packaging",
      "   • Architecture discussions, code reviews, security audits",
      "",
      "── Azure Learning ─────────────────── Mid 2024 — Present",
      "   Microsoft Azure",
      "   • Expanding to multi-cloud: VMs, App Service, AKS, Azure DevOps",
      "   • Terraform with Azure provider",
      "   • Preparing for AZ-900 certification",
    ],
  },
  projects: {
    output: [
      "1. GCP Foundation                                    [Cloud]",
      "   Reusable Terraform modules: VPC, GKE, Cloud SQL, IAM, Cloud NAT",
      "   First project — consolidated Cloud Skills Boost knowledge into real IaC",
      "   → github.com/meisnastia/gcp-foundation",
      "",
      "2. StatusHive                                     [Monitoring]",
      "   Observability stack: Prometheus + Grafana + Loki + Alertmanager",
      "   Built because you can't manage what you can't observe",
      "   → github.com/meisnastia/statushive",
      "",
      "3. AI Platform Infrastructure                     [AI/MLOps]",
      "   DevOps for production AI platform: CI/CD, security, monitoring, builds",
      "   900+ tests, 4 security audit rounds — full DevOps ownership under mentorship",
      "",
      "4. HiveOps                                        [Platform]",
      "   This portfolio — built and deployed with full GitOps workflow",
      "   DevOps engineer's portfolio should be a DevOps project",
      "   → github.com/meisnastia/hiveops",
    ],
  },
  education: {
    output: [
      "┌──────────────────────────────────────────────┐",
      "│  Master's Degree in International Relations  │",
      "│  Mariupol State University (mu.edu.ua)        │",
      "│  2021 — Feb 2026                              │",
      "└──────────────────────────────────────────────┘",
      "",
      "Pivoted to DevOps/Cloud engineering during studies,",
      "combining analytical thinking from IR with technical skills.",
    ],
  },
  certs: {
    output: [
      "GCP Cloud Skills Boost Badges (cloudskillsboost.google):",
      "",
      "✓ Create and Manage Cloud Resources                    Oct 2022",
      "✓ Implement Load Balancing on Compute Engine            May 2023",
      "✓ Set Up an App Dev Environment on GCP                 May 2023",
      "✓ Deploy Kubernetes Applications on Google Cloud        May 2023",
      "✓ Build Infrastructure with Terraform on Google Cloud   Jun 2023",
      "✓ Manage Kubernetes in Google Cloud                     Oct 2024",
      "✓ Get Started with Dataplex                             Oct 2024",
      "✓ Implement DevOps Workflows in Google Cloud            Oct 2024",
      "",
      "Currently studying for: AZ-900 Azure Fundamentals",
    ],
  },
  stats: {
    output: [
      "┌────────────────────────────────────────────┐",
      "│   35+  Cloud labs completed (GCP)            │",
      "│    8   GCP Skill Badges earned              │",
      "│    4   Projects built & deployed             │",
      "│   12+  Terraform configs written            │",
      "│    8   CI/CD pipelines created              │",
      "│   30+  Months of active learning            │",
      "└────────────────────────────────────────────┘",
    ],
  },
  contact: {
    output: [
      "📧 Email:    agnilickaya5@gmail.com",
      "💬 Telegram: @anastasi_coco",
      "🔗 LinkedIn: linkedin.com/in/ahnylytska",
      "🐙 GitHub:   github.com/meisnastia",
      "🌐 Website:  smartbee.me",
    ],
  },
};

const BOOT_LINES = [
  "  ╔══════════════════════════════════════╗",
  "  ║          H I V E O P S              ║",
  "  ║     Infrastructure as Instinct      ║",
  "  ╚══════════════════════════════════════╝",
  "",
  '  Type "help" for available commands.',
  "",
];

export default function TerminalResume() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [
          ...prev,
          { type: "boot", text: BOOT_LINES[i] },
        ]);
        i++;
      } else {
        clearInterval(timer);
        setBooted(true);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines = [{ type: "prompt", text: cmd }];

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      if (trimmed === "") {
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      const command = COMMANDS[trimmed];
      if (command) {
        newLines.push(
          ...command.output.map((text) => ({ type: "output", text }))
        );
        newLines.push({ type: "empty", text: "" });
      } else {
        newLines.push({
          type: "error",
          text: `bash: ${trimmed}: command not found. Type "help" for available commands.`,
        });
        newLines.push({ type: "empty", text: "" });
      }

      setLines((prev) => [...prev, ...newLines]);
      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);
    },
    []
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (partial) {
        const match = Object.keys(COMMANDS).find((c) =>
          c.startsWith(partial)
        );
        if (match) setInput(match);
      }
    }
  };

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SEO
        title="Terminal Resume"
        description="Interactive terminal resume — Anastasia Hnylytska, DevOps / Platform Engineer."
        path="/terminal"
      />
      <Container style={{ maxWidth: "800px", padding: "2rem 1rem" }}>
        <div
          className="terminal-window"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="terminal-title">
              nastya@hiveops: ~/portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div className="terminal-body" ref={terminalRef}>
            {lines.map((line, i) => (
              <div key={i} className={`terminal-line terminal-${line.type}`}>
                {line.type === "prompt" && (
                  <span className="terminal-prompt-text">
                    nastya@hiveops:~${" "}
                  </span>
                )}
                {line.text}
              </div>
            ))}
            {booted && (
              <div className="terminal-line terminal-input-line">
                <span className="terminal-prompt-text">
                  nastya@hiveops:~${" "}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
