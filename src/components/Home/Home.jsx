import React from "react";
import HeroSection from "./HeroSection";
import AboutPreview from "./AboutPreview";
import Stats from "./Stats";
import Particle from "../Particle";
import SEO from "../SEO";
import GitOpsFlow from "../Animations/GitOpsFlow";
import CICDVisualizer from "../Animations/CICDVisualizer";
import InfraProvisioning from "../Animations/InfraProvisioning";
import MonitoringDashboard from "../Animations/MonitoringDashboard";

export default function Home() {
  return (
    <div>
      <SEO
        title="Home"
        description="Anastasia Hnylytska — DevOps / Platform Engineer. Cloud infrastructure, Terraform, Kubernetes, CI/CD automation."
        path="/"
      />
      <Particle />
      <HeroSection />
      <AboutPreview />
      <GitOpsFlow />
      <CICDVisualizer />
      <InfraProvisioning />
      <MonitoringDashboard />
      <Stats />
    </div>
  );
}
