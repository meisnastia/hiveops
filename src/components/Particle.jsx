import React, { useCallback } from "react";
import Particles from "react-tsparticles";

export default function Particle() {
  const particlesInit = useCallback(async () => {
    // tsparticles v1 auto-loads
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 1200,
            },
          },
          color: {
            value: ["#FFC107", "#FFD54F", "#FF8F00"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.2,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.05,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: { enable: true, minimumValue: 1 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#FFC107",
            opacity: 0.08,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.2,
                color: "#FFC107",
              },
            },
          },
        },
        detectRetina: true,
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
      }}
    />
  );
}
