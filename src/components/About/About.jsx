import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AboutCard from "./AboutCard";
import Certifications from "./Certifications";
import SkillsHive from "./SkillsHive";
import SEO from "../SEO";

export default function About() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: "6rem" }}>
      <SEO
        title="About"
        description="Anastasia Hnylytska — DevOps / Platform Engineer. Skills, certifications, and experience."
        path="/about"
      />
      <Container>
        <h1 className="section-heading" style={{ marginTop: "2rem" }}>
          {t("about_title_1")} <span className="honey-text">{t("about_title_2")}</span>
        </h1>
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8}>
            <AboutCard />
          </Col>
        </Row>
      </Container>

      <section className="section-padding honeycomb-bg" style={{ background: "var(--bg-section)" }}>
        <Container>
          <h2 className="section-heading">
            {t("skills_title_1")} <span className="honey-text">{t("skills_title_2")}</span>
          </h2>
          <SkillsHive />
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <h2 className="section-heading">
            <span className="honey-text">{t("certs_title")}</span>
          </h2>
          <Certifications />
        </Container>
      </section>
    </div>
  );
}
