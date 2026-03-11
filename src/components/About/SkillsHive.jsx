import React from "react";
import { Row, Col } from "react-bootstrap";
import { SKILLS_DATA } from "../../config/skillsData";
import {
  SiGooglecloud,
  SiMicrosoftazure,
  SiTerraform,
  SiAnsible,
  SiHelm,
  SiDocker,
  SiKubernetes,
  SiPodman,
  SiGithubactions,
  SiGitlab,
  SiPrometheus,
  SiGrafana,
  SiGnubash,
  SiPython,
  SiLinux,
  SiNginx,
} from "react-icons/si";
import { FaAws, FaNetworkWired } from "react-icons/fa";

const ICON_MAP = {
  SiGooglecloud: SiGooglecloud,
  SiMicrosoftazure: SiMicrosoftazure,
  FaAws: FaAws,
  SiTerraform: SiTerraform,
  SiAnsible: SiAnsible,
  SiHelm: SiHelm,
  SiDocker: SiDocker,
  SiKubernetes: SiKubernetes,
  SiPodman: SiPodman,
  SiGithubactions: SiGithubactions,
  SiGitlab: SiGitlab,
  SiArgo: SiGithubactions, // fallback
  SiPrometheus: SiPrometheus,
  SiGrafana: SiGrafana,
  SiGnubash: SiGnubash,
  SiPython: SiPython,
  SiYaml: SiGnubash, // fallback
  SiLinux: SiLinux,
  SiNginx: SiNginx,
  FaNetworkWired: FaNetworkWired,
};

const LEVEL_COLORS = {
  advanced: "var(--accent)",
  intermediate: "var(--accent-alt)",
  basic: "var(--text-muted)",
};

const LEVEL_WIDTH = {
  advanced: "90%",
  intermediate: "60%",
  basic: "30%",
};

export default function SkillsHive() {
  return (
    <Row className="g-4 justify-content-center">
      {SKILLS_DATA.map((group) => (
        <Col key={group.category} xs={12} sm={6} lg={4}>
          <div
            className="glass-card"
            style={{
              padding: "1.5rem",
              height: "100%",
            }}
          >
            <h4
              style={{
                color: "var(--accent)",
                fontSize: "1rem",
                fontWeight: 700,
                marginBottom: "1.2rem",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {group.category}
            </h4>
            {group.skills.map((skill) => {
              const IconComp = ICON_MAP[skill.icon];
              return (
                <div
                  key={skill.name}
                  style={{ marginBottom: "1rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {IconComp && <IconComp />}
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: LEVEL_COLORS[skill.level],
                        textTransform: "capitalize",
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "3px",
                      background: "var(--border-subtle)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: LEVEL_WIDTH[skill.level],
                        height: "100%",
                        background: LEVEL_COLORS[skill.level],
                        borderRadius: "2px",
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      ))}
    </Row>
  );
}
