import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function HexProjectCard({ project }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card"
      style={{
        padding: "2rem",
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      {/* Category badge */}
      <span
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "rgba(255, 193, 7, 0.1)",
          color: "var(--accent)",
          padding: "0.2rem 0.7rem",
          borderRadius: "12px",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        {project.category}
      </span>

      {/* Hex icon */}
      <div
        style={{
          width: "56px",
          height: "56px",
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "rgba(255, 193, 7, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.2rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--accent)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {project.title.substring(0, 2).toUpperCase()}
      </div>

      <h3
        style={{
          color: "var(--text-heading)",
          fontSize: "1.2rem",
          fontWeight: 700,
          marginBottom: "0.75rem",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {project.description}
      </p>

      {/* Expandable role details */}
      {project.role && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "1px solid var(--border-subtle)",
              borderRadius: "6px",
              color: "var(--accent)",
              padding: "0.4rem 0.8rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: expanded ? "1rem" : "1.2rem",
              transition: "all 0.2s ease",
            }}
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
            {expanded ? t("project_hide") : t("project_details")}
          </button>

          {expanded && (
            <div
              style={{
                marginBottom: "1.2rem",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {t("project_what_did")}
              </div>
              <ul
                style={{
                  margin: "0 0 1rem 0",
                  paddingLeft: "1.2rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                }}
              >
                {project.role.map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.3rem" }}>{item}</li>
                ))}
              </ul>

              {project.learned && (
                <>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t("project_what_learned")}
                  </div>
                  <p
                    style={{
                      color: "var(--text-tertiary)",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    {project.learned}
                  </p>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* Tech stack tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1.5rem",
        }}
      >
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              background: "var(--bg-card-alt)",
              color: "var(--text-tertiary)",
              padding: "0.15rem 0.6rem",
              borderRadius: "4px",
              fontSize: "0.72rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {project.ghLink && (
          <a
            href={project.ghLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
            aria-label={`${project.title} on GitHub`}
          >
            <FaGithub />
          </a>
        )}
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
            aria-label={`${project.title} demo`}
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
}
