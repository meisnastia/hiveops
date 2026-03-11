import React, { useState, useEffect } from "react";
import { Navbar as BsNavbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCode,
  FaFileAlt,
  FaTerminal,
  FaEnvelope,
} from "react-icons/fa";
import { GiHoneycomb } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setNavColour(window.scrollY >= 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: <FaHome />, labelKey: "nav_home" },
    { path: "/about", icon: <FaUser />, labelKey: "nav_about" },
    { path: "/projects", icon: <FaCode />, labelKey: "nav_projects" },
    { path: "/resume", icon: <FaFileAlt />, labelKey: "nav_resume" },
    { path: "/terminal", icon: <FaTerminal />, labelKey: "nav_terminal" },
    { path: "/contact", icon: <FaEnvelope />, labelKey: "nav_contact" },
  ];

  return (
    <BsNavbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
      style={{
        background: navColour ? "var(--bg-navbar)" : "transparent",
        backdropFilter: navColour ? "blur(12px)" : "none",
        WebkitBackdropFilter: navColour ? "blur(12px)" : "none",
        boxShadow: navColour ? "var(--bg-navbar-scrolled-shadow)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container>
        <BsNavbar.Brand
          as={Link}
          to="/"
          style={{
            color: "var(--accent)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <GiHoneycomb /> SmartBee
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2 d-md-none">
          <ThemeToggle />
          <LanguageSwitcher />
          <BsNavbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpand(expand ? false : "expanded")}
            style={{ borderColor: "var(--accent)" }}
          >
            <span style={{ color: "var(--accent)", fontSize: "1.4rem" }}>
              &#9776;
            </span>
          </BsNavbar.Toggle>
        </div>

        <BsNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="/">
            {navItems.map(({ path, icon, labelKey }) => (
              <Nav.Item key={path}>
                <Nav.Link
                  as={Link}
                  to={path}
                  onClick={() => setExpand(false)}
                  style={{
                    color: isActive(path)
                      ? "var(--accent)"
                      : "var(--text-primary)",
                    fontWeight: isActive(path) ? 600 : 400,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  {icon} {t(labelKey)}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <div className="d-none d-md-flex align-items-center gap-2 ms-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
