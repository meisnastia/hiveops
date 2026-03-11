import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PROJECTS, PROJECT_CATEGORIES } from "../../config/projectsData";
import HexProjectCard from "./HexProjectCard";
import SEO from "../SEO";

export default function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SEO
        title="Projects"
        description="DevOps and cloud infrastructure projects — Terraform, Kubernetes, CI/CD, MLOps, monitoring."
        path="/projects"
      />
      <Container>
        <h1 className="section-heading" style={{ marginTop: "2rem" }}>
          {t("projects_title_1")} <span className="honey-text">{t("projects_title_2")}</span>
        </h1>

        {/* Filter bar */}
        <div
          className="text-center"
          style={{ marginBottom: "3rem" }}
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`glass-pill${activeCategory === cat ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Row className="g-4 justify-content-center">
          {filtered.map((project) => (
            <Col key={project.id} xs={12} md={6} lg={4}>
              <HexProjectCard project={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
