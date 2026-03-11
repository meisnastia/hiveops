import React from "react";
import { Row, Col } from "react-bootstrap";
import { CERTIFICATIONS } from "../../config/skillsData";
import { FaCertificate, FaHourglass } from "react-icons/fa";

export default function Certifications() {
  return (
    <Row className="g-3 justify-content-center">
      {CERTIFICATIONS.map((cert) => (
        <Col key={cert.name} xs={12} sm={6} md={4} lg={3}>
          <div
            className="glass-card"
            style={{
              padding: "1.5rem",
              textAlign: "center",
              height: "100%",
              opacity: cert.inProgress ? 0.7 : 1,
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                color: cert.inProgress
                  ? "var(--text-muted)"
                  : "var(--accent)",
                marginBottom: "0.75rem",
              }}
            >
              {cert.inProgress ? <FaHourglass /> : <FaCertificate />}
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: "0.3rem",
              }}
            >
              {cert.name}
            </div>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.75rem",
              }}
            >
              {cert.issuer} &middot; {cert.date}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
