import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container
      className="text-center"
      style={{
        paddingTop: "8rem",
        minHeight: "80vh",
        color: "var(--text-primary)",
      }}
    >
      <h1 style={{ fontSize: "6rem", color: "var(--accent)" }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: "var(--text-secondary)" }}>
        The hive doesn&apos;t have this cell.
      </p>
      <Link
        to="/"
        className="btn"
        style={{
          background: "var(--accent)",
          color: "#1A1200",
          fontWeight: 600,
          marginTop: "1rem",
          padding: "0.6rem 2rem",
        }}
      >
        Back to Hive
      </Link>
    </Container>
  );
}
